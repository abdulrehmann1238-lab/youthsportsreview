import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDemoData } from '../context/DemoDataContext';
import { useDemoAuth } from '../context/DemoAuthContext';
import { MarketplaceCard } from '../components/cards/MarketplaceCard';
import { ContactProviderModal } from '../components/modals/ContactProviderModal';
import { PremiumLock } from '../components/common/PremiumLock';
import { SafeImage } from '../components/common/SafeImage';
import { MarketplaceCategory, MarketplaceListing } from '../types';
import {
  Search,
  Filter,
  Sparkles,
  Tag,
  MapPin,
  Lock,
  ArrowRight,
  Store,
} from 'lucide-react';

export const Marketplace: React.FC = () => {
  const { listings, activeSport } = useDemoData();
  const { isFree, isPremium, setRole } = useDemoAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MarketplaceCategory | 'All'>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [inquireListing, setInquireListing] = useState<MarketplaceListing | null>(null);

  const categories: (MarketplaceCategory | 'All')[] = [
    'All',
    'Hockey Camps',
    'Private Coaching',
    'Skating Lessons',
    'Equipment',
    'Training Programs',
    'Tournaments',
  ];

  const locations = useMemo(() => {
    const list = Array.from(new Set(listings.map((l) => l.location.split('/')[0].trim())));
    return ['All', ...list];
  }, [listings]);

  const filteredListings = useMemo(() => {
    return listings
      .filter((item) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            item.title.toLowerCase().includes(q) ||
            item.provider.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q);
          if (!match) return false;
        }

        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false;
        }

        if (selectedLocation !== 'All' && !item.location.includes(selectedLocation)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.numericPrice - b.numericPrice;
        }
        if (sortBy === 'price-asc') return a.numericPrice - b.numericPrice;
        if (sortBy === 'price-desc') return b.numericPrice - a.numericPrice;
        return 0;
      });
  }, [listings, searchQuery, selectedCategory, selectedLocation, sortBy]);

  const featuredListings = listings.filter((l) => l.featured);

  return (
    <div className="min-h-screen bg-warm-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Marketplace Hero Banner */}
        <div className="relative rounded-3xl bg-navy-950 text-white p-8 sm:p-12 mb-10 overflow-hidden shadow-elevated">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-transparent z-10" />
          <SafeImage
            src="https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&w=1600&q=80"
            alt="Sports Training"
            fallbackType="rink"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />

          <div className="relative z-20 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-amber px-2.5 py-1 rounded-full bg-muted-amber/20 border border-muted-amber/30 inline-flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5" /> Sports Intelligence Marketplace
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-display leading-tight">
              Development Camps, Private Coaching & Gear
            </h1>
            <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-light">
              Discover verified clinics, power skating masterclasses, and certified equipment packages recommended by community parents.
            </p>
          </div>
        </div>

        {/* Free Member Notice Bar */}
        {isFree && (
          <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-warm-100 to-ice-100 border border-muted-amber/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-subtle">
            <div className="flex items-center gap-2.5 text-xs text-navy-900">
              <Lock className="w-4 h-4 text-muted-amber flex-shrink-0" />
              <span>
                <strong>Free Community Preview:</strong> You are viewing open marketplace listings. Premium-exclusive equipment bundles and tournament registrations require a Premium Membership.
              </span>
            </div>
            <button
              onClick={() => setRole('premium')}
              className="px-4 py-1.5 rounded-xl bg-muted-amber text-white text-xs font-bold flex-shrink-0 hover:bg-amber-700 transition-colors shadow-subtle"
            >
              Unlock Full Marketplace (Demo)
            </button>
          </div>
        )}

        {/* Search & Category Filter Header */}
        <div className="bg-white p-5 rounded-2xl border border-warm-200 shadow-subtle mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-muted absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search camps, power skating, goalie instruction, gear bundles..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-200 bg-warm-50 text-xs text-navy-900 placeholder-slate-brand focus:outline-none focus:border-navy-900"
              />
            </div>

            {/* Region Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-muted hidden sm:inline">Region:</span>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 rounded-xl border border-warm-200 bg-warm-50 text-xs text-navy-900 font-semibold focus:outline-none"
              >
                {locations.map((loc) => (
                  <option key={String(loc)} value={String(loc)}>
                    {String(loc)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-muted hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-warm-200 bg-warm-50 text-xs text-navy-900 font-semibold focus:outline-none"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-navy-900 text-white shadow-subtle'
                    : 'bg-warm-100 hover:bg-warm-200 text-slate-brand'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <MarketplaceCard
              key={item.id}
              listing={item}
              onQuickInquire={(lst) => setInquireListing(lst)}
            />
          ))}
        </div>

        {/* Contact Provider Modal */}
        <ContactProviderModal
          listing={inquireListing}
          isOpen={!!inquireListing}
          onClose={() => setInquireListing(null)}
        />
      </div>
    </div>
  );
};
