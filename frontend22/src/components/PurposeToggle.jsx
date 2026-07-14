import React from 'react';
import { motion } from 'framer-motion';

// Shared Buy/Rent segmented toggle used in the hero search, the admin listing
// filter, and the admin listing form — same look, same behavior, everywhere.
export default function PurposeToggle({ value, onChange, size = 'md', dark = false }) {
  const options = ['buy', 'rent'];
  const pad = size === 'sm' ? 'py-1.5 text-xs' : 'py-2 text-sm';

  return (
    <div className={`relative flex rounded-xl p-1 ${dark ? 'bg-navy-800' : 'bg-ivory'}`}>
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onChange(opt)}
            className={`relative flex-1 ${pad} rounded-lg capitalize transition-colors focus-ring z-10 ${
              active ? 'text-gold' : dark ? 'text-ivory/60' : 'text-slate'
            }`}
          >
            {opt}
          </button>
        );
      })}
      <motion.div
        className="absolute inset-y-1 w-[calc(50%-4px)] bg-navy rounded-lg"
        animate={{ left: value === 'buy' ? 4 : 'calc(50% + 0px)' }}
        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      />
    </div>
  );
}
