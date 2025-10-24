"use client";

import React from 'react';

const products = [
  {
    name: 'Elastic Rail Clips',
    description: 'ERC Clips mark III and V manufacturing unit will be setup at survey no 700/A, at Roopangarh Kishangarh Tahsil Ajmer Dist. Rajasthan with a capacity of 36 lakhs pieces per annum for supply to Indian Railways and other Freight Corridors as per RDSO Specifications with RDSO approval.',
  },
  {
    name: 'GFN Liners',
    description: 'GFN liner manufacturing unit will be set up at survey no 700/B, at Roopangarh, Kishangarh Tahsil Ajmer Dist. Rajasthan with a capacity of 84 lakhs pieces per annum for supplying to Indian Railways and other Freight Corridors as per RDSO specifications with RDSO approval.',
  },
  {
    name: 'SKL 14 for Normal Tracks',
    description: 'It is reliable, safe and maintenance free with long spring deflection, high tensioning force, high creep resistance and effective protection against tilting. Fully automatic track-laying is possible through pre-assembly of all components in the sleeper works.',
  },
  {
    name: 'System W 14 HH for Heavy Haul',
    description: 'This fastening system on concrete sleepers for ballasted tracks is primarily used for heavy haul. It has rail tilting protection by a middle bend of the tension clamp and special design of the angled guide plate. It helps reduce maintenance costs due to permanent elastic tensioning of the rail with tension clamps.',
  },
];

const FastenerProductList = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-clash font-medium text-[96px] leading-[85px] tracking-[-0.25px] text-[#8A393B]">
          Fasteners for Main Line <br />
          <span className="text-amber-500">Sleeper Ballasted</span> Track:
        </h2>
        <div className="mt-24 space-y-12">
          {products.map((product, index) => (
            <div key={product.name}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <h3 className="text-xl font-bold text-black">{product.name}</h3>
                </div>
                <div className="md:col-span-2">
                  <p className="font-clash text-2xl leading-[30px] tracking-[-0.25px] text-black">
                    {product.description}
                  </p>
                </div>
              </div>
              {index < products.length - 1 && (
                <div className="mt-12 border-b-[0.75px] border-black"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FastenerProductList; 