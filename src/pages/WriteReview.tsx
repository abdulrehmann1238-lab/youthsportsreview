import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useDemoData } from '../context/DemoDataContext';
import { useDemoAuth } from '../context/DemoAuthContext';
import { useToast } from '../context/ToastContext';
import { Organization } from '../types';
import { SafeImage } from '../components/common/SafeImage';
import {
  Star,
  Search,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  PenLine,
  Eye,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const WriteReview: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { organizations, addReview } = useDemoData();
  const { user } = useDemoAuth();
  const { success, error } = useToast();

  const preselectedOrgSlug = searchParams.get('org');

  const [step, setStep] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  // Category Star Ratings
  const [ratings, setRatings] = useState({
    coaching: 5,
    development: 5,
    communication: 4,
    management: 4,
    safety: 5,
    overall: 5,
  });

  // Written content
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');

  // Auto-select if org in URL
  useEffect(() => {
    if (preselectedOrgSlug) {
      const match = organizations.find((o) => o.slug === preselectedOrgSlug);
      if (match) {
        setSelectedOrg(match);
        setStep(2); // Jump straight to rating step if org preselected
      }
    }
  }, [preselectedOrgSlug, organizations]);

  // Compute average of category scores
  const averageRating = useMemo(() => {
    const values = Object.values(ratings);
    const sum = values.reduce((a, b) => a + b, 0);
    return Number((sum / values.length).toFixed(1));
  }, [ratings]);

  // Filter organizations for selection
  const matchingOrgs = organizations.filter((org) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return org.name.toLowerCase().includes(q) || org.location.city.toLowerCase().includes(q);
  });

  const handleRatingChange = (key: keyof typeof ratings, val: number) => {
    setRatings((prev) => ({ ...prev, [key]: val }));
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedOrg) {
      error('Selection Required', 'Please select a sports organization to review.');
      return;
    }
    if (step === 3) {
      if (!title.trim() || title.length < 5) {
        error('Title Required', 'Please enter a descriptive review title (at least 5 characters).');
        return;
      }
      if (!content.trim() || content.length < 30) {
        error('Review Too Short', 'Please provide at least 30 characters describing your experience.');
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 5));
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleSubmitReview = () => {
    if (!selectedOrg) return;

    addReview({
      orgId: selectedOrg.id,
      orgName: selectedOrg.name,
      orgSlug: selectedOrg.slug,
      authorAnonymousId: user.anonymousIdentity,
      authorRole: user.accountType,
      sport: selectedOrg.sport,
      title,
      content,
      pros,
      cons,
      rating: averageRating,
      categoryScores: ratings,
    });

    success(
      'Review Submitted for Moderation',
      'Your review has been logged under your anonymous profile with status Pending Moderation.'
    );

    // Navigate to Member Dashboard -> My Reviews
    navigate('/dashboard/reviews');
  };

  const stepsMeta = [
    { num: 1, title: 'Select Program' },
    { num: 2, title: 'Pillar Ratings' },
    { num: 3, title: 'Written Experience' },
    { num: 4, title: 'Privacy Preview' },
    { num: 5, title: 'Confirm & Post' },
  ];

  return (
    <div className="min-h-screen bg-warm-50 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wizard Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-blue font-mono">
              Step {step} of 5 — {stepsMeta[step - 1].title}
            </span>
            <span className="text-xs text-slate-muted">Community Standards Active</span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {stepsMeta.map((s) => (
              <div
                key={s.num}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s.num <= step ? 'bg-navy-900' : 'bg-warm-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-10 shadow-elevated">
          {/* STEP 1: SELECT ORGANIZATION */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-navy-900 font-display">
                  Which program would you like to review?
                </h2>
                <p className="text-xs text-slate-brand mt-1 leading-relaxed">
                  Search from verified youth sports clubs, travel programs, and academies.
                </p>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-muted absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by academy name or city..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-200 text-xs text-navy-900 placeholder-slate-brand focus:outline-none focus:border-navy-900"
                />
              </div>

              {/* Matching list */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {matchingOrgs.map((org) => {
                  const isSelected = selectedOrg?.id === org.id;
                  return (
                    <button
                      key={org.id}
                      onClick={() => setSelectedOrg(org)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-ice-50 border-navy-900 shadow-subtle'
                          : 'bg-warm-50 hover:bg-white border-warm-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <SafeImage
                          src={org.logoImage}
                          alt={org.name}
                          fallbackType="logo"
                          className="w-10 h-10 rounded-xl object-cover border border-warm-200"
                        />
                        <div>
                          <p className="text-xs font-bold text-navy-900">{org.name}</p>
                          <p className="text-[11px] text-slate-muted">
                            {org.location.city}, {org.location.state} • {org.sport} ({org.category})
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-navy-900">★ {org.rating}</span>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-muted-green" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: RATE YOUR EXPERIENCE */}
          {step === 2 && selectedOrg && (
            <div className="space-y-6">
              <div>
                <span className="text-xs text-slate-muted block mb-1">Reviewing:</span>
                <h2 className="text-2xl font-bold text-navy-900 font-display">
                  Rate your experience with {selectedOrg.name}
                </h2>
                <p className="text-xs text-slate-brand mt-1 leading-relaxed">
                  Evaluate across the 6 core pillars that inform community weighted scoring.
                </p>
              </div>

              {/* Score pill preview */}
              <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-navy-900">Calculated Average Rating</span>
                  <p className="text-[11px] text-slate-muted">Updates live as you set star ratings below</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-muted-amber text-muted-amber" />
                  <span className="text-2xl font-black text-navy-900 font-mono">{averageRating}</span>
                  <span className="text-xs text-slate-muted">/ 5.0</span>
                </div>
              </div>

              {/* Categories Star Inputs */}
              <div className="space-y-4">
                {[
                  { key: 'coaching', label: 'Coaching Quality', desc: 'Technical instruction, leadership, and player mentorship' },
                  { key: 'development', label: 'Player Development', desc: 'Tangible skill progression, edge work, and game IQ' },
                  { key: 'communication', label: 'Communication & Scheduling', desc: 'Rink calendar transparency and parent responsiveness' },
                  { key: 'management', label: 'Organization Management', desc: 'Locker room culture, tournament travel, and financial clarity' },
                  { key: 'safety', label: 'Safety & Environment', desc: 'Concussion protocols, ice conditions, and sportsmanship' },
                  { key: 'overall', label: 'Overall Experience', desc: 'Family satisfaction and program value' },
                ].map((cat) => {
                  const currentVal = ratings[cat.key as keyof typeof ratings];
                  return (
                    <div
                      key={cat.key}
                      className="p-3.5 rounded-2xl border border-warm-200 bg-white hover:bg-warm-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-xs font-bold text-navy-900">{cat.label}</span>
                        <p className="text-[11px] text-slate-muted">{cat.desc}</p>
                      </div>

                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(cat.key as keyof typeof ratings, star)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= currentVal
                                  ? 'fill-muted-amber text-muted-amber'
                                  : 'text-warm-200 fill-warm-100 hover:text-muted-amber/40'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="w-6 text-right font-mono font-bold text-xs text-navy-900 ml-1">
                          {currentVal}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: WRITE YOUR REVIEW */}
          {step === 3 && selectedOrg && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-navy-900 font-display">
                  Share the details of your experience
                </h2>
                <p className="text-xs text-slate-brand mt-1 leading-relaxed">
                  Provide constructive, balanced feedback to assist other families.
                </p>
              </div>

              {/* Review Title */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-navy-900">Review Headline</label>
                  <span className="text-[11px] text-slate-muted">{title.length} / 80</span>
                </div>
                <input
                  type="text"
                  maxLength={80}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Excellent technical skating coaches with clear communication..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 text-xs text-navy-900 placeholder-slate-brand focus:outline-none focus:border-navy-900"
                />
              </div>

              {/* Review Content */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-navy-900">Written Experience</label>
                  <span className="text-[11px] text-slate-muted font-mono">{content.length} chars (min 30)</span>
                </div>
                <textarea
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe coach communication, ice time equity, skill development drills, and team culture over the season..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 text-xs text-navy-900 placeholder-slate-brand focus:outline-none focus:border-navy-900"
                />
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-muted-green block mb-1">
                    Key Strengths (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={pros}
                    onChange={(e) => setPros(e.target.value)}
                    placeholder="e.g. High coach-to-player ratio, video reviews..."
                    className="w-full px-3 py-2 rounded-xl border border-warm-200 text-xs text-navy-900 placeholder-slate-brand focus:outline-none focus:border-navy-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-brand block mb-1">
                    Areas for Improvement (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={cons}
                    onChange={(e) => setCons(e.target.value)}
                    placeholder="e.g. Weekend tournament travel was demanding..."
                    className="w-full px-3 py-2 rounded-xl border border-warm-200 text-xs text-navy-900 placeholder-slate-brand focus:outline-none focus:border-navy-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW PRIVACY PREVIEW */}
          {step === 4 && selectedOrg && (
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted-green/10 text-muted-green text-xs font-semibold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Public Identity Protected</span>
                </div>
                <h2 className="text-2xl font-bold text-navy-900 font-display">
                  Public Privacy Preview
                </h2>
                <p className="text-xs text-slate-brand mt-1 leading-relaxed">
                  Your private legal name ({user.fullName}) and email address ({user.email}) are <strong>never</strong> displayed to the public or the sports program.
                </p>
              </div>

              {/* Preview Card Simulation */}
              <div className="p-5 rounded-2xl border-2 border-dashed border-ice-300 bg-warm-50 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-blue block">
                  Public Facing Preview Card
                </span>

                <div className="flex items-center justify-between pb-3 border-b border-warm-200">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-ice-100 border border-ice-200 flex items-center justify-center text-navy-800 font-bold text-xs font-mono">
                      {user.anonymousIdentity.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-navy-900">{user.anonymousIdentity}</span>
                        <span className="text-[10px] bg-white px-2 py-0.5 rounded-full text-slate-brand border border-warm-200">
                          {user.accountType}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-muted">Just now • {selectedOrg.sport}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-muted-amber font-mono font-bold text-xs">
                    <span>★ {averageRating}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-navy-900 font-display mb-1">{title || 'Review Headline'}</h4>
                  <p className="text-xs text-slate-brand leading-relaxed">
                    {content || 'Your detailed review experience will appear here...'}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-ice-50 rounded-xl border border-ice-200 text-xs text-slate-brand flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-muted-blue flex-shrink-0 mt-0.5" />
                <p>
                  By submitting, you agree to the Rink Review Community Guidelines. Defamatory or personally abusive commentary is filtered during moderation.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: FINAL CONFIRMATION */}
          {step === 5 && selectedOrg && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-muted-green/15 text-muted-green mx-auto flex items-center justify-center border border-muted-green/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy-900 font-display">
                  Ready to publish your review?
                </h2>
                <p className="text-xs text-slate-brand max-w-md mx-auto mt-1 leading-relaxed">
                  Your submission will immediately be entered into your dashboard as <strong className="text-navy-900">Pending Moderation</strong> and updated across the live demo database.
                </p>
              </div>

              <div className="p-4 bg-warm-50 rounded-2xl border border-warm-200 text-left text-xs max-w-md mx-auto space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-muted">Program:</span>
                  <span className="font-bold text-navy-900">{selectedOrg.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-muted">Overall Rating:</span>
                  <span className="font-mono font-bold text-navy-900">★ {averageRating} / 5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-muted">Public Byline:</span>
                  <span className="font-semibold text-muted-amber font-mono">{user.anonymousIdentity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-muted">Status:</span>
                  <span className="font-semibold text-muted-amber">Pending Moderation</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSubmitReview}
                  className="w-full max-w-md py-3 rounded-xl bg-navy-900 text-white font-bold text-xs hover:bg-navy-800 transition-colors shadow-subtle mx-auto"
                >
                  Submit Anonymous Review
                </button>
              </div>
            </div>
          )}

          {/* Wizard Navigation Footer */}
          {step < 5 && (
            <div className="pt-8 border-t border-warm-200 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-brand hover:bg-warm-100 flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-subtle"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
