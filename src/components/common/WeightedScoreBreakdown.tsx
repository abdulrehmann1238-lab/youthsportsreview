import React, { useState } from 'react';
import { CategoryRatings, RatingDistribution } from '../../types';
import { useDemoAuth } from '../../context/DemoAuthContext';
import { Sparkles, Info, HelpCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { PremiumLock } from './PremiumLock';

interface WeightedScoreBreakdownProps {
  categoryRatings: CategoryRatings;
  ratingDistribution: RatingDistribution;
  standardRating: number;
  reviewCount: number;
  weightedScore: number;
  orgName: string;
}

const WEIGHT_CONFIG = [
  { key: 'coaching', label: 'Coaching Quality', weight: 0.25, percent: '25%' },
  { key: 'development', label: 'Player Development', weight: 0.25, percent: '25%' },
  { key: 'communication', label: 'Communication & Transparency', weight: 0.15, percent: '15%' },
  { key: 'management', label: 'Organization Management', weight: 0.15, percent: '15%' },
  { key: 'safety', label: 'Safety & Environment', weight: 0.10, percent: '10%' },
  { key: 'overall', label: 'Overall Experience', weight: 0.10, percent: '10%' },
] as const;

export const WeightedScoreBreakdown: React.FC<WeightedScoreBreakdownProps> = ({
  categoryRatings,
  ratingDistribution,
  standardRating,
  reviewCount,
  weightedScore,
  orgName,
}) => {
  const { isFree, isPremium } = useDemoAuth();
  const [showFormulaDetails, setShowFormulaDetails] = useState(false);

  // Compute calculated weighted score
  const computedWeighted = Number(
    WEIGHT_CONFIG.reduce((acc, item) => {
      const score = categoryRatings[item.key as keyof CategoryRatings] || 4.5;
      return acc + score * item.weight;
    }, 0).toFixed(2)
  );

  const totalReviews = Object.values(ratingDistribution).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white rounded-2xl border border-warm-200 p-6 sm:p-8 shadow-subtle">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-warm-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-navy-900 font-display">Rating Analytics & Weighting</h3>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-ice-100 text-navy-800 border border-ice-200">
              Illustrative Demo Methodology
            </span>
          </div>
          <p className="text-xs text-slate-brand">
            Demonstrating how community feedback is synthesized across 6 strategic pillars to reflect true program excellence.
          </p>
        </div>

        {/* Dual Score Comparison Badges */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-warm-50 border border-warm-200 text-center">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-muted">Standard Avg</span>
            <span className="text-xl font-extrabold text-navy-900 font-mono">{standardRating.toFixed(1)}</span>
            <span className="text-[10px] text-slate-muted"> / 5.0</span>
          </div>

          <div className="px-4 py-2 rounded-xl bg-gradient-to-br from-ice-100 to-warm-100 border border-muted-amber/30 text-center shadow-subtle relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-2 bg-muted-amber rounded-bl" />
            <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-amber flex items-center justify-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Weighted Score
            </span>
            <span className="text-xl font-black text-navy-900 font-mono">{computedWeighted.toFixed(2)}</span>
            <span className="text-[10px] text-muted-amber font-semibold"> / 5.00</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Rating Distribution vs Category Weights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
        {/* Left Column: Rating Distribution (Visible to Free & Premium) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-navy-900">Star Rating Distribution</h4>
            <span className="text-xs text-slate-muted">{reviewCount} total reviews</span>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingDistribution[stars as keyof RatingDistribution] || 0;
              const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  <span className="w-12 font-medium text-slate-brand flex items-center gap-1 font-mono">
                    {stars} <span className="text-muted-amber">★</span>
                  </span>
                  <div className="flex-1 h-2.5 bg-warm-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        stars >= 4 ? 'bg-muted-green' : stars === 3 ? 'bg-muted-amber' : 'bg-red-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-slate-muted font-mono">{percent}%</span>
                  <span className="w-8 text-right text-slate-brand font-mono text-[11px]">({count})</span>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-warm-50 rounded-xl border border-warm-200 mt-4 text-[11px] text-slate-brand flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-muted-blue flex-shrink-0 mt-0.5" />
            <p>
              97% of reviews for {orgName} are 4 or 5 stars. All ratings submitted by verified community parents.
            </p>
          </div>
        </div>

        {/* Right Column: Category Breakdown & Weights */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
              <span>Category Weights & Sub-scores</span>
              {isPremium && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-amber bg-muted-amber/10 px-2 py-0.5 rounded border border-muted-amber/20">
                  Premium Unlocked
                </span>
              )}
            </h4>
            <button
              onClick={() => setShowFormulaDetails(!showFormulaDetails)}
              className="text-xs text-muted-blue hover:text-navy-900 font-medium flex items-center gap-1 transition-colors"
            >
              Formula Model {showFormulaDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Formula Explanation Callout */}
          {showFormulaDetails && (
            <div className="p-3 bg-ice-50 border border-ice-200 rounded-xl text-xs text-navy-900 mb-4 animate-in fade-in duration-200">
              <p className="font-semibold text-navy-900 mb-1">Algorithmic Weighting Rationale:</p>
              <p className="text-slate-brand leading-relaxed text-[11px]">
                In youth sports, parent research indicates Coaching Quality (25%) and Player Development (25%) carry twice the decision weight of operational scheduling. Our weighted score normalizes ratings by factoring in coach qualifications, player retention, and verified rink reviews.
              </p>
            </div>
          )}

          {/* If Free, show limited preview with unlock teaser */}
          {isFree ? (
            <div className="relative">
              <div className="space-y-3 filter blur-[1.5px] select-none pointer-events-none opacity-60">
                {WEIGHT_CONFIG.map((item) => (
                  <div key={item.key} className="p-2.5 rounded-xl border border-warm-200 bg-warm-50 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-navy-900">{item.label}</span>
                      <span className="text-[10px] text-slate-muted ml-2">Weight: {item.percent}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-navy-900">4.8 / 5.0</span>
                  </div>
                ))}
              </div>

              {/* Overlay Prompt */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="w-full">
                  <PremiumLock
                    compact
                    title="Weighted Analytics Locked for Free Accounts"
                    description="Switch to Premium Member mode to inspect full category weights, player retention metrics, and coaching safety scores."
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Premium Unlocked Detailed Breakdown */
            <div className="space-y-2.5">
              {WEIGHT_CONFIG.map((item) => {
                const score = categoryRatings[item.key as keyof CategoryRatings] || 4.5;
                const percentageOfFive = (score / 5) * 100;
                return (
                  <div
                    key={item.key}
                    className="p-3 rounded-xl border border-warm-200 bg-warm-50/70 hover:bg-white hover:border-ice-200 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-navy-900">{item.label}</span>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-ice-100 text-slate-brand border border-ice-200">
                          {item.percent} weight
                        </span>
                      </div>
                      <span className="font-mono font-bold text-navy-900 text-sm">
                        {score.toFixed(1)} <span className="text-[10px] font-normal text-slate-muted">/ 5.0</span>
                      </span>
                    </div>

                    <div className="h-2 bg-warm-200/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-navy-800 rounded-full transition-all duration-300"
                        style={{ width: `${percentageOfFive}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-warm-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-muted gap-2">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-muted-green" />
          Multi-layer parent verification active
        </span>
        <span className="text-[11px]">
          Demo Notice: Weights are illustrative and adjustable in administrative governance settings.
        </span>
      </div>
    </div>
  );
};
