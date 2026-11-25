import React, { useState } from 'react';
import { useDemoData } from '../context/DemoDataContext';
import { useToast } from '../context/ToastContext';
import { Sport } from '../types';
import { SafeImage } from '../components/common/SafeImage';
import {
  Sparkles,
  MapPin,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
  CheckCircle2,
  Building2,
  ArrowRight,
  Star,
  Users,
} from 'lucide-react';

export const Advertising: React.FC = () => {
  const { organizations, activeSport } = useDemoData();
  const { success } = useToast();

  const [selectedOrgId, setSelectedOrgId] = useState(organizations[0]?.id || 'org-1');
  const [targetLocation, setTargetLocation] = useState('Minneapolis, MN');
  const [targetSport, setTargetSport] = useState<Sport>('Hockey');
  const [targetAudience, setTargetAudience] = useState<'Parents & Families' | 'Travel Athletes' | 'Club Coaches'>('Parents & Families');
  const [placementType, setPlacementType] = useState<
    'Featured Discovery Listing' | 'Search Spotlight Card' | 'Marketplace Premier Banner'
  >('Featured Discovery Listing');
  const [durationDays, setDurationDays] = useState(14);
  const [headline, setHeadline] = useState('Train with the region’s top skills coaches this season.');
  const [isCampaignLaunched, setIsCampaignLaunched] = useState(false);

  const activeOrg = organizations.find((o) => o.id === selectedOrgId) || organizations[0];

  // Calculated estimates
  const estimatedWeeklyImpressions = targetLocation === 'Minneapolis, MN' ? 4200 : 3100;
  const estimatedTotalReach = Math.round((estimatedWeeklyImpressions / 7) * durationDays);
  const dailyCost = placementType === 'Featured Discovery Listing' ? 18 : placementType === 'Search Spotlight Card' ? 24 : 14;
  const totalCampaignBudget = dailyCost * durationDays;

  const handleLaunchCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCampaignLaunched(true);
    success('Promotional Campaign Created (Demo)', `Live preview activated for ${activeOrg.name} in ${targetLocation}.`);
  };

  return (
    <div className="min-h-screen bg-warm-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted-amber/20 text-muted-amber border border-muted-amber/30 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Targeted Promotional Suite</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-navy-900 font-display">
            Location-Based Sports Advertising
          </h1>
          <p className="text-sm text-slate-brand mt-3 leading-relaxed">
            Reach active youth sports families at the exact moment they are researching winter programs, spring tryouts, and summer developmental clinics.
          </p>
        </div>

        {/* Interactive Ad Builder & Live Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Targeting Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-warm-200">
              <h2 className="text-lg font-bold text-navy-900 font-display flex items-center gap-2">
                <Target className="w-5 h-5 text-muted-blue" />
                <span>Configure Audience Targeting</span>
              </h2>
              <span className="text-[10px] font-mono font-bold bg-ice-100 text-navy-900 px-2 py-0.5 rounded">
                Interactive Simulator
              </span>
            </div>

            <form onSubmit={handleLaunchCampaign} className="space-y-4 text-xs">
              {/* Select Program */}
              <div>
                <label className="block font-bold text-navy-900 mb-1">Promoted Sports Program</label>
                <select
                  value={selectedOrgId}
                  onChange={(e) => setSelectedOrgId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-warm-200 bg-warm-50 text-navy-900 font-semibold focus:outline-none"
                >
                  {organizations.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name} ({o.sport} - {o.location.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-navy-900 mb-1">Target Metro / Geo-Fence</label>
                  <select
                    value={targetLocation}
                    onChange={(e) => setTargetLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-warm-200 bg-warm-50 text-navy-900 focus:outline-none"
                  >
                    <option value="Minneapolis, MN">Minneapolis-St. Paul Metro (25 mi)</option>
                    <option value="Chicago, IL">Chicagoland Metro Area (30 mi)</option>
                    <option value="Denver, CO">Denver & Front Range (25 mi)</option>
                    <option value="Boston, MA">Greater Boston & North Shore</option>
                    <option value="Nationwide">Nationwide (All Regions)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-navy-900 mb-1">Sport Category</label>
                  <select
                    value={targetSport}
                    onChange={(e) => setTargetSport(e.target.value as Sport)}
                    className="w-full px-3 py-2 rounded-xl border border-warm-200 bg-warm-50 text-navy-900 focus:outline-none"
                  >
                    <option value="Hockey">Youth Hockey</option>
                    <option value="Soccer">Youth Soccer</option>
                    <option value="Basketball">Youth Basketball</option>
                    <option value="Baseball">Youth Baseball</option>
                    <option value="Lacrosse">Youth Lacrosse</option>
                  </select>
                </div>
              </div>

              {/* Placement Type */}
              <div>
                <label className="block font-bold text-navy-900 mb-1">Ad Placement Format</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(
                    [
                      'Featured Discovery Listing',
                      'Search Spotlight Card',
                      'Marketplace Premier Banner',
                    ] as const
                  ).map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setPlacementType(type)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        placementType === type
                          ? 'border-navy-900 bg-ice-50 font-bold text-navy-900 shadow-subtle'
                          : 'border-warm-200 bg-white text-slate-brand hover:bg-warm-50'
                      }`}
                    >
                      <span className="block text-[11px] leading-tight">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Headline */}
              <div>
                <label className="block font-bold text-navy-900 mb-1">Promotional Callout Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-warm-200 focus:outline-none"
                />
              </div>

              {/* Duration Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-navy-900">Campaign Flight Duration</label>
                  <span className="font-mono font-bold text-navy-900">{durationDays} Days</span>
                </div>
                <input
                  type="range"
                  min="7"
                  max="60"
                  step="7"
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full accent-navy-900"
                />
                <div className="flex justify-between text-[10px] text-slate-muted mt-1">
                  <span>1 Week (7d)</span>
                  <span>2 Weeks (14d)</span>
                  <span>1 Month (30d)</span>
                  <span>2 Months (60d)</span>
                </div>
              </div>

              {/* Budget & Reach Forecast */}
              <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 grid grid-cols-3 gap-2 text-center pt-3">
                <div>
                  <span className="text-[10px] text-slate-muted block">Estimated Reach</span>
                  <span className="font-mono font-extrabold text-navy-900 text-sm">
                    ~{estimatedTotalReach.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-slate-brand block">Targeted Families</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-muted block">Avg Daily</span>
                  <span className="font-mono font-extrabold text-navy-900 text-sm">
                    ${dailyCost}/day
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-muted block">Total Investment</span>
                  <span className="font-mono font-extrabold text-muted-green text-sm">
                    ${totalCampaignBudget}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-navy-900 text-white font-bold text-xs hover:bg-navy-800 transition-colors shadow-subtle flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-muted-amber" />
                  <span>Simulate Launch Campaign</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Ad Preview */}
          <div className="lg:col-span-6 space-y-6 sticky top-28">
            <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-elevated space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-warm-200">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-muted-amber" />
                  <span className="text-xs font-bold uppercase tracking-wider text-navy-900">
                    Live Dynamic Placement Preview
                  </span>
                </div>
                <span className="text-[10px] text-slate-muted font-mono">{placementType}</span>
              </div>

              <p className="text-xs text-slate-brand">
                This promotional card renders at the top of search results when families search in{' '}
                <strong className="text-navy-900">{targetLocation}</strong> for{' '}
                <strong className="text-navy-900">{targetSport}</strong>.
              </p>

              {/* Simulated Promotional Card */}
              <div className="relative rounded-2xl border-2 border-muted-amber/60 bg-gradient-to-br from-warm-50 via-white to-ice-50 p-5 shadow-elevated overflow-hidden">
                <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold text-muted-amber bg-muted-amber/15 px-2 py-0.5 rounded-full border border-muted-amber/30">
                  <Sparkles className="w-3 h-3" /> Promoted Spotlight
                </div>

                <div className="flex items-start gap-4">
                  <SafeImage
                    src={activeOrg.logoImage}
                    alt={activeOrg.name}
                    fallbackType="logo"
                    className="w-14 h-14 rounded-2xl object-cover border border-warm-200 shadow-subtle flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-muted-blue uppercase tracking-wider">
                      {activeOrg.sport} • {activeOrg.category}
                    </span>
                    <h3 className="text-base font-bold text-navy-900 font-display mt-0.5">
                      {activeOrg.name}
                    </h3>
                    <p className="text-xs text-slate-brand flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-muted" />
                      {targetLocation}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-navy-900 font-medium italic mt-3.5 pt-3 border-t border-warm-200/80">
                  "{headline}"
                </p>

                <div className="mt-4 pt-3 border-t border-warm-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-muted-amber">
                    <Star className="w-4 h-4 fill-muted-amber text-muted-amber" />
                    <span className="font-bold text-navy-900 font-mono">{activeOrg.rating}</span>
                    <span className="text-slate-muted">({activeOrg.reviewCount} reviews)</span>
                  </div>

                  <span className="px-3 py-1.5 rounded-xl bg-navy-900 text-white font-bold text-[11px] flex items-center gap-1">
                    <span>Explore Academy</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Targeting Metadata Footprint */}
              <div className="p-3 bg-warm-50 rounded-xl border border-warm-200 text-xs text-slate-brand space-y-1">
                <div className="flex justify-between">
                  <span>Target Audience:</span>
                  <span className="font-semibold text-navy-900">{targetAudience}</span>
                </div>
                <div className="flex justify-between">
                  <span>Geo-Target:</span>
                  <span className="font-semibold text-navy-900">{targetLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Audience Intent:</span>
                  <span className="font-semibold text-navy-900">Active Search / Program Comparison</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-warm-200 text-xs">
          <div className="p-6 bg-white rounded-2xl border border-warm-200 space-y-2">
            <h4 className="font-bold text-navy-900 text-sm">Hyper-Local Relevance</h4>
            <p className="text-slate-brand leading-relaxed">
              Target families within 20 miles of your home rink facility so every impression reaches parents who can actually attend your programs.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-warm-200 space-y-2">
            <h4 className="font-bold text-navy-900 text-sm">High-Intent Parents</h4>
            <p className="text-slate-brand leading-relaxed">
              Unlike generic social media ads, Rink Review visitors are actively researching team options, coach reputations, and seasonal development.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-warm-200 space-y-2">
            <h4 className="font-bold text-navy-900 text-sm">Verified Trust Badges</h4>
            <p className="text-slate-brand leading-relaxed">
              Promotional placements highlight your real community review score, pairing marketing visibility with authentic parent credibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
