import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Train, Footprints, Search } from 'lucide-react';
import { landmarks } from '../data/staticData';

const modes = [
  { key: 'driving', icon: Car },
  { key: 'transit', icon: Train },
  { key: 'walking', icon: Footprints },
];

export default function TravelTimeSidebar({ travelFilter, onApply, onClear }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(travelFilter?.landmark || null);
  const [maxTime, setMaxTime] = useState(travelFilter?.maxTime || 15);
  const [peakHours, setPeakHours] = useState(travelFilter?.peakHours || false);
  const [mode, setMode] = useState(travelFilter?.mode || 'driving');
  const [showResults, setShowResults] = useState(false);

  const filteredLandmarks = landmarks.filter((l) => l.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (lm) => {
    setSelected(lm);
    setQuery(lm.name);
    setShowResults(false);
  };

  const handleConfirm = () => {
    if (!selected) return;
    onApply({ landmark: selected, maxTime, peakHours, mode });
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 w-full lg:w-[300px] shrink-0 h-fit lg:sticky lg:top-28"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center text-navy">
          <Car size={18} strokeWidth={1.75} />
        </span>
        <h3 className="font-display text-lg text-navy leading-tight">Search by<br />travel times</h3>
      </div>

      <label className="block text-xs uppercase tracking-wide text-slate mb-1">Selected location</label>
      <div className="relative mb-5">
        <div className="flex items-center gap-2 border border-black/10 rounded-lg px-3 py-2 focus-within:border-navy/40">
          <Search size={15} className="text-slate shrink-0" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowResults(true); setSelected(null); }}
            onFocus={() => setShowResults(true)}
            placeholder="Search for location"
            className="w-full outline-none text-sm text-navy placeholder:text-slate/60"
          />
        </div>
        {showResults && query && filteredLandmarks.length > 0 && (
          <div className="absolute z-20 top-full left-0 mt-1 w-full bg-white rounded-lg shadow-xl border border-black/5 overflow-hidden">
            {filteredLandmarks.map((lm) => (
              <button
                key={lm.id}
                type="button"
                onClick={() => handleSelect(lm)}
                className="w-full text-left px-3 py-2 text-sm text-navy hover:bg-ivory transition-colors"
              >
                {lm.name} <span className="text-slate text-xs">· {lm.city}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-2">
        <label className="text-xs uppercase tracking-wide text-slate">Max travel time</label>
        <span className="text-sm text-navy font-medium">{maxTime} mins</span>
      </div>
      <input
        type="range"
        min={5}
        max={60}
        step={5}
        value={maxTime}
        onChange={(e) => setMaxTime(Number(e.target.value))}
        className="w-full accent-gold mb-5"
      />

      <div className="flex items-center justify-between mb-5">
        <label className="text-xs uppercase tracking-wide text-slate">Peak hours</label>
        <button
          type="button"
          onClick={() => setPeakHours((v) => !v)}
          className={`w-11 h-6 rounded-full transition-colors relative focus-ring ${peakHours ? 'bg-navy' : 'bg-black/10'}`}
        >
          <motion.span
            layout
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
            animate={{ left: peakHours ? 22 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {modes.map(({ key, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            className={`flex items-center justify-center py-2.5 rounded-lg border transition-colors focus-ring ${
              mode === key ? 'border-navy text-navy bg-ivory' : 'border-black/10 text-slate hover:border-navy/30'
            }`}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={!selected}
        onClick={handleConfirm}
        className={`w-full py-2.5 rounded-lg font-medium transition-colors focus-ring ${
          selected ? 'bg-navy text-gold hover:bg-navy-700' : 'bg-black/5 text-slate/50 cursor-not-allowed'
        }`}
      >
        Confirm
      </button>

      {travelFilter && (
        <button type="button" onClick={onClear} className="w-full text-center text-xs text-slate hover:text-navy mt-3 transition-colors">
          Clear travel-time filter
        </button>
      )}
    </motion.aside>
  );
}
