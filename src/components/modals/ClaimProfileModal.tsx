import React, { useState } from 'react';
import { Organization } from '../../types';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import { X, Building2, ShieldCheck, CheckCircle2, Lock, ArrowRight, HelpCircle } from 'lucide-react';

interface ClaimProfileModalProps {
  organization: Organization;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ClaimProfileModal: React.FC<ClaimProfileModalProps> = ({
  organization,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { claimOrganization } = useDemoData();
  const { success } = useToast();

  const [fullName, setFullName] = useState('Dan Henderson');
  const [workEmail, setWorkEmail] = useState('d.henderson@summiticedev.demo');
  const [roleTitle, setRoleTitle] = useState('Hockey Director / General Manager');
  const [verificationMethod, setVerificationMethod] = useState<
    'Work Email Domain' | 'Official State Registration' | 'Club Website Webmaster Verification'
  >('Work Email Domain');
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !workEmail || !roleTitle || !termsAgreed) return;

    claimOrganization({
      orgId: organization.id,
      orgName: organization.name,
      fullName,
      workEmail,
      roleTitle,
      verificationMethod,
    });

    setIsSubmitted(true);
    success('Claim Request Submitted!', `Verification initiated for ${organization.name}.`);
    onSuccess?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-warm-200 shadow-modal overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-warm-200 flex items-center justify-between bg-warm-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center">
              <Building2 className="w-5 h-5 text-ice-200" />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy-900 font-display">Claim Organization Profile</h3>
              <p className="text-xs text-slate-brand">{organization.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-muted hover:text-navy-900 hover:bg-warm-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-muted-green/15 text-muted-green mx-auto flex items-center justify-center border border-muted-green/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-navy-900 font-display mb-1">
                  Claim Submitted for Review
                </h4>
                <p className="text-xs text-slate-brand max-w-sm mx-auto leading-relaxed">
                  For this demonstration, <strong className="text-navy-900">{organization.name}</strong> has been updated to verified & claimed status in local state.
                </p>
              </div>

              <div className="p-4 bg-warm-50 rounded-xl border border-warm-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-muted">Representative:</span>
                  <span className="font-semibold text-navy-900">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-muted">Work Email:</span>
                  <span className="font-mono text-navy-900">{workEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-muted">Verification Channel:</span>
                  <span className="font-medium text-navy-900">{verificationMethod}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
              >
                Return to Organization Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-ice-50 rounded-xl border border-ice-200 text-xs text-navy-900 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-muted-blue flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Claiming this profile gives verified directors the ability to post official responses to community reviews, update official rink schedules, and run featured campaigns.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Work / Official Club Email</label>
                <input
                  type="email"
                  required
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                />
                <p className="text-[11px] text-slate-muted mt-1">
                  Must match the official organization website domain.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Official Role in Organization</label>
                <input
                  type="text"
                  required
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  placeholder="e.g. Club Director, Head Coach, Registrar"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Verification Method</label>
                <select
                  value={verificationMethod}
                  onChange={(e) => setVerificationMethod(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 bg-white focus:outline-none focus:border-navy-900"
                >
                  <option value="Work Email Domain">Work Email Domain DNS Auto-match</option>
                  <option value="Official State Registration">State Youth Sports Registration Document</option>
                  <option value="Club Website Webmaster Verification">Club Website Webmaster Meta Tag</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-brand">
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-warm-200 text-navy-900 focus:ring-0"
                  />
                  <span>
                    I certify that I am an authorized representative of this sports organization.
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-warm-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-brand hover:bg-warm-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!termsAgreed}
                  className="px-5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 disabled:opacity-50 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Submit Claim Request</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
