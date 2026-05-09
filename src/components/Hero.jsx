export function Hero({ onGetStarted }) {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '48px',
      position: 'relative',
      background: '#ffffff',
    }}>
      {/* Background blob */}
      <div style={{
        position: 'absolute',
        width: '680px',
        height: '580px',
        borderRadius: '48% 52% 45% 55%',
        background: '#f5f6fa',
        right: '-60px',
        top: '60px',
        zIndex: 0,
      }} />

      {/* Decorative dots */}
      <div style={{ position: 'absolute', width: 10, height: 10, borderRadius: 999, background: '#b0b4c8', left: '48%', bottom: 130, zIndex: 2 }} />
      <div style={{ position: 'absolute', width: 10, height: 10, borderRadius: 999, background: '#b0b4c8', right: '4%', bottom: 90, zIndex: 2 }} />

      {/* Sparkles */}
      <svg style={{ position: 'absolute', width: 36, height: 36, color: '#e8440a', opacity: 0.25, left: '49%', top: 100, zIndex: 2 }} viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
        <path d="M24 2l5.7 16.3L46 24l-16.3 5.7L24 46l-5.7-16.3L2 24l16.3-5.7L24 2z" />
      </svg>
      <svg style={{ position: 'absolute', width: 28, height: 28, color: '#e8440a', opacity: 0.18, right: '30%', top: 195, zIndex: 2 }} viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
        <path d="M24 2l5.7 16.3L46 24l-16.3 5.7L24 46l-5.7-16.3L2 24l16.3-5.7L24 2z" />
      </svg>

      {/* Hero grid */}
      <div style={{
        width: 'min(100%, 1240px)',
        minHeight: 680,
        display: 'grid',
        gridTemplateColumns: '0.9fr 1.1fr',
        gap: 56,
        alignItems: 'center',
        position: 'relative',
        zIndex: 3,
      }}>
        {/* ── Left copy ── */}
        <div>
          {/* Logo mark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #e8440a, #b83208)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 18px 36px rgba(232,68,10,0.22)',
            }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 11,
                background: 'white',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 15, height: 15, background: '#fff1ed', borderBottomLeftRadius: 6 }} />
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16182a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
            </div>
            <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 40, fontWeight: 800, letterSpacing: '-0.04em', color: '#16182a', lineHeight: 1 }}>
              DocuSnap
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            margin: '72px 0 0',
            maxWidth: 520,
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 'clamp(48px, 5.5vw, 76px)',
            lineHeight: 1.06,
            letterSpacing: '-0.05em',
            fontWeight: 800,
            color: '#16182a',
          }}>
            Convert PDFs<br />
            to <span style={{ color: '#e8440a' }}>images,</span><br />
            <span style={{ color: '#e8440a' }}>instantly.</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            marginTop: 28,
            maxWidth: 520,
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 20,
            lineHeight: 1.5,
            letterSpacing: '-0.02em',
            color: '#5a6080',
          }}>
            Export every page as JPG, PNG, or TIFF — free, private, and processed entirely in your browser.
          </p>

          {/* Feature pills */}
          <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
            {[
              { icon: '🎁', label: 'Free forever', bg: '#e6f9f3', color: '#00b87c' },
              { icon: '🔒', label: 'Private', bg: '#eef1ff', color: '#3b5bfc' },
              { icon: '⚡', label: 'In-browser', bg: '#fff1ed', color: '#e8440a' },
            ].map(({ icon, label, bg, color }) => (
              <div key={label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                background: bg,
                borderRadius: 999,
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 13,
                fontWeight: 600,
                color,
              }}>
                <span>{icon}</span>{label}
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={onGetStarted}
            style={{
              marginTop: 40,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '16px 32px',
              background: '#e8440a',
              color: 'white',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '-0.01em',
              boxShadow: '0 12px 28px rgba(232,68,10,0.28)',
            }}
          >
            Start converting — it's free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ── Right graphic ── */}
        <Graphic />
      </div>

      {/* Toast */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        left: '48%',
        width: 460,
        borderRadius: 18,
        border: '1.5px solid #edf0f7',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '16px 24px',
        boxShadow: '0 16px 40px rgba(22,24,42,0.08)',
        zIndex: 10,
      }}>
        <div style={{
          flexShrink: 0,
          width: 48,
          height: 48,
          borderRadius: 14,
          background: 'linear-gradient(135deg, #e8440a, #b83208)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
        }}>✓</div>
        <div>
          <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#16182a', letterSpacing: '-0.02em' }}>
            Your files never leave your device.
          </div>
          <div style={{ marginTop: 2, fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 14, color: '#5a6080' }}>
            100% private · 100% secure
          </div>
        </div>
      </div>
    </section>
  )
}

function Graphic() {
  const cardW = 270
  const cardH = 162

  const pdfCard = (
    <div style={{
      position: 'absolute',
      left: 60,
      top: 230,
      width: 270,
      height: 340,
      background: 'white',
      border: '2px solid #edf0f7',
      borderRadius: 18,
      boxShadow: '0 24px 52px rgba(22,24,42,0.10)',
    }}>
      {/* Fold */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: 84,
        height: 84,
        background: '#f5f6fa',
        borderLeft: '2px solid #edf0f7',
        borderBottom: '2px solid #edf0f7',
        borderBottomLeftRadius: 16,
        clipPath: 'polygon(0 0, 100% 100%, 100% 0)',
      }} />
      {/* PDF label */}
      <div style={{
        position: 'absolute',
        top: 38,
        left: -16,
        background: 'linear-gradient(135deg, #e8440a, #b83208)',
        color: 'white',
        fontSize: 28,
        fontWeight: 800,
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        padding: '8px 20px',
        borderRadius: 8,
        boxShadow: '0 10px 22px rgba(232,68,10,0.24)',
      }}>PDF</div>
      {/* Content lines */}
      <div style={{ padding: '116px 28px 0' }}>
        {[100, 100, 75].map((w, i) => (
          <div key={i} style={{ height: 7, borderRadius: 999, background: '#e2e4ef', marginBottom: 12, width: `${w}%` }} />
        ))}
        {/* Image placeholder */}
        <div style={{ height: 108, borderRadius: 10, background: '#f5f6fa', margin: '22px 0 20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: 24, height: 24, borderRadius: '50%', background: '#e2e4ef', left: 28, top: 26 }} />
          <div style={{ position: 'absolute', width: 160, height: 100, background: 'linear-gradient(135deg, #e2e4ef, #c8cad8)', bottom: -55, left: 40, transform: 'rotate(45deg)', borderRadius: 12 }} />
        </div>
        {[100, 100, 75].map((w, i) => (
          <div key={i} style={{ height: 7, borderRadius: 999, background: '#e2e4ef', marginBottom: 12, width: `${w}%` }} />
        ))}
      </div>
    </div>
  )

  const arrowBtn = (
    <div style={{
      position: 'absolute',
      width: 62,
      height: 62,
      left: 390,
      top: 360,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #e8440a, #b83208)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 14px 30px rgba(232,68,10,0.30)',
      zIndex: 4,
      fontSize: 28,
    }}>→</div>
  )

  const connectors = (
    <>
      <svg style={{ position: 'absolute', left: 452, top: 195, width: 120, height: 130, overflow: 'visible', zIndex: 2 }} viewBox="0 0 130 130" fill="none" aria-hidden="true">
        <path d="M0 105 C48 105 34 20 90 20 L112 20" stroke="#e8440a" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="8 7" />
        <path d="M113 14 L126 20 L113 26" stroke="#e8440a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg style={{ position: 'absolute', left: 452, top: 390, width: 130, height: 40, overflow: 'visible', zIndex: 2 }} viewBox="0 0 130 40" fill="none" aria-hidden="true">
        <path d="M0 20 L112 20" stroke="#e8440a" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="8 7" />
        <path d="M113 14 L126 20 L113 26" stroke="#e8440a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg style={{ position: 'absolute', left: 452, top: 430, width: 120, height: 130, overflow: 'visible', zIndex: 2 }} viewBox="0 0 130 130" fill="none" aria-hidden="true">
        <path d="M0 0 C48 0 34 105 90 105 L112 105" stroke="#e8440a" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="8 7" />
        <path d="M113 99 L126 105 L113 111" stroke="#e8440a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  )

  const formats = [
    { label: 'JPG', top: 80, bg: 'linear-gradient(135deg, #00b87c, #0a8a5c)', thumb: 'sky' },
    { label: 'PNG', top: 300, bg: 'linear-gradient(135deg, #3b5bfc, #2a41b6)', thumb: 'checker' },
    { label: 'TIFF', top: 520, bg: 'linear-gradient(135deg, #7c3aed, #5b21b6)', thumb: 'sky' },
  ]

  const exportCards = formats.map(({ label, top, bg, thumb }, idx) => (
    <div key={label} style={{
      position: 'absolute',
      right: 0,
      top,
      width: cardW,
      height: cardH,
      borderRadius: 14,
      background: 'white',
      border: '2px solid #edf0f7',
      padding: 14,
      boxShadow: '0 18px 40px rgba(22,24,42,0.09)',
      overflow: 'hidden',
    }}>
      {/* Format badge */}
      <div style={{
        position: 'absolute',
        top: 14,
        left: 14,
        color: 'white',
        fontSize: 20,
        fontWeight: 800,
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        borderRadius: 8,
        padding: '5px 12px',
        background: bg,
        zIndex: 3,
        boxShadow: '0 6px 14px rgba(15,23,42,0.14)',
      }}>{label}</div>

      {/* Thumbnail */}
      <div style={{
        height: 108,
        marginTop: 36,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
        background: thumb === 'checker'
          ? undefined
          : 'linear-gradient(#bae6fd, #7dd3fc)',
        ...(thumb === 'checker' ? {
          backgroundImage: 'linear-gradient(45deg, #eef1ff 25%, transparent 25%), linear-gradient(-45deg, #eef1ff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eef1ff 75%), linear-gradient(-45deg, transparent 75%, #eef1ff 75%)',
          backgroundSize: '22px 22px',
          backgroundPosition: '0 0, 0 11px, 11px -11px, -11px 0',
        } : {}),
      }}>
        {thumb !== 'checker' && (
          <>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(#bae6fd, #7dd3fc)', opacity: 0.95 }} />
            <div style={{ position: 'absolute', top: 16, left: 28, width: 52, height: 12, borderRadius: 999, background: 'rgba(255,255,255,0.85)' }} />
            <div style={{ position: 'absolute', top: 20, right: 24, width: 70, height: 12, borderRadius: 999, background: 'rgba(255,255,255,0.75)' }} />
            <div style={{ position: 'absolute', bottom: 14, left: -12, width: 130, height: 110, background: '#60a5fa', transform: 'rotate(45deg)', borderRadius: 12, zIndex: 1 }} />
            <div style={{ position: 'absolute', bottom: 14, right: -16, width: 130, height: 110, background: '#38bdf8', transform: 'rotate(45deg)', borderRadius: 12, zIndex: 1 }} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 48, background: '#34d399', zIndex: 2 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 76, width: 130, height: 44, borderRadius: '80px 80px 0 0', background: '#22d3ee', zIndex: 3 }} />
            {[{ left: 30, h: 80 }, { left: 86, h: 96 }, { right: 48, h: 72 }].map((t, i) => (
              <div key={i} style={{ position: 'absolute', bottom: 0, ...t, width: 28, height: t.h, background: i === 1 ? '#065f46' : '#047857', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', zIndex: 4 }} />
            ))}
          </>
        )}
        {thumb === 'checker' && (
          <>
            <div style={{ position: 'absolute', bottom: 14, left: -12, width: 130, height: 110, background: 'rgba(99,102,241,0.25)', transform: 'rotate(45deg)', borderRadius: 12, zIndex: 1 }} />
            <div style={{ position: 'absolute', bottom: 14, right: -16, width: 130, height: 110, background: 'rgba(99,102,241,0.18)', transform: 'rotate(45deg)', borderRadius: 12, zIndex: 1 }} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 46, background: 'rgba(52,211,153,0.5)', zIndex: 2 }} />
            {[{ left: 30, h: 80 }, { left: 86, h: 96 }, { right: 48, h: 72 }].map((t, i) => (
              <div key={i} style={{ position: 'absolute', bottom: 0, ...t, width: 28, height: t.h, background: 'rgba(4,120,87,0.45)', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', zIndex: 4 }} />
            ))}
          </>
        )}
        {/* Page number badge */}
        <div style={{ position: 'absolute', right: 6, bottom: 6, width: 40, height: 40, background: 'white', borderRadius: '12px 0 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#16182a', zIndex: 5, boxShadow: '0 4px 14px rgba(22,24,42,0.12)' }}>{idx + 1}</div>
      </div>
    </div>
  ))

  return (
    <div style={{ position: 'relative', zIndex: 3, minHeight: 620 }}>
      {pdfCard}
      {arrowBtn}
      {connectors}
      {exportCards}
    </div>
  )
}
