import React from 'react';
import { Link } from 'react-router-dom';
import { Organization } from '../../types';
import { Star, MapPin, Bookmark, CheckCircle2, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import { SafeImage } from '../common/SafeImage';

interface OrganizationCardProps {
  organization: Organization;
  variant?: 'grid' | 'list';
}

export const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organization,
  variant = 'grid',
}) => {
  const { toggleSaveOrg, isOrgSaved } = useDemoData();
  const { success, info } = useToast();
  const saved = isOrgSaved(organization.id);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveOrg(organization.id);
    if (!saved) {
      success('Program Saved', `${organization.name} added to your Saved Programs dashboard.`);
    } else {
      info('Program Removed', `${organization.name} removed from your saved list.`);
    }
  };

  if (variant === 'list') {
    return (
      <div className="group relative bg-white rounded-2xl border border-warm-200 hover:border-slate-muted/40 shadow-subtle hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
        {/* Thumbnail */}
        <div className="relative md:w-72 h-52 md:h-auto overflow-hidden bg-navy-950 flex-shrink-0">
          <SafeImage
            src={organization.heroImage}
            alt={organization.name}
            fallbackType="rink"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent md:hidden" />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-navy-900/80 backdrop-blur-md text-white border border-white/20">
              {organization.sport}
            </span>
            {organization.featured && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted-amber text-white shadow-subtle flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Featured
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={handleToggleSave}
            className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors ${
              saved
                ? 'bg-navy-900 text-muted-amber'
                : 'bg-white/80 hover:bg-white text-navy-900'
            }`}
            aria-label="Save organization"
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-muted-amber' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold text-muted-blue">{organization.category}</span>
              <div className="flex items-center gap-1.5">
                {organization.claimed ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-green bg-muted-green/10 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Claimed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-muted bg-warm-100 px-2 py-0.5 rounded-full">
                    Unclaimed
                  </span>
                )}
              </div>
            </div>

            <Link
              to={`/organizations/${organization.slug}`}
              className="text-lg font-bold text-navy-900 hover:text-navy-700 transition-colors block font-display mb-1.5"
            >
              {organization.name}
            </Link>

            <div className="flex items-center gap-1.5 text-xs text-slate-brand mb-3">
              <MapPin className="w-3.5 h-3.5 text-slate-muted flex-shrink-0" />
              <span>{organization.location.city}, {organization.location.state}</span>
            </div>

            <p className="text-xs text-slate-brand line-clamp-2 leading-relaxed mb-4">
              {organization.description}
            </p>
          </div>

          {/* Footer stats */}
          <div className="pt-4 border-t border-warm-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-muted-amber text-muted-amber" />
                <span className="text-sm font-bold text-navy-900 font-mono">{organization.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-slate-muted">({organization.reviewCount} reviews)</span>
              {organization.priceRange && (
                <span className="hidden sm:inline-block text-xs text-slate-brand font-medium">
                  • {organization.priceRange}
                </span>
              )}
            </div>

            <Link
              to={`/organizations/${organization.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-navy-900 group-hover:text-muted-blue transition-colors"
            >
              <span>View Profile</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white rounded-2xl border border-warm-200 hover:border-slate-muted/40 shadow-subtle hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Top Image Banner */}
      <div className="relative h-48 overflow-hidden bg-navy-950">
        <SafeImage
          src={organization.heroImage}
          alt={organization.name}
          fallbackType="rink"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-navy-900/80 backdrop-blur-md text-white border border-white/20">
            {organization.sport}
          </span>
          {organization.featured && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted-amber text-white shadow-subtle flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={handleToggleSave}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors z-10 ${
            saved
              ? 'bg-navy-900 text-muted-amber shadow-subtle'
              : 'bg-white/85 hover:bg-white text-navy-900 shadow-subtle'
          }`}
          aria-label="Save organization"
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-muted-amber' : ''}`} />
        </button>

        {/* Category & Status Overlay on bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="font-semibold px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm text-[11px]">
            {organization.category}
          </span>
          {organization.claimed ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-white bg-muted-green/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Claimed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-white/90 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
              Unclaimed
            </span>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link
            to={`/organizations/${organization.slug}`}
            className="text-base sm:text-lg font-bold text-navy-900 hover:text-navy-700 transition-colors block font-display mb-1 leading-snug"
          >
            {organization.name}
          </Link>

          <div className="flex items-center gap-1 text-xs text-slate-brand mb-2.5">
            <MapPin className="w-3.5 h-3.5 text-slate-muted flex-shrink-0" />
            <span>{organization.location.city}, {organization.location.state}</span>
          </div>

          <p className="text-xs text-slate-brand line-clamp-2 leading-relaxed mb-4">
            {organization.description}
          </p>
        </div>

        {/* Ratings Footer */}
        <div className="pt-3 border-t border-warm-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-muted-amber text-muted-amber" />
              <span className="text-sm font-bold text-navy-900 font-mono">{organization.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-slate-muted">({organization.reviewCount})</span>
          </div>

          <Link
            to={`/organizations/${organization.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-navy-900 group-hover:text-muted-blue transition-colors"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
