import React, { forwardRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Horizontal snap-scroll track. Forwards its scroll container ref so parent
// sections can drive it from external left/right arrow buttons (placed
// wherever the design calls for, e.g. beside a section heading).
const Carousel = forwardRef(function Carousel({ children, showSideArrows = false, itemWidth = 300 }, ref) {
  const scrollBy = (dir) => {
    if (ref?.current) ref.current.scrollBy({ left: dir * (itemWidth + 24), behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {showSideArrows && (
        <>
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-black/5 items-center justify-center text-navy hover:bg-ivory transition-colors focus-ring"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-black/5 items-center justify-center text-navy hover:bg-ivory transition-colors focus-ring"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
      <div ref={ref} className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 no-scrollbar">
        {children}
      </div>
    </div>
  );
});

export function CarouselArrows({ onLeft, onRight }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onLeft}
        aria-label="Previous"
        className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-navy hover:border-navy/30 hover:bg-ivory transition-colors focus-ring"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        type="button"
        onClick={onRight}
        aria-label="Next"
        className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-navy hover:border-navy/30 hover:bg-ivory transition-colors focus-ring"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default Carousel;
