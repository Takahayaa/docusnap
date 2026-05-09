import { useState } from 'react'
import { DropZone } from './components/upload/DropZone.jsx'
import { FileCard } from './components/upload/FileCard.jsx'
import { PageThumbnails } from './components/pages/PageThumbnails.jsx'
import { PageSelectionBar } from './components/pages/PageSelectionBar.jsx'
import { PageRangeInput } from './components/pages/PageRangeInput.jsx'
import { FormatSelector } from './components/settings/FormatSelector.jsx'
import { QualityPanel } from './components/settings/QualityPanel.jsx'
import { ResizePanel } from './components/settings/ResizePanel.jsx'
import { BackgroundPanel } from './components/settings/BackgroundPanel.jsx'
import { CropPanel } from './components/settings/CropPanel.jsx'
import { RotationPanel } from './components/settings/RotationPanel.jsx'
import { ColorModePanel } from './components/settings/ColorModePanel.jsx'
import { OcrEnhancePanel } from './components/settings/OcrEnhancePanel.jsx'
import { FileNamingPanel } from './components/settings/FileNamingPanel.jsx'
import { PreviewGrid } from './components/export/PreviewGrid.jsx'
import { ConvertButton } from './components/export/ConvertButton.jsx'
import { DownloadArea } from './components/export/DownloadArea.jsx'
import { usePdfFiles } from './hooks/usePdfFiles.js'
import { usePageSelection } from './hooks/usePageSelection.js'
import { useConversionSettings } from './hooks/useConversionSettings.js'
import { useConvert } from './hooks/useConvert.js'
import { Hero } from './components/Hero.jsx'

function Card({ title, label, children, id }) {
  return (
    <div id={id} className="card p-6">
      {label && <p className="section-label">{label}</p>}
      {title && <h2 className="text-lg font-semibold text-ink mb-4">{title}</h2>}
      {children}
    </div>
  )
}

