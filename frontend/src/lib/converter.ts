/**
 * Image format converter using Canvas API
 * 100% client-side, no server upload
 */

export type ImageFormat = 'png' | 'jpg' | 'jpeg' | 'webp' | 'gif' | 'bmp' | 'ico';

export interface ConversionOptions {
  format: ImageFormat;
  quality: number; // 0-1
  width?: number;
  height?: number;
  maintainAspectRatio?: boolean;
}

export interface ConversionResult {
  blob: Blob;
  filename: string;
  originalSize: number;
  convertedSize: number;
  width: number;
  height: number;
}

const MIME_TYPES: Record<ImageFormat, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  bmp: 'image/bmp',
  ico: 'image/x-icon',
};

/**
 * Load an image file and return an HTMLImageElement
 */
export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to load image: ${file.name}`));
    };
    
    img.src = url;
  });
}

/**
 * Calculate dimensions while maintaining aspect ratio
 */
export function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  targetWidth?: number,
  targetHeight?: number,
  maintainAspectRatio = true
): { width: number; height: number } {
  if (!targetWidth && !targetHeight) {
    return { width: originalWidth, height: originalHeight };
  }

  if (!maintainAspectRatio) {
    return {
      width: targetWidth || originalWidth,
      height: targetHeight || originalHeight,
    };
  }

  const aspectRatio = originalWidth / originalHeight;

  if (targetWidth && !targetHeight) {
    return {
      width: targetWidth,
      height: Math.round(targetWidth / aspectRatio),
    };
  }

  if (!targetWidth && targetHeight) {
    return {
      width: Math.round(targetHeight * aspectRatio),
      height: targetHeight,
    };
  }

  // Both specified - fit within bounds
  const widthRatio = targetWidth! / originalWidth;
  const heightRatio = targetHeight! / originalHeight;
  const ratio = Math.min(widthRatio, heightRatio);

  return {
    width: Math.round(originalWidth * ratio),
    height: Math.round(originalHeight * ratio),
  };
}

/**
 * Convert an image to the specified format
 */
export async function convertImage(
  file: File,
  options: ConversionOptions
): Promise<ConversionResult> {
  const img = await loadImage(file);
  
  const { width, height } = calculateDimensions(
    img.width,
    img.height,
    options.width,
    options.height,
    options.maintainAspectRatio
  );

  // Create canvas and draw image
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  // Fill with white background for JPEG (no transparency)
  if (options.format === 'jpg' || options.format === 'jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(img, 0, 0, width, height);

  // Convert to blob
  const mimeType = MIME_TYPES[options.format];
  const quality = options.format === 'png' ? undefined : options.quality;

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to convert image'));
        }
      },
      mimeType,
      quality
    );
  });

  // Generate new filename
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  const filename = `${baseName}.${options.format}`;

  return {
    blob,
    filename,
    originalSize: file.size,
    convertedSize: blob.size,
    width,
    height,
  };
}

/**
 * Batch convert multiple files
 */
export async function batchConvert(
  files: File[],
  options: ConversionOptions,
  onProgress?: (completed: number, total: number) => void
): Promise<ConversionResult[]> {
  const results: ConversionResult[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const result = await convertImage(files[i], options);
    results.push(result);
    onProgress?.(i + 1, files.length);
  }
  
  return results;
}

/**
 * Download a single file
 */
export function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Download multiple files as ZIP
 */
export async function downloadAsZip(
  results: ConversionResult[],
  zipFilename = 'converted-images.zip'
): Promise<void> {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  results.forEach((result) => {
    zip.file(result.filename, result.blob);
  });

  const content = await zip.generateAsync({ type: 'blob' });
  downloadFile(content, zipFilename);
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Get supported input formats
 */
export function getSupportedInputFormats(): string[] {
  return ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/bmp'];
}

/**
 * Get supported output formats
 */
export function getSupportedOutputFormats(): ImageFormat[] {
  return ['png', 'jpg', 'webp', 'gif', 'bmp'];
}
