import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useConverterStore } from '../stores/converterStore';
import { getSupportedInputFormats } from '../lib/converter';

export function DropZone() {
  const { t } = useTranslation();
  const addFiles = useConverterStore((state) => state.addFiles);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      addFiles(acceptedFiles);
    },
    [addFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': getSupportedInputFormats(),
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
        transition-all duration-200 group
        ${
          isDragActive
            ? 'border-industrial-accent bg-industrial-accent/10'
            : 'border-industrial-border hover:border-industrial-accent/50 hover:bg-industrial-surface'
        }
      `}
    >
      <input {...getInputProps()} data-testid="file-input" />
      
      <div className="flex flex-col items-center gap-4">
        <div
          className={`
            w-16 h-16 rounded-full flex items-center justify-center
            transition-all duration-200
            ${isDragActive ? 'bg-industrial-accent' : 'bg-industrial-surface group-hover:bg-industrial-accent/20'}
          `}
        >
          {isDragActive ? (
            <Image className="w-8 h-8 text-white" />
          ) : (
            <Upload className="w-8 h-8 text-industrial-muted group-hover:text-industrial-accent" />
          )}
        </div>

        <div>
          <p className="text-lg font-medium text-industrial-text">
            {isDragActive ? t('dropzone.dropHere') : t('dropzone.dragDrop')}
          </p>
          <p className="text-sm text-industrial-muted mt-1">
            {t('dropzone.or')}{' '}
            <span className="text-industrial-accent">{t('dropzone.browse')}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mt-2">
          {['PNG', 'JPG', 'WEBP', 'GIF', 'BMP'].map((format) => (
            <span
              key={format}
              className="px-2 py-1 text-xs font-mono bg-industrial-surface rounded text-industrial-muted"
            >
              {format}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
