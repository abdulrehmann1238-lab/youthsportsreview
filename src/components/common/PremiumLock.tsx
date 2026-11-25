import React from 'react';
import { Lock, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useDemoAuth } from '../../context/DemoAuthContext';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';

interface PremiumLockProps {
  title?: string;
  description?: string;
  featureList?: string[];
  compact?: boolean;
}

export const PremiumLock: React.FC<PremiumLockProps> = ({
  title = 'Unlock the complete community experience',
  description = 'Get access to full unedited reviews, weighted rating insights, and the complete sports marketplace.',
  featureList = [
    'Read complete eligible community reviews',
    'Access weighted multi-factor rating breakdowns',
    'Full sports marketplace access & direct bookings',
    'Advanced program comparison filters',
  ],
  compact = false,
}) => {
  const { setRole } = useDemoAuth();
  const { success } = useToast();

  const handleSimulateUpgrade = () => {
    setRole('premium');
    success('Unlocked with Demo Premium!', 'You are now viewing complete reviews and weighted analytics.');
  };

  if (compact) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-muted-amber/30 bg-gradient-to-r from-warm-50 via-ice-50 to-warm-100 p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2 text-muted-amber font-semibold text-sm">
          <Lock className="w-4 h-4" />
          <span>Premium Member Insight</span>
        </div>
        <p className="text-xs text-slate-brand mb-3 max-w-md mx-auto">{description}</p>
        <div className="flex items-center justify-center gap-2.5">
          <Link
            to="/membership"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-subtle"
          >
            Explore Membership <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleSimulateUpgrade}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted-amber text-white text-xs font-semibold hover:bg-amber-700 transition-colors shadow-subtle"
          >
            <Sparkles className="w-3.5 h-3.5" /> Instant Demo Unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-muted-amber/30 bg-gradient-to-br from-warm-50 via-ice-100/40 to-warm-100 p-6 sm:p-8 text-navy-900 shadow-subtle">
      {/* Decorative background circle */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-muted-amber/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-muted-amber/15 text-muted-amber mb-4 border border-muted-amber/30">
          <Lock className="w-6 h-6" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-2 font-display">{title}</h3>
        <p className="text-sm text-slate-brand mb-6 leading-relaxed">{description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left mb-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-warm-200">
          {featureList.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-navy-900">
              <div className="w-4 h-4 rounded-full bg-muted-green/20 text-muted-green flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5" />
              </div>
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/membership"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-navy-900 text-white font-semibold text-sm hover:bg-navy-800 transition-colors shadow-subtle text-center"
          >
            Explore Memberships ($9.99/mo)
          </Link>
          <button
            onClick={handleSimulateUpgrade}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-muted-amber text-white font-semibold text-sm hover:bg-amber-700 transition-colors shadow-subtle flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Quick Switch to Premium (Demo)
          </button>
        </div>
        <p className="text-[11px] text-slate-muted mt-3">
          Instant demonstration mode — no real payment card required.
        </p>
      </div>
    </div>
  );
};
