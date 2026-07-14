import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Car } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import TopFilterBar from '../components/TopFilterBar';
import TravelTimeSidebar from '../components/TravelTimeSidebar';
import Pagination from '../components/Pagination';
import Carousel, { CarouselArrows } from '../components/Carousel';
import api from '../api/api';
import { estimateTravelMinutes } from '../data/staticData';

export default function Listings({ purpose }) {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    purpose, city: '', propertyType: '', bedrooms: '', minPrice: '', maxPrice: '',
    minArea: '', maxArea: '', amenities: [], category: '', q: '',
  });
  const [travelFilter, setTravelFilter] = useState(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    setFilters((f) => ({ ...f, q, purpose }));
  }, [location.search, purpose]);

  useEffect(() => {
    setLoading(true);
    const query = {
      purpose: filters.purpose,
      page,
      limit: 9,
      propertyType: filters.propertyType,
      bedrooms: filters.bedrooms,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      q: filters.q,
    };
    Object.keys(query).forEach((k) => (!query[k] ? delete query[k] : null));
    api.get('/properties', { params: query }).then((res) => {
      setItems(res.data.items);
      setPages(res.data.pages);
      setLoading(false);
    });
  }, [filters.purpose, filters.propertyType, filters.bedrooms, filters.minPrice, filters.maxPrice, filters.q, page]);

  // Client-side refinement for area + amenities (not modeled server-side filters here)
  const visibleItems = useMemo(() => {
    let list = items;
    if (filters.minArea) list = list.filter((p) => p.areaSqft >= Number(filters.minArea));
    if (filters.maxArea) list = list.filter((p) => p.areaSqft <= Number(filters.maxArea));
    if (filters.amenities?.length) {
      list = list.filter((p) => filters.amenities.every((a) => (p.amenities || []).includes(a)));
    }
    return list;
  }, [items, filters.minArea, filters.maxArea, filters.amenities]);

  // When a travel-time filter is active, compute estimated minutes and filter/sort
  const travelResults = useMemo(() => {
    if (!travelFilter) return null;
    return visibleItems
      .map((p) => ({ property: p, minutes: estimateTravelMinutes(p, travelFilter.landmark.id, travelFilter.mode) }))
      .filter((r) => r.minutes <= travelFilter.maxTime)
      .sort((a, b) => a.minutes - b.minutes);
  }, [visibleItems, travelFilter]);

  const scrollBy = (dir) => {
    if (trackRef.current) trackRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 pt-32 pb-24">
      <div className="mb-8">
        <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">
          {purpose === 'rent' ? 'For Rent' : 'For Sale'}
        </p>
        <h1 className="font-display text-4xl text-navy">
          {purpose === 'rent' ? 'Properties for Rent' : 'Properties for Sale'}
        </h1>
      </div>

      <div className="mb-8">
        <TopFilterBar filters={filters} setFilters={(fn) => { setPage(1); setFilters(fn); }} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <TravelTimeSidebar
          travelFilter={travelFilter}
          onApply={(tf) => setTravelFilter(tf)}
          onClear={() => setTravelFilter(null)}
        />

        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {travelFilter && (
              <motion.div
                key="travel-header"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between mb-5"
              >
                <span className="inline-flex items-center gap-2 bg-white border border-black/10 rounded-full px-4 py-2 text-sm text-navy shadow-sm">
                  <Car size={15} className="text-gold" />
                  {travelFilter.maxTime} mins to {travelFilter.landmark.name}
                </span>
                <CarouselArrows onLeft={() => scrollBy(-1)} onRight={() => scrollBy(1)} />
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <p className="text-slate text-center py-16">Loading listings...</p>
          ) : travelFilter ? (
            travelResults.length === 0 ? (
              <p className="text-slate text-center py-16">
                No properties within {travelFilter.maxTime} mins of {travelFilter.landmark.name} — try increasing the max travel time.
              </p>
            ) : (
              <Carousel ref={trackRef} itemWidth={320}>
                {travelResults.map(({ property, minutes }, i) => (
                  <div key={property._id} className="snap-start shrink-0 w-[320px]">
                    <PropertyCard property={property} index={i} travelMinutes={minutes} />
                  </div>
                ))}
              </Carousel>
            )
          ) : visibleItems.length === 0 ? (
            <p className="text-slate text-center py-16">No properties match your filters yet — try broadening your search.</p>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleItems.map((p, i) => <PropertyCard key={p._id} property={p} index={i} />)}
              </div>
              <Pagination page={page} pages={pages} onChange={setPage} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
