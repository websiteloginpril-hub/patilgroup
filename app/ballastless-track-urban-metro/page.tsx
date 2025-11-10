"use client";
import Image from 'next/image';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

const BallastlessTrackUrbanMetroPage = () => {
  useGSAPAnimations();
  
  return (
    <div>
      <div className="relative h-screen max-h-screen overflow-hidden hero-section">
        {/* Mobile Layout */}
        <div className="md:hidden h-full relative hero-image">
          <img src="/Ballestless generated image.png" alt="Ballastless Track Urban Metro" className="h-full w-full object-cover z-0" />
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          
          <div className="absolute inset-0 flex items-center justify-start z-20 py-8 hero-content">
            <div className="text-left px-6">
              <h1 className="hero-title font-bold text-white leading-tight mb-4 drop-shadow-2xl">
                Ballastless Track<br />for Urban Metros
              </h1>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mr-auto rounded-full shadow-lg"></div>
              <p className="text-gray-200 hero-subtitle mt-4 font-medium">
                Precision metro solutions
              </p>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:block relative h-full hero-image">
          <img src="/Ballestless generated image.png" alt="Ballastless Track Urban Metro" className="h-full w-full object-cover z-0" />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          
          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center hero-content">
            <div className="px-6 sm:px-8 md:px-12 text-left">
              <h1 className="text-white font-bold leading-[0.95] hero-title">
                Ballastless Track<br />for Urban Metros
              </h1>
              <p className="text-gray-200 hero-subtitle mt-4 font-medium">
                Precision Metro Solutions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10 relative">
        {/* Top Left Gradient Line */}
        <div 
          className="absolute hidden lg:block fade-in-section"
          style={{
            width: '764px',
            height: '28px',
            left: '0px',
            top: '0px',
            background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)'
          }}
        />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <p className="text-black fluid-body">
            Urban metro systems demand high precision, uninterrupted service, and long-term structural integrity. Our ballastless track system for urban metros is based on precast plinths, offering a modular, high-performance solution for elevated and underground corridors.
          </p>
        </div>

        {/* Bottom Right Gradient Line */}
        <div 
          className="absolute hidden lg:block fade-in-section"
          style={{
            width: '664px',
            height: '28px',
            right: '0px',
            bottom: '40px',
            background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 97.12%)'
          }}
        />
      </section>

      {/* Leading Change Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <div className="bg-[#F5F4F1] p-8 sm:p-10 md:p-12 rounded-lg shadow-sm">
            <h2 className="text-[#8A393B] fluid-h2 font-bold mb-6">
              Leading change in Indian Railways
            </h2>
            <p className="text-black fluid-body">
              At Patil Group, we pioneered the adoption of RHEDA ballastless track systems in India—an achievement that reshaped track infrastructure for one of the world's busiest rail networks. Our journey was marked by challenges, breakthroughs, and innovation, and it has set a new benchmark for safety, precision, and reliability in Indian Railways.
                </p>
              </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <h3 className="text-[#F2913F] text-xl sm:text-2xl md:text-3xl font-bold mb-6">
            The challenge
          </h3>
          <ul className="space-y-3 text-black fluid-body">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0 mt-3"></span>
              <span>Convincing Indian Railways to adopt Patil RHEDA technology was not easy, as existing BLT designs were already in place.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0 mt-3"></span>
              <span>Existing BLT systems were failing, raising safety concerns for millions of daily passengers.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0 mt-3"></span>
              <span>Decision-makers required extensive assurances on design and safety before considering a new system.</span>
            </li>
                </ul>
              </div>
      </section>

      {/* Turning Point Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <h3 className="text-[#F2913F] text-xl sm:text-2xl md:text-3xl font-bold mb-6">
            Turning point
          </h3>
          <p className="text-black fluid-body">
                  In December 2006, after months of discussions, technical presentations, and outreach, we earned the trust of Indian Railways and secured approval to adopt Patil RHEDA sleepers.
                </p>
              </div>
      </section>

      {/* Design & Development Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <h3 className="text-[#F2913F] text-xl sm:text-2xl md:text-3xl font-bold mb-6">
            Design and development
          </h3>
          <ul className="space-y-3 text-black fluid-body">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0 mt-3"></span>
              <span>Creating a sleeper for India's most demanding track system required unmatched precision and innovation.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0 mt-3"></span>
              <span>We explored multiple design iterations before arriving at the final mold.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0 mt-3"></span>
              <span>Extensive R&D ensured every sleeper met exacting safety and quality standards.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0 mt-3"></span>
              <span>We tested different material combinations and tolerance levels to optimize performance.</span>
            </li>
                </ul>
          
          {/* Outcome Box */}
          <div className="bg-[#F5F4F1] p-6 sm:p-8 rounded-lg mt-6">
            <h4 className="text-[#F2913F] text-lg sm:text-2xl font-bold mb-3">Outcome</h4>
            <p className="text-black fluid-body">
                    A sleeper design that delivers both strength and reliability, validated through repeated trials.
                  </p>
                </div>
              </div>
      </section>

      {/* Installation & Execution Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <h3 className="text-[#F2913F] text-xl sm:text-2xl md:text-3xl font-bold mb-6">
            Installation and execution
          </h3>
          <ul className="space-y-3 text-black fluid-body">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0 mt-3"></span>
              <span>Execution demanded as much precision as design.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0 mt-3"></span>
              <span>Transporting and handling sleepers required specialized equipment such as spindle bars to prevent damage.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0 mt-3"></span>
              <span>Every step had to be finalized before concrete pouring, as changes were not possible afterward.</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mr-4 flex-shrink-0 mt-3"></span>
              <span>Working under strict delivery timelines of just 40 days, we maintained rigorous monitoring to ensure zero errors.</span>
            </li>
                </ul>
          
          {/* Result Box */}
          <div className="bg-[#F5F4F1] p-6 sm:p-8 rounded-lg mt-6">
            <h4 className="text-[#F2913F] text-lg sm:text-2xl font-bold mb-3">Outcome</h4>
            <p className="text-black fluid-body">
                    Safe, efficient, and timely installation of Patil RHEDA sleepers—demonstrating our ability to deliver complex infrastructure under pressure.
                  </p>
                </div>
              </div>
      </section>

      {/* Legacy & Impact Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10 relative">
        {/* Left Edge Gradient Line */}
        <div 
          className="absolute hidden lg:block fade-in-section gradient-line-ltr gradient-line-md"
          style={{
            height: '28px',
            left: '0px',
            top: '30%',
            transform: 'translateY(-50%)'
          }}
        />
        
        {/* Right Edge Gradient Line */}
        <div 
          className="absolute hidden lg:block fade-in-section gradient-line-rtl gradient-line-md"
          style={{
            height: '28px',
            right: '0px',
            top: '30%',
            transform: 'translateY(-50%)'
          }}
        />
        
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-8 fade-in-section">
          <h3 className="text-[#8A393B] text-xl sm:text-2xl md:text-5xl font-bold mb-6 text-center">
            Legacy and impact
          </h3>
          <p className="text-black fluid-body text-center">
                  Today, Patil RHEDA and BLT systems are synonymous with reliability in Indian Railways. By overcoming early challenges, we proved that innovation and perseverance can redefine national infrastructure.
                </p>
              </div>
      </section>

      {/* Image and Benefits Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 fade-in-section">
            {/* Image */}
            <div className="w-full md:w-1/2">
                <Image
                  src="/ballastlesstrack1.jpg"
                alt="Ballastless track tunnel construction" 
                width={800} 
                height={600} 
                className="rounded-lg shadow-lg w-full h-auto object-cover" 
                loading="lazy" 
                />
              </div>
            
            {/* Content */}
            <div className="w-full md:w-1/2">
              <p className="text-[#F2913F] fluid-body">
                With reduced on-site casting, consistent alignment, and low maintenance needs, it supports fast-track construction and dependable daily operations across dense urban environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Line Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <h2 className="text-[#8A393B] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 leading-tight">
            Ballastless Track System for Main Lines
          </h2>
          <p className="text-black fluid-body max-w-4xl">
            In mainline applications—such as tunnels, bridges, and station zones—ballastless track offers a durable, low-maintenance alternative to conventional systems. Our design accommodates high-speed movement, continuous loading, and complex terrain.
          </p>
        </div>
      </section>

      {/* Metro Projects Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 fade-in-section">
            {/* Image */}
            <div className="w-full md:w-1/2">
                <Image
                  src="/2nd Image ballestless change.png"
                  alt="Ballastless track deployment across metro projects"
                width={800} 
                height={600} 
                className="rounded-lg shadow-lg w-full h-auto object-cover" 
                loading="lazy" 
                />
              </div>
            
            {/* Content */}
            <div className="w-full md:w-1/2">
              <p className="text-[#8A393B] fluid-body font-bold mb-6">
                This system has been successfully deployed in multiple metro projects, including:
              </p>
              <ul className="space-y-2 text-black fluid-body">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Bangalore Metro
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Delhi Metro
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Mumbai Metro
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
                  Chennai Metro
                </li>
                </ul>
              </div>
            </div>
          </div>
      </section>

      {/* Performance Statement Section */}
      <section className="bg-white py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-section">
          <p className="text-[#8A393B] fluid-body font-bold text-justify">
              Engineered for long operational life with minimal intervention, the system ensures stable geometry, reduced deflection, and consistent track performance under both freight and passenger traffic.
            </p>
        </div>
      </section>
      
    </div>
  );
};

export default BallastlessTrackUrbanMetroPage; 