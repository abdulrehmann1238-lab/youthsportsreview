import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemoData } from '../context/DemoDataContext';
import { useDemoAuth } from '../context/DemoAuthContext';
import { useToast } from '../context/ToastContext';
import { OrganizationCard } from '../components/cards/OrganizationCard';
import { ReviewCard } from '../components/cards/ReviewCard';
import { MarketplaceCard } from '../components/cards/MarketplaceCard';
import { SportSelector } from '../components/common/SportSelector';
import { ContactProviderModal } from '../components/modals/ContactProviderModal';
import { SafeImage } from '../components/common/SafeImage';
import { MarketplaceListing } from '../types';
import {
  Compass,
  PenLine,
  ShieldCheck,
  Star,
  Users,
  Search,
  Sparkles,
  ArrowRight,
  Check,
  Building2,
  Lock,
  ChevronRight,
  TrendingUp,
  MapPin,
} from 'lucide-react';

export const Home: React.FC = () => {
  const { organizations, reviews, listings, activeSport } = useDemoData();
  const { setRole, isPremium } = useDemoAuth();
  const { success } = useToast();
  const navigate = useNavigate();

  const [annualBilling, setAnnualBilling] = useState(false);
  const [inquireListing, setInquireListing] = useState<MarketplaceListing | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter organizations for discovery section
  const filteredOrgs = organizations
    .filter((org) => {
      const matchesSport = activeSport === 'Hockey' ? org.sport === 'Hockey' : org.sport === activeSport || org.sport === 'Hockey';
      const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.location.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSport && matchesSearch;
    })
    .slice(0, 4);

  const featuredReviews = reviews.filter((r) => r.isFeatured).slice(0, 3);
  const marketplacePreview = listings.slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/discover?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen">
      {/* 5.1 CINEMATIC HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-navy-950 text-white min-h-[90vh] flex items-center">
        {/* Cinematic Arena Background with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=2000&q=85"
            alt="Ice rink arena"
            fallbackType="rink"
            className="w-full h-full object-cover object-center opacity-30 transform scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ice-100/10 border border-ice-100/20 text-ice-100 text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-amber" />
                <span>The Youth Sports Community</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display leading-[1.08]">
                Every program has a story.
                <span className="block text-ice-200 italic font-normal">
                  Make sure you hear it.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-muted max-w-xl leading-relaxed font-light">
                Discover youth sports programs, hear real community experiences, and make more confident decisions about your child’s sporting journey.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  to="/discover"
                  className="px-7 py-3.5 rounded-xl bg-ice-100 text-navy-955 font-bold text-sm hover:bg-white transition-all shadow-elevated flex items-center justify-center gap-2 group text-navy-950"
                >
                  <Compass className="w-4 h-4 text-navy-900 group-hover:rotate-45 transition-transform" />
                  <span>Explore Programs</span>
                </Link>

                <Link
                  to="/write-review"
                  className="px-7 py-3.5 rounded-xl bg-navy-800/80 hover:bg-navy-800 border border-ice-100/20 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <PenLine className="w-4 h-4 text-muted-amber" />
                  <span>Share Your Experience</span>
                </Link>
              </div>

              {/* 3 Compact Trust Indicators */}
              <div className="pt-6 border-t border-navy-800/80 grid grid-cols-3 gap-4 text-xs text-slate-muted">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted-green" />
                  <span className="leading-tight">Community-powered reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted-blue" />
                  <span className="leading-tight">Anonymous public profiles</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted-amber" />
                  <span className="leading-tight">Independent discovery</span>
                </div>
              </div>
            </div>

            {/* Right Floating Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              {/* Floating Review Statistics Card */}
              <div className="relative mx-auto max-w-md bg-navy-900/90 backdrop-blur-md rounded-2xl border border-ice-100/20 p-6 shadow-modal space-y-4 transform hover:-translate-y-1 transition-transform">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-amber bg-muted-amber/20 px-2 py-0.5 rounded border border-muted-amber/30">
                      Featured Program
                    </span>
                    <h3 className="text-xl font-bold text-white font-display mt-2">
                      Northstar Hockey Academy
                    </h3>
                    <p className="text-xs text-slate-muted flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> Minneapolis, Minnesota
                    </p>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-navy-800 border border-ice-100/10 text-center">
                    <span className="text-xl font-extrabold text-white font-mono">4.8</span>
                    <span className="text-[10px] text-muted-amber block">★★★★★</span>
                  </div>
                </div>

                <p className="text-xs text-ice-100/90 italic border-l-2 border-muted-amber pl-3 py-1 leading-relaxed">
                  "The coaching staff puts a genuine emphasis on development and communication... truly one of the best developmental environments we have experienced."
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-navy-800 text-[11px]">
                  <div className="bg-navy-950/60 p-2 rounded-lg text-center">
                    <span className="block text-slate-muted text-[10px]">Coaching</span>
                    <span className="font-bold text-white font-mono">4.9 / 5</span>
                  </div>
                  <div className="bg-navy-950/60 p-2 rounded-lg text-center">
                    <span className="block text-slate-muted text-[10px]">Development</span>
                    <span className="font-bold text-white font-mono">4.9 / 5</span>
                  </div>
                  <div className="bg-navy-950/60 p-2 rounded-lg text-center">
                    <span className="block text-slate-muted text-[10px]">Communication</span>
                    <span className="font-bold text-white font-mono">4.6 / 5</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-muted pt-1">
                  <span>Based on 126 community reviews</span>
                  <Link
                    to="/organizations/northstar-hockey-academy"
                    className="text-ice-200 hover:text-white font-semibold flex items-center gap-1"
                  >
                    Explore Profile <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.2 TRUST STATISTICS SECTION */}
      <section className="bg-white border-y border-warm-200 py-10 shadow-subtle relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-mono tracking-tight">
                2,400+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-brand">Community Reviews</p>
              <p className="text-[11px] text-slate-muted">Submitted by verified parents</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-mono tracking-tight">
                180+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-brand">Sports Programs</p>
              <p className="text-[11px] text-slate-muted">Clubs, academies & centers</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-mono tracking-tight">
                12,000+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-brand">Families Reached</p>
              <p className="text-[11px] text-slate-muted">Across North America</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-mono tracking-tight">
                8+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-brand">Regions Represented</p>
              <p className="text-[11px] text-slate-muted">Midwest, East Coast & Mountain</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5.3 DISCOVER PROGRAMS SECTION */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-blue">
                Independent Program Directory
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 font-display mt-1">
                Find the right environment for your athlete.
              </h2>
              <p className="text-sm text-slate-brand mt-2 max-w-xl">
                Compare verified coach credentials, player development philosophy, ice time ratios, and real parent experiences.
              </p>
            </div>

            <Link
              to="/discover"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-white font-semibold text-xs hover:bg-navy-800 transition-colors self-start md:self-auto shadow-subtle"
            >
              <span>View All Programs ({organizations.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Sport Selector Carousel */}
          <div className="mb-8">
            <SportSelector />
          </div>

          {/* Search Bar in Discovery Preview */}
          <form onSubmit={handleSearchSubmit} className="mb-10 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-muted absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by academy name or city (e.g. Minneapolis, Boston, Lakeside)..."
                className="w-full pl-11 pr-24 py-3 rounded-xl border border-warm-200 bg-white text-xs text-navy-900 placeholder-slate-brand focus:outline-none focus:border-navy-900 shadow-subtle"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 px-4 py-1.5 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800"
              >
                Search
              </button>
            </div>
          </form>

          {/* Program Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredOrgs.map((org) => (
              <OrganizationCard key={org.id} organization={org} />
            ))}
          </div>
        </div>
      </section>

      {/* 5.4 HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-white border-y border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-amber">
              The Platform Model
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 font-display mt-1">
              How RINK REVIEW Works
            </h2>
            <p className="text-sm text-slate-brand mt-2 leading-relaxed">
              Designed to preserve community honesty while offering sports organizations a constructive channel to earn trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-warm-50 border border-warm-200 relative group hover:border-slate-muted/40 transition-all">
              <span className="text-xs font-mono font-bold text-muted-amber uppercase tracking-wider block mb-3">
                STEP 01 — DISCOVER
              </span>
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center mb-6 shadow-subtle group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 text-ice-200" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 font-display mb-2">
                Explore Organizations & Programs
              </h3>
              <p className="text-xs text-slate-brand leading-relaxed">
                Filter academies, travel clubs, and developmental clinics by sport, geography, ice schedule, and verified category ratings.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-warm-50 border border-warm-200 relative group hover:border-slate-muted/40 transition-all">
              <span className="text-xs font-mono font-bold text-muted-blue uppercase tracking-wider block mb-3">
                STEP 02 — HEAR THE COMMUNITY
              </span>
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center mb-6 shadow-subtle group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6 text-ice-200" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 font-display mb-2">
                Read Anonymous Parent Experiences
              </h3>
              <p className="text-xs text-slate-brand leading-relaxed">
                Families share authentic season reviews under anonymous public identities, safeguarding athletes from team retaliation while informing the community.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-warm-50 border border-warm-200 relative group hover:border-slate-muted/40 transition-all">
              <span className="text-xs font-mono font-bold text-muted-green uppercase tracking-wider block mb-3">
                STEP 03 — DECIDE & COMPARE
              </span>
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center mb-6 shadow-subtle group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 text-ice-200" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 font-display mb-2">
                Make Confident Sporting Decisions
              </h3>
              <p className="text-xs text-slate-brand leading-relaxed">
                Weigh coaching pedigree, communication transparency, and safety protocols to find the exact developmental fit for your child.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 FEATURED COMMUNITY REVIEWS */}
      <section id="reviews" className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-green">
                Authentic Perspectives
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 font-display mt-1">
                Featured Community Reviews
              </h2>
              <p className="text-sm text-slate-brand mt-2 max-w-xl">
                Every review submitted is tied to a verified family profile with an anonymous public identity.
              </p>
            </div>

            <Link
              to="/write-review"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-white font-semibold text-xs hover:bg-navy-800 transition-colors self-start md:self-auto shadow-subtle"
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>Share Your Experience</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} showOrgLink />
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-slate-muted">
            <span>Illustrative demonstration content. Reviewers remain publicly anonymous by default.</span>
          </div>
        </div>
      </section>

      {/* 5.6 PREMIUM MEMBERSHIP SECTION */}
      <section className="py-20 bg-navy-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-amber">
              Membership Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display mt-1">
              More insight. Better decisions.
            </h2>
            <p className="text-sm text-slate-muted mt-3 leading-relaxed">
              Explore the platform for free or upgrade to Premium Member to unlock complete community evaluations and multi-factor weighted ratings.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="inline-flex items-center gap-3 mt-6 p-1.5 rounded-full bg-navy-900 border border-navy-800 text-xs">
              <button
                onClick={() => setAnnualBilling(false)}
                className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
                  !annualBilling ? 'bg-white text-navy-950 shadow-subtle' : 'text-slate-muted hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setAnnualBilling(true)}
                className={`px-4 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
                  annualBilling ? 'bg-muted-amber text-white shadow-subtle' : 'text-slate-muted hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded-full font-bold">
                  Save 25%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Tiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Community Tier */}
            <div className="bg-navy-900/80 rounded-2xl border border-navy-800 p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-brand">
                  Free Community
                </span>
                <div className="mt-3 mb-6">
                  <span className="text-4xl font-extrabold font-mono text-white">$0</span>
                  <span className="text-xs text-slate-muted"> / forever</span>
                </div>
                <p className="text-xs text-slate-muted mb-6 leading-relaxed">
                  Everything families need to discover youth sports organizations and participate anonymously in the community.
                </p>

                <ul className="space-y-3 text-xs text-ice-100 mb-8">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-muted-green flex-shrink-0" />
                    <span>Discover sports organizations & academies</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-muted-green flex-shrink-0" />
                    <span>View public profiles & basic metrics</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-muted-green flex-shrink-0" />
                    <span>Explore limited review previews</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-muted-green flex-shrink-0" />
                    <span>Submit verified reviews anonymously</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-muted-green flex-shrink-0" />
                    <span>Browse basic marketplace listings</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setRole('free');
                  success('Demo Role Set', 'Viewing platform as Free Member.');
                }}
                className="w-full py-3 rounded-xl border border-navy-700 bg-navy-950 text-white font-semibold text-xs hover:bg-navy-800 transition-colors"
              >
                Continue Free (Active)
              </button>
            </div>

            {/* Premium Member Tier */}
            <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 rounded-2xl border-2 border-muted-amber/60 p-8 flex flex-col justify-between relative shadow-modal">
              <div className="absolute -top-3 right-6">
                <span className="px-3 py-1 rounded-full bg-muted-amber text-white font-bold text-[10px] tracking-wider uppercase shadow-subtle">
                  Most Popular
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-amber flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Premium Member
                </span>
                <div className="mt-3 mb-6">
                  <span className="text-4xl font-extrabold font-mono text-white">
                    {annualBilling ? '$89' : '$9.99'}
                  </span>
                  <span className="text-xs text-slate-muted">
                    {annualBilling ? ' / year ($7.41/mo)' : ' / month'}
                  </span>
                </div>
                <p className="text-xs text-slate-muted mb-6 leading-relaxed">
                  Comprehensive intelligence for families making critical club, academy, and high-performance decisions.
                </p>

                <ul className="space-y-3 text-xs text-white mb-8">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-muted-amber flex-shrink-0" />
                    <span><strong>Read complete eligible reviews</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-muted-amber flex-shrink-0" />
                    <span><strong>Access weighted rating insights (6 pillars)</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-muted-amber flex-shrink-0" />
                    <span>Access full marketplace & exclusive bundles</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-muted-amber flex-shrink-0" />
                    <span>Advanced program comparison filters</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-muted-amber flex-shrink-0" />
                    <span>Direct coach inquiry & priority messaging</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <Link
                  to="/membership"
                  className="w-full py-3 rounded-xl bg-muted-amber hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-subtle flex items-center justify-center gap-2"
                >
                  <span>Explore Membership</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => {
                    setRole('premium');
                    success('Demo Upgraded!', 'Switched to Premium Member perspective.');
                  }}
                  className="w-full py-2 text-[11px] text-ice-200 hover:text-white font-medium"
                >
                  ⚡ Click to Simulate Premium Instantly
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.7 MARKETPLACE PREVIEW */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-amber">
                Sports Marketplace
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 font-display mt-1">
                Development Camps & Services
              </h2>
              <p className="text-sm text-slate-brand mt-2 max-w-xl">
                Browse verified skill camps, private goalie lessons, equipment packages, and regional showcase tournaments.
              </p>
            </div>

            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-white font-semibold text-xs hover:bg-navy-800 transition-colors self-start md:self-auto shadow-subtle"
            >
              <span>Explore All Listings ({listings.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketplacePreview.map((item) => (
              <MarketplaceCard
                key={item.id}
                listing={item}
                onQuickInquire={(lst) => setInquireListing(lst)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5.8 FINAL CALL TO ACTION */}
      <section className="py-20 bg-navy-900 text-white border-t border-navy-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight">
            Your next great sports experience starts with better information.
          </h2>
          <p className="text-sm sm:text-base text-slate-muted max-w-2xl mx-auto leading-relaxed">
            Explore programs, share experiences, and help families make more informed decisions across youth athletics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              to="/discover"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-ice-100 text-navy-900 font-bold text-sm hover:bg-white transition-all shadow-subtle"
            >
              Explore Programs
            </Link>
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-navy-800 border border-ice-100/20 text-white font-semibold text-sm hover:bg-navy-700 transition-all"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Provider Modal */}
      <ContactProviderModal
        listing={inquireListing}
        isOpen={!!inquireListing}
        onClose={() => setInquireListing(null)}
      />
    </div>
  );
};
