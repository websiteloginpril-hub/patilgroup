"use client";

import React from 'react';

const sleeperTypes = [
  {
    name: 'Normal Broad Gauge',
    description: 'This sleeper has a trapezoidal cross section having a width of 154 mm at the top and 250 mm at the bottom and a height of 210 mm at rail seat.',
  },
  {
    name: 'Points & Crossing',
    description: 'These specialized sleepers are used to hold switches, CMS crossings and lead rails for main line and turnouts. High speed trains can run on these PSC layouts with utmost safety.',
  },
  {
    name: 'Guard Rail',
    description: 'These are used at the approaches to girder bridges to prevent a derailed train from capsizing.',
  },
  {
    name: 'Switch Expansion Joints',
    description: 'These are PSC sleepers for switch expansion joints (with 120 mm maximum gap) for long welded rails for 52 kg & 60 kg rails using corresponding chairs.',
  },
  {
    name: 'Check Rail on Curves',
    description: 'Check rails are absolutely essential to offer an inner side for sharper curves, which are more than 5o to prevent derailment.',
  },
  {
    name: 'Level Crossings',
    description: 'This is formed at various points where a road crosses a railway track at the same level and sleepers used here are made with 60 kg UIC or 52 kg check rail.',
  },
  {
    name: 'Dual Gauge',
    description: 'The unique pre-stressed concrete dual gauge sleepers have been designed to cater to handle meter and broad gauge trains so that both trains can run on the same track. All the sleepers are manufactured under stress bench system with very strict quality control measures.',
  },
];

const SleeperVarieties = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-clash font-medium text-[96px] leading-[85px] tracking-[-0.25px]">
          <span className="text-amber-500">Versatile Sleepers for</span> <br />
          <span className="text-[#8A393B]">Every Railway Need</span>
        </h2>
        <div className="mt-24 space-y-12">
          {sleeperTypes.map((sleeper, index) => (
            <div key={sleeper.name}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <h3 className="text-xl font-bold text-black">{sleeper.name}</h3>
                </div>
                <div className="md:col-span-2">
                  <p className="font-clash text-2xl leading-[30px] tracking-[-0.25px] text-black">{sleeper.description}</p>
                </div>
              </div>
              {index < sleeperTypes.length - 1 && (
                <div className="mt-12 border-b-[0.75px] border-black"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SleeperVarieties; 