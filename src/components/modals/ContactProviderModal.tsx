import React, { useState } from 'react';
import { MarketplaceListing } from '../../types';
import { useToast } from '../../context/ToastContext';
import { X, Send, CheckCircle2, MessageSquare, Phone, Mail } from 'lucide-react';

interface ContactProviderModalProps {
  listing: MarketplaceListing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactProviderModal: React.FC<ContactProviderModalProps> = ({
  listing,
  isOpen,
  onClose,
}) => {
  const { success } = useToast();
  const [parentName, setParentName] = useState('Alex Vance');
  const [email, setEmail] = useState('alex.vance@example.com');
  const [phone, setPhone] = useState('(612) 555-8392');
  const [athleteAge, setAthleteAge] = useState('12');
  const [message, setMessage] = useState(
    'Hello, I would like to inquire about session availability, goalie requirements, and schedule options for the upcoming clinic.'
  );
  const [isSent, setIsSent] = useState(false);

  if (!isOpen || !listing) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    success('Inquiry Sent!', `Your inquiry was delivered to ${listing.provider}.`);
  };

  const handleClose = () => {
    setIsSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-warm-200 shadow-modal overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-warm-200 flex items-center justify-between bg-warm-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-ice-200" />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy-900 font-display">Contact Provider</h3>
              <p className="text-xs text-slate-brand truncate max-w-xs">{listing.title}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-muted hover:text-navy-900 hover:bg-warm-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {isSent ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-muted-green/15 text-muted-green mx-auto flex items-center justify-center border border-muted-green/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-navy-900 font-display mb-1">
                  Inquiry Successfully Sent!
                </h4>
                <p className="text-xs text-slate-brand max-w-sm mx-auto leading-relaxed">
                  Your message has been dispatched to <strong className="text-navy-900">{listing.provider}</strong>. They typically respond within 1 business day.
                </p>
              </div>

              <div className="p-4 bg-warm-50 rounded-xl border border-warm-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-muted">Listing:</span>
                  <span className="font-semibold text-navy-900 truncate max-w-[200px]">{listing.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-muted">Provider:</span>
                  <span className="text-navy-900">{listing.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-muted">Direct Email:</span>
                  <span className="font-mono text-navy-900">{listing.contactEmail}</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Athlete Age / Level</label>
                  <input
                    type="text"
                    required
                    value={athleteAge}
                    onChange={(e) => setAthleteAge(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-navy-900"
                />
              </div>

              <div className="pt-3 border-t border-warm-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-brand hover:bg-warm-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
