import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, minDurationMs = 1200 }) => {
  const [progress, setProgress] = useState(15);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if initial load was already completed in this session
    const hasLoaded = sessionStorage.getItem('rink_review_intro_loaded');
    if (hasLoaded) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              setIsVisible(false);
              sessionStorage.setItem('rink_review_intro_loaded', 'true');
              onComplete?.();
            }, 500);
          }, 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-950 text-white transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center animate-in fade-in zoom-in-95 duration-500">
        {/* Animated Geometric Rink Emblem */}
        <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 80 80" fill="none">
            {/* Outer Rink Boundary */}
            <rect
              x="8"
              y="16"
              width="64"
              height="48"
              rx="18"
              stroke="#7794A8"
              strokeWidth="2.5"
              className="animate-pulse"
            />
            {/* Center Ice Red/Blue Line */}
            <line x1="40" y1="16" x2="40" y2="64" stroke="#E9F1F5" strokeWidth="2" strokeDasharray="3 3" />
            {/* Faceoff Circles */}
            <circle cx="24" cy="40" r="7" stroke="#7794A8" strokeWidth="1.5" strokeOpacity="0.6" />
            <circle cx="56" cy="40" r="7" stroke="#7794A8" strokeWidth="1.5" strokeOpacity="0.6" />
            {/* Center Ice Dot & Circle */}
            <circle cx="40" cy="40" r="9" stroke="#B99762" strokeWidth="2" fill="none" />
            <circle cx="40" cy="40" r="2.5" fill="#B99762" />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl font-bold tracking-wider uppercase text-white font-ui">RINK REVIEW</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded bg-muted-amber/20 text-muted-amber border border-muted-amber/30">
            Beta
          </span>
        </div>

        <p className="text-xs text-ice-200 tracking-wide font-light mb-8">
          Bringing the community together.
        </p>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-navy-800 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-muted-blue via-ice-200 to-muted-amber transition-all duration-200 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <span className="text-[11px] text-slate-brand font-mono">Loading sports intelligence...</span>
      </div>
    </div>
  );
};
