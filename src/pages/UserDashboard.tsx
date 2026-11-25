import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDemoAuth } from '../context/DemoAuthContext';
import { useDemoData } from '../context/DemoDataContext';
import { useToast } from '../context/ToastContext';
import { OrganizationCard } from '../components/cards/OrganizationCard';
import { Review, Sport } from '../types';
import {
  LayoutDashboard,
  PenLine,
  Bookmark,
  Sparkles,
  Store,
  User,
  Settings,
  ChevronRight,
  ThumbsUp,
  Star,
  CheckCircle2,
  Trash2,
  Edit3,
  Compass,
  ArrowRight,
  ShieldCheck,
  Building2,
  Menu,
  X,
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { user, role, setRole, updateUserProfile, isFree, isPremium } = useDemoAuth();
  const { reviews, organizations, savedOrgIds, deleteReview, updateReview, toggleSaveOrg } = useDemoData();
  const { success, info } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  // Active sub-view based on URL or tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'saved' | 'membership' | 'profile'>(() => {
    if (location.pathname.includes('/reviews')) return 'reviews';
    if (location.pathname.includes('/saved')) return 'saved';
    if (location.pathname.includes('/membership')) return 'membership';
    if (location.pathname.includes('/profile')) return 'profile';
    return 'overview';
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Profile Edit State
  const [profileName, setProfileName] = useState(user.fullName);
  const [profileEmail, setProfileEmail] = useState(user.email);
  const [anonIdentity, setAnonIdentity] = useState(user.anonymousIdentity);
  const [prefSport, setPrefSport] = useState<Sport>(user.preferredSport);
  const [userLocation, setUserLocation] = useState(user.location);

  // Review Edit Modal state
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // User reviews
  const userReviews = reviews.filter(
    (r) => r.authorAnonymousId === user.anonymousIdentity || r.authorAnonymousId.includes('2048')
  );

  // Saved organizations
  const savedOrgs = organizations.filter((o) => savedOrgIds.includes(o.id));

  // Recommended programs (based on preferred sport)
  const recommendedOrgs = organizations
    .filter((o) => o.sport === user.preferredSport && !savedOrgIds.includes(o.id))
    .slice(0, 3);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      fullName: profileName,
      email: profileEmail,
      anonymousIdentity: anonIdentity,
      preferredSport: prefSport,
      location: userLocation,
    });
    success('Profile Updated', 'Your settings and public anonymous alias have been updated.');
  };

  const handleStartEditReview = (rev: Review) => {
    setEditingReview(rev);
    setEditTitle(rev.title);
    setEditContent(rev.content);
  };

  const handleSaveEditReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    updateReview(editingReview.id, {
      title: editTitle,
      content: editContent,
      excerpt: editContent.slice(0, 140) + '...',
    });
    setEditingReview(null);
    success('Review Updated', 'Changes saved to your review.');
  };

  const handleDeleteReview = (revId: string) => {
    if (window.confirm('Are you sure you want to delete this review from the community?')) {
      deleteReview(revId);
      info('Review Deleted', 'The review has been removed.');
    }
  };

  const navItems = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'reviews', label: `My Reviews (${userReviews.length})`, icon: PenLine },
    { key: 'saved', label: `Saved Programs (${savedOrgs.length})`, icon: Bookmark },
    { key: 'membership', label: 'Membership Plan', icon: Sparkles },
    { key: 'profile', label: 'Profile & Privacy', icon: User },
  ] as const;

  return (
    <div className="min-h-screen bg-warm-100/60 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Header Menu Trigger */}
        <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-2xl border border-warm-200 mb-6 shadow-subtle">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-navy-900">Member Portal</span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-ice-100 text-navy-900 font-mono">
              {role}
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
          {/* Dashboard Sidebar */}
          <aside
            className={`md:col-span-3 bg-white rounded-3xl border border-warm-200 p-6 shadow-subtle space-y-6 ${
              sidebarOpen ? 'block' : 'hidden md:block'
            }`}
          >
            {/* User Profile Header Badge */}
            <div className="flex items-center gap-3 pb-6 border-b border-warm-200">
              <div className="w-12 h-12 rounded-2xl bg-navy-900 text-white flex items-center justify-center font-bold text-base font-mono shadow-subtle">
                {user.fullName.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-navy-900 truncate">{user.fullName}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isPremium
                        ? 'bg-muted-amber/20 text-muted-amber border border-muted-amber/30'
                        : 'bg-warm-100 text-slate-brand'
                    }`}
                  >
                    {isPremium ? 'Premium Member' : 'Free Member'}
                  </span>
                </div>
              </div>
            </div>

            {/* Public Identity Callout */}
            <div className="p-3 bg-warm-50 rounded-2xl border border-warm-200 text-xs space-y-1">
              <span className="text-slate-muted text-[10px] uppercase tracking-wider font-bold block">
                Public Anonymous ID:
              </span>
              <p className="font-mono font-bold text-navy-900 text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-muted-green" />
                {user.anonymousIdentity}
              </p>
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

            {/* Quick Actions in Sidebar */}
            <div className="pt-4 border-t border-warm-200 space-y-2">
              <Link
                to="/write-review"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-warm-100 hover:bg-warm-200 text-navy-900 text-xs font-semibold transition-colors"
              >
                <PenLine className="w-3.5 h-3.5 text-muted-blue" />
                <span>Submit New Review</span>
              </Link>

              {isFree && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-ice-100 to-warm-100 border border-muted-amber/30 text-center">
                  <Sparkles className="w-5 h-5 text-muted-amber mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-navy-900">Unlock Full Reviews</p>
                  <p className="text-[11px] text-slate-brand mt-0.5 mb-2.5">
                    Upgrade to Premium for $9.99/mo.
                  </p>
                  <button
                    onClick={() => {
                      setRole('premium');
                      success('Upgraded to Premium (Demo)', 'Full reviews and weighted analytics unlocked.');
                    }}
                    className="w-full py-1.5 rounded-lg bg-muted-amber text-white text-xs font-bold shadow-subtle"
                  >
                    Quick Upgrade (Demo)
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* Main Dashboard Panel */}
          <main className="md:col-span-9 space-y-8">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Welcome Card */}
                <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 font-display">
                        Good morning, {user.fullName.split(' ')[0]}.
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-brand mt-1 leading-relaxed">
                        Here’s what’s happening with your youth sports community activity and saved academies.
                      </p>
                    </div>

                    <Link
                      to="/discover"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-white font-semibold text-xs hover:bg-navy-800 transition-colors shadow-subtle self-start sm:self-auto"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Find Programs</span>
                    </Link>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                        Reviews Submitted
                      </span>
                      <span className="text-2xl font-black text-navy-900 font-mono">
                        {userReviews.length}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                        Helpful Community Votes
                      </span>
                      <span className="text-2xl font-black text-navy-900 font-mono">
                        {user.helpfulVotesReceived}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                        Saved Programs
                      </span>
                      <span className="text-2xl font-black text-navy-900 font-mono">
                        {savedOrgs.length}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                        Membership Tier
                      </span>
                      <span className="text-lg font-black text-muted-amber uppercase font-mono">
                        {role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recently Submitted Reviews Section */}
                <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-navy-900 font-display">My Community Reviews</h3>
                      <p className="text-xs text-slate-brand">Reviews submitted under your anonymous alias.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="text-xs font-semibold text-muted-blue hover:text-navy-900"
                    >
                      View All ({userReviews.length})
                    </button>
                  </div>

                  {userReviews.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-muted border border-dashed border-warm-200 rounded-2xl">
                      No reviews submitted yet. Share your experience with a program to help local families!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {userReviews.slice(0, 2).map((rev) => (
                        <div
                          key={rev.id}
                          className="p-4 rounded-2xl border border-warm-200 bg-warm-50 flex items-start justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-navy-900">{rev.orgName}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-muted-amber/20 text-muted-amber border border-muted-amber/30">
                                {rev.status}
                              </span>
                            </div>
                            <h4 className="text-sm font-semibold text-navy-900 font-display">{rev.title}</h4>
                            <p className="text-xs text-slate-brand line-clamp-1 mt-0.5">{rev.excerpt}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="font-mono font-bold text-xs text-navy-900">★ {rev.rating}</span>
                            <span className="text-[10px] text-slate-muted block">{rev.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recommended Programs Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-navy-900 font-display">
                        Recommended for Your Athlete
                      </h3>
                      <p className="text-xs text-slate-brand">
                        Based on your preferred sport ({user.preferredSport}) and region ({user.location}).
                      </p>
                    </div>
                    <Link
                      to="/discover"
                      className="text-xs font-semibold text-muted-blue hover:text-navy-900"
                    >
                      Explore Directory
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {recommendedOrgs.map((org) => (
                      <OrganizationCard key={org.id} organization={org} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MY REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-warm-200">
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 font-display">Submitted Community Reviews</h3>
                    <p className="text-xs text-slate-brand">
                      Manage, edit, or remove reviews published under {user.anonymousIdentity}.
                    </p>
                  </div>
                  <Link
                    to="/write-review"
                    className="px-4 py-2 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-subtle flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <PenLine className="w-3.5 h-3.5" />
                    <span>Submit New Review</span>
                  </Link>
                </div>

                {userReviews.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <p className="text-xs text-slate-brand">You haven’t submitted any reviews yet.</p>
                    <Link
                      to="/write-review"
                      className="inline-block px-5 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold"
                    >
                      Write your first review
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userReviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-5 rounded-2xl border border-warm-200 bg-warm-50 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-warm-200">
                          <div className="flex items-center gap-2.5">
                            <Link
                              to={`/organizations/${rev.orgSlug}`}
                              className="text-sm font-bold text-navy-900 hover:underline"
                            >
                              {rev.orgName}
                            </Link>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                rev.status === 'Published'
                                  ? 'bg-muted-green/15 text-muted-green border border-muted-green/30'
                                  : 'bg-muted-amber/20 text-muted-amber border border-muted-amber/30'
                              }`}
                            >
                              {rev.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-navy-900">★ {rev.rating}</span>
                            <span className="text-[11px] text-slate-muted">• {rev.date}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-navy-900 font-display mb-1">{rev.title}</h4>
                          <p className="text-xs text-slate-brand leading-relaxed">{rev.content}</p>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-[11px] text-slate-muted">
                            Helpful votes: {rev.helpfulCount}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleStartEditReview(rev)}
                              className="px-3 py-1 rounded-lg border border-warm-200 bg-white hover:bg-warm-100 text-navy-900 text-xs font-semibold flex items-center gap-1 transition-colors"
                            >
                              <Edit3 className="w-3 h-3 text-slate-muted" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteReview(rev.id)}
                              className="px-3 py-1 rounded-lg border border-warm-200 bg-white hover:bg-red-50 text-red-600 text-xs font-semibold flex items-center gap-1 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SAVED PROGRAMS */}
            {activeTab === 'saved' && (
              <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-navy-900 font-display">Saved Sports Programs</h3>
                  <p className="text-xs text-slate-brand mt-1">
                    Keep track of academies, tryout schedules, and clinic registrations.
                  </p>
                </div>

                {savedOrgs.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <p className="text-xs text-slate-brand">You haven’t saved any sports programs yet.</p>
                    <Link
                      to="/discover"
                      className="inline-block px-5 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold"
                    >
                      Browse program directory
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedOrgs.map((org) => (
                      <OrganizationCard key={org.id} organization={org} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: MEMBERSHIP PLAN */}
            {activeTab === 'membership' && (
              <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-warm-200">
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 font-display">Active Membership</h3>
                    <p className="text-xs text-slate-brand">Manage subscription tier and platform permissions.</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-ice-100 text-navy-900 font-mono">
                    Current: {role}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Free Tier */}
                  <div
                    className={`p-6 rounded-2xl border transition-all ${
                      isFree ? 'border-navy-900 bg-ice-50/50 shadow-subtle' : 'border-warm-200 bg-white'
                    }`}
                  >
                    <h4 className="text-base font-bold text-navy-900">Free Community Tier</h4>
                    <span className="text-2xl font-black text-navy-900 font-mono block mt-2 mb-3">$0</span>
                    <p className="text-xs text-slate-brand mb-4">
                      Public directory access, community review submission, and anonymous profile protection.
                    </p>
                    <button
                      onClick={() => {
                        setRole('free');
                        success('Switched to Free Tier', 'Demonstrating free member limitations.');
                      }}
                      disabled={isFree}
                      className="w-full py-2.5 rounded-xl border border-warm-200 bg-white text-navy-900 text-xs font-bold disabled:opacity-50"
                    >
                      {isFree ? 'Current Plan' : 'Switch to Free (Demo)'}
                    </button>
                  </div>

                  {/* Premium Tier */}
                  <div
                    className={`p-6 rounded-2xl border transition-all ${
                      isPremium
                        ? 'border-muted-amber bg-warm-50 shadow-elevated'
                        : 'border-warm-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-navy-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-muted-amber" /> Premium Member
                      </h4>
                      <span className="text-[10px] bg-muted-amber text-white font-bold px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>
                    <span className="text-2xl font-black text-navy-900 font-mono block mt-2 mb-3">
                      $9.99 / mo
                    </span>
                    <p className="text-xs text-slate-brand mb-4">
                      Complete unedited reviews, weighted rating insights, full marketplace, and direct inquiry access.
                    </p>
                    <button
                      onClick={() => {
                        setRole('premium');
                        success('Upgraded to Premium (Demo)', 'All full reviews and analytics are now unlocked.');
                      }}
                      className="w-full py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition-colors"
                    >
                      {isPremium ? 'Active Plan (Demo)' : 'Upgrade to Premium (Instant Demo)'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: PROFILE & PRIVACY */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-subtle space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-navy-900 font-display">Account & Privacy Settings</h3>
                  <p className="text-xs text-slate-brand mt-1">
                    Configure your private account details and customize your public anonymous identity.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">Legal Full Name (Private)</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                    />
                    <p className="text-[11px] text-slate-muted mt-1">
                      Never displayed on public reviews or shared with clubs.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">Email Address (Private)</label>
                    <input
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 space-y-2">
                    <label className="block text-xs font-bold text-navy-900">
                      Anonymous Public Identity (Public Byline)
                    </label>
                    <input
                      type="text"
                      value={anonIdentity}
                      onChange={(e) => setAnonIdentity(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 font-mono text-navy-900 font-bold bg-white focus:outline-none focus:border-navy-900"
                    />
                    <p className="text-[11px] text-slate-muted">
                      This is the only name shown when you submit reviews. e.g. "Anonymous Parent #2048", "Hockey Family #118".
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">Preferred Sport</label>
                    <select
                      value={prefSport}
                      onChange={(e) => setPrefSport(e.target.value as Sport)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 bg-white focus:outline-none focus:border-navy-900"
                    >
                      <option value="Hockey">Youth Hockey</option>
                      <option value="Soccer">Youth Soccer</option>
                      <option value="Basketball">Youth Basketball</option>
                      <option value="Baseball">Youth Baseball</option>
                      <option value="Lacrosse">Youth Lacrosse</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">Home Region / City</label>
                    <input
                      type="text"
                      value={userLocation}
                      onChange={(e) => setUserLocation(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-navy-900 text-white font-semibold text-xs hover:bg-navy-800 transition-colors shadow-subtle"
                    >
                      Save Account Preferences
                    </button>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Review Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-warm-200 shadow-modal p-6 space-y-4">
            <h3 className="text-lg font-bold text-navy-900 font-display">Edit Your Review</h3>
            <form onSubmit={handleSaveEditReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Content</label>
                <textarea
                  rows={4}
                  required
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-brand hover:bg-warm-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-navy-900 text-white text-xs font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
