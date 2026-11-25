import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemoAuth } from '../context/DemoAuthContext';
import { useToast } from '../context/ToastContext';
import { DemoRole } from '../types';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  User,
  Sparkles,
  Building2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const Login: React.FC = () => {
  const { loginAs } = useDemoAuth();
  const { success } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('alex.vance@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs('free', 'Alex Vance', email);
    success('Logged In (Demo)', 'Welcome back to Rink Review.');
    navigate('/dashboard');
  };

  const handleQuickRole = (role: DemoRole) => {
    if (role === 'free') {
      loginAs('free', 'Alex Vance', 'alex.vance@example.com');
      success('Logged In as Free Member', 'Viewing parent community dashboard.');
      navigate('/dashboard');
    } else if (role === 'premium') {
      loginAs('premium', 'Sarah Jenkins', 'sarah.jenkins@example.com');
      success('Logged In as Premium Member', 'All complete reviews and weighted analytics unlocked.');
      navigate('/dashboard');
    } else {
      loginAs('org_manager', 'Dan Henderson', 'd.henderson@northstarhockey.demo');
      success('Logged In as Organization Manager', 'Welcome to Northstar Hockey Academy portal.');
      navigate('/organization/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-warm-50 pt-28 pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-warm-200 p-8 shadow-elevated space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-navy-900 flex items-center justify-center text-white">
              <svg className="w-5 h-5" viewBox="0 0 40 40" fill="none">
                <rect x="6" y="8" width="28" height="24" rx="8" stroke="#E9F1F5" strokeWidth="2.5" />
                <circle cx="20" cy="20" r="4.5" stroke="#B99762" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <span className="text-lg font-bold text-navy-900 font-ui uppercase">RINK REVIEW</span>
          </Link>
          <h1 className="text-2xl font-bold text-navy-900 font-display">Sign In to Your Account</h1>
          <p className="text-xs text-slate-brand mt-1">
            Access your saved programs, anonymous reviews, and community insights.
          </p>
        </div>

        {/* Quick Demo Switcher Presets */}
        <div className="p-3 bg-warm-50 rounded-2xl border border-warm-200 space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-muted block text-center">
            Instant Demo Logins (1-Click)
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => handleQuickRole('free')}
              className="py-1.5 px-2 rounded-xl bg-white hover:bg-warm-100 border border-warm-200 text-xs font-semibold text-navy-900 text-center shadow-subtle"
            >
              Free Member
            </button>
            <button
              onClick={() => handleQuickRole('premium')}
              className="py-1.5 px-2 rounded-xl bg-muted-amber hover:bg-amber-700 text-white text-xs font-bold text-center shadow-subtle flex items-center justify-center gap-1"
            >
              <Sparkles className="w-3 h-3" /> Premium
            </button>
            <button
              onClick={() => handleQuickRole('org_manager')}
              className="py-1.5 px-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold text-center shadow-subtle flex items-center justify-center gap-1"
            >
              <Building2 className="w-3 h-3" /> Org Portal
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-navy-900 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-muted absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-warm-200 text-navy-900 focus:outline-none focus:border-navy-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-muted absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-warm-200 text-navy-900 focus:outline-none focus:border-navy-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-muted hover:text-navy-900"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-slate-brand">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-warm-200 text-navy-900 focus:ring-0"
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="text-muted-blue hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs transition-colors shadow-subtle flex items-center justify-center gap-1.5"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-4 border-t border-warm-200 text-center text-xs text-slate-brand">
          Don’t have an account yet?{' '}
          <Link to="/signup" className="font-bold text-navy-900 hover:underline">
            Join the Community Free
          </Link>
        </div>
      </div>
    </div>
  );
};
