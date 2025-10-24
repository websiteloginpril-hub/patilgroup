"use client";
import React, { useState } from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const WhistleblowerPage = () => {
  useGSAPAnimations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const response = await fetch('/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Report Submitted Successfully!",
          description: "Thank you for your report. We take all concerns seriously and will investigate this matter confidentially.",
        });
        
        // Set submitted state to show confirmation
        setIsSubmitted(true);
        
        // Reset form
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your report. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAnother = () => {
    setIsSubmitted(false);
  };
  return (
    <div className="bg-black text-white min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto fade-in-section">
        {!isSubmitted ? (
          <>
            <h1 className="hero-title font-bold text-center text-orange-500">
              Whistleblower Policy
            </h1>
            <p className="mt-8 text-lg text-gray-300 text-center leading-relaxed max-w-3xl mx-auto">
              At Patil's Group, we are committed to maintaining a culture of transparency, integrity, and accountability. Our Whistleblower Policy provides a safe and confidential platform for employees to report any concerns related to unethical behavior, misconduct, or violations of company policies—without fear of retaliation.
            </p>

            {/* Hidden form for Netlify Forms detection */}
            <form name="whistleblower-report" data-netlify="true" hidden>
              <input type="text" name="first-name" />
              <input type="text" name="last-name" />
              <input type="email" name="email" />
              <input type="tel" name="phone" />
              <input type="text" name="message" />
            </form>

            <form 
              name="whistleblower-report"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="mt-16 space-y-8"
            >
              {/* Hidden fields for Netlify */}
              <input type="hidden" name="form-name" value="whistleblower-report" />
              <input type="hidden" name="bot-field" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-400">First Name*</label>
                  <input 
                    type="text" 
                    name="first-name" 
                    id="first-name" 
                    required
                    disabled={isSubmitting}
                    className="mt-2 block w-full px-4 py-3 bg-black border-gray-700 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50" 
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-400">Last Name*</label>
                  <input 
                    type="text" 
                    name="last-name" 
                    id="last-name" 
                    required
                    disabled={isSubmitting}
                    className="mt-2 block w-full px-4 py-3 bg-black border-gray-700 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email*</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    required
                    disabled={isSubmitting}
                    className="mt-2 block w-full px-4 py-3 bg-black border-gray-700 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50" 
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-400">Phone*</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    id="phone" 
                    required
                    disabled={isSubmitting}
                    className="mt-2 block w-full px-4 py-3 bg-black border-gray-700 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50" 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400">Message*</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={6} 
                  required
                  disabled={isSubmitting}
                  className="mt-2 block w-full px-4 py-3 bg-black border-gray-700 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
                ></textarea>
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#F2913F] text-white text-lg hover:bg-[#8A393B] rounded-full px-12 py-3 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </form>
          </>
        ) : (
          /* Show confirmation message when submitted */
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="hero-title font-bold text-green-500 mb-6">
                Report Submitted Successfully!
              </h1>
              <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
                Thank you for bringing this matter to our attention. Your report has been received and will be handled with complete confidentiality.
              </p>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                We take all concerns seriously and will investigate this matter thoroughly. Our team will review your report and take appropriate action while maintaining strict confidentiality and protecting against any retaliation.
              </p>
              <div className="space-y-4">
                <Button 
                  onClick={handleSubmitAnother}
                  className="bg-[#F2913F] text-white text-lg hover:bg-[#8A393B] rounded-full px-8 py-3 font-semibold transition-all duration-300 mr-4"
                >
                  Submit Another Report
                </Button>
                <p className="text-gray-400 text-base">
                  For urgent matters, you can also contact us directly through our confidential channels.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhistleblowerPage;
