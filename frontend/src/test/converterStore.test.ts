import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useConverterStore } from '../stores/converterStore';

describe('converterStore', () => {
  beforeEach(() => {
    // Reset store state
    useConverterStore.setState({
      files: [],
      outputFormat: 'png',
      quality: 0.9,
      width: undefined,
      height: undefined,
      maintainAspectRatio: true,
      isConverting: false,
      progress: { completed: 0, total: 0 },
    });
  });

  describe('addFiles', () => {
    it('adds files to the store', () => {
      const file1 = new File(['test1'], 'test1.png', { type: 'image/png' });
      const file2 = new File(['test2'], 'test2.jpg', { type: 'image/jpeg' });

      useConverterStore.getState().addFiles([file1, file2]);

      const state = useConverterStore.getState();
      expect(state.files).toHaveLength(2);
      expect(state.files[0].file.name).toBe('test1.png');
      expect(state.files[1].file.name).toBe('test2.jpg');
      expect(state.files[0].status).toBe('pending');
      expect(state.files[1].status).toBe('pending');
    });

    it('generates unique IDs for each file', () => {
      const file1 = new File(['test1'], 'test1.png', { type: 'image/png' });
      const file2 = new File(['test2'], 'test2.png', { type: 'image/png' });

      useConverterStore.getState().addFiles([file1, file2]);

      const state = useConverterStore.getState();
      expect(state.files[0].id).not.toBe(state.files[1].id);
    });

    it('creates preview URLs for files', () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' });

      useConverterStore.getState().addFiles([file]);

      const state = useConverterStore.getState();
      expect(state.files[0].preview).toBe('mock-url');
    });
  });

  describe('removeFile', () => {
    it('removes a file by ID', () => {
      const file1 = new File(['test1'], 'test1.png', { type: 'image/png' });
      const file2 = new File(['test2'], 'test2.png', { type: 'image/png' });

      useConverterStore.getState().addFiles([file1, file2]);
      const firstFileId = useConverterStore.getState().files[0].id;

      useConverterStore.getState().removeFile(firstFileId);

      const state = useConverterStore.getState();
      expect(state.files).toHaveLength(1);
      expect(state.files[0].file.name).toBe('test2.png');
    });

    it('revokes object URL when removing file', () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      useConverterStore.getState().addFiles([file]);
      const fileId = useConverterStore.getState().files[0].id;

      useConverterStore.getState().removeFile(fileId);

      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });
  });

  describe('clearFiles', () => {
    it('removes all files', () => {
      const files = [
        new File(['test1'], 'test1.png', { type: 'image/png' }),
        new File(['test2'], 'test2.png', { type: 'image/png' }),
        new File(['test3'], 'test3.png', { type: 'image/png' }),
      ];

      useConverterStore.getState().addFiles(files);
      expect(useConverterStore.getState().files).toHaveLength(3);

      useConverterStore.getState().clearFiles();

      expect(useConverterStore.getState().files).toHaveLength(0);
    });

    it('resets progress', () => {
      useConverterStore.setState({ progress: { completed: 5, total: 10 } });

      useConverterStore.getState().clearFiles();

      const state = useConverterStore.getState();
      expect(state.progress).toEqual({ completed: 0, total: 0 });
    });
  });

  describe('settings', () => {
    it('sets output format', () => {
      useConverterStore.getState().setOutputFormat('webp');
      expect(useConverterStore.getState().outputFormat).toBe('webp');
    });

    it('sets quality', () => {
      useConverterStore.getState().setQuality(0.5);
      expect(useConverterStore.getState().quality).toBe(0.5);
    });

    it('sets width', () => {
      useConverterStore.getState().setWidth(800);
      expect(useConverterStore.getState().width).toBe(800);
    });

    it('sets height', () => {
      useConverterStore.getState().setHeight(600);
      expect(useConverterStore.getState().height).toBe(600);
    });

    it('sets maintainAspectRatio', () => {
      useConverterStore.getState().setMaintainAspectRatio(false);
      expect(useConverterStore.getState().maintainAspectRatio).toBe(false);
    });
  });

  describe('convertAll', () => {
    it('does nothing when no files', async () => {
      await useConverterStore.getState().convertAll();
      expect(useConverterStore.getState().isConverting).toBe(false);
    });

    it('converts pending files', async () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      useConverterStore.getState().addFiles([file]);

      await useConverterStore.getState().convertAll();

      const state = useConverterStore.getState();
      expect(state.files[0].status).toBe('done');
      expect(state.files[0].result).toBeDefined();
      expect(state.isConverting).toBe(false);
    });

    it('updates progress during conversion', async () => {
      const files = [
        new File(['test1'], 'test1.png', { type: 'image/png' }),
        new File(['test2'], 'test2.png', { type: 'image/png' }),
      ];
      useConverterStore.getState().addFiles(files);

      await useConverterStore.getState().convertAll();

      const state = useConverterStore.getState();
      expect(state.progress.completed).toBe(2);
      expect(state.progress.total).toBe(2);
    });
  });

  describe('downloadSingle', () => {
    it('does nothing for files without result', () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      useConverterStore.getState().addFiles([file]);
      const fileId = useConverterStore.getState().files[0].id;

      // Should not throw
      useConverterStore.getState().downloadSingle(fileId);
    });
  });
});
