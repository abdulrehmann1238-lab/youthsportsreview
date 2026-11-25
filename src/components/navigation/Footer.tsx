import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Mail, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { success } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    success('Subscribed to Community Briefing!', 'You will receive monthly youth sports insights and program benchmarks.');
  };

  return (
    <footer className="bg-navy-950 text-white border-t border-navy-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-navy-800">
          <div className="lg:col-span-6">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-navy-900 border border-ice-100/30 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none">
                  <rect x="6" y="8" width="28" height="24" rx="8" stroke="#E9F1F5" strokeWidth="2.5" />
                  <line x1="20" y1="8" x2="20" y2="32" stroke="#7794A8" strokeWidth="2" strokeDasharray="2 2" />
                  <circle cx="20" cy="20" r="4.5" stroke="#B99762" strokeWidth="2" fill="none" />
                  <circle cx="20" cy="20" r="1.5" fill="#B99762" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-ui uppercase">
                  RINK REVIEW
                </span>
                <span className="text-xs text-slate-brand">Know the program. Hear the community.</span>
              </div>
            </Link>
            <p className="text-sm text-slate-muted max-w-md leading-relaxed mb-4">
              The independent intelligence and review platform empowering youth sports families to discover exceptional programs and share honest, anonymous experiences.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-brand">
              <ShieldCheck className="w-4 h-4 text-muted-green" />
              <span>Independent platform — verified community feedback only</span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="bg-navy-900 p-6 rounded-2xl border border-navy-800 shadow-subtle">
              <h4 className="text-sm font-bold text-white mb-1">Join the Youth Sports Community Dispatch</h4>
              <p className="text-xs text-slate-muted mb-4">
                Monthly parent insights, seasonal camp directories, and developmental coaching benchmarks.
              </p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-muted-green bg-muted-green/10 p-3 rounded-xl border border-muted-green/20">
                  <Check className="w-4 h-4" />
                  <span>Thank you for subscribing! Your email is confirmed.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-muted absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your family email..."
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-navy-950 border border-navy-800 text-xs text-white placeholder-slate-brand focus:outline-none focus:border-ice-200 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-ice-100 text-navy-900 font-semibold text-xs hover:bg-white transition-colors flex items-center justify-center gap-1.5 flex-shrink-0"
                  >
                    Subscribe <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-navy-800 text-xs">
          {/* Column 1: DISCOVER */}
          <div>
            <h5 className="font-bold uppercase tracking-wider text-white text-xs mb-4 font-mono">Discover</h5>
            <ul className="space-y-2.5 text-slate-muted">
              <li>
                <Link to="/discover" className="hover:text-white transition-colors">
                  Find Programs
                </Link>
              </li>
              <li>
                <Link to="/discover#reviews" className="hover:text-white transition-colors">
                  Browse Reviews
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-white transition-colors">
                  Explore Marketplace
                </Link>
              </li>
              <li>
                <Link to="/organizations/northstar-hockey-academy" className="hover:text-white transition-colors">
                  Featured: Northstar Academy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: COMMUNITY */}
          <div>
            <h5 className="font-bold uppercase tracking-wider text-white text-xs mb-4 font-mono">Community</h5>
            <ul className="space-y-2.5 text-slate-muted">
              <li>
                <Link to="/write-review" className="hover:text-white transition-colors">
                  Submit a Review
                </Link>
              </li>
              <li>
                <Link to="/membership" className="hover:text-white transition-colors">
                  Membership Plans
                </Link>
              </li>
              <li>
                <Link to="/membership" className="hover:text-white transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Anonymous Profiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: ORGANIZATIONS */}
          <div>
            <h5 className="font-bold uppercase tracking-wider text-white text-xs mb-4 font-mono">Organizations</h5>
            <ul className="space-y-2.5 text-slate-muted">
              <li>
                <Link to="/organizations/summit-ice-development" className="hover:text-white transition-colors">
                  Claim Your Profile
                </Link>
              </li>
              <li>
                <Link to="/advertising" className="hover:text-white transition-colors">
                  Featured Listings
                </Link>
              </li>
              <li>
                <Link to="/advertising" className="hover:text-white transition-colors">
                  Location-Based Advertising
                </Link>
              </li>
              <li>
                <Link to="/organization/dashboard" className="hover:text-white transition-colors">
                  Organization Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: COMPANY */}
          <div>
            <h5 className="font-bold uppercase tracking-wider text-white text-xs mb-4 font-mono">Company</h5>
            <ul className="space-y-2.5 text-slate-muted">
              <li>
                <Link to="/#how-it-works" className="hover:text-white transition-colors">
                  About the Platform
                </Link>
              </li>
              <li>
                <a href="mailto:beta@rinkreview.demo" className="hover:text-white transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <Link to="/#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/#terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-brand gap-4">
          <p>© {new Date().getFullYear()} RINK REVIEW Platform. All rights reserved. Beta Demonstration.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Initial sport: Youth Ice Hockey</span>
            <span>•</span>
            <span>Multi-sport architecture active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
