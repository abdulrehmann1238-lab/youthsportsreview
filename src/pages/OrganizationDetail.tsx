import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDemoData } from '../context/DemoDataContext';
import { useDemoAuth } from '../context/DemoAuthContext';
import { useToast } from '../context/ToastContext';
import { ReviewCard } from '../components/cards/ReviewCard';
import { MarketplaceCard } from '../components/cards/MarketplaceCard';
import { WeightedScoreBreakdown } from '../components/common/WeightedScoreBreakdown';
import { ClaimProfileModal } from '../components/modals/ClaimProfileModal';
import { ContactProviderModal } from '../components/modals/ContactProviderModal';
import { SafeImage } from '../components/common/SafeImage';
import { MarketplaceListing } from '../types';
import {
  Star,
  MapPin,
  Globe,
  Phone,
  Mail,
  CheckCircle2,
  Bookmark,
  Share2,
  PenLine,
  Building2,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Clock,
  Layers,
  Award,
  Users,
} from 'lucide-react';

export const OrganizationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getOrganizationBySlug, getReviewsByOrgSlug, listings, toggleSaveOrg, isOrgSaved } = useDemoData();
  const { isFree, isPremium, role } = useDemoAuth();
  const { success, info } = useToast();

  const organization = getOrganizationBySlug(slug || 'northstar-hockey-academy');
  const orgReviews = getReviewsByOrgSlug(slug || 'northstar-hockey-academy');

  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'ratings' | 'marketplace' | 'about'>('overview');
  const [reviewSort, setReviewSort] = useState<'recent' | 'highest' | 'lowest' | 'helpful'>('recent');
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [inquireListing, setInquireListing] = useState<MarketplaceListing | null>(null);

  if (!organization) {
    return (
      <div className="min-h-screen bg-warm-50 pt-32 pb-20 text-center px-4">
        <h2 className="text-2xl font-bold text-navy-900 font-display">Organization Not Found</h2>
        <p className="text-xs text-slate-brand mt-2 mb-6">The requested sports organization could not be located.</p>
        <Link to="/discover" className="px-5 py-2.5 rounded-xl bg-navy-900 text-white font-semibold text-xs">
          Return to Program Directory
        </Link>
      </div>
    );
  }

  const saved = isOrgSaved(organization.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    success('Link Copied', 'Organization URL copied to clipboard.');
  };

  // Filter listings associated with this org
  const orgListings = listings.filter((l) => l.orgSlug === organization.slug);

  // Sorted reviews
  const sortedReviews = [...orgReviews].sort((a, b) => {
    if (reviewSort === 'highest') return b.rating - a.rating;
    if (reviewSort === 'lowest') return a.rating - b.rating;
    if (reviewSort === 'helpful') return b.helpfulCount - a.helpfulCount;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="min-h-screen bg-warm-50 pt-20 pb-20">
      {/* Hero Banner Container */}
      <div className="relative h-64 sm:h-80 lg:h-96 w-full bg-navy-950 overflow-hidden">
        <SafeImage
          src={organization.heroImage}
          alt={organization.name}
          fallbackType="rink"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

        {/* Action Buttons on Banner */}
        <div className="absolute top-6 right-4 sm:right-8 flex items-center gap-2 z-10">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-navy-900/80 hover:bg-navy-900 text-white backdrop-blur-md transition-colors border border-white/20 shadow-subtle"
            title="Share Profile"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              toggleSaveOrg(organization.id);
              if (!saved) success('Program Saved', `${organization.name} saved to your dashboard.`);
              else info('Program Removed', `${organization.name} removed from saved programs.`);
            }}
            className={`p-2.5 rounded-xl backdrop-blur-md transition-colors border shadow-subtle ${
              saved
                ? 'bg-navy-900 text-muted-amber border-muted-amber/40'
                : 'bg-navy-900/80 hover:bg-navy-900 text-white border-white/20'
            }`}
            title="Bookmark Program"
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-muted-amber' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content Container with Overlapping Header Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-20">
        {/* Header Profile Card */}
        <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-elevated mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* Logo Box */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-navy-900 border-2 border-white shadow-elevated overflow-hidden flex-shrink-0 flex items-center justify-center text-white">
                <SafeImage
                  src={organization.logoImage}
                  alt={organization.name}
                  fallbackType="logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-ice-100 text-navy-900 border border-ice-200">
                    {organization.sport}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-warm-100 text-slate-brand">
                    {organization.category}
                  </span>
                  {organization.claimed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted-green/15 text-muted-green border border-muted-green/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Claimed & Verified Profile
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-warm-100 text-slate-muted border border-warm-200">
                      Unclaimed Program
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 font-display">
                  {organization.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-brand mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-muted" />
                    {organization.location.address}
                  </span>
                  <span>•</span>
                  <span>Est. {organization.foundedYear}</span>
                </div>
              </div>
            </div>

            {/* CTAs and Ratings Box */}
            <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-3 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-muted-amber">
                  <Star className="w-5 h-5 fill-muted-amber text-muted-amber" />
                  <span className="text-2xl font-black text-navy-900 font-mono tracking-tight">
                    {organization.rating.toFixed(1)}
                  </span>
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-navy-900">
                    {organization.reviewCount} community reviews
                  </span>
                  <span className="text-[10px] text-slate-muted">Standard unweighted avg</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                {!organization.claimed && (
                  <button
                    onClick={() => setClaimModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-warm-100 hover:bg-warm-200 text-navy-900 text-xs font-bold transition-colors border border-warm-200 shadow-subtle flex items-center gap-1.5"
                  >
                    <Building2 className="w-3.5 h-3.5 text-muted-amber" />
                    <span>Claim This Profile</span>
                  </button>
                )}

                <Link
                  to={`/write-review?org=${organization.slug}`}
                  className="px-5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition-colors shadow-subtle flex items-center gap-1.5"
                >
                  <PenLine className="w-3.5 h-3.5" />
                  <span>Write a Review</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Tabs Bar */}
          <div className="flex items-center gap-2 sm:gap-4 border-t border-warm-200 mt-8 pt-4 overflow-x-auto no-scrollbar">
            {(
              [
                { key: 'overview', label: 'Overview' },
                { key: 'reviews', label: `Reviews (${orgReviews.length})` },
                { key: 'ratings', label: 'Rating Analytics & Weights' },
                { key: 'marketplace', label: `Marketplace (${orgListings.length})` },
                { key: 'about', label: 'Facility & Details' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? 'bg-navy-900 text-white shadow-subtle'
                    : 'text-slate-brand hover:text-navy-900 hover:bg-warm-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              {/* Introduction Card */}
              <div className="bg-white rounded-2xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-4">
                <h3 className="text-xl font-bold text-navy-900 font-display">Program Philosophy & Mission</h3>
                <p className="text-sm text-slate-brand leading-relaxed font-light">{organization.description}</p>
                <div className="p-4 bg-warm-50 rounded-xl border border-warm-200">
                  <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                    Development Focus
                  </h4>
                  <p className="text-xs text-slate-brand leading-relaxed">{organization.developmentFocus}</p>
                </div>
              </div>

              {/* Highlights Checklist */}
              <div className="bg-white rounded-2xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-4">
                <h3 className="text-lg font-bold text-navy-900 font-display">Key Program Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {organization.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-brand">
                      <div className="w-4 h-4 rounded-full bg-muted-green/20 text-muted-green flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-relaxed font-medium text-navy-900">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Community Review Teaser */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-navy-900 font-display">Latest Community Review</h3>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="text-xs font-semibold text-muted-blue hover:text-navy-900 flex items-center gap-1"
                  >
                    View all {orgReviews.length} reviews <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                {orgReviews[0] && <ReviewCard review={orgReviews[0]} />}
              </div>
            </div>

            {/* Right Column: Contact & Quick Meta */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl border border-warm-200 p-6 shadow-subtle space-y-4">
                <h4 className="text-sm font-bold text-navy-900 uppercase tracking-wider font-mono">
                  Program Information
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-brand">
                    <Globe className="w-4 h-4 text-slate-muted flex-shrink-0" />
                    <a
                      href={organization.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-navy-900 hover:underline truncate"
                    >
                      {organization.website.replace('https://', '')}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-brand">
                    <Mail className="w-4 h-4 text-slate-muted flex-shrink-0" />
                    <a href={`mailto:${organization.email}`} className="text-navy-900 hover:underline">
                      {organization.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-brand">
                    <Phone className="w-4 h-4 text-slate-muted flex-shrink-0" />
                    <span className="text-navy-900">{organization.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-brand">
                    <Layers className="w-4 h-4 text-slate-muted flex-shrink-0" />
                    <span>Tuition / Fees: <strong>{organization.priceRange}</strong></span>
                  </div>
                </div>

                {!organization.claimed && (
                  <div className="pt-4 border-t border-warm-200">
                    <p className="text-[11px] text-slate-muted mb-2">
                      Are you a director or head coach for {organization.name}?
                    </p>
                    <button
                      onClick={() => setClaimModalOpen(true)}
                      className="w-full py-2.5 rounded-xl bg-warm-100 hover:bg-warm-200 text-navy-900 text-xs font-bold transition-colors border border-warm-200"
                    >
                      Claim This Profile
                    </button>
                  </div>
                )}
              </div>

              {/* Weighted Score Teaser Card */}
              <div className="bg-gradient-to-br from-ice-50 to-warm-100 rounded-2xl border border-ice-200 p-6 shadow-subtle">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-amber flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Weighted Score
                  </span>
                  <span className="text-lg font-black text-navy-900 font-mono">
                    {organization.weightedScore.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-slate-brand leading-relaxed mb-4">
                  Community feedback synthesized across coaching, development, and transparency.
                </p>
                <button
                  onClick={() => setActiveTab('ratings')}
                  className="w-full py-2 rounded-xl bg-navy-900 text-white font-semibold text-xs hover:bg-navy-800 transition-colors"
                >
                  Inspect Weighted Breakdown
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Reviews Header & Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-warm-200 shadow-subtle">
              <div>
                <h3 className="text-lg font-bold text-navy-900 font-display">
                  Community Feedback ({orgReviews.length} Reviews)
                </h3>
                <p className="text-xs text-slate-brand">
                  All reviews submitted under anonymous parent & player identities.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-muted">Sort:</span>
                <select
                  value={reviewSort}
                  onChange={(e) => setReviewSort(e.target.value as any)}
                  className="px-3 py-1.5 rounded-xl border border-warm-200 bg-warm-50 text-xs font-semibold text-navy-900 focus:outline-none"
                >
                  <option value="recent">Most Recent</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                  <option value="helpful">Most Helpful</option>
                </select>

                <Link
                  to={`/write-review?org=${organization.slug}`}
                  className="px-4 py-1.5 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 transition-colors shadow-subtle"
                >
                  Write Review
                </Link>
              </div>
            </div>

            {/* List of Reviews */}
            <div className="space-y-4">
              {sortedReviews.map((rev) => (
                <ReviewCard key={rev.id} review={rev} />
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: RATINGS & WEIGHTED ANALYTICS */}
        {activeTab === 'ratings' && (
          <WeightedScoreBreakdown
            categoryRatings={organization.categoryRatings}
            ratingDistribution={organization.ratingDistribution}
            standardRating={organization.rating}
            reviewCount={organization.reviewCount}
            weightedScore={organization.weightedScore}
            orgName={organization.name}
          />
        )}

        {/* Tab 4: MARKETPLACE */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-navy-900 font-display">
                  Listings & Camps Offered by {organization.name}
                </h3>
                <p className="text-xs text-slate-brand">
                  Official clinics, camps, and development opportunities offered through the Rink Review marketplace.
                </p>
              </div>
            </div>

            {orgListings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-warm-200 p-12 text-center shadow-subtle">
                <p className="text-xs text-slate-brand">
                  No active marketplace listings currently published for this program.
                </p>
                <Link
                  to="/marketplace"
                  className="mt-3 inline-block text-xs font-bold text-navy-900 underline"
                >
                  Browse all marketplace listings
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {orgListings.map((lst) => (
                  <MarketplaceCard
                    key={lst.id}
                    listing={lst}
                    onQuickInquire={(item) => setInquireListing(item)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: ABOUT */}
        {activeTab === 'about' && (
          <div className="bg-white rounded-2xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-6">
            <h3 className="text-xl font-bold text-navy-900 font-display">Facility & Governance Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-brand">
              <div className="space-y-3">
                <h4 className="font-bold text-navy-900 text-sm">Rink Specifications</h4>
                <p className="leading-relaxed">
                  Northstar Hockey Academy operates out of a twin-sheet NHL standard refrigerated indoor arena featuring full board safety flex systems, heated spectator seating, and 8 dedicated team locker rooms.
                </p>
                <div className="p-3 bg-warm-50 rounded-xl border border-warm-200 space-y-1">
                  <div>• Rink 1: 200' x 85' NHL Standard, 1,200 spectator capacity</div>
                  <div>• Rink 2: 200' x 85' NHL Standard with video coaching gantry</div>
                  <div>• Dryland Training Facility: 4,500 sq ft synthetic shooting & weights</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-navy-900 text-sm">Coaching Accreditation</h4>
                <p className="leading-relaxed">
                  All head coaching staff maintain current USA Hockey Level 4 or Level 5 coaching certifications, complete SafeSport background checks, and hold CPR/First Aid training.
                </p>
                <div className="p-3 bg-warm-50 rounded-xl border border-warm-200 space-y-1">
                  <div>• SafeSport compliance: 100% verified</div>
                  <div>• Concussion baseline testing: Mandatory pre-season protocol</div>
                  <div>• Coach-to-player ratio: Average 1:6 on ice</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Claim Profile Modal */}
      <ClaimProfileModal
        organization={organization}
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        onSuccess={() => setClaimModalOpen(false)}
      />

      {/* Contact Provider Modal */}
      <ContactProviderModal
        listing={inquireListing}
        isOpen={!!inquireListing}
        onClose={() => setInquireListing(null)}
      />
    </div>
  );
};
