import React from 'react';
import { Link } from 'react-router-dom';
import { MarketplaceListing } from '../../types';
import { MapPin, Sparkles, Lock, ArrowRight, Tag } from 'lucide-react';
import { useDemoAuth } from '../../context/DemoAuthContext';
import { SafeImage } from '../common/SafeImage';

interface MarketplaceCardProps {
  listing: MarketplaceListing;
  onQuickInquire?: (listing: MarketplaceListing) => void;
}

export const MarketplaceCard: React.FC<MarketplaceCardProps> = ({
  listing,
  onQuickInquire,
}) => {
  const { isFree } = useDemoAuth();
  const isLocked = listing.isPremiumOnly && isFree;

  return (
    <div className="group relative bg-white rounded-2xl border border-warm-200 hover:border-slate-muted/40 shadow-subtle hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Listing Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-navy-950">
        <SafeImage
          src={listing.image}
          alt={listing.title}
          fallbackType="sports"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-navy-900/80 backdrop-blur-md text-white border border-white/20">
            {listing.category}
          </span>
          {listing.featured && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted-amber text-white shadow-subtle flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
        </div>

        {/* Price Tag Pill */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-navy-900 font-bold text-xs font-mono shadow-subtle border border-warm-200">
            {listing.price}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-brand mb-1.5">
            <span className="font-semibold text-navy-800">{listing.provider}</span>
            <span>•</span>
            <span className="flex items-center gap-0.5 text-slate-muted">
              <MapPin className="w-3 h-3" /> {listing.location}
            </span>
          </div>

          <Link
            to={`/marketplace/${listing.slug}`}
            className="text-base font-bold text-navy-900 hover:text-navy-700 transition-colors block font-display mb-2 leading-snug"
          >
            {listing.title}
          </Link>

          <p className="text-xs text-slate-brand line-clamp-2 leading-relaxed mb-4">
            {listing.description}
          </p>

          {/* Highlights */}
          <div className="space-y-1 mb-4">
            {listing.features.slice(0, 2).map((feat, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-brand">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-blue flex-shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-warm-200 flex items-center justify-between gap-2">
          {isLocked ? (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-muted-amber">
              <Lock className="w-3 h-3" />
              <span>Premium Tier Listing</span>
            </div>
          ) : (
            <span className="text-[11px] font-medium text-slate-muted">Direct community booking</span>
          )}

          <div className="flex items-center gap-2">
            {onQuickInquire && (
              <button
                onClick={() => onQuickInquire(listing)}
                className="px-3 py-1.5 rounded-lg border border-warm-200 hover:border-slate-muted/40 bg-warm-50 hover:bg-warm-100 text-navy-900 text-xs font-semibold transition-colors"
              >
                Inquire
              </button>
            )}
            <Link
              to={`/marketplace/${listing.slug}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold transition-colors"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
