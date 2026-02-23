import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  calculateDimensions,
  formatFileSize,
  getSupportedInputFormats,
  getSupportedOutputFormats,
  loadImage,
  convertImage,
} from '../lib/converter';

describe('converter', () => {
  describe('calculateDimensions', () => {
    it('returns original dimensions when no target specified', () => {
      const result = calculateDimensions(800, 600);
      expect(result).toEqual({ width: 800, height: 600 });
    });

    it('calculates height when only width is specified', () => {
      const result = calculateDimensions(800, 600, 400, undefined, true);
      expect(result).toEqual({ width: 400, height: 300 });
    });

    it('calculates width when only height is specified', () => {
      const result = calculateDimensions(800, 600, undefined, 300, true);
      expect(result).toEqual({ width: 400, height: 300 });
    });

    it('fits within bounds when both are specified', () => {
      const result = calculateDimensions(800, 600, 200, 200, true);
      expect(result).toEqual({ width: 200, height: 150 });
    });

    it('ignores aspect ratio when maintainAspectRatio is false', () => {
      const result = calculateDimensions(800, 600, 400, 200, false);
      expect(result).toEqual({ width: 400, height: 200 });
    });

    it('handles square images', () => {
      const result = calculateDimensions(500, 500, 250, undefined, true);
      expect(result).toEqual({ width: 250, height: 250 });
    });

    it('handles portrait images', () => {
      const result = calculateDimensions(400, 800, 200, undefined, true);
      expect(result).toEqual({ width: 200, height: 400 });
    });
  });

  describe('formatFileSize', () => {
    it('formats 0 bytes', () => {
      expect(formatFileSize(0)).toBe('0 B');
    });

    it('formats bytes', () => {
      expect(formatFileSize(512)).toBe('512 B');
    });

    it('formats kilobytes', () => {
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(2560)).toBe('2.5 KB');
    });

    it('formats megabytes', () => {
      expect(formatFileSize(1048576)).toBe('1 MB');
      expect(formatFileSize(5242880)).toBe('5 MB');
    });

    it('formats gigabytes', () => {
      expect(formatFileSize(1073741824)).toBe('1 GB');
    });
  });

  describe('getSupportedInputFormats', () => {
    it('returns array of mime types', () => {
      const formats = getSupportedInputFormats();
      expect(formats).toContain('image/png');
      expect(formats).toContain('image/jpeg');
      expect(formats).toContain('image/webp');
      expect(formats).toContain('image/gif');
      expect(formats).toContain('image/bmp');
    });
  });

  describe('getSupportedOutputFormats', () => {
    it('returns array of format strings', () => {
      const formats = getSupportedOutputFormats();
      expect(formats).toContain('png');
      expect(formats).toContain('jpg');
      expect(formats).toContain('webp');
      expect(formats).toContain('gif');
      expect(formats).toContain('bmp');
    });
  });

  describe('loadImage', () => {
    it('loads an image file', async () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      const img = await loadImage(file);
      expect(img).toBeDefined();
      expect(img.width).toBe(100);
      expect(img.height).toBe(100);
    });
  });

  describe('convertImage', () => {
    it('converts an image to specified format', async () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      const result = await convertImage(file, {
        format: 'jpg',
        quality: 0.9,
      });

      expect(result).toBeDefined();
      expect(result.filename).toBe('test.jpg');
      expect(result.blob).toBeDefined();
      expect(result.originalSize).toBe(4);
      expect(result.width).toBe(100);
      expect(result.height).toBe(100);
    });

    it('converts with custom dimensions', async () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      const result = await convertImage(file, {
        format: 'webp',
        quality: 0.8,
        width: 50,
        maintainAspectRatio: true,
      });

      expect(result).toBeDefined();
      expect(result.filename).toBe('test.webp');
      expect(result.width).toBe(50);
      expect(result.height).toBe(50);
    });

    it('handles different output formats', async () => {
      const file = new File(['test'], 'image.jpg', { type: 'image/jpeg' });
      
      const pngResult = await convertImage(file, { format: 'png', quality: 1 });
      expect(pngResult.filename).toBe('image.png');

      const webpResult = await convertImage(file, { format: 'webp', quality: 0.9 });
      expect(webpResult.filename).toBe('image.webp');

      const gifResult = await convertImage(file, { format: 'gif', quality: 1 });
      expect(gifResult.filename).toBe('image.gif');
    });
  });
});
