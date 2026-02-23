import { Trash2, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useConverterStore } from '../stores/converterStore';
import { formatFileSize } from '../lib/converter';

export function FileList() {
  const { t } = useTranslation();
  const { files, removeFile, downloadSingle } = useConverterStore();

  if (files.length === 0) return null;

  return (
    <div className="mt-6 space-y-3" data-testid="file-list">
      <h3 className="text-sm font-mono uppercase tracking-wider text-industrial-muted">
        {t('fileList.files')} ({files.length})
      </h3>
      
      <div className="space-y-2">
        {files.map((fileItem) => (
          <div
            key={fileItem.id}
            className="flex items-center gap-4 p-3 bg-industrial-surface rounded-lg border border-industrial-border"
            data-testid={`file-item-${fileItem.id}`}
          >
            {/* Thumbnail */}
            <div className="w-12 h-12 rounded overflow-hidden bg-industrial-bg flex-shrink-0">
              <img
                src={fileItem.preview}
                alt={fileItem.file.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-industrial-text truncate">
                {fileItem.file.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-industrial-muted font-mono">
                <span>{formatFileSize(fileItem.file.size)}</span>
                {fileItem.result && (
                  <>
                    <span className="text-industrial-accent">→</span>
                    <span className="text-industrial-success">
                      {formatFileSize(fileItem.result.convertedSize)}
                    </span>
                    <span className="text-industrial-muted">
                      ({Math.round((1 - fileItem.result.convertedSize / fileItem.file.size) * 100)}% smaller)
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              {fileItem.status === 'pending' && (
                <span className="text-xs font-mono text-industrial-muted">
                  {t('fileList.pending')}
                </span>
              )}
              {fileItem.status === 'converting' && (
                <Loader2 className="w-5 h-5 text-industrial-accent animate-spin" />
              )}
              {fileItem.status === 'done' && (
                <CheckCircle className="w-5 h-5 text-industrial-success" />
              )}
              {fileItem.status === 'error' && (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {fileItem.status === 'done' && fileItem.result && (
                <button
                  onClick={() => downloadSingle(fileItem.id)}
                  className="p-2 hover:bg-industrial-bg rounded transition-colors"
                  title={t('fileList.download')}
                  data-testid={`download-${fileItem.id}`}
                >
                  <Download className="w-4 h-4 text-industrial-accent" />
                </button>
              )}
              <button
                onClick={() => removeFile(fileItem.id)}
                className="p-2 hover:bg-industrial-bg rounded transition-colors"
                title={t('fileList.remove')}
                data-testid={`remove-${fileItem.id}`}
              >
                <Trash2 className="w-4 h-4 text-industrial-muted hover:text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
