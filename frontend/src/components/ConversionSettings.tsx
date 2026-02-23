import { useTranslation } from 'react-i18next';
import { useConverterStore, getSupportedOutputFormats } from '../stores/converterStore';
import type { ImageFormat } from '../lib/converter';

export function ConversionSettings() {
  const { t } = useTranslation();
  const {
    files,
    outputFormat,
    quality,
    width,
    height,
    maintainAspectRatio,
    isConverting,
    setOutputFormat,
    setQuality,
    setWidth,
    setHeight,
    setMaintainAspectRatio,
    convertAll,
    clearFiles,
    downloadAll,
  } = useConverterStore();

  const hasPendingFiles = files.some((f) => f.status === 'pending');
  const hasConvertedFiles = files.some((f) => f.status === 'done');

  if (files.length === 0) return null;

  return (
    <div className="mt-6 p-6 bg-industrial-surface rounded-lg border border-industrial-border">
      <h3 className="text-sm font-mono uppercase tracking-wider text-industrial-muted mb-4">
        {t('settings.title')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Output Format */}
        <div>
          <label className="block text-xs font-mono text-industrial-muted mb-2">
            {t('settings.outputFormat')}
          </label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value as ImageFormat)}
            className="w-full px-3 py-2 bg-industrial-bg border border-industrial-border rounded text-industrial-text font-mono text-sm focus:outline-none focus:border-industrial-accent"
            data-testid="format-select"
          >
            {getSupportedOutputFormats().map((format) => (
              <option key={format} value={format}>
                {format.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Quality Slider */}
        <div>
          <label className="block text-xs font-mono text-industrial-muted mb-2">
            {t('settings.quality')}: {Math.round(quality * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-full h-2 bg-industrial-bg rounded-lg appearance-none cursor-pointer accent-industrial-accent"
            data-testid="quality-slider"
          />
        </div>

        {/* Width */}
        <div>
          <label className="block text-xs font-mono text-industrial-muted mb-2">
            {t('settings.width')} (px)
          </label>
          <input
            type="number"
            value={width || ''}
            onChange={(e) => setWidth(e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder={t('settings.original')}
            className="w-full px-3 py-2 bg-industrial-bg border border-industrial-border rounded text-industrial-text font-mono text-sm focus:outline-none focus:border-industrial-accent"
            data-testid="width-input"
          />
        </div>

        {/* Height */}
        <div>
          <label className="block text-xs font-mono text-industrial-muted mb-2">
            {t('settings.height')} (px)
          </label>
          <input
            type="number"
            value={height || ''}
            onChange={(e) => setHeight(e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder={t('settings.original')}
            className="w-full px-3 py-2 bg-industrial-bg border border-industrial-border rounded text-industrial-text font-mono text-sm focus:outline-none focus:border-industrial-accent"
            data-testid="height-input"
          />
        </div>
      </div>

      {/* Maintain Aspect Ratio */}
      <div className="mt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={maintainAspectRatio}
            onChange={(e) => setMaintainAspectRatio(e.target.checked)}
            className="w-4 h-4 rounded border-industrial-border bg-industrial-bg accent-industrial-accent"
            data-testid="aspect-ratio-checkbox"
          />
          <span className="text-sm text-industrial-text">{t('settings.maintainAspectRatio')}</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={convertAll}
          disabled={!hasPendingFiles || isConverting}
          className="px-6 py-3 bg-industrial-accent text-white font-mono text-sm uppercase tracking-wider rounded hover:bg-industrial-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          data-testid="convert-button"
        >
          {isConverting ? t('settings.converting') : t('settings.convert')}
        </button>

        {hasConvertedFiles && (
          <button
            onClick={downloadAll}
            className="px-6 py-3 bg-industrial-success text-white font-mono text-sm uppercase tracking-wider rounded hover:bg-industrial-success/90 transition-colors"
            data-testid="download-all-button"
          >
            {t('settings.downloadAll')}
          </button>
        )}

        <button
          onClick={clearFiles}
          className="px-6 py-3 border border-industrial-border text-industrial-muted font-mono text-sm uppercase tracking-wider rounded hover:border-red-500 hover:text-red-500 transition-colors"
          data-testid="clear-button"
        >
          {t('settings.clear')}
        </button>
      </div>
    </div>
  );
}
