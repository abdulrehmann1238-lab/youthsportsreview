import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDemoData } from '../context/DemoDataContext';
import { useDemoAuth } from '../context/DemoAuthContext';
import { ContactProviderModal } from '../components/modals/ContactProviderModal';
import { MarketplaceCard } from '../components/cards/MarketplaceCard';
import { PremiumLock } from '../components/common/PremiumLock';
import { SafeImage } from '../components/common/SafeImage';
import {
  MapPin,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Building2,
  Lock,
  ArrowLeft,
  Share2,
} from 'lucide-react';

export const ListingDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getListingBySlug, listings } = useDemoData();
  const { isFree, setRole } = useDemoAuth();

  const [contactModalOpen, setContactModalOpen] = useState(false);

  const listing = getListingBySlug(slug || 'elite-goalie-development-camp');

  if (!listing) {
    return (
      <div className="min-h-screen bg-warm-50 pt-32 pb-20 text-center px-4">
        <h2 className="text-2xl font-bold text-navy-900 font-display">Listing Not Found</h2>
        <p className="text-xs text-slate-brand mt-2 mb-6">The requested marketplace listing could not be found.</p>
        <Link to="/marketplace" className="px-5 py-2.5 rounded-xl bg-navy-900 text-white font-semibold text-xs">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const isLocked = listing.isPremiumOnly && isFree;

  // Related listings
  const relatedListings = listings
    .filter((l) => l.id !== listing.id && (l.category === listing.category || l.sport === listing.sport))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-warm-50 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-brand hover:text-navy-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </Link>
        </div>

        {/* Main Listing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Image & Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Image Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-navy-950 h-72 sm:h-96 shadow-elevated">
              <SafeImage
                src={listing.image}
                alt={listing.title}
                fallbackType="sports"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-navy-900/80 backdrop-blur-md text-white border border-white/20">
                  {listing.category}
                </span>
                {listing.featured && (
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-muted-amber text-white shadow-subtle flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-6">
              <div>
                <h2 className="text-xl font-bold text-navy-900 font-display mb-2">Program Overview</h2>
                <p className="text-xs sm:text-sm text-slate-brand leading-relaxed font-light">
                  {listing.description}
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-navy-900 font-display mb-3">
                  Included Features & Curriculum
                </h3>
                <div className="space-y-2.5">
                  {listing.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-brand">
                      <div className="w-4 h-4 rounded-full bg-muted-green/20 text-muted-green flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className="font-medium text-navy-900 leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Inquiry Card */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-elevated space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-brand mb-1">
                  <span>{listing.category}</span>
                  <span className="text-slate-muted">{listing.sport}</span>
                </div>
                <h1 className="text-2xl font-bold text-navy-900 font-display">{listing.title}</h1>
                <div className="flex items-center gap-1.5 text-xs text-slate-brand mt-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-muted flex-shrink-0" />
                  <span>{listing.location}</span>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-muted block">Direct Price:</span>
                  <span className="text-3xl font-black text-navy-900 font-mono tracking-tight">
                    {listing.price}
                  </span>
                </div>
                <span className="text-[11px] text-muted-green font-semibold">Community Verified Rate</span>
              </div>

              {/* Provider Info */}
              <div className="p-4 rounded-2xl bg-ice-50/70 border border-ice-200 space-y-2 text-xs">
                <span className="text-[10px] uppercase font-bold text-muted-blue tracking-wider block">
                  Offered By:
                </span>
                <p className="font-bold text-navy-900 text-sm">{listing.provider}</p>
                <div className="space-y-1 text-slate-brand text-[11px]">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-slate-muted" />
                    <span>{listing.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-slate-muted" />
                    <span>{listing.contactPhone}</span>
                  </div>
                </div>
                {listing.orgSlug && (
                  <Link
                    to={`/organizations/${listing.orgSlug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-navy-900 hover:underline pt-1"
                  >
                    <span>View Academy Profile & Community Reviews</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>

              {/* Gating Check if Premium Only */}
              {isLocked ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-muted-amber/10 border border-muted-amber/30 text-center text-xs">
                    <Lock className="w-5 h-5 text-muted-amber mx-auto mb-1.5" />
                    <p className="font-bold text-navy-900">Premium Exclusive Listing</p>
                    <p className="text-[11px] text-slate-brand mt-0.5">
                      Direct booking for this bundle is reserved for Premium Members.
                    </p>
                  </div>
                  <button
                    onClick={() => setRole('premium')}
                    className="w-full py-3 rounded-xl bg-muted-amber text-white font-bold text-xs hover:bg-amber-700 transition-colors shadow-subtle flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" /> Quick Unlock via Premium (Demo)
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => setContactModalOpen(true)}
                    className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs transition-colors shadow-subtle flex items-center justify-center gap-2"
                  >
                    <span>Contact Provider & Register</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[11px] text-slate-muted text-center">
                    Instant simulated inquiry dispatch to coach/registrar.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Listings Section */}
        {relatedListings.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-navy-900 font-display">Similar Programs & Offerings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedListings.map((rel) => (
                <MarketplaceCard key={rel.id} listing={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      <ContactProviderModal
        listing={listing}
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
};
