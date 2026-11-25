import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDemoAuth } from '../../context/DemoAuthContext';
import { Menu, X, Sparkles, ChevronRight, User, Shield, Compass, PenLine, Building2, Store } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { role, user, isPremium, isOrgManager } = useDemoAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Discover', href: '/discover' },
    { label: 'Reviews', href: '/discover#reviews' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Advertising', href: '/advertising' },
  ];

  const isCurrentActive = (href: string) => {
    if (href === '/discover' && location.pathname === '/discover') return true;
    if (href === '/marketplace' && location.pathname.startsWith('/marketplace')) return true;
    if (href === '/advertising' && location.pathname === '/advertising') return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-warm-50/95 backdrop-blur-md border-b border-warm-200 shadow-subtle py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Geometric Rink Symbol */}
            <div className="w-9 h-9 rounded-xl bg-navy-900 border border-ice-100/30 flex items-center justify-center shadow-subtle group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 40 40" fill="none">
                <rect x="6" y="8" width="28" height="24" rx="8" stroke="#E9F1F5" strokeWidth="2.5" />
                <line x1="20" y1="8" x2="20" y2="32" stroke="#7794A8" strokeWidth="2" strokeDasharray="2 2" />
                <circle cx="20" cy="20" r="4.5" stroke="#B99762" strokeWidth="2" fill="none" />
                <circle cx="20" cy="20" r="1.5" fill="#B99762" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-navy-900 font-ui uppercase">
                  RINK REVIEW
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted-amber/15 text-muted-amber border border-muted-amber/30">
                  Beta
                </span>
              </div>
              <span className="hidden sm:block text-[11px] text-slate-brand tracking-normal font-medium -mt-1">
                Know the program. Hear the community.
              </span>
            </div>
          </Link>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-warm-200 shadow-subtle">
            {navLinks.map((link) => {
              const active = isCurrentActive(link.href);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? 'bg-navy-900 text-white shadow-subtle'
                      : 'text-slate-brand hover:text-navy-900 hover:bg-warm-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Subtle Premium Indicator */}
            <Link
              to="/membership"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isPremium
                  ? 'bg-muted-amber/15 text-muted-amber border border-muted-amber/30 hover:bg-muted-amber/25'
                  : 'bg-warm-100 text-slate-brand hover:bg-warm-200 border border-warm-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-muted-amber" />
              <span>{isPremium ? 'Premium Active' : 'Premium'}</span>
            </Link>

            {/* Write a Review Button */}
            <Link
              to="/write-review"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-warm-200 bg-white hover:bg-warm-50 text-navy-900 text-xs font-semibold transition-colors shadow-subtle"
            >
              <PenLine className="w-3.5 h-3.5 text-muted-blue" />
              <span>Write Review</span>
            </Link>

            {/* Dashboard / Account Button */}
            {isOrgManager ? (
              <Link
                to="/organization/dashboard"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-navy-800 text-white text-xs font-semibold hover:bg-navy-700 transition-colors shadow-subtle"
              >
                <Building2 className="w-3.5 h-3.5 text-ice-200" />
                <span>Org Portal</span>
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-subtle"
              >
                <User className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/write-review"
              className="px-2.5 py-1 rounded-lg bg-navy-900 text-white text-xs font-semibold"
            >
              Review
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-warm-200 text-navy-900 hover:bg-warm-50 shadow-subtle transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-warm-50 border-b border-warm-200 px-4 pt-3 pb-6 shadow-modal animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1 mb-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="flex items-center justify-between p-2.5 rounded-xl text-sm font-semibold text-navy-900 hover:bg-warm-100"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-muted" />
              </Link>
            ))}
            <Link
              to="/membership"
              className="flex items-center justify-between p-2.5 rounded-xl text-sm font-semibold text-muted-amber hover:bg-muted-amber/10"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Membership Plans
              </span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-3 border-t border-warm-200 flex flex-col gap-2">
            <Link
              to="/write-review"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-navy-900 text-white text-sm font-semibold shadow-subtle"
            >
              <PenLine className="w-4 h-4" /> Share Your Experience
            </Link>

            <Link
              to={isOrgManager ? '/organization/dashboard' : '/dashboard'}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-warm-200 text-navy-900 text-sm font-semibold shadow-subtle"
            >
              {isOrgManager ? <Building2 className="w-4 h-4" /> : <User className="w-4 h-4" />}
              <span>{isOrgManager ? 'Organization Portal' : 'Member Dashboard'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
