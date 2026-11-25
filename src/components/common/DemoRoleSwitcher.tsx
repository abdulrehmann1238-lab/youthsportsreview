import React, { useState } from 'react';
import { useDemoAuth } from '../../context/DemoAuthContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Sparkles, Building2, User, ChevronDown, ChevronUp, Compass, PenLine, Lock, Store, BarChart3 } from 'lucide-react';
import { DemoRole } from '../../types';

export const DemoRoleSwitcher: React.FC = () => {
  const { role, setRole, user } = useDemoAuth();
  const { info, success } = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showScenarios, setShowScenarios] = useState(false);

  const handleRoleChange = (newRole: DemoRole) => {
    setRole(newRole);
    if (newRole === 'free') {
      info('Switched to Free Member Mode', 'Viewing public previews, basic marketplace, and standard ratings.');
    } else if (newRole === 'premium') {
      success('Switched to Premium Member Mode', 'Unlocked all complete reviews, weighted analytics, and full marketplace access.');
    } else {
      info('Switched to Organization Manager Mode', 'Viewing Northstar Hockey Academy dashboard, analytics, and official response tools.');
      navigate('/organization/dashboard');
    }
  };

  const scenarios = [
    {
      id: 1,
      title: '1. Discover Programs & Profiles',
      desc: 'Browse directory, search hockey academies, view Northstar profile.',
      icon: Compass,
      action: () => {
        setRole('free');
        navigate('/organizations/northstar-hockey-academy');
        info('Scenario 1 Activated', 'Viewing Northstar Hockey Academy profile as a prospective parent.');
      },
    },
    {
      id: 2,
      title: '2. Submit Anonymous Review',
      desc: 'Multi-step review wizard with category ratings & privacy preview.',
      icon: PenLine,
      action: () => {
        setRole('free');
        navigate('/write-review');
        info('Scenario 2 Activated', 'Entering the 5-step review submission experience.');
      },
    },
    {
      id: 3,
      title: '3. Free vs. Premium Gating',
      desc: 'See locked full reviews & weighted rating insights.',
      icon: Lock,
      action: () => {
        setRole('free');
        navigate('/organizations/northstar-hockey-academy#reviews');
        info('Scenario 3 Activated', 'Notice locked review #2 and restricted weighted analytics in Free tier.');
      },
    },
    {
      id: 4,
      title: '4. Claim an Organization Profile',
      desc: 'Claim unclaimed program (Summit Ice) with verification form.',
      icon: Building2,
      action: () => {
        setRole('free');
        navigate('/organizations/summit-ice-development');
        info('Scenario 4 Activated', 'Click "Claim This Profile" on Summit Ice Development.');
      },
    },
    {
      id: 5,
      title: '5. Organization Manager Portal',
      desc: 'Manage profile, reply to reviews, configure targeted ads & analytics.',
      icon: BarChart3,
      action: () => {
        setRole('org_manager');
        navigate('/organization/dashboard');
        success('Scenario 5 Activated', 'Welcome to Northstar Hockey Academy Manager Dashboard.');
      },
    },
    {
      id: 6,
      title: '6. Sports Marketplace & Inquiries',
      desc: 'Explore camps, equipment packages, and contact camp providers.',
      icon: Store,
      action: () => {
        setRole('free');
        navigate('/marketplace/elite-goalie-development-camp');
        info('Scenario 6 Activated', 'Viewing Elite Goalie Development Camp marketplace listing.');
      },
    },
  ];

  return (
    <div className="fixed top-20 right-4 z-40 max-w-sm w-full transition-all">
      {/* Pill Toggle Button */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/95 text-white border border-ice-100/20 shadow-elevated backdrop-blur-md hover:bg-navy-800 transition-all text-xs font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-muted-green animate-ping" />
          <span className="font-semibold tracking-wide">Demo Switcher:</span>
          <span className="capitalize text-muted-amber font-bold">
            {role === 'org_manager' ? 'Org Manager' : role + ' Member'}
          </span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Control Panel */}
      {isOpen && (
        <div className="bg-white rounded-2xl border border-warm-200 shadow-modal p-4 text-navy-900 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-warm-200 mb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-brand">Client Demo Role</p>
              <p className="text-[11px] text-slate-muted">Switch perspectives instantly without relogging</p>
            </div>
            <span className="text-[10px] bg-ice-100 text-navy-800 font-semibold px-2 py-0.5 rounded-full">
              Beta Live
            </span>
          </div>

          {/* Role Buttons */}
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            <button
              onClick={() => handleRoleChange('free')}
              className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-medium transition-all ${
                role === 'free'
                  ? 'bg-navy-900 text-white shadow-subtle'
                  : 'bg-warm-100 hover:bg-warm-200 text-slate-brand'
              }`}
            >
              <User className="w-4 h-4 mb-1" />
              <span>Free</span>
            </button>

            <button
              onClick={() => handleRoleChange('premium')}
              className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-medium transition-all ${
                role === 'premium'
                  ? 'bg-muted-amber text-white shadow-subtle'
                  : 'bg-warm-100 hover:bg-warm-200 text-slate-brand'
              }`}
            >
              <Sparkles className="w-4 h-4 mb-1" />
              <span>Premium</span>
            </button>

            <button
              onClick={() => handleRoleChange('org_manager')}
              className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-medium transition-all ${
                role === 'org_manager'
                  ? 'bg-navy-800 text-white shadow-subtle'
                  : 'bg-warm-100 hover:bg-warm-200 text-slate-brand'
              }`}
            >
              <Building2 className="w-4 h-4 mb-1" />
              <span>Org Manager</span>
            </button>
          </div>

          {/* Current Identity Meta */}
          <div className="p-2.5 bg-warm-50 rounded-xl border border-warm-200 text-xs mb-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-muted text-[11px]">Private Identity:</span>
              <span className="font-semibold text-navy-900">{user.fullName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-muted text-[11px]">Public Anonymous ID:</span>
              <span className="font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-warm-200 text-muted-amber font-bold">
                {user.anonymousIdentity}
              </span>
            </div>
          </div>

          {/* Scenarios Accordion */}
          <div>
            <button
              onClick={() => setShowScenarios(!showScenarios)}
              className="w-full flex items-center justify-between text-xs font-semibold text-navy-800 hover:text-navy-950 py-1"
            >
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-muted-blue" />
                Quick Client Tour (6 Scenarios)
              </span>
              {showScenarios ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showScenarios && (
              <div className="mt-2 space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {scenarios.map((sc) => {
                  const Icon = sc.icon;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => {
                        sc.action();
                        setIsOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-warm-100 border border-transparent hover:border-warm-200 transition-colors flex items-start gap-2.5 group"
                    >
                      <div className="p-1 rounded bg-ice-100 text-navy-800 group-hover:bg-navy-900 group-hover:text-white transition-colors mt-0.5">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-navy-900">{sc.title}</p>
                        <p className="text-[10px] text-slate-muted leading-tight truncate">{sc.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
