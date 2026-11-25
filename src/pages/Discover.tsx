import React, { useState, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDemoData } from '../context/DemoDataContext';
import { OrganizationCard } from '../components/cards/OrganizationCard';
import { SportSelector } from '../components/common/SportSelector';
import { Sport, ProgramCategory } from '../types';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  RotateCcw,
  MapPin,
  Star,
  X,
  Compass,
} from 'lucide-react';

export const Discover: React.FC = () => {
  const { organizations, activeSport, setActiveSport } = useDemoData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedSport, setSelectedSport] = useState<Sport | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory | 'All'>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extract unique cities
  const cities = useMemo(() => {
    const list = Array.from(new Set(organizations.map((o) => `${o.location.city}, ${o.location.state}`)));
    return ['All', ...list];
  }, [organizations]);

  // Categories
  const categories: (ProgramCategory | 'All')[] = ['All', 'Academy', 'Club', 'Training Center', 'League', 'Team'];

  // Filtered & Sorted Organizations
  const filteredOrganizations = useMemo(() => {
    return organizations
      .filter((org) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            org.name.toLowerCase().includes(q) ||
            org.location.city.toLowerCase().includes(q) ||
            org.sport.toLowerCase().includes(q) ||
            org.description.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Sport filter
        if (selectedSport !== 'All' && org.sport !== selectedSport) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && org.category !== selectedCategory) {
          return false;
        }

        // City filter
        if (selectedCity !== 'All') {
          const orgCity = `${org.location.city}, ${org.location.state}`;
          if (orgCity !== selectedCity) return false;
        }

        // Rating filter
        if (minRating > 0 && org.rating < minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [organizations, searchQuery, selectedSport, selectedCategory, selectedCity, minRating, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSport('All');
    setSelectedCategory('All');
    setSelectedCity('All');
    setMinRating(0);
    setSortBy('rating');
  };

  const activeFilterCount =
    (selectedSport !== 'All' ? 1 : 0) +
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedCity !== 'All' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-warm-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-muted mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-navy-900 font-semibold">Program Discovery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 font-display">
            Explore Youth Sports Programs
          </h1>
          <p className="text-sm text-slate-brand mt-1 max-w-2xl leading-relaxed">
            Search verified youth hockey academies, clubs, and training centers across North America. Read community experiences and evaluate program credentials.
          </p>
        </div>

        {/* Global Sport Selector Chips */}
        <div className="mb-8">
          <SportSelector
            variant="compact"
            onSelectSport={(sport) => {
              setSelectedSport(sport);
            }}
          />
        </div>

        {/* Search & Toolbar Bar */}
        <div className="bg-white p-4 rounded-2xl border border-warm-200 shadow-subtle mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-muted absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by academy name, city, or philosophy..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-warm-50 border border-warm-200 text-xs text-navy-900 placeholder-slate-brand focus:outline-none focus:border-navy-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-muted hover:text-navy-900"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-warm-100 text-navy-900 text-xs font-semibold"
            >
              <Filter className="w-4 h-4" />
              <span>Filters ({activeFilterCount})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-muted hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-warm-200 bg-warm-50 text-xs text-navy-900 font-semibold focus:outline-none focus:border-navy-900"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>

            {/* Grid / List View Toggle */}
            <div className="flex items-center bg-warm-100 p-1 rounded-xl border border-warm-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-navy-900 shadow-subtle' : 'text-slate-muted hover:text-navy-900'
                }`}
                aria-label="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-navy-900 shadow-subtle' : 'text-slate-muted hover:text-navy-900'
                }`}
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout with Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block md:col-span-3 space-y-6 bg-white p-5 rounded-2xl border border-warm-200 shadow-subtle sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-warm-200">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-muted-blue" />
                Refine Directory
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-muted-blue hover:text-navy-900 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Sport Filter */}
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-2">Sport Discipline</label>
              <div className="space-y-1">
                {(['All', 'Hockey', 'Soccer', 'Basketball', 'Baseball', 'Lacrosse'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSport(s)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedSport === s
                        ? 'bg-navy-900 text-white'
                        : 'text-slate-brand hover:bg-warm-100'
                    }`}
                  >
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-2">Program Model</label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-navy-900 text-white'
                        : 'text-slate-brand hover:bg-warm-100'
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Location Selector */}
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-2">Region / Metro</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-warm-200 bg-warm-50 text-xs text-navy-900 focus:outline-none focus:border-navy-900"
              >
                {cities.map((c) => (
                  <option key={String(c)} value={String(c)}>
                    {String(c)}
                  </option>
                ))}
              </select>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-2">Minimum Rating</label>
              <div className="grid grid-cols-4 gap-1">
                {[0, 4.0, 4.5, 4.8].map((rat) => (
                  <button
                    key={rat}
                    onClick={() => setMinRating(rat)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center border transition-all ${
                      minRating === rat
                        ? 'bg-navy-900 text-white border-navy-900'
                        : 'bg-warm-50 text-slate-brand border-warm-200 hover:bg-warm-100'
                    }`}
                  >
                    {rat === 0 ? 'All' : `${rat}+`}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Column */}
          <main className="col-span-1 md:col-span-9">
            {/* Result Stats Bar */}
            <div className="flex items-center justify-between mb-4 text-xs text-slate-muted">
              <span>
                Showing <strong>{filteredOrganizations.length}</strong> matching programs
              </span>
              {activeFilterCount > 0 && (
                <span className="text-[11px] bg-ice-100 text-navy-900 px-2 py-0.5 rounded-full font-semibold">
                  {activeFilterCount} filter(s) active
                </span>
              )}
            </div>

            {/* Zero State */}
            {filteredOrganizations.length === 0 ? (
              <div className="bg-white rounded-2xl border border-warm-200 p-12 text-center shadow-subtle space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-warm-100 text-slate-muted flex items-center justify-center mx-auto">
                  <Compass className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-900 font-display">No matching programs found</h3>
                  <p className="text-xs text-slate-brand max-w-sm mx-auto mt-1 leading-relaxed">
                    Try broadening your search terms or clearing your location and rating filters.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-navy-900 text-white font-semibold text-xs hover:bg-navy-800 transition-colors inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrganizations.map((org) => (
                  <OrganizationCard key={org.id} organization={org} variant="grid" />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredOrganizations.map((org) => (
                  <OrganizationCard key={org.id} organization={org} variant="list" />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer Filter Dialog */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-navy-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-modal max-h-[85vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-warm-200">
              <span className="font-bold text-sm text-navy-900">Filters</span>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 text-slate-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-2">Sport Discipline</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['All', 'Hockey', 'Soccer', 'Basketball', 'Baseball', 'Lacrosse'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSport(s)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border ${
                      selectedSport === s ? 'bg-navy-900 text-white border-navy-900' : 'bg-warm-50 text-slate-brand border-warm-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-2">Program Model</label>
              <div className="grid grid-cols-2 gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border ${
                      selectedCategory === cat ? 'bg-navy-900 text-white border-navy-900' : 'bg-warm-50 text-slate-brand border-warm-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-2">Region</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-warm-200 bg-warm-50 text-xs text-navy-900"
              >
                {cities.map((c) => (
                  <option key={String(c)} value={String(c)}>
                    {String(c)}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 border-t border-warm-200 flex items-center justify-between gap-3">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-semibold text-slate-brand hover:bg-warm-100 rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold"
              >
                Apply Filters ({filteredOrganizations.length} results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
