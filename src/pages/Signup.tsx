import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemoAuth } from '../context/DemoAuthContext';
import { useToast } from '../context/ToastContext';
import { Sport } from '../types';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const Signup: React.FC = () => {
  const { loginAs, updateUserProfile } = useDemoAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [preferredSport, setPreferredSport] = useState<Sport>('Hockey');
  const [location, setLocation] = useState('Minneapolis, MN');
  const [accountType, setAccountType] = useState<
    'Parent / Guardian' | 'Athlete' | 'Coach' | 'Organization Representative'
  >('Parent / Guardian');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Generate anonymous public identity based on inputs
  const generatedAnonymousId = useMemo(() => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    if (accountType === 'Parent / Guardian') {
      return `Anonymous Parent #${randomNum}`;
    }
    if (accountType === 'Coach') {
      return `Coach Evaluator #${randomNum}`;
    }
    if (accountType === 'Athlete') {
      return `Student Athlete #${randomNum}`;
    }
    return `Sports Director #${randomNum}`;
  }, [accountType]);

  // Password strength logic
  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      error('Password Mismatch', 'The passwords entered do not match.');
      return;
    }
    if (password.length < 6) {
      error('Password Too Short', 'Please use a password of at least 6 characters.');
      return;
    }
    if (!agreedTerms) {
      error('Terms Required', 'Please accept the community guidelines.');
      return;
    }

    loginAs(
      accountType === 'Organization Representative' ? 'org_manager' : 'free',
      fullName,
      email
    );

    updateUserProfile({
      fullName,
      email,
      anonymousIdentity: generatedAnonymousId,
      preferredSport,
      location,
      accountType,
    });

    success(
      'Account Created Successfully!',
      `Welcome to Rink Review. Your public identity is ${generatedAnonymousId}.`
    );

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-warm-50 pt-24 pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-warm-200 p-8 shadow-elevated space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-navy-900 flex items-center justify-center text-white">
              <svg className="w-5 h-5" viewBox="0 0 40 40" fill="none">
                <rect x="6" y="8" width="28" height="24" rx="8" stroke="#E9F1F5" strokeWidth="2.5" />
                <circle cx="20" cy="20" r="4.5" stroke="#B99762" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <span className="text-lg font-bold text-navy-900 font-ui uppercase">RINK REVIEW</span>
          </Link>
          <h1 className="text-2xl font-bold text-navy-900 font-display">Create Your Community Account</h1>
          <p className="text-xs text-slate-brand mt-1 leading-relaxed">
            Free forever. Evaluate sports organizations with full privacy protection.
          </p>
        </div>

        {/* Automatic Anonymous Alias Generator Callout */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-ice-50 to-warm-100 border border-ice-200 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-muted-green flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-navy-900 block">Automatic Anonymous Byline:</span>
            <p className="text-slate-brand text-[11px] mt-0.5">
              To safeguard young athletes from team retaliation, all public reviews will show as:
            </p>
            <span className="inline-block mt-1 font-mono font-bold text-muted-amber bg-white px-2 py-0.5 rounded border border-warm-200">
              {generatedAnonymousId}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-navy-900 mb-1">Full Legal Name (Private)</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Vance"
                className="w-full px-3 py-2 rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
              />
            </div>
            <div>
              <label className="block font-bold text-navy-900 mb-1">Email Address (Private)</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@example.com"
                className="w-full px-3 py-2 rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-navy-900 mb-1">Account Role</label>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-warm-200 bg-white focus:outline-none"
              >
                <option value="Parent / Guardian">Parent / Guardian</option>
                <option value="Athlete">Athlete / Player</option>
                <option value="Coach">Coach / Instructor</option>
                <option value="Organization Representative">Organization Representative</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-navy-900 mb-1">Primary Sport</label>
              <select
                value={preferredSport}
                onChange={(e) => setPreferredSport(e.target.value as Sport)}
                className="w-full px-3 py-2 rounded-xl border border-warm-200 bg-white focus:outline-none"
              >
                <option value="Hockey">Youth Hockey</option>
                <option value="Soccer">Youth Soccer</option>
                <option value="Basketball">Youth Basketball</option>
                <option value="Baseball">Youth Baseball</option>
                <option value="Lacrosse">Youth Lacrosse</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">City & State</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Minneapolis, MN"
              className="w-full px-3 py-2 rounded-xl border border-warm-200 focus:outline-none"
            />
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-navy-900 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 pr-8 py-2 rounded-xl border border-warm-200 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-slate-muted hover:text-navy-900"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-warm-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-muted">
                <span>Password Strength</span>
                <span className="font-semibold text-navy-900">
                  {passwordStrength <= 1
                    ? 'Weak'
                    : passwordStrength === 2
                    ? 'Fair'
                    : passwordStrength === 3
                    ? 'Good'
                    : 'Strong'}
                </span>
              </div>
              <div className="h-1 bg-warm-200 rounded-full overflow-hidden flex gap-1">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 h-full rounded-full ${
                      step <= passwordStrength
                        ? passwordStrength <= 2
                          ? 'bg-muted-amber'
                          : 'bg-muted-green'
                        : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <label className="flex items-start gap-2 cursor-pointer text-slate-brand">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 rounded border-warm-200 text-navy-900 focus:ring-0"
              />
              <span className="text-[11px] leading-relaxed">
                I agree to the Community Guidelines, honor authentic constructive review standards, and confirm I am a youth sports parent or verified representative.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs transition-colors shadow-subtle flex items-center justify-center gap-1.5"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-4 border-t border-warm-200 text-center text-xs text-slate-brand">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-navy-900 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
