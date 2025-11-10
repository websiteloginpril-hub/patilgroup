"use client";

import React from 'react';

const specifications = [
  {
    spec: '3 Ply x 3 mm High Tensile Steel Stranded Wires as per IS 6006-1983 (Un-coated) used in Pre-stressed Concrete Industry',
  },
  {
    spec: '7 Ply x 9.5 mm High Tensile Steel Stranded Wires as per IS 6006-1983 (Un-coated) used in Pre-stressed Concrete Industry. This is used in large bridges, Flyovers, Ports and Road Dividers.',
  },
  {
    spec: '4 mm H.T. Wire (Indented) as per IS 6003-1983 Hard Drawn and Stress Relieved for use in Pre-stressed Concrete Industry. This is used in manufacture of Poles & Spun Poles for electrification and telecommunication',
  },
  {
    spec: '2.50-8.00 mm as drawn wire as per IS 1785-Part I of 1983-Plain Hard Drawn Steel Wire for Pre-stressed Concrete Industry.',
  },
  {
    spec: '2.50-5.00 mm as drawn wire as per IS 1785-Part-II of 1983-Plain Hard Drawn Steel Wire for Pre-stressed Concrete Industry (Stress Relieved)',
  },
  {
    spec: 'Shutter Spring Wire for manufacturing of Rolling Spring as per Customer specifications',
  },
];

const WireSpecifications = () => {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-8xl font-medium font-clash mb-12" style={{ lineHeight: '85px', letterSpacing: '-0.25px' }}>
          <span className="text-[#F2913F]">Product</span> <span className="text-[#983424]">Description & Specifications</span>
        </h2>
        <div className="space-y-8 mt-24">
          {specifications.map((item, index) => (
            <div key={index} className="border-b border-gray-300 pb-8">
              <p className="text-xl text-gray-800">{item.spec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WireSpecifications; 