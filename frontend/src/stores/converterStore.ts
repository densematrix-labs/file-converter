import { create } from 'zustand';
import type { ImageFormat, ConversionResult, ConversionOptions } from '../lib/converter';
import { convertImage, downloadFile, downloadAsZip, getSupportedOutputFormats } from '../lib/converter';

export interface FileItem {
  id: string;
  file: File;
  preview: string;
  result?: ConversionResult;
  status: 'pending' | 'converting' | 'done' | 'error';
  error?: string;
}

interface ConverterState {
  files: FileItem[];
  outputFormat: ImageFormat;
  quality: number;
  width: number | undefined;
  height: number | undefined;
  maintainAspectRatio: boolean;
  isConverting: boolean;
  progress: { completed: number; total: number };
  
  // Actions
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  setOutputFormat: (format: ImageFormat) => void;
  setQuality: (quality: number) => void;
  setWidth: (width: number | undefined) => void;
  setHeight: (height: number | undefined) => void;
  setMaintainAspectRatio: (maintain: boolean) => void;
  convertAll: () => Promise<void>;
  downloadSingle: (id: string) => void;
  downloadAll: () => Promise<void>;
}

let fileIdCounter = 0;

export const useConverterStore = create<ConverterState>((set, get) => ({
  files: [],
  outputFormat: 'png',
  quality: 0.9,
  width: undefined,
  height: undefined,
  maintainAspectRatio: true,
  isConverting: false,
  progress: { completed: 0, total: 0 },

  addFiles: (files) => {
    const newItems: FileItem[] = files.map((file) => ({
      id: `file-${++fileIdCounter}`,
      file,
      preview: URL.createObjectURL(file),
      status: 'pending',
    }));
    set((state) => ({ files: [...state.files, ...newItems] }));
  },

  removeFile: (id) => {
    set((state) => {
      const file = state.files.find((f) => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return { files: state.files.filter((f) => f.id !== id) };
    });
  },

  clearFiles: () => {
    const { files } = get();
    files.forEach((f) => URL.revokeObjectURL(f.preview));
    set({ files: [], progress: { completed: 0, total: 0 } });
  },

  setOutputFormat: (format) => set({ outputFormat: format }),
  setQuality: (quality) => set({ quality }),
  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
  setMaintainAspectRatio: (maintain) => set({ maintainAspectRatio: maintain }),

  convertAll: async () => {
    const { files, outputFormat, quality, width, height, maintainAspectRatio } = get();
    const pendingFiles = files.filter((f) => f.status !== 'done');
    
    if (pendingFiles.length === 0) return;

    set({ isConverting: true, progress: { completed: 0, total: pendingFiles.length } });

    const options: ConversionOptions = {
      format: outputFormat,
      quality,
      width,
      height,
      maintainAspectRatio,
    };

    for (let i = 0; i < pendingFiles.length; i++) {
      const fileItem = pendingFiles[i];
      
      set((state) => ({
        files: state.files.map((f) =>
          f.id === fileItem.id ? { ...f, status: 'converting' } : f
        ),
      }));

      try {
        const result = await convertImage(fileItem.file, options);
        
        set((state) => ({
          files: state.files.map((f) =>
            f.id === fileItem.id ? { ...f, status: 'done', result } : f
          ),
          progress: { completed: i + 1, total: pendingFiles.length },
        }));
      } catch (error) {
        set((state) => ({
          files: state.files.map((f) =>
            f.id === fileItem.id
              ? { ...f, status: 'error', error: (error as Error).message }
              : f
          ),
          progress: { completed: i + 1, total: pendingFiles.length },
        }));
      }
    }

    set({ isConverting: false });
  },

  downloadSingle: (id) => {
    const file = get().files.find((f) => f.id === id);
    if (file?.result) {
      downloadFile(file.result.blob, file.result.filename);
    }
  },

  downloadAll: async () => {
    const { files } = get();
    const doneFiles = files.filter((f) => f.status === 'done' && f.result);
    
    if (doneFiles.length === 0) return;
    
    if (doneFiles.length === 1 && doneFiles[0].result) {
      downloadFile(doneFiles[0].result.blob, doneFiles[0].result.filename);
    } else {
      await downloadAsZip(doneFiles.map((f) => f.result!));
    }
  },
}));

export { getSupportedOutputFormats };
