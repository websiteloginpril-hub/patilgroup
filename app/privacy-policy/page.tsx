"use client";

import React from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import Footer from '@/components/Footer';

const PrivacyPolicyPage = () => {
  useGSAPAnimations();
  return (
    <div className="bg-black text-white">
      <main className="min-h-screen py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <h1 className="hero-title font-bold font-clash text-white mb-16">Privacy Policy</h1>
          
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-orange-500 mb-4">A legal disclaimer</h2>
              <p className="text-lg leading-relaxed text-gray-300">
                The explanations and information provided on this page are only general and high-level explanations and information on how to write your own document of a Privacy Policy. You should not rely on this article as legal advice or as recommendations regarding what you should actually do, because we cannot know in advance what are the specific privacy policies you wish to establish between your business and your customers and visitors. We recommend that you seek legal advice to help you understand and to assist you in the creation of your own Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-orange-500 mb-4">Privacy Policy - the basics</h2>
              <p className="text-lg leading-relaxed text-gray-300 mb-4">
                Having said that, a privacy policy is a statement that discloses some or all of the ways a website collects, uses, discloses, processes, and manages the data of its visitors and customers. It usually also includes a statement regarding the website's commitment to protecting its visitors' or customers' privacy, and an explanation about the different mechanisms the website is implementing in order to protect privacy.
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                Different jurisdictions have different legal obligations of what must be included in a Privacy Policy. You are responsible to make sure you are following the relevant legislation to your activities and location.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-orange-500 mb-4">What to include in the Privacy Policy</h2>
              <p className="text-lg leading-relaxed text-gray-300">
                Generally speaking, a Privacy Policy often addresses these types of issues: the types of information the website is collecting and the manner in which it collects the data; an explanation about why is the website collecting these types of information; what are the website's practices on sharing the information with third parties; ways in which your visitors and customers can exercise their rights according to the relevant privacy legislation; the specific practices regarding minors' data collection; and much, much more.
              </p>
            </div>
            
            <div className="pt-8">
              <p className="text-4xl font-bold text-orange-500">
                To learn more about this,
              </p>
              <p className="text-4xl font-bold text-orange-500">
                check out our article
              </p>
              <p className="text-4xl font-bold text-red-700 italic">
                “Creating a Privacy Policy”
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage; 