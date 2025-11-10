"use client";

import React from 'react';

const systems = [
  {
    name: 'System 300 for Ballastless Track',
    specs: [
      { label: 'Maximum Axle Load (Upto)', value: '22.S Tonne' },
      { label: 'Maximum Speed (Upto)', value: '300 kmph' },
      { label: 'Toe Load (per clip)', value: '9 kN' },
      { label: 'Insulation', value: '2:5 kΩ' },
      { label: 'Static stiffness of pad', value: '22.5 kN/mm' },
      { label: 'Longitudinal restraint (as per EN 13146)', value: '9 kN' },
    ],
    description: 'Slab tracks meet all the requirements for combined highspeed and heavy load traffic. The rail fastening System 300, which can be pre-assembled, is suitable for all methods of slab track installation.',
  },
  {
    name: 'System DB 336 for Ballastless Track',
    specs: [
      { label: 'Maximum Axle Load (Upto)', value: '22.S Tonne' },
      { label: 'Maximum Speed (Upto)', value: '300 kmph' },
      { label: 'Toe Load (per clip)', value: '9 kN' },
      { label: 'Insulation', value: '2:5 kΩ' },
      { label: 'Static stiffness of pad', value: '22.5 kN/mm' },
      { label: 'Longitudinal restraint (as per EN 13146)', value: '9 kN' },
    ],
    description: 'These are rail fastening systems for ballastless concrete and steel structure. They ensure an effective reduction in vibration emission by means of an elastically supported rail. This system is suitable for standard-gauge railways as well as for urban light railways and can be adapted to local conditions as a result of their high flexibility. It reduces transmission of vibration to the concrete and structure and therefore reduces noise to the foundation of adjacent buildings.',
  },
];

const HighSpeedTrack = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-clash font-medium text-[96px] leading-[85px] tracking-[-0.25px] text-[#8A393B]">
          Fasteners for High Speed <br />
          <span className="text-amber-500">Ballastless Track</span>
        </h2>

        <div className="mt-24 space-y-24">
          {systems.map((system) => (
            <div key={system.name}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <h3 className="text-2xl font-bold text-black">
                    {system.name}
                  </h3>
                </div>
                <div className="md:col-span-2 space-y-4">
                  {system.specs.map((spec, index) => (
                    <div key={spec.label} className={`flex justify-between items-center pt-4 ${index > 0 ? 'border-t border-gray-200' : ''}`}>
                      <p className="text-gray-600">{spec.label}</p>
                      <p className="font-semibold text-black">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16">
                <p className="font-clash text-2xl leading-[30px] tracking-[-0.25px] text-black">
                  {system.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighSpeedTrack;