import { useEffect } from 'react';

const countWords = (content = []) =>
  content
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

function ContentAd({ content = [], minWords = 700, slot = '1498043097', format = 'auto' }) {
  const wordCount = countWords(content);
  const canRenderAd = wordCount >= minWords;

  useEffect(() => {
    if (!canRenderAd) {
      return undefined;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log('AdSense error:', error);
    }

    return undefined;
  }, [canRenderAd]);

  if (!canRenderAd) {
    return null;
  }

  return (
    <div className="my-10 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        Sponsored
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9954652290347538"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

export default ContentAd;
