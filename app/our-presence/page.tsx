"use client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import IndiaMap from "../../components/IndiaMap";
import HLSVideo from "@/components/HLSVideo";
import { StateLocation, CityLocation } from "@/types/locations";

const OurPresencePage = () => {
  useGSAPAnimations();

  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [hoveredStateData, setHoveredStateData] = useState<StateLocation | null>(null);

  const STATE_LOCATION_DATA: StateLocation[] = [
    { stateID: "IN-UT", state: "Uttarakhand", cities: [{ name: "Pathri", plantType: "SLEEPER PLANT" }], color: "#F2913F" },
    { stateID: "IN-HR", state: "Haryana", cities: [{ name: "Sholaka", plantType: "SLEEPER PLANT" }], color: "#F2913F" },
    { stateID: "IN-UP", state: "Uttar Pradesh", cities: [{ name: "Burhwal", plantType: "SLEEPER PLANT" }], color: "#F2913F" },
    { stateID: "IN-RJ", state: "Rajasthan", cities: [{ name: "Roopangarh", plantType: "WIRE PLANT" }, { name: "Bharatpur", plantType: "PRECAST" }], color: "#F2913F" },
    { stateID: "IN-DL", state: "Delhi", cities: [{ name: "Delhi", plantType: "BRANCH OFFICE" }], color: "#F2913F" },

    { stateID: "IN-CT", state: "Chhattisgarh", cities: [{ name: "Kargi", plantType: "SLEEPER PLANT" }], color: "#F2913F" },

    { stateID: "IN-JH", state: "Jharkhand", cities: [{ name: "Bokaro", plantType: "WIRE PLANT & FOUNDRY" }], color: "#F2913F" },
    { stateID: "IN-WB", state: "West Bengal", cities: [{ name: "Anara", plantType: "SLEEPER PLANT" }], color: "#F2913F" },
    { stateID: "IN-OR", state: "Odisha", cities: [{ name: "Kaipadar", plantType: "SLEEPER PLANT" }], color: "#F2913F" },
    { stateID: "IN-BR", state: "Bihar", cities: [{ name: "Gaya", plantType: "SLEEPER PLANT" }], color: "#F2913F" },
    { stateID: "IN-AS", state: "Assam", cities: [{ name: "Mirza", plantType: "SLEEPER PLANT" }, { name: "Bongaigaon", plantType: "FLASH BUTT WELDING" }], color: "#F2913F" },

    { stateID: "IN-GJ", state: "Gujarat", cities: [{ name: "Udvada", plantType: "SLEEPER PLANT" }], color: "#F2913F" },
    { stateID: "IN-MH", state: "Maharashtra", cities: [{ name: "Chandrapur", plantType: "WIRE PLANT" }], color: "#F2913F" },

    {
      stateID: "IN-TG",
      state: "Telangana",
      cities: [
        { name: "Kallakal", plantType: "FOUNDRY" },
        { name: "Wadiyaram", plantType: "SLEEPER PLANT" },
        { name: "Medchal", plantType: "FASTENING PLANT" },
        { name: "Hyderabad", plantType: "HEAD OFFICE" },
      ],
      color: "#F2913F",
    },

    {
      stateID: "IN-AP",
      state: "Andhra Pradesh",
      cities: [
        { name: "Kovvur", plantType: "SLEEPER PLANT" },
        { name: "Bobili", plantType: "WIRE PLANT" },
      ],
      color: "#F2913F",
    },

    {
      stateID: "IN-KA",
      state: "Karnataka",
      cities: [
        { name: "Hubli", plantType: "SLEEPER PLANT" },
        { name: "Tumkur", plantType: "SLEEPER PLANT" },
        { name: "Bengaluru", plantType: "PATIL I-LABS" },
      ],
      color: "#F2913F",
    },

    {
      stateID: "IN-TN",
      state: "Tamil Nadu",
      cities: [
        { name: "Tirumangalam", plantType: "SLEEPER PLANT" },
        { name: "Hosur", plantType: "APNA TECHNOLOGIES & SOLUTIONS" },
      ],
      color: "#F2913F",
    },
  ];

  const stateLocationMap = useMemo(() => {
    const map = new Map<string, StateLocation>();
    STATE_LOCATION_DATA.forEach((item) => map.set(item.stateID, item));
    return map;
  }, []);

  const lastUpdateRef = useRef<string | null>(null);

  const handleStateHover = useCallback(
    (stateId: string | null) => {
      if (lastUpdateRef.current === stateId) return;

      setHoveredState(stateId);
      lastUpdateRef.current = stateId;

      if (!stateId) {
        setHoveredStateData(null);
        return;
      }

      setHoveredStateData(stateLocationMap.get(stateId) || null);
    },
    [stateLocationMap]
  );

  // Sidebar filter: hovered state only if has plants, else show all
  const displayedLocations = useMemo(() => {
    if (!hoveredState) return STATE_LOCATION_DATA;
    if (!hoveredStateData) return STATE_LOCATION_DATA;
    if (!hoveredStateData.cities || hoveredStateData.cities.length === 0) return STATE_LOCATION_DATA;
    return [hoveredStateData];
  }, [hoveredState, hoveredStateData]);

  const getCityNames = (cities: CityLocation[]): string[] => cities.map((city) => city.name);

  return (
    <div className="bg-white">
      <section className="relative h-[38vh] sm:h-[46vh] lg:h-[45vh] overflow-hidden bg-black">
        <HLSVideo
          src="https://customer-jf4n2ieoizmya0xu.cloudflarestream.com/cddaadc3ac995f95130f9ad7e2c9e17b/manifest/video.m3u8"
          fallbackSrc="/lppatil.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
          poster="/worldmap.png"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />

        <div className="relative z-10 h-full flex items-end">
          <div className="w-full px-4 sm:px-8 lg:px-12 pb-8 sm:pb-10">
            <h1 className="text-white font-bold text-3xl sm:text-5xl lg:text-6xl leading-none">
              Our Presence
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#F2913F] to-[#8A393B] mt-4 rounded-full" />
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#8A393B]">
              Pan-India Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 sm:p-4">
              <IndiaMap onStateHover={handleStateHover} stateLocationData={STATE_LOCATION_DATA} />
            </div>

            <aside className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                <h3 className="hidden sm:block text-xl sm:text-2xl font-bold text-[#8A393B] mb-4">
                  {hoveredStateData ? hoveredStateData.state : "Our Locations"}
                </h3>

                <div className="space-y-3 max-h-[420px] sm:max-h-[520px] overflow-y-auto pr-1">
                  {displayedLocations.map((location) => {
                    const isHovered = hoveredState === location.stateID;

                    return (
                      <div
                        key={location.stateID}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ease-out ${
                          isHovered ? "bg-[#F2913F]/10" : "hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                          style={{ backgroundColor: location.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-[#8A393B] text-base sm:text-lg mb-2">
                            {location.state}
                          </h4>

                          <div className="flex flex-col gap-2">
                            {location.cities.map((city, idx) => (
                              <div
                                key={`${location.stateID}-${city.name}-${idx}`}
                                className="flex items-center gap-2 flex-wrap"
                              >
                                <span className="text-xs sm:text-sm bg-[#F2913F]/10 text-[#F2913F] px-3 py-1.5 rounded-full font-semibold w-fit">
                                  {city.name}
                                </span>
                                <span className="text-[10px] sm:text-xs text-[#8A393B] font-medium">
                                  {city.plantType}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                    <div className="bg-gradient-to-br from-[#8A393B]/10 to-[#8A393B]/5 rounded-lg p-3">
                      <p className="text-xl sm:text-2xl font-bold text-[#8A393B]">
                        {STATE_LOCATION_DATA.length}
                      </p>
                      <p className="text-[11px] sm:text-sm text-gray-600 font-medium">
                        States
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[#F2913F]/10 to-[#F2913F]/5 rounded-lg p-3">
                      <p className="text-xl sm:text-2xl font-bold text-[#F2913F]">
                        {STATE_LOCATION_DATA.reduce((sum, s) => sum + s.cities.length, 0)}
                      </p>
                      <p className="text-[11px] sm:text-sm text-gray-600 font-medium">
                        Locations
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurPresencePage;