function Accordion({ title, icon, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border border-hairline rounded-2xl overflow-hidden transition-colors ${open ? 'border-stone/40' : ''}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-canvas hover:bg-surface-soft transition-colors text-left"
      >
        <span className="flex items-center gap-2.5 text-sm font-medium text-ink">
          {icon && <span className="text-base">{icon}</span>}
          {title}
        </span>
        <svg
          className={`w-4 h-4 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 py-4 bg-canvas border-t border-hairline">{children}</div>}
    </div>
  )
}

export default function App() {
  const { pdfFiles, addFiles, submitPassword, removeFile } = usePdfFiles()
  const pageSelection = usePageSelection(pdfFiles)
  const { settings, update, updateOcr } = useConversionSettings()
  const { convert, converting, progress, error, resultFiles } = useConvert()
  const [downloadMode, setDownloadMode] = useState('zip')

  const readyFiles = pdfFiles.filter((f) => f.status === 'ready')
  const totalSelectedPages = readyFiles.reduce(
    (sum, f) => sum + pageSelection.getEffectiveSelection(f.id, f.pageCount).length, 0
  )
  const canConvert = readyFiles.length > 0 && !converting

  function handleConvert() {
    convert({ pdfFiles, getEffectiveSelection: pageSelection.getEffectiveSelection, settings, downloadMode })
  }

  return (
    <div className="min-h-screen bg-surface">

      <Hero onGetStarted={() => document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' })} />

      <div className="px-4 py-10 sm:px-12">
      <div className="max-w-[1240px] mx-auto space-y-4">

        {/* Upload */}
        <Card id="converter">
          <DropZone onFiles={addFiles} />
          {pdfFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {pdfFiles.map((entry) => (
                <FileCard key={entry.id} entry={entry} onRemove={removeFile} onPasswordSubmit={submitPassword} />
              ))}
            </div>
          )}
        </Card>

        {readyFiles.length > 0 && (
          <>
            {/* Page selection per file */}
            {readyFiles.map((entry) => (
              <Card key={entry.id} label={readyFiles.length > 1 ? `Pages — ${entry.file.name}` : 'Page Selection'}>
                <div className="space-y-3">
                  <PageSelectionBar
                    onSelectAll={() => pageSelection.selectAll(entry.id, entry.pageCount)}
                    onClear={() => pageSelection.clearAll(entry.id)}
                    onSelectOdd={() => pageSelection.selectOdd(entry.id, entry.pageCount)}
                    onSelectEven={() => pageSelection.selectEven(entry.id, entry.pageCount)}
                  />
                  <PageRangeInput
                    totalPages={entry.pageCount}
                    onParse={(input, total) => pageSelection.parseRange(entry.id, input, total)}
                  />
                  <PageThumbnails
                    pdf={entry.pdf}
                    pageCount={entry.pageCount}
                    selectedPages={pageSelection.getEffectiveSelection(entry.id, entry.pageCount)}
                    onToggle={(pageNum) => pageSelection.togglePage(entry.id, pageNum)}
                  />
                  <p className="text-xs text-muted">
                    {pageSelection.getEffectiveSelection(entry.id, entry.pageCount).length} of {entry.pageCount} page{entry.pageCount !== 1 ? 's' : ''} selected
                  </p>
                </div>
              </Card>
            ))}

            {/* Output format */}
            <Card label="Output Format">
              <FormatSelector value={settings.format} onChange={(v) => update('format', v)} />
            </Card>

            {/* Quality */}
            <Card label="Quality & Resolution">
              <QualityPanel settings={settings} onChange={update} />
            </Card>

            {/* Advanced settings */}
            <Card label="Advanced Settings">
              <div className="space-y-2">
                <Accordion title="Background Color" icon="🎨">
                  <BackgroundPanel value={settings.backgroundColor} onChange={(v) => update('backgroundColor', v)} format={settings.format} />
                </Accordion>
                <Accordion title="Rotation" icon="🔄">
                  <RotationPanel value={settings.rotationOverride} onChange={(v) => update('rotationOverride', v)} />
                </Accordion>
                <Accordion title="Color Mode" icon="🌈">
                  <ColorModePanel value={settings.colorMode} onChange={(v) => update('colorMode', v)} />
                </Accordion>
                <Accordion title="Resize Output" icon="↔️">
                  <ResizePanel settings={settings} onChange={update} />
                </Accordion>
                <Accordion title="Crop & Margins" icon="✂️">
                  <CropPanel settings={settings} onChange={update} />
                </Accordion>
                <Accordion title="OCR Enhancements" icon="🔍">
                  <OcrEnhancePanel values={settings.ocrEnhancements} onChange={updateOcr} />
                </Accordion>
                <Accordion title="File Naming" icon="🏷">
                  <FileNamingPanel settings={settings} onChange={update} />
                </Accordion>
              </div>
            </Card>

            {/* Preview */}
            <Card label="Preview">
              <PreviewGrid pdfFiles={pdfFiles} getEffectiveSelection={pageSelection.getEffectiveSelection} />
            </Card>

            {/* Export */}
            <Card label="Export">
              <div className="flex gap-2 mb-5">
                <button
                  onClick={() => setDownloadMode('zip')}
                  className={`pill-toggle flex-1 ${downloadMode === 'zip' ? 'pill-toggle-active' : 'pill-toggle-inactive'}`}
                >
                  ZIP Download
                </button>
                <button
                  onClick={() => setDownloadMode('individual')}
                  className={`pill-toggle flex-1 ${downloadMode === 'individual' ? 'pill-toggle-active' : 'pill-toggle-inactive'}`}
                >
                  Individual Files
                </button>
              </div>
              {totalSelectedPages > 10 && downloadMode === 'individual' && (
                <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                  {totalSelectedPages} pages selected. ZIP download is recommended for large exports.
                </div>
              )}
              <ConvertButton onConvert={handleConvert} converting={converting} progress={progress} disabled={!canConvert} />
              {error && (
                <div className="mt-3 text-sm text-error bg-error-light border border-error/20 rounded-xl px-4 py-3">{error}</div>
              )}
            </Card>

            {resultFiles.length > 0 && (
              <DownloadArea resultFiles={resultFiles} settings={settings} />
            )}
          </>
        )}

        <footer className="text-center text-xs text-muted pb-6 pt-2 space-y-2">
          <p>All processing happens in your browser — no files are ever uploaded or stored.</p>
          <p>Made by Shrey ❤️</p>
          <div className="flex items-center justify-center gap-4">
            <a href="https://x.com/shr3ys" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted hover:text-ink transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @shr3ys
            </a>
            <span className="text-hairline">·</span>
            <a href="https://github.com/Takahayaa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted hover:text-ink transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Takahayaa
            </a>
          </div>
        </footer>
      </div>
      </div>
    </div>
  )
}
