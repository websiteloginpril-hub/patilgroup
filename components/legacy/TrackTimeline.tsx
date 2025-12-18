"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

export type TimelineSide = "left" | "right";

export interface TrackTimelineItem {
  year: number | string;
  title: string;
  body?: string;
  side?: TimelineSide;
  image?: string;
}

interface TrackTimelineProps {
  items: TrackTimelineItem[];
  trackSrc?: string;
  trainSrc?: string;
  /** fine-tune horizontal alignment of the train relative to the track (px, +right / -left) */
  trainXOffset?: number;
}

export default function TrackTimeline({
  items,
  trackSrc = "/legacytrack.svg",
  trainSrc = "/legacytrain.svg",
  trainXOffset = 0,
}: TrackTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLImageElement>(null);

  const [maxTrainTravel, setMaxTrainTravel] = useState(0);
  const [trainWidth, setTrainWidth] = useState(150); // Default train width

  const trainBaseX = useMotionValue(0);
  const trainX = useTransform(trainBaseX, (v) => v + trainXOffset);
  
  // Track should span from start to end - full width of container
  // Train will move along this full-length track

  // Move train as we scroll horizontally
  useEffect(() => {
    const scrollEl = scrollRef.current;
    const trackEl = trackRef.current;
    const trainEl = trainRef.current;
    if (!scrollEl || !trackEl) return;

    const updateMaxTravel = () => {
      const trackWidth = trackEl.getBoundingClientRect().width;
      // Get actual train width if available, otherwise use a reasonable default
      const actualTrainWidth = trainEl?.getBoundingClientRect().width || 150;
      setTrainWidth(actualTrainWidth);
      setMaxTrainTravel(Math.max(0, trackWidth - actualTrainWidth));
    };

    updateMaxTravel();
    const ro = new ResizeObserver(() => {
      // Small delay to ensure train is rendered
      setTimeout(updateMaxTravel, 10);
    });
    ro.observe(trackEl);
    if (trainEl) {
      ro.observe(trainEl);
    }

    const handleScroll = () => {
      const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
      if (maxScroll <= 0) {
        trainBaseX.set(0);
        return;
      }
      const progress = Math.min(1, Math.max(0, scrollEl.scrollLeft / maxScroll));
      const currentTrainX = progress * maxTrainTravel;
      trainBaseX.set(currentTrainX);
    };

    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateMaxTravel);
    handleScroll(); // initial positioning

    return () => {
      ro.disconnect();
      scrollEl.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateMaxTravel);
    };
  }, [trainBaseX, maxTrainTravel]);

  // Alternate top / bottom if not specified
  const normalizedItems = useMemo(
    () =>
      items.map((it, idx) => ({
        ...it,
        // treat `left` as top row, `right` as bottom row. If side is absent, alternate.
        side: it.side ?? ((idx % 2 === 0 ? "left" : "right") as TimelineSide),
      })),
    [items]
  );

  return (
    <section className="relative bg-white py-16 sm:py-24 md:py-28">
      {/* MOBILE – simple vertical timeline (no horizontal scroll) */}
      <div className="md:hidden px-4 sm:px-6">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F2913F] via-[#8A393B] to-[#1E3888] rounded-full" />
          <div className="space-y-12">
            {normalizedItems.map((item, index) => (
              <motion.div
                key={`${item.year}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative pl-20"
              >
                <div className="absolute left-6 top-2 w-6 h-6 bg-[#F2913F] rounded-full border-4 border-white shadow-lg" />
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                  <p className="fluid-h4 font-extrabold text-[#F2913F] mb-3">
                    {item.year}
                  </p>
                  {item.image && (
                    <div className="mb-4">
                      <Image
                        src={item.image}
                        alt={`${item.year} timeline image`}
                        width={400}
                        height={250}
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    </div>
                  )}
                  <h4 className="fluid-h4 font-semibold text-[#8A393B] leading-normal mb-2 text-left" style={{ wordSpacing: '0.05em', lineHeight: '1.5', letterSpacing: '0.01em' }}>
                    {item.title}
                  </h4>
                  {item.body && (
                    <p className="fluid-body-sm text-gray-700" style={{ wordSpacing: '0.05em', lineHeight: '1.5', letterSpacing: '0.01em' }}>{item.body}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP – horizontal like the office wall, clean alignment */}
      <div className="hidden md:block">
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="relative h-[500px] lg:h-[580px]">
            {/* Horizontal scroll container */}
            <div
              ref={scrollRef}
              className="relative h-full overflow-x-auto overflow-y-visible scroll-smooth hide-scrollbar"
            >
              {/* Wide strip that contains the track + columns */}
              <div
                ref={trackRef}
                className="relative inline-flex h-full items-stretch py-12 pr-[12vw]"
              >
                {/* CENTRAL TRACK - Full width from start to end, train moves along it */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 z-0"
                  style={{
                    backgroundImage:
                      // sleepers (light grey, smaller height to prevent overlap - 60% of track height)
                      "repeating-linear-gradient(to right, transparent 0, transparent 20px, #d3d3d3 20px, #d3d3d3 28px), " +
                      // top rail (thicker dark grey)
                      "linear-gradient(to bottom, transparent 0, transparent 35%, #3b3b3b 35%, #3b3b3b 42%, transparent 42%, transparent 58%, #3b3b3b 58%, #3b3b3b 65%, transparent 65%, transparent 100%)",
                    backgroundRepeat: "repeat-x, no-repeat",
                    backgroundSize: "24px 60%, 100% 100%", // Reduced sleeper height to 60% to prevent overlap with images
                    backgroundPosition: "left center, center",
                  }}
                />

                {/* TRAIN – aligned on the track line, positioned above track center */}
                <motion.img
                  ref={trainRef}
                  src={trainSrc}
                  alt="Train"
                  className="pointer-events-none absolute h-24 w-auto select-none z-20"
                  style={{
                    x: trainX,
                    top: "calc(68% - 152px)"
                  }}
                />

                {/* COLUMN PER MILESTONE – 3 visible in first viewport */}
                {normalizedItems.map((item, index) => {
                  const isTop = item.side === "left"; // top row
                  const isFirst = index === 0;
                  const isLast = index === normalizedItems.length - 1;
                  // For first and last items: if content is below, image goes above, and vice versa
                  const shouldImageBeOpposite = (isFirst || isLast) && item.image;
                  
                  return (
                    <div
                      key={`${item.year}-${index}`}
                      className="relative flex flex-col items-stretch px-1.5 h-full"
                      style={{
                        width: "33.3333vw", // ~3 columns per viewport
                        minWidth: "260px",
                        maxWidth: "380px",
                      }}
                    >
                      {/* ------------- RAILWAY POINT MARKER - Alternating above/below track, smaller to avoid overlap ------------- */}
                      {index % 2 === 0 ? (
                        // Even indices: Marker ABOVE the track - with separation to avoid collision
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10 flex flex-col justify-end items-center pointer-events-none" style={{ marginTop: '-18px' }}>
                          {/* Railway point marker - smaller to avoid content overlap */}
                          <div className="w-4 h-4 bg-[#F2913F] rounded-full border-[2px] border-white shadow-md flex items-center justify-center mb-0.5">
                            {/* Inner dot for depth - smaller */}
                            <div className="w-1 h-1 bg-white/30 rounded-full" />
                          </div>
                          {/* Vertical line extending down to track - shorter */}
                          <div className="w-0.5 h-2 bg-[#F2913F]" />
                        </div>
                      ) : (
                        // Odd indices: Marker BELOW the track - closer to track
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-full z-10 flex flex-col justify-start items-center pointer-events-none" style={{ marginTop: '2px' }}>
                          {/* Vertical line extending up to track - shorter */}
                          <div className="w-0.5 h-2 bg-[#F2913F] mb-0.5" />
                          {/* Railway point marker - smaller to avoid content overlap */}
                          <div className="w-4 h-4 bg-[#F2913F] rounded-full border-[2px] border-white shadow-md flex items-center justify-center">
                            {/* Inner dot for depth - smaller */}
                            <div className="w-1 h-1 bg-white/30 rounded-full" />
                          </div>
                        </div>
                      )}

                      {/* ------------- TOP SLOT ------------- */}
                      <div className="flex-1 flex items-end" style={{ marginBottom: "28px" }}>
                        {/* Regular content on top (not first/last or no image) */}
                        {isTop && !shouldImageBeOpposite && (
                          <motion.div
                            initial={{ opacity: 0, y: -24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                          >
                            <p className="text-xl lg:text-2xl font-extrabold text-[#F2913F] mb-2">
                              {item.year}
                            </p>
                            <h4 className="font-semibold text-[#8A393B] leading-normal text-left text-base lg:text-lg mb-2" style={{ wordSpacing: '0.05em', lineHeight: '1.5', letterSpacing: '0.01em' }}>
                              {item.title}
                            </h4>
                            {item.body && (
                              <p className="text-sm text-gray-700 leading-normal" style={{ wordSpacing: '0.05em', lineHeight: '1.5', letterSpacing: '0.01em' }}>
                                {item.body}
                              </p>
                            )}
                            {item.image && (
                              <div className="mt-4">
                                <Image
                                  src={item.image}
                                  alt={`${item.year} timeline image`}
                                  width={420}
                                  height={280}
                                  className="rounded-lg shadow-md object-cover w-full h-auto "
                                />
                              </div>
                            )}
                          </motion.div>
                        )}
                        {/* Image on top when content is on bottom (for first/last items) */}
                        {!isTop && shouldImageBeOpposite && (
                          <motion.div
                            initial={{ opacity: 0, y: -24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                          >
                            <div className="-mt-8 mb-0">
                              <Image
                                src={item.image!}
                                alt={`${item.year} timeline image`}
                                width={420}
                                height={280}
                                className="rounded-lg shadow-md object-cover w-full h-auto "
                              />
                            </div>
                          </motion.div>
                        )}
                        {/* Content on top when image is on bottom (for first/last items) */}
                        {isTop && shouldImageBeOpposite && (
                          <motion.div
                            initial={{ opacity: 0, y: -24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                          >
                            <p className="text-xl lg:text-2xl font-extrabold text-[#F2913F] mb-2">
                              {item.year}
                            </p>
                            <h4 className="font-semibold text-[#8A393B] leading-normal text-left text-base lg:text-lg mb-2" style={{ wordSpacing: '0.05em', lineHeight: '1.5', letterSpacing: '0.01em' }}>
                              {item.title}
                            </h4>
                            {item.body && (
                              <p className="text-sm text-gray-700 leading-normal" style={{ wordSpacing: '0.05em', lineHeight: '1.5', letterSpacing: '0.01em' }}>
                                {item.body}
                              </p>
                            )}
                          </motion.div>
                        )}
                      </div>

                      {/* ------------- BOTTOM SLOT ------------- */}
                      <div className="flex-1 flex items-start" style={{ paddingTop: "48px" }}>
                        {/* Regular content on bottom (not first/last or no image) */}
                        {!isTop && !shouldImageBeOpposite && (
                          <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                          >
                            <p className="text-xl lg:text-2xl font-extrabold text-[#F2913F] mb-2">
                              {item.year}
                            </p>
                            <h4 className="font-semibold text-[#8A393B] leading-normal text-left text-base lg:text-lg mb-2" style={{ wordSpacing: '0.05em', lineHeight: '1.5', letterSpacing: '0.01em' }}>
                              {item.title}
                            </h4>
                            {item.body && (
                              <p className="text-sm text-gray-700 leading-normal" style={{ wordSpacing: '0.05em', lineHeight: '1.5', letterSpacing: '0.01em' }}>
                                {item.body}
                              </p>
                            )}
                            {item.image && (
                              <div className="mt-6">
                                <Image
                                  src={item.image}
                                  alt={`${item.year} timeline image 1`}
                                  width={420}
                                  height={280}
                                  className="rounded-lg shadow-md object-cover w-full h-auto"
                                />
                              </div>
                            )}
                          </motion.div>
                        )}
                        {/* Image on bottom when content is on top (for first/last items) */}
                        {isTop && shouldImageBeOpposite && (
                          <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                          >
                            <div className="mt-1">
                              <Image
                                src={item.image!}
                                alt={`${item.year} timeline image`}
                                width={420}
                                height={280}
                                className="rounded-lg shadow-md object-cover w-full h-auto"
                              />
                            </div>
                          </motion.div>
                        )}
                        {/* Content on bottom when image is on top (for first/last items) */}
                        {!isTop && shouldImageBeOpposite && (
                          <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="w-full"
                          >
                            <p className="text-xl lg:text-2xl font-extrabold text-[#F2913F] mb-2">
                              {item.year}
                            </p>
                            <h4 className="font-semibold text-[#8A393B] leading-normal text-left text-base lg:text-lg mb-2" style={{ wordSpacing: '0.05em', lineHeight: '1.5', letterSpacing: '0.01em' }}>
                              {item.title}
                            </h4>
                            {item.body && (
                              <p className="text-sm text-gray-700 leading-normal" style={{ wordSpacing: '0.05em', lineHeight: '1.5', letterSpacing: '0.01em' }}>
                                {item.body}
                              </p>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}