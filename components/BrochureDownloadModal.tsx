'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Download, Loader2, CheckCircle2, AlertCircle, Search, ChevronDown } from 'lucide-react';
import { countries } from '@/lib/countries';
import { GoogleUser } from '@/contexts/GoogleAuthContext';
import { saveUserInfo, StoredUserInfo } from '@/hooks/useDocumentDownload';

interface BrochureDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  brochureName: string;
  brochurePath: string;
  googleUser?: GoogleUser | null;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  phone: string;
  countryCode?: string;
}

const makeInitialFields = (googleUser?: GoogleUser | null): FormFields => ({
  firstName: googleUser?.firstName || '',
  lastName: googleUser?.lastName || '',
  email: googleUser?.email || '',
  organization: '',
  phone: '',
  countryCode: '+91',
});

const BrochureDownloadModal = ({
  isOpen,
  onClose,
  brochureName,
  brochurePath,
  googleUser,
}: BrochureDownloadModalProps) => {
  const [fields, setFields] = useState<FormFields>(makeInitialFields(googleUser));
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset & pre-fill form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFields(makeInitialFields(googleUser));
      setErrors({});
      setStatus('idle');
      // Focus the first unfilled field
      setTimeout(() => firstInputRef.current?.focus(), 150);
    }
  }, [isOpen, googleUser]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const validate = (): boolean => {
    const newErrors: Partial<FormFields> = {};
    if (!fields.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!fields.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!fields.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!fields.organization.trim()) newErrors.organization = 'Organization is required';
    if (!fields.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{5,12}$/.test(fields.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormFields]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    try {
      const fullPhone = `${fields.countryCode || '+91'} ${fields.phone.trim()}`;

      // Submit first-time registration to Netlify brochure-download form
      const body = new URLSearchParams({
        'form-name': 'brochure-download',
        'bot-field': '',
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        organization: fields.organization,
        phone: fullPhone,
        brochure: brochureName,
        timestamp: new Date().toISOString(),
      }).toString();

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (!response.ok) throw new Error('Submission failed');

      // Persist user info for returning visits
      const userInfo: StoredUserInfo = {
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        organization: fields.organization,
        phone: fullPhone,
        countryCode: fields.countryCode || '+91',
      };
      saveUserInfo(userInfo);

      setStatus('success');

      // Auto-download PDF after success
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = brochurePath;
        link.download = brochurePath.split('/').pop() || 'brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 600);

      // Auto-close after download starts
      setTimeout(() => onClose(), 2500);
    } catch {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Download Brochure Form"
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl hide-scrollbar"
        style={{ background: '#fff', maxHeight: '90vh', overflowY: 'auto' }}
        data-lenis-prevent
      >
        {/* Header */}
        <div
          className="relative px-6 pt-6 pb-4"
          style={{ background: '#7D2D2D' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Download size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">Download Document</h2>
              <p className="text-white/70 text-xs mt-0.5 truncate max-w-[240px]">{brochureName}</p>
            </div>
          </div>

          {/* Google sign-in badge */}
          {googleUser && (
            <div className="mt-3 flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
              {googleUser.picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={googleUser.picture}
                  alt={googleUser.name}
                  className="w-6 h-6 rounded-full flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-white/30 flex-shrink-0" />
              )}
              <span className="text-white text-xs truncate">Signed in as <strong>{googleUser.email}</strong></span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {/* Success state */}
          {status === 'success' && (
            <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
              <CheckCircle2 size={48} className="text-green-500" />
              <p className="text-gray-800 font-semibold text-lg">Thank you!</p>
              <p className="text-gray-500 text-sm">Your download has started. We will be in touch soon.</p>
            </div>
          )}

          {/* Error banner */}
          {status === 'error' && (
            <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-600 text-sm">
                Submission failed. Please try again or contact us directly.
              </p>
            </div>
          )}

          {/* Form */}
          {status !== 'success' && (
            <form name="brochure-download" onSubmit={handleSubmit} noValidate>
              {/* Hidden fields for Netlify */}
              <input type="hidden" name="form-name" value="brochure-download" />
              <p className="hidden">
                <label>
                  Do not fill this out: <input name="bot-field" />
                </label>
              </p>

              <p className="text-gray-500 text-sm mb-5">
                Please fill in your details to download the document.
              </p>

              <div className="space-y-4">
                {/* First Name + Last Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="bd-firstName" className="block text-xs font-semibold text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      id="bd-firstName"
                      name="firstName"
                      type="text"
                      value={fields.firstName}
                      onChange={handleChange}
                      placeholder=" "
                      className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors ${errors.firstName
                        ? 'border-red-400 bg-red-50 focus:border-red-400'
                        : 'border-gray-300 focus:border-[#1E3888]'
                        }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-[11px] mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="bd-lastName" className="block text-xs font-semibold text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="bd-lastName"
                      name="lastName"
                      type="text"
                      value={fields.lastName}
                      onChange={handleChange}
                      placeholder=" "
                      className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors ${errors.lastName
                        ? 'border-red-400 bg-red-50 focus:border-red-400'
                        : 'border-gray-300 focus:border-[#1E3888]'
                        }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-[11px] mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="bd-email" className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="bd-email"
                    name="email"
                    type="email"
                    value={fields.email}
                    onChange={handleChange}
                    placeholder="xyz@company.com"
                    readOnly={!!googleUser?.email}
                    className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors ${errors.email
                      ? 'border-red-400 bg-red-50 focus:border-red-400'
                      : googleUser?.email
                        ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        : 'border-gray-300 focus:border-[#1E3888]'
                      }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>
                  )}
                  {googleUser?.email && (
                    <p className="text-[11px] text-gray-400 mt-1">Email verified via Google Sign-In</p>
                  )}
                </div>

                {/* Organization */}
                <div>
                  <label htmlFor="bd-organization" className="block text-xs font-semibold text-gray-700 mb-1">
                    Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="bd-organization"
                    name="organization"
                    type="text"
                    value={fields.organization}
                    onChange={handleChange}
                    placeholder="company"
                    className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors ${errors.organization
                      ? 'border-red-400 bg-red-50 focus:border-red-400'
                      : 'border-gray-300 focus:border-[#1E3888]'
                      }`}
                  />
                  {errors.organization && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.organization}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="bd-phone" className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {/* Searchable Custom Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center justify-between gap-1.5 px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white outline-none focus:border-[#1E3888] min-w-[105px] h-full text-left"
                      >
                        <span className="truncate">
                          {countries.find(c => c.dial_code === fields.countryCode)?.code || 'IN'} ({fields.countryCode})
                        </span>
                        <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute left-0 bottom-full mb-1 w-72 rounded-lg border border-gray-200 bg-white shadow-lg z-[100000]" data-lenis-prevent>
                          <div className="p-2 border-b border-gray-100 flex items-center gap-1.5 bg-gray-50 rounded-t-lg">
                            <Search size={14} className="text-gray-400" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search country..."
                              className="w-full bg-transparent border-none outline-none text-xs text-gray-700 placeholder-gray-400 p-0.5"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <div
                            className="max-h-48 overflow-y-auto py-1"
                            style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
                            data-lenis-prevent
                          >
                            {countries
                              .filter(c =>
                                c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                c.dial_code.includes(searchQuery) ||
                                c.code.toLowerCase().includes(searchQuery.toLowerCase())
                              )
                              .map((country) => (
                                <button
                                  key={`${country.code}-${country.dial_code}`}
                                  type="button"
                                  onClick={() => {
                                    setFields(prev => ({ ...prev, countryCode: country.dial_code }));
                                    setIsDropdownOpen(false);
                                    setSearchQuery('');
                                  }}
                                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100 flex items-center justify-between transition-colors"
                                >
                                  <span className="text-gray-800 font-medium truncate pr-2">
                                    {country.name}
                                  </span>
                                  <span className="text-gray-400 flex-shrink-0">
                                    ({country.dial_code})
                                  </span>
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <input
                      id="bd-phone"
                      name="phone"
                      type="tel"
                      value={fields.phone}
                      onChange={handleChange}
                      placeholder="XXXXX XXXXX"
                      className={`flex-1 min-w-0 px-3 py-2 rounded-lg border text-sm outline-none transition-colors ${errors.phone
                        ? 'border-red-400 bg-red-50 focus:border-red-400'
                        : 'border-gray-300 focus:border-[#1E3888]'
                        }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="brochure-download-submit"
                type="submit"
                disabled={status === 'loading'}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-white text-sm bg-[#F2913F] hover:bg-[#E6822B] transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Download Document
                  </>
                )}
              </button>

              <p className="text-center text-gray-400 text-[11px] mt-3">
                Your details are kept private and never shared.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrochureDownloadModal;
