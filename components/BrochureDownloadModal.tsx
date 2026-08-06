'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Download, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface BrochureDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  brochureName: string;
  brochurePath: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  phone: string;
}

const INITIAL_FIELDS: FormFields = {
  firstName: '',
  lastName: '',
  email: '',
  organization: '',
  phone: '',
};

const BrochureDownloadModal = ({
  isOpen,
  onClose,
  brochureName,
  brochurePath,
}: BrochureDownloadModalProps) => {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFields(INITIAL_FIELDS);
      setErrors({});
      setStatus('idle');
      setTimeout(() => firstInputRef.current?.focus(), 150);
    }
  }, [isOpen]);

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
    } else if (!/^[\d\s+\-()]{7,15}$/.test(fields.phone)) {
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
      const body = new URLSearchParams({
        'form-name': 'brochure-download',
        'bot-field': '',
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        organization: fields.organization,
        phone: fields.phone,
        brochure: brochureName,
      }).toString();

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (!response.ok) throw new Error('Submission failed');

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
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#fff', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div
          className="relative px-6 pt-6 pb-4"
          style={{ background: 'linear-gradient(135deg, #1E3888 0%, #8A393B 100%)' }}
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
              <h2 className="text-white font-bold text-lg leading-tight">Download Brochure</h2>
              <p className="text-white/70 text-xs mt-0.5 truncate max-w-[240px]">{brochureName}</p>
            </div>
          </div>
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
                Please fill in your details to download the brochure.
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
                      placeholder="Ramesh"
                      className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors ${
                        errors.firstName
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
                      placeholder="Patil"
                      className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors ${
                        errors.lastName
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
                    placeholder="ramesh@company.com"
                    className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors ${
                      errors.email
                        ? 'border-red-400 bg-red-50 focus:border-red-400'
                        : 'border-gray-300 focus:border-[#1E3888]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>
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
                    placeholder="Your company or institution"
                    className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors ${
                      errors.organization
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
                  <input
                    id="bd-phone"
                    name="phone"
                    type="tel"
                    value={fields.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors ${
                      errors.phone
                        ? 'border-red-400 bg-red-50 focus:border-red-400'
                        : 'border-gray-300 focus:border-[#1E3888]'
                    }`}
                  />
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
                    Download Brochure
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
