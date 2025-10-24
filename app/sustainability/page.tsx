"use client";
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import Image from 'next/image';
import { TypingAnimation } from '@/components/TypingAnimation';
import HLSVideo from '@/components/HLSVideo';

export default function SustainabilityPage() {
  useGSAPAnimations();
  return (
    <div>
      {/* Responsive Hero Section - Single Frame with Parallax */}
      <section className="relative h-screen max-h-screen w-full overflow-hidden fade-in-section hero-section">
        {/* Background video (parallax layer) */}
        <div className="absolute inset-0 w-full h-full hero-video">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            preload="metadata"
          >
            <source src="/sustainhero.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 md:hidden" />
        <div className="absolute inset-0 bg-black/60 hidden md:block" />
        
        {/* Hero content (parallax layer) */}
        <div className="absolute inset-0 z-10 hero-content">
          {/* Mobile Layout */}
          <div className="md:hidden h-full flex items-center justify-center">
            <div className="text-center px-4 w-full max-w-lg mx-auto">
              <h1 className="text-white font-bold hero-title drop-shadow-2xl mb-6">
                Sustainability
              </h1>
              <p className="text-[#F2913F] font-medium hero-subtitle drop-shadow-xl">
                Quiet changes. Tangible outcomes.
              </p>
              <p className="text-white hero-subtitle mt-3 drop-shadow-xl">
                Built into every plant, <span className="font-semibold">every process.</span>
              </p>
            </div>
          </div>
          
          {/* Desktop Layout - Centered positioning */}
          <div className="hidden md:flex h-full items-center justify-center">
            <div className="text-center px-6 md:px-8 lg:px-12">
              <h1 className="text-white font-bold hero-title drop-shadow-lg mb-6">
                Sustainability
              </h1>
              <p className="text-[#F2913F] font-medium hero-subtitle drop-shadow-xl">
                Quiet changes. Tangible outcomes.
              </p>
              <p className="text-white hero-subtitle mt-4 drop-shadow-xl">
                Built into every plant, <span className="font-semibold">every process.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Clean power / clean cycles */}
      <section className="bg-white py-8 sm:py-12 md:py-16 lg:py-24 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Mobile Header */}
          <div className="md:hidden text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              <span className="text-[#8A393B]">Clean power</span>
              <span className="italic text-[#008000] font-normal block sm:inline"> clean cycles</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-[#8A393B] mx-auto mt-4 rounded-full"></div>
          </div>
          
          {/* Desktop Header */}
          <div className="hidden md:block">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
              <span className="text-[#8A393B]">Clean power</span>
              <span className="italic text-[#008000] font-normal"> clean cycles</span>
            </h2>
          </div>

          {/* Mobile Content - Enhanced Card Layout with Images */}
          <div className="md:hidden mt-8 space-y-6">
            {[
              {
                title: "Solar generation",
                items: ["With 18 sites across India and an on-grid capacity of 5.4 megawatts, our solar generation network significantly reduces dependence on fossil fuels and lowers the overall carbon footprint of operations. This renewable infrastructure powers a substantial share of our manufacturing activities, ensuring cleaner and more sustainable production."],
                image: "/solargeneration.webp",
                color: "from-green-500 to-emerald-600"
              },
              {
                title: "Water reuse", 
                items: ["Recycled curing water is processed through closed-loop Water Treatment Plants (WTPs), dramatically reducing overall consumption and ensuring efficient use of every drop. By implementing zero-discharge processes across all facilities, the system prevents waste and protects natural water bodies from contamination."],
                image: "/waterreuse.jpg",
                color: "from-blue-500 to-cyan-600"
              },
              {
                title: "Dust control",
                items: ["Factory air is managed at the source through advanced multi-stage dust extraction systems installed across all units, creating a cleaner, safer, and healthier environment for every worker. High-efficiency filtration technology ensures that airborne particles are captured before they spread, maintaining optimal air quality standards throughout operations."],
                image: "/dust control_.png",
                color: "from-gray-500 to-slate-600"
              }
            ].map((section, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 fade-in-section">
                {/* Mobile Card Header with Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.title}
                    width={600}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg leading-tight">
                      {section.title}
                    </h3>
                    <div className={`w-16 h-1 bg-gradient-to-r ${section.color} mt-2 rounded-full shadow-lg`}></div>
                  </div>
                </div>
                
                {/* Mobile Card Content */}
                <div className="p-6">
                  <div className="space-y-3">
                    {section.items.map((item, i) => (
                      <div key={i} className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Mobile Card Footer */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-[#8A393B] font-medium text-sm">
                      <div className="w-2 h-2 bg-[#F2913F] rounded-full mr-2"></div>
                      Sustainability Initiative
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop Content - Safety page style layout */}
          <div className="hidden md:block mt-16">
            <div className="space-y-8">
              {/* Solar generation */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">Solar generation</h3>
                <div className="space-y-3 text-xl md:text-2xl text-gray-800 leading-relaxed mb-6 text-justify">
                  <p>With 18 sites across India and an on-grid capacity of 5.4 megawatts, our solar generation network significantly reduces dependence on fossil fuels and lowers the overall carbon footprint of operations. This renewable infrastructure powers a substantial share of our manufacturing activities, ensuring cleaner and more sustainable production. Designed for scalability, the system continues to expand as energy demands grow, reinforcing long-term environmental goals. By integrating solar energy into daily operations, we demonstrate a strong commitment to innovation, responsibility, and the transition toward a greener future across all our facilities.</p>
                </div>
                <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
                  <Image
                    src="/solargeneration.webp"
                    alt="Solar generation facility"
                    width={800}
                    height={400}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Water reuse */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">Water reuse</h3>
                <div className="space-y-3 text-xl md:text-2xl text-gray-800 leading-relaxed mb-6 text-justify">
                  <p>Recycled curing water is processed through closed-loop Water Treatment Plants (WTPs), dramatically reducing overall consumption and ensuring efficient use of every drop. By implementing zero-discharge processes across all facilities, the system prevents waste and protects natural water bodies from contamination. This comprehensive approach not only conserves a vital resource but also aligns with global sustainability standards. Designed for long-term reliability, the water management framework supports both operational efficiency and environmental stewardship, reflecting our commitment to responsible resource utilization and sustainable manufacturing practices.</p>
                </div>
                <div className="relative group overflow-hidden mb-8" style={{
                  borderRadius: '11px',
                  background: '#FFF',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}>
                  <div style={{
                    width: '1248px',
                    height: '342px',
                    maxWidth: '100%',
                    position: 'relative'
                  }}>
                    <Image
                      src="/water.jpg"
                      alt="Water reuse system"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{ borderRadius: '11px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Dust control */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">Dust control</h3>
                <div className="space-y-3 text-xl md:text-2xl text-gray-800 leading-relaxed mb-6 text-justify">
                  <p>Factory air is managed at the source through advanced multi-stage dust extraction systems installed across all units, creating a cleaner, safer, and healthier environment for every worker. High-efficiency filtration technology ensures that airborne particles are captured before they spread, maintaining optimal air quality standards throughout operations. These systems not only safeguard employee health but also protect sensitive machinery from dust-related wear, extending equipment life and reducing downtime. Designed for continuous performance and low maintenance, the dust control framework reflects our commitment to workplace safety, regulatory compliance, and sustainable industrial practices.</p>
                </div>
                <div className="relative group overflow-hidden mb-8" style={{
                  borderRadius: '11px',
                  background: '#FFF',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}>
                  <div style={{
                    width: '1248px',
                    height: '342px',
                    maxWidth: '100%',
                    position: 'relative'
                  }}>
                    <Image
                      src="/dust control_.png"
                      alt="Dust control system"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{ borderRadius: '11px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Responsive Efficiency and intent statements */}
      <section className="bg-white py-8 sm:py-12 md:py-16 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Mobile Layout */}
          <div className="md:hidden space-y-6 text-center">
            <div className="bg-white rounded-2xl p-6">
              <p className="text-[#8A393B] font-semibold text-lg sm:text-xl leading-snug mb-3">
                Every decision — audited for efficiency
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#F2913F] to-transparent mx-auto rounded-full" />
            </div>
            
            <div className="bg-white rounded-2xl p-6">
              <p className="text-[#008000] font-semibold text-lg sm:text-xl leading-snug mb-3">
                Every plant — aligned with green intent
              </p>
              <div className="w-24 h-1 bg-gradient-to-l from-[#F2913F] to-transparent mx-auto rounded-full" />
            </div>
          </div>
          
          {/* Desktop Layout - Two lines stacked */}
          <div className="hidden md:block space-y-4">
            <div className="flex items-center">
              <p className="text-[#8A393B] font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight">
                Every decision — audited for efficiency
              </p>
              <div className="ml-auto h-2 md:h-3 flex-1 max-w-2xl bg-gradient-to-r from-[#F2913F] via-[#1E3888] to-transparent rounded-full" />
            </div>
            <div className="flex items-center">
              <div className="mr-auto h-2 md:h-3 flex-1 max-w-2xl bg-gradient-to-l from-[#F2913F] via-[#1E3888] to-transparent rounded-full" />
              <p className="text-[#008000] font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight text-right">
                Every plant — aligned with green intent
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
