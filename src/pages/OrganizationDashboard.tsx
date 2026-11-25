import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDemoData } from '../context/DemoDataContext';
import { useDemoAuth } from '../context/DemoAuthContext';
import { useToast } from '../context/ToastContext';
import { ORGANIZATION_ANALYTICS, DEMO_AUDIENCE_LOCATIONS } from '../data/analytics';
import { Review, ReviewResponse } from '../types';
import { SafeImage } from '../components/common/SafeImage';
import {
  Building2,
  BarChart3,
  MessageSquare,
  Sparkles,
  Store,
  Settings,
  Share2,
  CheckCircle2,
  Star,
  Users,
  Eye,
  TrendingUp,
  Send,
  Flag,
  ArrowRight,
  ShieldCheck,
  MapPin,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const OrganizationDashboard: React.FC = () => {
  const { organizations, reviews, updateOrganization, addReviewResponse } = useDemoData();
  const { role, setRole } = useDemoAuth();
  const { success, info } = useToast();
  const location = useLocation();

  // Find Northstar Hockey Academy as the claimed organization for manager view
  const org = organizations.find((o) => o.slug === 'northstar-hockey-academy') || organizations[0];
  const orgReviews = reviews.filter((r) => r.orgSlug === org.slug);

  const [activeTab, setActiveTab] = useState<
    'overview' | 'profile' | 'reviews' | 'analytics' | 'advertising' | 'marketplace'
  >('overview');

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Profile Edit State
  const [name, setName] = useState(org.name);
  const [description, setDescription] = useState(org.description);
  const [website, setWebsite] = useState(org.website);
  const [phone, setPhone] = useState(org.phone);
  const [email, setEmail] = useState(org.email);
  const [priceRange, setPriceRange] = useState(org.priceRange || '');
  const [developmentFocus, setDevelopmentFocus] = useState(org.developmentFocus);

  // Official Response Modal State
  const [respondingReview, setRespondingReview] = useState<Review | null>(null);
  const [responseContent, setResponseContent] = useState('');
  const [authorName, setAuthorName] = useState('Director of Hockey Operations');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrganization(org.id, {
      name,
      description,
      website,
      phone,
      email,
      priceRange,
      developmentFocus,
    });
    success('Profile Updated', 'Organization details saved to local state.');
  };

  const handleSendResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!respondingReview || !responseContent.trim()) return;

    addReviewResponse(respondingReview.id, {
      author: authorName,
      role: 'Northstar Hockey Academy Leadership',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      content: responseContent,
    });

    setRespondingReview(null);
    setResponseContent('');
    success('Official Response Published', 'Your response is now publicly attached to the review.');
  };

  const navItems = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'profile', label: 'Organization Profile', icon: Building2 },
    { key: 'reviews', label: `Community Reviews (${orgReviews.length})`, icon: MessageSquare },
    { key: 'analytics', label: 'Audience Analytics', icon: TrendingUp },
    { key: 'advertising', label: 'Featured Placement & Ads', icon: Sparkles },
    { key: 'marketplace', label: 'Marketplace Listings', icon: Store },
  ] as const;

  return (
    <div className="min-h-screen bg-warm-100/60 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Header Menu Trigger */}
        <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-2xl border border-warm-200 mb-6 shadow-subtle">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-navy-900">{org.name}</span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-muted-green/20 text-muted-green font-mono">
              Claimed
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-warm-100 text-navy-900"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Organization Sidebar */}
          <aside
            className={`md:col-span-3 bg-white rounded-3xl border border-warm-200 p-6 shadow-subtle space-y-6 ${
              sidebarOpen ? 'block' : 'hidden md:block'
            }`}
          >
            {/* Org Brand Header */}
            <div className="pb-6 border-b border-warm-200">
              <div className="flex items-center gap-3">
                <SafeImage
                  src={org.logoImage}
                  alt={org.name}
                  fallbackType="logo"
                  className="w-12 h-12 rounded-2xl object-cover border border-warm-200 shadow-subtle"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-navy-900 truncate">{org.name}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-muted-green">
                    <CheckCircle2 className="w-3 h-3" /> Verified Org Manager
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-warm-100 flex items-center justify-between text-xs">
                <Link
                  to={`/organizations/${org.slug}`}
                  target="_blank"
                  className="text-muted-blue hover:text-navy-900 font-semibold flex items-center gap-1"
                >
                  <span>View Public Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <span className="font-mono font-bold text-navy-900">★ {org.rating}</span>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      setActiveTab(item.key);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-navy-900 text-white shadow-subtle'
                        : 'text-slate-brand hover:bg-warm-100 hover:text-navy-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </nav>

            {/* Quick Switch to User View */}
            <div className="pt-4 border-t border-warm-200">
              <button
                onClick={() => {
                  setRole('free');
                  info('Switched to Parent Perspective', 'Viewing platform as standard community member.');
                }}
                className="w-full py-2.5 rounded-xl border border-warm-200 hover:bg-warm-100 text-navy-900 text-xs font-semibold transition-colors text-center"
              >
                Switch to Parent View
              </button>
            </div>
          </aside>

          {/* Main Panel */}
          <main className="md:col-span-9 space-y-8">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Metric Summary Banner */}
                <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 font-display">
                        Organization Operations
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-brand mt-1 leading-relaxed">
                        Performance analytics, community reviews, and inquiries for {org.name}.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('advertising')}
                        className="px-4 py-2 rounded-xl bg-muted-amber hover:bg-amber-700 text-white font-bold text-xs shadow-subtle flex items-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Promote Program</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                        Profile Views (30d)
                      </span>
                      <span className="text-2xl font-black text-navy-900 font-mono">3,842</span>
                      <span className="text-[10px] text-muted-green block mt-0.5">↑ 18% vs last month</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                        Total Reviews
                      </span>
                      <span className="text-2xl font-black text-navy-900 font-mono">{orgReviews.length}</span>
                      <span className="text-[10px] text-slate-brand block mt-0.5">100% verified</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                        Overall Rating
                      </span>
                      <span className="text-2xl font-black text-navy-900 font-mono">★ {org.rating}</span>
                      <span className="text-[10px] text-muted-amber block mt-0.5">
                        Weighted: {org.weightedScore}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                        Marketplace Clicks
                      </span>
                      <span className="text-2xl font-black text-navy-900 font-mono">284</span>
                      <span className="text-[10px] text-muted-green block mt-0.5">44 direct inquiries</span>
                    </div>
                  </div>
                </div>

                {/* Monthly Views and Activity Chart */}
                <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-navy-900 font-display">
                        Profile Impressions & Growth
                      </h3>
                      <p className="text-xs text-slate-brand">
                        Monthly unique families discovering {org.name} on Rink Review.
                      </p>
                    </div>
                  </div>

                  <div className="h-64 sm:h-72 w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={ORGANIZATION_ANALYTICS}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F4F5" />
                        <XAxis dataKey="month" stroke="#697887" fontSize={11} />
                        <YAxis stroke="#697887" fontSize={11} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#18283A',
                            border: 'none',
                            borderRadius: '12px',
                            color: '#FFF',
                            fontSize: '11px',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="views"
                          name="Profile Views"
                          stroke="#18283A"
                          strokeWidth={2.5}
                          dot={{ r: 4, fill: '#18283A' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="clicks"
                          name="Camp Clicks"
                          stroke="#B99762"
                          strokeWidth={2}
                          dot={{ r: 3, fill: '#B99762' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Reviews Needing Attention */}
                <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-navy-900 font-display">
                        Recent Community Feedback
                      </h3>
                      <p className="text-xs text-slate-brand">
                        Parents share experiences anonymously. Post an official organization reply below.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="text-xs font-semibold text-muted-blue hover:text-navy-900"
                    >
                      View All Reviews
                    </button>
                  </div>

                  <div className="space-y-3">
                    {orgReviews.slice(0, 2).map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-2xl border border-warm-200 bg-warm-50 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-navy-900">{rev.authorAnonymousId}</span>
                            <span className="text-[10px] text-slate-muted">• {rev.date}</span>
                          </div>
                          <span className="font-mono font-bold text-xs text-navy-900">★ {rev.rating}</span>
                        </div>
                        <h4 className="text-sm font-bold text-navy-900 font-display">{rev.title}</h4>
                        <p className="text-xs text-slate-brand leading-relaxed">{rev.content}</p>

                        <div className="pt-2 flex items-center justify-between">
                          {rev.organizationResponse ? (
                            <span className="text-[11px] text-muted-green font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Official Response Attached
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-muted">No response posted yet</span>
                          )}

                          <button
                            onClick={() => {
                              setRespondingReview(rev);
                              setResponseContent(rev.organizationResponse?.content || '');
                            }}
                            className="px-3 py-1 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold transition-colors flex items-center gap-1"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>{rev.organizationResponse ? 'Edit Response' : 'Reply Officially'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ORGANIZATION PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-navy-900 font-display">Manage Organization Profile</h3>
                  <p className="text-xs text-slate-brand mt-1">
                    Updates to this profile appear live across the program discovery directory and detail page.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-2xl">
                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">Organization Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">Public Mission & Description</label>
                    <textarea
                      rows={4}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">Development Philosophy Focus</label>
                    <textarea
                      rows={2}
                      value={developmentFocus}
                      onChange={(e) => setDevelopmentFocus(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy-900 mb-1">Official Website</label>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-navy-900 mb-1">Tuition / Fee Range</label>
                      <input
                        type="text"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        placeholder="e.g. $2,800 - $4,600 / season"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy-900 mb-1">Contact Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-navy-900 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-navy-900 text-white font-semibold text-xs hover:bg-navy-800 transition-colors shadow-subtle"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: REVIEWS & OFFICIAL RESPONSES */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-navy-900 font-display">
                    Community Reviews & Official Replies
                  </h3>
                  <p className="text-xs text-slate-brand mt-1 leading-relaxed">
                    Under platform standards, organizations cannot delete community reviews, but verified managers may attach official public responses and flag policy violations.
                  </p>
                </div>

                <div className="space-y-4">
                  {orgReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl border border-warm-200 bg-warm-50 space-y-3"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-warm-200">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-navy-900">{rev.authorAnonymousId}</span>
                          <span className="text-[10px] text-slate-muted">• {rev.date}</span>
                        </div>
                        <span className="font-mono font-bold text-xs text-navy-900">★ {rev.rating}</span>
                      </div>

                      <h4 className="text-sm font-bold text-navy-900 font-display">{rev.title}</h4>
                      <p className="text-xs text-slate-brand leading-relaxed">{rev.content}</p>

                      {/* Existing Official Response */}
                      {rev.organizationResponse && (
                        <div className="p-3 bg-ice-50 rounded-xl border border-ice-200 text-xs">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-bold text-navy-900">Official Organization Response</span>
                            <span className="text-[10px] text-slate-muted">{rev.organizationResponse.date}</span>
                          </div>
                          <p className="text-slate-brand">{rev.organizationResponse.content}</p>
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <button
                          onClick={() => {
                            info('Flag Submitted', 'Moderation team will inspect this review against platform guidelines.');
                          }}
                          className="text-slate-muted hover:text-red-500 flex items-center gap-1 text-[11px]"
                        >
                          <Flag className="w-3 h-3" />
                          <span>Flag for Moderation</span>
                        </button>

                        <button
                          onClick={() => {
                            setRespondingReview(rev);
                            setResponseContent(rev.organizationResponse?.content || '');
                          }}
                          className="px-4 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{rev.organizationResponse ? 'Update Response' : 'Reply to Review'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: AUDIENCE ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-4">
                  <h3 className="text-xl font-bold text-navy-900 font-display">Geographic Audience Reach</h3>
                  <p className="text-xs text-slate-brand">
                    Location breakdown of families researching your hockey programs.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={DEMO_AUDIENCE_LOCATIONS}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#F1F4F5" />
                          <XAxis dataKey="city" stroke="#697887" fontSize={10} />
                          <YAxis stroke="#697887" fontSize={11} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#18283A',
                              border: 'none',
                              borderRadius: '12px',
                              color: '#FFF',
                              fontSize: '11px',
                            }}
                          />
                          <Bar dataKey="percentage" fill="#7794A8" radius={[4, 4, 0, 0]} name="% of Visitors" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-2.5">
                      {DEMO_AUDIENCE_LOCATIONS.map((loc, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-warm-50 border border-warm-200 flex items-center justify-between text-xs"
                        >
                          <span className="font-semibold text-navy-900">{loc.city}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-muted font-mono">{loc.count} families</span>
                            <span className="font-bold text-navy-900 font-mono w-10 text-right">
                              {loc.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: ADVERTISING & PROMOTIONS */}
            {activeTab === 'advertising' && (
              <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-warm-200">
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 font-display">Featured Placements & Promotion</h3>
                    <p className="text-xs text-slate-brand">
                      Promote your programs to families searching in Minneapolis and the Midwest.
                    </p>
                  </div>
                  <Link
                    to="/advertising"
                    className="px-4 py-2 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-subtle flex items-center gap-1.5"
                  >
                    <span>Full Ad Placement Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-r from-ice-50 to-warm-100 border border-muted-amber/30 space-y-3">
                  <div className="flex items-center gap-2 text-muted-amber font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Active Placement: Featured Discovery Listing</span>
                  </div>
                  <p className="text-xs text-slate-brand leading-relaxed">
                    Northstar Hockey Academy is currently featured in top discovery slots for "Hockey" searches in Minnesota.
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center pt-2">
                    <div className="bg-white p-3 rounded-xl border border-warm-200">
                      <span className="text-[10px] text-slate-muted block">Placement</span>
                      <span className="font-bold text-navy-900 text-xs">Tier-1 Hero Spotlight</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-warm-200">
                      <span className="text-[10px] text-slate-muted block">Weekly Reach</span>
                      <span className="font-bold text-navy-900 text-xs font-mono">~3,400 Families</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-warm-200">
                      <span className="text-[10px] text-slate-muted block">Status</span>
                      <span className="font-bold text-muted-green text-xs">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: MARKETPLACE LISTINGS */}
            {activeTab === 'marketplace' && (
              <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-warm-200">
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 font-display">Manage Marketplace Offerings</h3>
                    <p className="text-xs text-slate-brand">
                      Publish developmental clinics, goalie camps, and training bundles.
                    </p>
                  </div>
                  <Link
                    to="/marketplace"
                    className="px-4 py-2 rounded-xl bg-navy-900 text-white text-xs font-semibold"
                  >
                    View All Marketplace
                  </Link>
                </div>

                <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=300&q=80"
                      alt="Goalie Camp"
                      fallbackType="sports"
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-navy-900">Elite Goalie Development Camp</p>
                      <p className="text-[11px] text-slate-muted">Minneapolis, MN • $249 • Featured</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-muted-green px-2 py-0.5 rounded-full bg-muted-green/10">
                    Live
                  </span>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Official Response Modal */}
      {respondingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-warm-200 shadow-modal p-6 space-y-4">
            <h3 className="text-lg font-bold text-navy-900 font-display">
              Post Official Organization Response
            </h3>
            <p className="text-xs text-slate-brand">
              Responding to: <strong className="text-navy-900">"{respondingReview.title}"</strong> by{' '}
              {respondingReview.authorAnonymousId}.
            </p>

            <form onSubmit={handleSendResponse} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Official Title / Signature
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Official Response Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={responseContent}
                  onChange={(e) => setResponseContent(e.target.value)}
                  placeholder="Thank you for your feedback. We appreciate your observations regarding ice time..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRespondingReview(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-brand hover:bg-warm-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-navy-900 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Official Response</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
