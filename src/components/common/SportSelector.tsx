import React from 'react';
import { useDemoData } from '../../context/DemoDataContext';
import { SPORTS_CATALOG } from '../../data/sports';
import { Sport } from '../../types';

interface SportSelectorProps {
  variant?: 'chips' | 'compact' | 'dropdown';
  className?: string;
  onSelectSport?: (sport: Sport) => void;
}

export const SportSelector: React.FC<SportSelectorProps> = ({
  variant = 'chips',
  className = '',
  onSelectSport,
}) => {
  const { activeSport, setActiveSport } = useDemoData();

  const handleSelect = (sport: Sport) => {
    setActiveSport(sport);
    onSelectSport?.(sport);
  };

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 ${className}`}>
        {SPORTS_CATALOG.map((sport) => (
          <button
            key={sport.id}
            onClick={() => handleSelect(sport.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeSport === sport.id
                ? 'bg-navy-900 text-white shadow-subtle'
                : 'bg-warm-100 hover:bg-warm-200 text-slate-brand'
            }`}
          >
            <span>{sport.icon}</span>
            <span>{sport.name.replace('Youth ', '')}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {SPORTS_CATALOG.map((sport) => {
          const isActive = activeSport === sport.id;
          return (
            <button
              key={sport.id}
              onClick={() => handleSelect(sport.id)}
              className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-navy-900 text-white border-navy-900 shadow-subtle'
                  : 'bg-white hover:bg-warm-50 text-slate-brand border-warm-200 hover:border-slate-muted/40'
              }`}
            >
              <span className="text-base group-hover:scale-110 transition-transform">{sport.icon}</span>
              <span>{sport.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                  isActive ? 'bg-white/20 text-white' : 'bg-warm-100 text-slate-muted'
                }`}
              >
                {sport.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
