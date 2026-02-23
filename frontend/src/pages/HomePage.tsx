import { useTranslation } from 'react-i18next';
import { DropZone } from '../components/DropZone';
import { FileList } from '../components/FileList';
import { ConversionSettings } from '../components/ConversionSettings';
import { ArrowRight, FileImage, Sparkles } from 'lucide-react';

export function HomePage() {
  const { t } = useTranslation();

  return (
    <main className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-surface rounded-full border border-industrial-border mb-6">
            <Sparkles className="w-4 h-4 text-industrial-accent" />
            <span className="text-sm font-mono text-industrial-muted">
              {t('hero.badge')}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-industrial-text mb-4">
            {t('hero.title')}
            <span className="text-industrial-accent"> {t('hero.titleHighlight')}</span>
          </h1>
          
          <p className="text-lg text-industrial-muted max-w-2xl mx-auto mb-8">
            {t('hero.subtitle')}
          </p>

          {/* Format Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {['PNG', 'JPG', 'WEBP', 'GIF', 'BMP'].map((format, i) => (
              <span key={format} className="flex items-center gap-2">
                <span className="px-3 py-1.5 bg-industrial-surface border border-industrial-border rounded font-mono text-sm text-industrial-text">
                  {format}
                </span>
                {i < 4 && <ArrowRight className="w-4 h-4 text-industrial-accent" />}
              </span>
            ))}
          </div>
        </div>

        {/* Converter */}
        <div className="bg-industrial-bg/50 rounded-xl p-6 border border-industrial-border">
          <DropZone />
          <FileList />
          <ConversionSettings />
        </div>

        {/* SEO Content */}
        <section className="mt-16 prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-industrial-text mb-4">
            {t('seo.whyTitle')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-industrial-muted">
            <div className="p-4 bg-industrial-surface rounded-lg border border-industrial-border">
              <h3 className="text-lg font-semibold text-industrial-text mb-2">
                🔒 {t('seo.privacy.title')}
              </h3>
              <p className="text-sm">{t('seo.privacy.desc')}</p>
            </div>
            <div className="p-4 bg-industrial-surface rounded-lg border border-industrial-border">
              <h3 className="text-lg font-semibold text-industrial-text mb-2">
                ⚡ {t('seo.speed.title')}
              </h3>
              <p className="text-sm">{t('seo.speed.desc')}</p>
            </div>
            <div className="p-4 bg-industrial-surface rounded-lg border border-industrial-border">
              <h3 className="text-lg font-semibold text-industrial-text mb-2">
                💰 {t('seo.free.title')}
              </h3>
              <p className="text-sm">{t('seo.free.desc')}</p>
            </div>
            <div className="p-4 bg-industrial-surface rounded-lg border border-industrial-border">
              <h3 className="text-lg font-semibold text-industrial-text mb-2">
                🎯 {t('seo.formats.title')}
              </h3>
              <p className="text-sm">{t('seo.formats.desc')}</p>
            </div>
          </div>
        </section>

        {/* CloudConvert Comparison */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-industrial-text mb-4">
            {t('comparison.title')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-industrial-border">
                  <th className="text-left py-3 px-4 text-industrial-muted font-mono uppercase">{t('comparison.feature')}</th>
                  <th className="text-center py-3 px-4 text-industrial-accent font-mono uppercase">FileConvert</th>
                  <th className="text-center py-3 px-4 text-industrial-muted font-mono uppercase">CloudConvert</th>
                </tr>
              </thead>
              <tbody className="text-industrial-text">
                <tr className="border-b border-industrial-border">
                  <td className="py-3 px-4">{t('comparison.price')}</td>
                  <td className="text-center py-3 px-4 text-industrial-success">✅ {t('comparison.free')}</td>
                  <td className="text-center py-3 px-4 text-industrial-muted">{t('comparison.creditBased')}</td>
                </tr>
                <tr className="border-b border-industrial-border">
                  <td className="py-3 px-4">{t('comparison.upload')}</td>
                  <td className="text-center py-3 px-4 text-industrial-success">✅ {t('comparison.noUpload')}</td>
                  <td className="text-center py-3 px-4 text-industrial-muted">{t('comparison.serverUpload')}</td>
                </tr>
                <tr className="border-b border-industrial-border">
                  <td className="py-3 px-4">{t('comparison.account')}</td>
                  <td className="text-center py-3 px-4 text-industrial-success">✅ {t('comparison.noAccount')}</td>
                  <td className="text-center py-3 px-4 text-industrial-muted">{t('comparison.required')}</td>
                </tr>
                <tr className="border-b border-industrial-border">
                  <td className="py-3 px-4">{t('comparison.watermark')}</td>
                  <td className="text-center py-3 px-4 text-industrial-success">✅ {t('comparison.noWatermark')}</td>
                  <td className="text-center py-3 px-4 text-industrial-success">✅ {t('comparison.noWatermark')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
