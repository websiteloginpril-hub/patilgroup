"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ApplyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (file.size > maxSize) {
      return 'File size must be less than 10MB';
    }

    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a PDF, DOC, or DOCX file';
    }

    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileError = validateFile(file);
      if (fileError) {
        toast({
          title: "Invalid File",
          description: fileError,
          variant: "destructive",
        });
        // Clear the file input
        e.target.value = '';
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    // Clear the file input
    const fileInput = document.getElementById('resume') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Add the selected file to form data if it exists
      if (selectedFile) {
        formData.set('resume', selectedFile);
      }
      
      // Validate file if uploaded
      if (selectedFile) {
        const fileError = validateFile(selectedFile);
        if (fileError) {
          toast({
            title: "Invalid File",
            description: fileError,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      }
      
      // For file uploads, we need to send FormData directly (not URLSearchParams)
      const response = await fetch('/', {
        method: 'POST',
        body: formData, // Send FormData directly for file uploads
      });

      if (response.ok) {
        toast({
          title: "Application Submitted Successfully!",
          description: "Thank you for your interest in joining Patil Group. We'll review your application and resume and get back to you soon.",
        });
        
        // Set submitted state to show confirmation
        setIsSubmitted(true);
        
        // Reset form
        (e.target as HTMLFormElement).reset();
        setSelectedFile(null);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again or contact us directly at careers@patilgroup.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to reset and show form again
  const handleApplyAgain = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {!isSubmitted ? (
          <>
            <h2 className="text-5xl md:text-6xl font-bold text-center text-orange-500 mb-12">
              Apply Now
            </h2>
        
            {/* Hidden form for Netlify Forms detection */}
            <form name="career-application" data-netlify="true" hidden>
          <input type="text" name="first-name" />
          <input type="text" name="last-name" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <input type="text" name="address" />
          <input type="text" name="position" />
          <input type="file" name="resume" />
        </form>

        <form 
          name="career-application" 
          method="POST" 
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Hidden fields for Netlify */}
          <input type="hidden" name="form-name" value="career-application" />
          <input type="hidden" name="bot-field" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="first-name" className="text-lg text-gray-400">First name*</label>
              <Input 
                id="first-name" 
                name="first-name"
                required
                disabled={isSubmitting}
                className="bg-black border-gray-700 rounded-full text-white text-base" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="last-name" className="text-lg text-gray-400">Last name*</label>
              <Input 
                id="last-name" 
                name="last-name"
                required
                disabled={isSubmitting}
                className="bg-black border-gray-700 rounded-full text-white text-base" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="email" className="text-lg text-gray-400">Email*</label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                required
                disabled={isSubmitting}
                className="bg-black border-gray-700 rounded-full text-white text-base" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-lg text-gray-400">Phone*</label>
              <Input 
                id="phone" 
                name="phone"
                type="tel" 
                required
                disabled={isSubmitting}
                className="bg-black border-gray-700 rounded-full text-white text-base" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="address" className="text-lg text-gray-400">Address*</label>
            <Input 
              id="address" 
              name="address"
              required
              disabled={isSubmitting}
              className="bg-black border-gray-700 rounded-full text-white" 
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="position" className="text-lg text-gray-400">Position*</label>
            <Input 
              id="position" 
              name="position"
              required
              disabled={isSubmitting}
              placeholder="e.g. Civil Engineer, Project Manager, Quality Control Specialist"
              className="bg-black border-gray-700 rounded-full text-white text-base placeholder:text-sm" 
            />
          </div>
          
          {/* Resume/CV Upload */}
          <div className="space-y-2">
            <label htmlFor="resume" className="text-lg text-gray-400">Resume/CV*</label>
            <div className="relative">
              {!selectedFile ? (
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  disabled={isSubmitting}
                  onChange={handleFileChange}
                  className="w-full px-4 py-4 bg-black border border-gray-700 rounded-full text-white text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-base file:font-semibold file:bg-[#F2913F] file:text-white hover:file:bg-[#8A393B] file:cursor-pointer cursor-pointer transition-all duration-300"
                />
              ) : (
                <div className="w-full px-4 py-3 bg-black border border-gray-700 rounded-full text-white flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-[#F2913F]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base text-white truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    disabled={isSubmitting}
                    className="flex-shrink-0 ml-3 p-1 rounded-full bg-gray-700 hover:bg-red-600 text-gray-300 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Remove file"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX (Max size: 10MB)
            </p>
          </div>
          <div className="text-center pt-6">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#F2913F] text-white text-lg hover:bg-[#8A393B] rounded-full px-14 py-4 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
          
          {/* Contact info for alternative submission */}
          <div className="text-center pt-4">
            <p className="text-gray-400 text-base">
              Having trouble? Email us directly at{' '}
              <a 
                href="mailto:careers@patilgroup.com" 
                className="text-[#F2913F] hover:text-[#8A393B] transition-colors text-base"
              >
                careers@patilgroup.com
              </a>
            </p>
          </div>
        </form>
          </>
        ) : (
          /* Show confirmation message when submitted */
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-green-500 mb-6">
                Application Submitted Successfully!
              </h2>
              <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
                Thank you for your interest in joining Patil Group. We have received your application and resume.
              </p>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                Our HR team will review your application carefully and contact you within 5-7 business days regarding the next steps in our recruitment process.
              </p>
              <div className="space-y-4">
                <Button 
                  onClick={handleApplyAgain}
                  className="bg-[#F2913F] text-white text-lg hover:bg-[#8A393B] rounded-full px-8 py-3 font-semibold transition-all duration-300 mr-4"
                >
                  Submit Another Application
                </Button>
                <p className="text-gray-400 text-base">
                  Questions? Contact us at{' '}
                  <a 
                    href="mailto:careers@patilgroup.com" 
                    className="text-[#F2913F] hover:text-[#8A393B] transition-colors"
                  >
                    careers@patilgroup.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyForm; 