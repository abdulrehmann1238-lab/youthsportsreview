import React, { useState } from 'react';
import { Review } from '../../types';
import { useDemoAuth } from '../../context/DemoAuthContext';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import { Star, ThumbsUp, Flag, ShieldCheck, Lock, Sparkles, Building2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReviewCardProps {
  review: Review;
  showOrgLink?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, showOrgLink = false }) => {
  const { isFree, isPremium, setRole } = useDemoAuth();
  const { markReviewHelpful } = useDemoData();
  const { success, info } = useToast();
  const [hasVotedHelpful, setHasVotedHelpful] = useState(false);
  const [isReported, setIsReported] = useState(false);

  const isLocked = review.isPremiumOnly && isFree;

  const handleHelpful = () => {
    if (hasVotedHelpful) return;
    markReviewHelpful(review.id);
    setHasVotedHelpful(true);
    success('Thank you!', 'Your feedback helps the youth sports community.');
  };

  const handleReport = () => {
    if (isReported) return;
    setIsReported(true);
    info('Report Submitted', 'Our moderation team will review this submission against community guidelines.');
  };

  return (
    <div className="bg-white rounded-2xl border border-warm-200 p-6 shadow-subtle hover:border-slate-muted/30 transition-all">
      {/* Top Author Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-warm-200">
        <div className="flex items-center gap-3">
          {/* Anonymous Avatar */}
          <div className="w-10 h-10 rounded-xl bg-ice-100 border border-ice-200 flex items-center justify-center text-navy-800 font-mono font-bold text-xs">
            {review.authorAnonymousId.slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-navy-900">{review.authorAnonymousId}</span>
              <span className="text-[10px] bg-warm-100 text-slate-brand px-2 py-0.5 rounded-full font-medium border border-warm-200">
                {review.authorRole}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-muted mt-0.5">
              <span>{review.sport}</span>
              <span>•</span>
              <span>{review.date}</span>
              {review.status === 'Pending Moderation' && (
                <>
                  <span>•</span>
                  <span className="text-muted-amber font-semibold">Pending Moderation</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-muted-amber">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(review.rating)
                    ? 'fill-muted-amber text-muted-amber'
                    : 'text-warm-200 fill-warm-100'
                }`}
              />
            ))}
          </div>
          <span className="font-mono font-bold text-sm text-navy-900">{review.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Organization Header Link if requested */}
      {showOrgLink && (
        <div className="pt-3 pb-1">
          <Link
            to={`/organizations/${review.orgSlug}`}
            className="text-xs font-semibold text-muted-blue hover:text-navy-900 transition-colors inline-flex items-center gap-1"
          >
            Reviewing: <span className="underline">{review.orgName}</span>
          </Link>
        </div>
      )}

      {/* Review Content */}
      <div className="py-4">
        <h4 className="text-base font-bold text-navy-900 font-display mb-2">{review.title}</h4>

        {isLocked ? (
          /* Locked Content for Free Member */
          <div className="relative">
            <p className="text-xs text-slate-brand leading-relaxed line-clamp-2 filter blur-[1px] select-none opacity-60">
              {review.excerpt}
            </p>
            {/* Lock Card Overlay */}
            <div className="mt-3 p-4 rounded-xl border border-muted-amber/30 bg-gradient-to-r from-warm-50 to-ice-50/70 text-center">
              <div className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-muted-amber mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Full Review Locked for Free Members</span>
              </div>
              <p className="text-[11px] text-slate-brand mb-2 max-w-sm mx-auto">
                Upgrade to Premium to read complete community reviews, detailed pros & cons, and verified coach notes.
              </p>
              <div className="flex items-center justify-center gap-2">
                <Link
                  to="/membership"
                  className="px-3 py-1 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
                >
                  View Membership
                </Link>
                <button
                  onClick={() => {
                    setRole('premium');
                    success('Unlocked!', 'Switched to Premium Member demo perspective.');
                  }}
                  className="px-3 py-1 rounded-lg bg-muted-amber text-white text-xs font-semibold hover:bg-amber-700 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Quick Unlock (Demo)
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Unlocked Full Content */
          <>
            <p className="text-xs sm:text-sm text-slate-brand leading-relaxed mb-4">
              {review.content}
            </p>

            {/* Pros & Cons */}
            {(review.pros || review.cons) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-warm-50 rounded-xl border border-warm-200 mb-4 text-xs">
                {review.pros && (
                  <div>
                    <span className="font-bold text-muted-green block mb-0.5">Key Positives:</span>
                    <p className="text-slate-brand leading-normal">{review.pros}</p>
                  </div>
                )}
                {review.cons && (
                  <div>
                    <span className="font-bold text-slate-brand block mb-0.5">Areas for Consideration:</span>
                    <p className="text-slate-brand leading-normal">{review.cons}</p>
                  </div>
                )}
              </div>
            )}

            {/* Category Sub-scores Pill Grid */}
            <div className="flex flex-wrap gap-2 pt-1 pb-3">
              <span className="text-[11px] font-medium text-slate-muted self-center">Pillar Scores:</span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-warm-100 text-navy-900 font-medium">
                Coaching: <strong className="font-mono">{review.categoryScores.coaching}/5</strong>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-warm-100 text-navy-900 font-medium">
                Development: <strong className="font-mono">{review.categoryScores.development}/5</strong>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-warm-100 text-navy-900 font-medium">
                Communication: <strong className="font-mono">{review.categoryScores.communication}/5</strong>
              </span>
            </div>
          </>
        )}
      </div>

      {/* Official Organization Response if present */}
      {review.organizationResponse && !isLocked && (
        <div className="mt-2 mb-4 p-4 rounded-xl bg-ice-50 border border-ice-200 text-xs">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-navy-900">
              <Building2 className="w-4 h-4 text-muted-blue" />
              <span>Official Organization Response</span>
            </div>
            <span className="text-[11px] text-slate-muted">{review.organizationResponse.date}</span>
          </div>
          <p className="text-slate-brand leading-relaxed">{review.organizationResponse.content}</p>
          <span className="block mt-2 text-[10px] text-slate-muted font-medium">
            — {review.organizationResponse.author}, {review.organizationResponse.role}
          </span>
        </div>
      )}

      {/* Footer: Helpful & Report */}
      <div className="pt-3 border-t border-warm-200 flex items-center justify-between text-xs text-slate-muted">
        <div className="flex items-center gap-2">
          <button
            onClick={handleHelpful}
            disabled={hasVotedHelpful}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
              hasVotedHelpful
                ? 'bg-muted-green/10 text-muted-green border-muted-green/30 cursor-default'
                : 'hover:bg-warm-100 text-slate-brand border-warm-200'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${hasVotedHelpful ? 'fill-muted-green' : ''}`} />
            <span>Helpful ({review.helpfulCount})</span>
          </button>

          <button
            onClick={handleReport}
            disabled={isReported}
            className="flex items-center gap-1 px-2 py-1 text-slate-muted hover:text-red-500 rounded transition-colors text-[11px]"
          >
            <Flag className="w-3 h-3" />
            <span>{isReported ? 'Reported' : 'Report'}</span>
          </button>
        </div>

        <span className="text-[11px] text-slate-muted hidden sm:inline-block">
          Anonymous community review • Verified family
        </span>
      </div>
    </div>
  );
};
