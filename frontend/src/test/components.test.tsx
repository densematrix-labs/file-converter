import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DropZone } from '../components/DropZone';
import { FileList } from '../components/FileList';
import { ConversionSettings } from '../components/ConversionSettings';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useConverterStore } from '../stores/converterStore';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Components', () => {
  beforeEach(() => {
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

  describe('DropZone', () => {
    it('renders drop zone', () => {
      render(<DropZone />, { wrapper });
      expect(screen.getByTestId('file-input')).toBeInTheDocument();
    });

    it('displays drag and drop text', () => {
      render(<DropZone />, { wrapper });
      expect(screen.getByText('dropzone.dragDrop')).toBeInTheDocument();
      expect(screen.getByText('dropzone.browse')).toBeInTheDocument();
    });

    it('displays supported formats', () => {
      render(<DropZone />, { wrapper });
      expect(screen.getByText('PNG')).toBeInTheDocument();
      expect(screen.getByText('JPG')).toBeInTheDocument();
      expect(screen.getByText('WEBP')).toBeInTheDocument();
      expect(screen.getByText('GIF')).toBeInTheDocument();
      expect(screen.getByText('BMP')).toBeInTheDocument();
    });
  });

  describe('FileList', () => {
    it('returns null when no files', () => {
      const { container } = render(<FileList />, { wrapper });
      expect(container.firstChild).toBeNull();
    });

    it('displays files when present', () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      useConverterStore.getState().addFiles([file]);

      render(<FileList />, { wrapper });
      expect(screen.getByTestId('file-list')).toBeInTheDocument();
      expect(screen.getByText('test.png')).toBeInTheDocument();
    });

    it('shows file count in header', () => {
      const files = [
        new File(['test1'], 'test1.png', { type: 'image/png' }),
        new File(['test2'], 'test2.png', { type: 'image/png' }),
      ];
      useConverterStore.getState().addFiles(files);

      render(<FileList />, { wrapper });
      expect(screen.getByText('fileList.files (2)')).toBeInTheDocument();
    });

    it('displays pending status for new files', () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      useConverterStore.getState().addFiles([file]);

      render(<FileList />, { wrapper });
      expect(screen.getByText('fileList.pending')).toBeInTheDocument();
    });
  });

  describe('ConversionSettings', () => {
    it('returns null when no files', () => {
      const { container } = render(<ConversionSettings />, { wrapper });
      expect(container.firstChild).toBeNull();
    });

    it('displays settings when files present', () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      useConverterStore.getState().addFiles([file]);

      render(<ConversionSettings />, { wrapper });
      expect(screen.getByTestId('format-select')).toBeInTheDocument();
      expect(screen.getByTestId('quality-slider')).toBeInTheDocument();
      expect(screen.getByTestId('convert-button')).toBeInTheDocument();
    });

    it('changes output format', () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      useConverterStore.getState().addFiles([file]);

      render(<ConversionSettings />, { wrapper });
      const select = screen.getByTestId('format-select');
      fireEvent.change(select, { target: { value: 'webp' } });

      expect(useConverterStore.getState().outputFormat).toBe('webp');
    });

    it('changes quality', () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      useConverterStore.getState().addFiles([file]);

      render(<ConversionSettings />, { wrapper });
      const slider = screen.getByTestId('quality-slider');
      fireEvent.change(slider, { target: { value: '0.5' } });

      expect(useConverterStore.getState().quality).toBe(0.5);
    });

    it('toggles aspect ratio checkbox', () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      useConverterStore.getState().addFiles([file]);

      render(<ConversionSettings />, { wrapper });
      const checkbox = screen.getByTestId('aspect-ratio-checkbox');
      fireEvent.click(checkbox);

      expect(useConverterStore.getState().maintainAspectRatio).toBe(false);
    });

    it('clears all files', () => {
      const files = [
        new File(['test1'], 'test1.png', { type: 'image/png' }),
        new File(['test2'], 'test2.png', { type: 'image/png' }),
      ];
      useConverterStore.getState().addFiles(files);

      render(<ConversionSettings />, { wrapper });
      fireEvent.click(screen.getByTestId('clear-button'));

      expect(useConverterStore.getState().files).toHaveLength(0);
    });
  });

  describe('LanguageSwitcher', () => {
    it('renders language switcher button', () => {
      render(<LanguageSwitcher />, { wrapper });
      expect(screen.getByTestId('lang-switcher')).toBeInTheDocument();
    });

    it('opens dropdown on click', () => {
      render(<LanguageSwitcher />, { wrapper });
      fireEvent.click(screen.getByTestId('lang-switcher'));
      expect(screen.getByTestId('lang-en')).toBeInTheDocument();
      expect(screen.getByTestId('lang-zh')).toBeInTheDocument();
      expect(screen.getByTestId('lang-ja')).toBeInTheDocument();
    });

    it('shows all 7 languages', () => {
      render(<LanguageSwitcher />, { wrapper });
      fireEvent.click(screen.getByTestId('lang-switcher'));
      
      expect(screen.getByTestId('lang-en')).toBeInTheDocument();
      expect(screen.getByTestId('lang-zh')).toBeInTheDocument();
      expect(screen.getByTestId('lang-ja')).toBeInTheDocument();
      expect(screen.getByTestId('lang-de')).toBeInTheDocument();
      expect(screen.getByTestId('lang-fr')).toBeInTheDocument();
      expect(screen.getByTestId('lang-ko')).toBeInTheDocument();
      expect(screen.getByTestId('lang-es')).toBeInTheDocument();
    });
  });

  describe('Header', () => {
    it('renders logo and navigation', () => {
      render(<Header />, { wrapper });
      expect(screen.getByText('FileConvert')).toBeInTheDocument();
      expect(screen.getByText('nav.converter')).toBeInTheDocument();
      expect(screen.getByText('nav.pricing')).toBeInTheDocument();
    });

    it('contains language switcher', () => {
      render(<Header />, { wrapper });
      expect(screen.getByTestId('lang-switcher')).toBeInTheDocument();
    });
  });

  describe('Footer', () => {
    it('renders footer content', () => {
      render(<Footer />, { wrapper });
      expect(screen.getByText('footer.privacy')).toBeInTheDocument();
      expect(screen.getByText('footer.fast')).toBeInTheDocument();
      expect(screen.getByText('footer.free')).toBeInTheDocument();
    });

    it('displays copyright', () => {
      render(<Footer />, { wrapper });
      const year = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${year}`))).toBeInTheDocument();
    });

    it('has privacy and terms links', () => {
      render(<Footer />, { wrapper });
      expect(screen.getByText('footer.privacyPolicy')).toBeInTheDocument();
      expect(screen.getByText('footer.terms')).toBeInTheDocument();
    });
  });
});
