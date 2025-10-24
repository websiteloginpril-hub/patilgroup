"use client";

import React from 'react';
import Image from 'next/image';
import { TypingAnimation } from '@/components/TypingAnimation';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

const SafetyPage = () => {
  useGSAPAnimations();
  return (
    <div className="bg-white text-black">
      {/* Responsive Hero Section */}
      <div className="relative h-screen hero-section">
        {/* Background Image */}
        <Image
          src="/safetyside.jpg"
          alt="Safety"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="z-0 hero-image"
          priority
        />
        
        {/* Mobile Layout */}
        <div className="md:hidden absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 z-10"></div>
          <div className="relative z-20 h-full flex items-center justify-start hero-content px-6">
            <div className="text-left w-full max-w-md">
              <div className="p-8">
                <div className="animate-fadeInUp">
                  <h1 className="hero-title font-bold text-white leading-tight mb-4 drop-shadow-2xl">
                    Rail Wayside Safety
                  </h1>
                  <div className="w-20 h-1.5 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mx-auto mb-4 rounded-full shadow-lg"></div>
                  <p className="text-gray-200 text-base font-medium tracking-wide drop-shadow-2xl">Protecting tracks, securing journeys</p>
                  
                  {/* Mobile CTA Hint */}
                  <div className="mt-6 opacity-80">
                    <p className="text-gray-300 text-sm animate-pulse drop-shadow-xl">
                      Scroll to explore safety solutions →
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout - Bottom left positioning */}
        <div className="hidden md:block">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="absolute inset-0 z-20 hero-content flex items-center justify-start">
            <div className="px-8 lg:px-12">
              <h1 className="hero-title font-bold text-white leading-tight drop-shadow-lg">Rail Wayside Safety</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Protecting tracks / Securing Journeys */}
      <section className="bg-white text-black py-8 sm:py-12 md:py-16 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Split Heading Layout */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="space-y-2 sm:space-y-4">
              <h2 className="fluid-h2 font-bold text-[#8A393B] leading-tight">
                Protecting tracks
              </h2>
              <h3 className="fluid-h3 font-bold text-[#F2913F] leading-tight">
                Securing journeys
              </h3>
            </div>
          </div>
          
          {/* Description text */}
            <div className="text-center">
            <p className="fluid-body text-gray-700 max-w-5xl mx-auto text-justify">
                Patil Group builds practical, durable solutions to keep railway corridors safe and operational. From high-speed routes to regional lines, our systems are made to prevent intrusions, reduce risks and ensure uninterrupted train movement.
              </p>
          </div>
        </div>
      </section>


      {/* Track fencing / Precast Safety Infrastructure with Background */}
      <section className="relative bg-white text-black py-8 sm:py-12 md:py-16">
        {/* Background Image Section with Overlay Text */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-8 sm:mb-12 md:mb-16 fade-in-section">
          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="relative h-40 sm:h-48 rounded-lg overflow-hidden">
              <Image
                src="/safetyprecastnew.png"
                alt="Track fencing and safety infrastructure"
                fill
                className="object-cover"
                priority
              />
              
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/50"></div>
              
              {/* Gradient line removed as requested */}
              
              {/* Mobile Text Overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="px-4 sm:px-6 w-full">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 drop-shadow-2xl">
                      Track fencing
                    </h3>
                    <h3 className="text-lg sm:text-xl font-bold text-[#F2913F] leading-tight drop-shadow-2xl">
                      Precast Safety Infrastructure
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="relative h-72 xl:h-80 rounded-lg overflow-hidden">
              <Image
                src="/safetyprecastnew.png"
                alt="Track fencing and safety infrastructure"
                fill
                className="object-cover"
                priority
              />
              
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
              
              {/* Gradient line removed as requested */}
              
              {/* Desktop Text Overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="px-12 w-full">
                  <div className="max-w-4xl">
                    <h3 className="text-6xl xl:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
                      Track fencing
                    </h3>
                    <h3 className="text-5xl xl:text-6xl font-bold text-[#F2913F] leading-tight drop-shadow-2xl">
                      Precast Safety Infrastructure
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Mobile Layout */}
          <div className="lg:hidden">
            

            
            {/* Other Safety Fencing Heading */}
            <div className="mb-8 fade-in-section">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                <span className="text-[#8A393B]">Other </span>
                <span className="text-[#F2913F]">Safety Fencing</span>
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-[#8A393B] to-[#F2913F] rounded-full"></div>
            </div>
            
            {/* Mobile Content Cards with Images */}
            <div className="space-y-6">
              {[
                {
                  title: "W beam fence",
                  content: "Galvanized steel with a corrugated W profile, this fencing system is engineered to provide strong and reliable protection. It is designed to prevent animals, vehicles, and trespassers from entering the track zone, ensuring operational safety and minimizing accidents. Durable and weather-resistant, the W beam fence requires minimal maintenance while offering long-term performance. Already in use along critical corridors such as Mumbai to Ahmedabad, it stands as a proven solution for large-scale rail infrastructure projects.",
                  image: "/beamfence.jpg"
                },
                {
                  title: "Fixed knot wire fence",
                  content: "Made from high-tensile steel mesh, the fixed knot wire fence offers reliable and long-lasting perimeter security. Its unique knotting design ensures rigidity and strength, preventing displacement and maintaining tension over large stretches. Quick to install and adaptable to uneven or sloping terrain, it provides an efficient barrier against both human intrusion and animal entry. With low maintenance needs and high durability, the fixed knot wire fence is a cost-effective solution for securing extensive rail corridors and sensitive infrastructure zones.",
                  image: "/fixedknot.jpg"
                },
                {
                  title: "Crash barriers and security walls",
                  content: "Crash barriers and security walls are critical safety installations designed to shield work zones, safeguard trackside equipment, and prevent unauthorized access. Built with reinforced materials, they provide a strong physical barrier against vehicle impact and trespassing, significantly reducing the risk of accidents near rail corridors. These systems are engineered for durability, withstanding harsh weather and continuous operational stress while requiring minimal upkeep. Beyond protection, they also help streamline operations by clearly demarcating restricted areas, ensuring both worker and passenger safety. Widely deployed across major infrastructure projects, crash barriers and security walls form an essential layer of defence in modern rail networks.",
                  image: "/crashbarrier.jpg"
                },
                {
                  title: "Platform copings",
                  content: "Platform copings are precision-engineered elements designed to ensure passenger safety and comfort at stations. Manufactured with anti-slip surfaces, they minimize the risk of slips and falls, even under wet conditions. Integrated tactile indicators provide essential guidance for visually impaired passengers, helping them navigate platforms with confidence and security. Built to withstand heavy foot traffic and daily operational stress, these copings combine durability with functionality. Their consistent quality and reliable performance make them an indispensable feature across modern railway and metro networks, supporting both safety and accessibility standards.",
                  image: "/platformcooping.jpg"
                },
                {
                  title: "Cable troughs and drains",
                  content: "Cable troughs and drains are essential components for maintaining safe and efficient rail operations. Designed to securely house and protect signaling and power lines, they prevent accidental damage, tampering, and exposure to harsh environmental conditions. At the same time, integrated drainage systems ensure that rainwater and runoff are effectively channelled away, keeping the tracks free from waterlogging and structural damage. Built with durable, weather-resistant materials, these systems require minimal maintenance while offering long-term reliability. By combining protection for critical infrastructure with effective trackside water management, cable troughs and drains play a vital role in ensuring uninterrupted rail services and operational safety.",
                  image: "/drainage.webp"
                },
                {
                  title: "Noise barriers",
                  content: "Noise barriers are engineered to minimize sound disturbance in residential and sensitive zones along railway corridors. By reducing the transmission of operational noise, they create a quieter environment for surrounding communities, enhancing overall quality of life. In addition to comfort, these barriers improve safety by limiting distractions for both passengers and operators. Constructed from durable, weather-resistant materials, they are designed to perform effectively over long service cycles with minimal maintenance. Noise barriers are a critical feature of modern rail infrastructure, balancing the demands of high-capacity rail systems with environmental responsibility and community well-being.",
                  image: "/noisebarrier.jpg"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 fade-in-section">
                  {/* Mobile Card Header with Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg leading-tight">
                        {item.title}
                      </h4>
                      <div className="w-12 h-1 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mt-2 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Mobile Card Content */}
                  <div className="p-6">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                      {item.content}
                    </p>
                  </div>
                  
                  {/* Mobile Card Footer */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center text-[#8A393B] font-medium text-sm">
                      <div className="w-2 h-2 bg-[#F2913F] rounded-full mr-2"></div>
                      Railway Safety Solution
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="slide-in-left">
                {/* Other Safety Fencing Heading */}
                <div className="mb-12 fade-in-section">
                  <h3 className="fluid-h3 font-bold mb-4">
                    <span className="text-[#8A393B]">Other </span>
                    <span className="text-[#F2913F]">Safety Fencing</span>
                </h3>
                  <div className="w-32 h-2 bg-gradient-to-r from-[#8A393B] to-[#F2913F] rounded-full"></div>
                </div>

                {/* Content sections with spacing */}
                <div className="space-y-8">
                  <div>
                    <h4 className="fluid-h4 font-bold text-black mb-4">W beam fence</h4>
                    <p className="fluid-body text-gray-800 mb-6 text-justify">
                      Galvanized steel with a corrugated W profile, this fencing system is engineered to provide strong and reliable protection. It is designed to prevent animals, vehicles, and trespassers from entering the track zone, ensuring operational safety and minimizing accidents. Durable and weather-resistant, the W beam fence requires minimal maintenance while offering long-term performance. Already in use along critical corridors such as Mumbai to Ahmedabad, it stands as a proven solution for large-scale rail infrastructure projects.
                    </p>
                    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
                      <Image
                        src="/beamfence.jpg"
                        alt="W beam fence installation"
                        width={800}
                        height={400}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="fluid-h4 font-bold text-black mb-4">Fixed knot wire fence</h4>
                    <p className="fluid-body text-gray-800 mb-6 text-justify">
                      Made from high-tensile steel mesh, the fixed knot wire fence offers reliable and long-lasting perimeter security. Its unique knotting design ensures rigidity and strength, preventing displacement and maintaining tension over large stretches. Quick to install and adaptable to uneven or sloping terrain, it provides an efficient barrier against both human intrusion and animal entry. With low maintenance needs and high durability, the fixed knot wire fence is a cost-effective solution for securing extensive rail corridors and sensitive infrastructure zones.
                    </p>
                    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
                      <Image
                        src="/fixedknot.jpg"
                        alt="Fixed knot wire fence installation"
                        width={800}
                        height={400}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="fluid-h4 font-bold text-black mb-4">Crash barriers and security walls</h4>
                    <p className="fluid-body text-gray-800 mb-6 text-justify">
                      Crash barriers and security walls are critical safety installations designed to shield work zones, safeguard trackside equipment, and prevent unauthorized access. Built with reinforced materials, they provide a strong physical barrier against vehicle impact and trespassing, significantly reducing the risk of accidents near rail corridors. These systems are engineered for durability, withstanding harsh weather and continuous operational stress while requiring minimal upkeep. Beyond protection, they also help streamline operations by clearly demarcating restricted areas, ensuring both worker and passenger safety. Widely deployed across major infrastructure projects, crash barriers and security walls form an essential layer of defense in modern rail networks.
                    </p>
                    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
                      <Image
                        src="/crashbarrier.jpg"
                        alt="Crash barriers and security walls installation"
                        width={800}
                        height={400}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="fluid-h4 font-bold text-black mb-4">Platform copings</h4>
                    <p className="fluid-body text-gray-800 mb-6 text-justify">
                      Platform copings are precision-engineered elements designed to ensure passenger safety and comfort at stations. Manufactured with anti-slip surfaces, they minimize the risk of slips and falls, even under wet conditions. Integrated tactile indicators provide essential guidance for visually impaired passengers, helping them navigate platforms with confidence and security. Built to withstand heavy foot traffic and daily operational stress, these copings combine durability with functionality. Their consistent quality and reliable performance make them an indispensable feature across modern railway and metro networks, supporting both safety and accessibility standards.
                    </p>
                    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
                      <Image
                        src="/platformcooping.jpg"
                        alt="Platform copings installation"
                        width={800}
                        height={400}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="fluid-h4 font-bold text-black mb-4">Cable troughs and drains</h4>
                    <p className="fluid-body text-gray-800 mb-6 text-justify">
                      Cable troughs and drains are essential components for maintaining safe and efficient rail operations. Designed to securely house and protect signaling and power lines, they prevent accidental damage, tampering, and exposure to harsh environmental conditions. At the same time, integrated drainage systems ensure that rainwater and runoff are effectively channelled away, keeping the tracks free from waterlogging and structural damage. Built with durable, weather-resistant materials, these systems require minimal maintenance while offering long-term reliability. By combining protection for critical infrastructure with effective trackside water management, cable troughs and drains play a vital role in ensuring uninterrupted rail services and operational safety.
                    </p>
                    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
                      <Image
                        src="/drainage.webp"
                        alt="Cable troughs and drains installation"
                        width={800}
                        height={400}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                  </div>
                </div>
                
                  <div>
                    <h4 className="fluid-h4 font-bold text-black mb-4">Noise barriers</h4>
                    <p className="fluid-body text-gray-800 mb-6 text-justify">
                      Noise barriers are engineered to minimize sound disturbance in residential and sensitive zones along railway corridors. By reducing the transmission of operational noise, they create a quieter environment for surrounding communities, enhancing overall quality of life. In addition to comfort, these barriers improve safety by limiting distractions for both passengers and operators. Constructed from durable, weather-resistant materials, they are designed to perform effectively over long service cycles with minimal maintenance. Noise barriers are a critical feature of modern rail infrastructure, balancing the demands of high-capacity rail systems with environmental responsibility and community well-being.
                    </p>
                    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
                      <Image
                        src="/noisebarrier.jpg"
                        alt="Noise barriers installation"
                        width={800}
                        height={400}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Made for Indian Railways */}
      <section className="bg-white text-black py-8 sm:py-12 md:py-16 fade-in-section">
        <div className="w-full pt-4 sm:pt-8">
          {/* Mobile Layout */}
          <div className="md:hidden px-4 mb-8">
            <div className="text-center">
              {/* Mobile gradient line above */}
              <div className="w-24 h-1.5 mx-auto mb-6 rounded-full" style={{
                background: 'linear-gradient(90deg, #F2913F 0%, #8A393B 100%)'
              }}></div>
              
              {/* Mobile heading - allows wrapping */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F2913F] leading-tight mb-6">
                Made for Indian Railways
              </h3>
              
              {/* Mobile gradient line below */}
              <div className="w-24 h-1.5 mx-auto mb-8 rounded-full" style={{
                background: 'linear-gradient(90deg, #8A393B 0%, #F2913F 100%)'
              }}></div>
            </div>
          </div>
          
          {/* Desktop Layout - Original */}
          <div className="hidden md:block relative mb-8">
            <div className="flex items-center">
              <div className="flex-1 h-2" style={{
                background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 70%, rgba(242, 145, 63, 0) 100%)'
              }}></div>
              <div className="px-8">
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F2913F] leading-tight whitespace-nowrap">
                  Made for Indian Railways
                </h3>
              </div>
              <div className="flex-1 h-2" style={{
                background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 70%, rgba(242, 145, 63, 0) 100%)'
              }}></div>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Description */}
            <div className="text-center">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black leading-relaxed max-w-4xl mx-auto">
                Every product is manufactured under strict quality control in a factory environment. This ensures consistent strength, precise dimensions and long service life — meeting the standards of modern railway operations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SafetyPage;


