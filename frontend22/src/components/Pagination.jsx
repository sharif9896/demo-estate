import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;

  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  let end = Math.min(pages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  const pageNumbers = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="w-9 h-9 rounded-full flex items-center justify-center border border-black/10 text-slate disabled:opacity-30 disabled:cursor-not-allowed hover:border-navy/30 transition-colors focus-ring"
      >
        <ChevronLeft size={16} />
      </button>

      {start > 1 && (
        <>
          <button onClick={() => onChange(1)} className="w-9 h-9 rounded-full text-sm text-slate hover:bg-ivory focus-ring">1</button>
          {start > 2 && <span className="text-slate/50">…</span>}
        </>
      )}

      {pageNumbers.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`w-9 h-9 rounded-full text-sm transition-colors focus-ring ${
            page === n ? 'bg-navy text-gold' : 'bg-white text-slate border border-black/10 hover:border-navy/30'
          }`}
        >
          {n}
        </button>
      ))}

      {end < pages && (
        <>
          {end < pages - 1 && <span className="text-slate/50">…</span>}
          <button onClick={() => onChange(pages)} className="w-9 h-9 rounded-full text-sm text-slate hover:bg-ivory focus-ring">{pages}</button>
        </>
      )}

      <button
        type="button"
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page === pages}
        aria-label="Next page"
        className="w-9 h-9 rounded-full flex items-center justify-center border border-black/10 text-slate disabled:opacity-30 disabled:cursor-not-allowed hover:border-navy/30 transition-colors focus-ring"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
