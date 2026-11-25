import React, { useState } from 'react';
import { useDemoAuth } from '../context/DemoAuthContext';
import { useToast } from '../context/ToastContext';
import {
  Check,
  X,
  Sparkles,
  Building2,
  ShieldCheck,
  Lock,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Membership: React.FC = () => {
  const { role, setRole, isFree, isPremium, isOrgManager } = useDemoAuth();
  const { success, info } = useToast();
  const [annualBilling, setAnnualBilling] = useState(false);

  const features = [
    { name: 'Discover sports programs & academies', free: true, premium: true, org: true },
    { name: 'View public profiles & standard star ratings', free: true, premium: true, org: true },
    { name: 'Anonymous public profile protection', free: true, premium: true, org: false },
    { name: 'Submit verified community reviews', free: true, premium: true, org: false },
    { name: 'Read complete unedited community reviews', free: false, premium: true, org: true },
    { name: 'Access 6-pillar weighted rating insights', free: false, premium: true, org: true },
    { name: 'Full marketplace access & exclusive equipment bundles', free: false, premium: true, org: true },
    { name: 'Advanced head-to-head program comparison filters', free: false, premium: true, org: true },
    { name: 'Direct coach inquiry & priority messaging', free: false, premium: true, org: true },
    { name: 'Claim official organization presence', free: false, premium: false, org: true },
    { name: 'Post official public replies to community reviews', free: false, premium: false, org: true },
    { name: 'Access demographic & audience reach analytics', free: false, premium: false, org: true },
    { name: 'Run geo-targeted promotional ad campaigns', free: false, premium: false, org: true },
  ];

  return (
    <div className="min-h-screen bg-warm-50 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-amber px-2.5 py-1 rounded-full bg-muted-amber/20 border border-muted-amber/30 inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Membership & Platform Access
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-navy-900 font-display">
            More insight. Better decisions.
          </h1>
          <p className="text-sm text-slate-brand mt-3 leading-relaxed">
            Choose the membership tier designed for your family’s youth sports journey or claim your organization’s presence.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 mt-6 p-1.5 rounded-full bg-white border border-warm-200 text-xs shadow-subtle">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
                !annualBilling ? 'bg-navy-900 text-white shadow-subtle' : 'text-slate-brand hover:text-navy-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`px-4 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
                annualBilling ? 'bg-muted-amber text-white shadow-subtle' : 'text-slate-brand hover:text-navy-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded-full font-bold">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: FREE COMMUNITY */}
          <div
            className={`bg-white rounded-3xl border p-8 flex flex-col justify-between transition-all ${
              isFree ? 'border-navy-900 shadow-elevated ring-2 ring-navy-900/10' : 'border-warm-200 shadow-subtle'
            }`}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-brand block">
                Free Community
              </span>
              <div className="mt-3 mb-6">
                <span className="text-4xl font-extrabold font-mono text-navy-900">$0</span>
                <span className="text-xs text-slate-muted"> / forever</span>
              </div>
              <p className="text-xs text-slate-brand mb-6 leading-relaxed">
                Discover local sports organizations, read public preview reviews, and submit anonymous community feedback.
              </p>

              <ul className="space-y-3 text-xs text-navy-900 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-muted-green flex-shrink-0" />
                  <span>Discover programs & clubs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-muted-green flex-shrink-0" />
                  <span>View public preview reviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-muted-green flex-shrink-0" />
                  <span>Submit reviews anonymously</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-muted-green flex-shrink-0" />
                  <span>Save programs to dashboard</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                setRole('free');
                success('Switched to Free Member Mode', 'Viewing public previews and standard ratings.');
              }}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors ${
                isFree
                  ? 'bg-warm-100 text-slate-brand cursor-default'
                  : 'bg-navy-900 text-white hover:bg-navy-800'
              }`}
            >
              {isFree ? 'Current Perspective' : 'Preview as Free Member'}
            </button>
          </div>

          {/* Card 2: PREMIUM MEMBER */}
          <div
            className={`bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 rounded-3xl border-2 border-muted-amber text-white p-8 flex flex-col justify-between shadow-modal relative ${
              isPremium ? 'ring-4 ring-muted-amber/30' : ''
            }`}
          >
            <div className="absolute -top-3.5 right-6">
              <span className="px-3 py-1 rounded-full bg-muted-amber text-white font-bold text-[10px] tracking-wider uppercase shadow-subtle">
                Families' Choice
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
                Unlock complete evaluations, 6-pillar weighted rating algorithms, and the full sports marketplace.
              </p>

              <ul className="space-y-3 text-xs text-white mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-muted-amber flex-shrink-0" />
                  <span><strong>Read complete eligible reviews</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-muted-amber flex-shrink-0" />
                  <span><strong>Access 6-pillar weighted ratings</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-muted-amber flex-shrink-0" />
                  <span>Full marketplace & gear bundles</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-muted-amber flex-shrink-0" />
                  <span>Program comparison filters</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                setRole('premium');
                success('Upgraded to Premium (Demo)', 'Full reviews and weighted analytics unlocked.');
              }}
              className="w-full py-2.5 rounded-xl bg-muted-amber hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-subtle"
            >
              {isPremium ? 'Active Plan (Demo)' : 'Instant Demo Upgrade'}
            </button>
          </div>

          {/* Card 3: ORGANIZATION CLAIM */}
          <div
            className={`bg-white rounded-3xl border p-8 flex flex-col justify-between transition-all ${
              isOrgManager ? 'border-navy-900 shadow-elevated ring-2 ring-navy-900/10' : 'border-warm-200 shadow-subtle'
            }`}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-blue flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> Organization Portal
              </span>
              <div className="mt-3 mb-6">
                <span className="text-4xl font-extrabold font-mono text-navy-900">
                  {annualBilling ? '$290' : '$29'}
                </span>
                <span className="text-xs text-slate-muted">
                  {annualBilling ? ' / year' : ' / month'}
                </span>
              </div>
              <p className="text-xs text-slate-brand mb-6 leading-relaxed">
                For verified hockey academies, clubs, and training centers to manage their presence and engage community feedback.
              </p>

              <ul className="space-y-3 text-xs text-navy-900 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-muted-blue flex-shrink-0" />
                  <span>Verified organization badge</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-muted-blue flex-shrink-0" />
                  <span>Official replies to community reviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-muted-blue flex-shrink-0" />
                  <span>Profile impressions & geo-analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-muted-blue flex-shrink-0" />
                  <span>Publish camps to marketplace</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                setRole('org_manager');
                success('Switched to Org Manager (Demo)', 'Viewing Northstar Hockey Academy dashboard.');
              }}
              className="w-full py-2.5 rounded-xl border border-warm-200 hover:bg-warm-100 text-navy-900 font-bold text-xs transition-colors"
            >
              {isOrgManager ? 'Current Perspective' : 'Preview as Org Manager'}
            </button>
          </div>
        </div>

        {/* Detailed Feature Comparison Table */}
        <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-10 shadow-subtle mb-16">
          <h3 className="text-2xl font-bold text-navy-900 font-display mb-6">
            Detailed Feature Comparison
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-warm-200 text-slate-muted">
                  <th className="py-3 px-4 font-bold text-navy-900">Platform Capability</th>
                  <th className="py-3 px-4 text-center font-bold text-navy-900">Free Community</th>
                  <th className="py-3 px-4 text-center font-bold text-muted-amber">Premium Member</th>
                  <th className="py-3 px-4 text-center font-bold text-muted-blue">Organization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-100">
                {features.map((f, i) => (
                  <tr key={i} className="hover:bg-warm-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-navy-900">{f.name}</td>
                    <td className="py-3.5 px-4 text-center">
                      {f.free ? (
                        <Check className="w-4 h-4 text-muted-green mx-auto" />
                      ) : (
                        <span className="text-slate-brand font-mono text-[10px]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center bg-muted-amber/5">
                      {f.premium ? (
                        <Check className="w-4 h-4 text-muted-amber mx-auto" />
                      ) : (
                        <span className="text-slate-brand font-mono text-[10px]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {f.org ? (
                        <Check className="w-4 h-4 text-muted-blue mx-auto" />
                      ) : (
                        <span className="text-slate-brand font-mono text-[10px]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-navy-900 font-display text-center mb-6">
            Frequently Asked Questions
          </h3>

          <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-subtle space-y-1">
            <h4 className="text-xs font-bold text-navy-900">Why are public reviews anonymous?</h4>
            <p className="text-xs text-slate-brand leading-relaxed">
              In youth competitive sports, parents often hesitate to share constructive feedback for fear of coach retaliation against their child's ice time or roster position. Anonymous public identities protect families while preserving rigorous community standards.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-warm-200 p-5 shadow-subtle space-y-1">
            <h4 className="text-xs font-bold text-navy-900">How is the weighted rating calculated?</h4>
            <p className="text-xs text-slate-brand leading-relaxed">
              Standard averages treat all questions equally. Our proprietary weighted model assigns 50% of the rating to on-ice Coaching Quality (25%) and Player Development (25%), with remaining weight distributed across Communication, Safety, and Organization Management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
