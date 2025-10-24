"use client";
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import HLSVideo from '@/components/HLSVideo';

export default function LegacyPage() {
  useGSAPAnimations();
  const TrackTimeline = require('../../components/legacy/TrackTimeline').default as any;
  const { legacyTimeline } = require('./timelineData');
  return (
    <div>
      {/* Responsive Legacy Hero Section */}
      <section className="relative h-screen w-full overflow-hidden hero-section">
        {/* Background video (wrapped for parallax) */}
        <div className="absolute inset-0 w-full h-full hero-video">
          <HLSVideo
            src="https://customer-5j20f6geb6l5wmm2.cloudflarestream.com/ceec789bbff98173c6c4a3fda4c5520d/manifest/video.m3u8"
            fallbackSrc="/ourlegacy1.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            preload="metadata"
          />
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-[1]" />
        
        {/* Hero Content (wrapped for parallax) */}
        <div className="absolute inset-0 z-10 hero-content">
          {/* Mobile Layout */}
          <div className="md:hidden absolute inset-0">
            <div className="relative h-full flex items-center justify-start px-4">
              <div className="w-full max-w-lg">
                <h1 className="text-white font-bold hero-title">
                  <span className="block">Our</span>
                  <span className="block mt-2">Legacy</span>
                </h1>
                <p className="text-[#F2913F] mt-6 hero-subtitle font-bold">
                  Grounded in Use
                </p>
              </div>
            </div>
          </div>

        {/* Desktop Layout - Left side positioning */}
        <div className="hidden md:block absolute left-0" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <div className="px-6 md:px-8 lg:px-12">
            <h1 className="text-white font-bold leading-[75%] hero-title">
              <span className="block">Our</span>
              <span className="block mt-3">Legacy</span>
            </h1>
            <p className="text-[#F2913F] mt-8 hero-subtitle font-bold">
              Grounded in Use
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Adjust 'trainXOffset' to nudge the train horizontally (px). Positive moves right, negative left. */}
      <div className="content-visibility-auto">
        <TrackTimeline items={legacyTimeline} trackSrc="/legacytrack.svg" trainSrc="/legacytrain.svg" trainXOffset={-98} />
        </div>
    </div>
  );
}