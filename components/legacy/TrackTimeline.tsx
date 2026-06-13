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
  const trackPatternRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLImageElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [maxTrainTravel, setMaxTrainTravel] = useState(0);
  const [trainWidth, setTrainWidth] = useState(150); // Default train width
  const [markerPositions, setMarkerPositions] = useState<number[]>([]);

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

  // Calculate marker positions aligned to sleepers (24px grid)
  useEffect(() => {
    const SLEEPER_SPACING = 24; // Sleepers repeat every 24px
    // Sleeper centers are at 24px, 48px, 72px, etc. (sleeper is 20-28px in each 24px cycle, center at 24px)
    
    const calculateMarkerPositions = () => {
      if (!trackPatternRef.current || columnRefs.current.length === 0) return;

      const trackRect = trackPatternRef.current.getBoundingClientRect();
      const trackLeft = trackRect.left;
      const positions: number[] = [];

      columnRefs.current.forEach((colEl, index) => {
        if (!colEl) return;

        const colRect = colEl.getBoundingClientRect();
        // Calculate column center position relative to the track's left edge
        const colLeftRelative = colRect.left - trackLeft;
        const colWidth = colRect.width;
        const colCenter = colLeftRelative + colWidth / 2;

        // Snap to nearest sleeper center (nearest multiple of 24px)
        // Sleepers are centered at 24px, 48px, 72px, etc.
        const nearestSleeper = Math.round(colCenter / SLEEPER_SPACING) * SLEEPER_SPACING;
        
        // Calculate offset relative to column center
        // This tells us how much to shift the marker from center to align with sleeper
        const offsetFromCenter = nearestSleeper - colCenter;
        
        // Store the offset (positive = shift right, negative = shift left)
        positions[index] = offsetFromCenter;
      });

      setMarkerPositions(positions);
    };

    // Calculate on mount and resize
    const timeoutId = setTimeout(calculateMarkerPositions, 100);
    window.addEventListener('resize', calculateMarkerPositions);
    
    // Use ResizeObserver for more accurate tracking
    const ro = new ResizeObserver(() => {
      setTimeout(calculateMarkerPositions, 50);
    });
    
    if (trackPatternRef.current) {
      ro.observe(trackPatternRef.current);
    }
    if (trackRef.current) {
      ro.observe(trackRef.current);
    }
    columnRefs.current.forEach(col => {
      if (col) ro.observe(col);
    });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateMarkerPositions);
      ro.disconnect();
    };
  }, [normalizedItems.length]);

  return (
    <section className="relative bg-white py-8 sm:py-12 md:py-6">
      {/* MOBILE – simple vertical timeline (no horizontal scroll) */}
      <div className="md:hidden px-4 sm:px-6">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F2913F] rounded-full" />
          <div className="space-y-4">
            {normalizedItems.map((item, index) => (
              <motion.div
                key={`${item.year}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative pl-6 pr-2"
              >
                <div className="absolute -left-2 top-3 w-5 h-5 bg-[#F2913F] rounded-full border-[3px] border-white shadow-lg" />
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-2 shadow-sm border border-gray-300">
                  <p className="text-sm font-extrabold text-[#F2913F] mb-1">
                    {item.year}
                  </p>
                  {item.image && (
                    <div className="mb-1">
                      <Image
                        src={item.image}
                        alt={`${item.year} timeline image`}
                        width={300}
                        height={180}
                        className="w-full h-auto rounded object-cover"
                      />
                    </div>
                  )}
                  <h4 className="text-sm font-bold text-[#8A393B] leading-tight mb-1 text-left" style={{ wordSpacing: '0.05em', letterSpacing: '0.01em' }}>
                    {item.title}
                  </h4>
                  {item.body && (
                    <p className="text-xs text-gray-700 leading-snug" style={{ wordSpacing: '0.05em', letterSpacing: '0.01em' }}>{item.body}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP – horizontal like the office wall, clean alignment */}
      <div className="hidden md:block">
        <div className="relative max-w-full mx-auto px-2 md:px-4 lg:px-6">
          <div className="relative h-[500px] lg:h-[580px]">
            {/* Horizontal scroll container */}
            <div
              ref={scrollRef}
              className="relative h-full overflow-x-auto overflow-y-visible scroll-smooth legacy-timeline-scroll"
            >
              {/* Wide strip that contains the track + columns */}
              <div
                ref={trackRef}
                className="relative inline-flex h-full items-stretch py-12 pr-[12vw]"
              >
                {/* CENTRAL TRACK - Full width from start to end, train moves along it */}
                <div
                  ref={trackPatternRef}
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
                    top: "calc(68% - 151.5px)"
                  }}
                />

                {/* COLUMN PER MILESTONE – 3 visible in first viewport */}
                {normalizedItems.map((item, index) => {
                  const isTop = item.side === "left"; // top row
                  const isFirst = index === 0;
                  const isLast = index === normalizedItems.length - 1;
                  // For first and last items: if content is below, image goes above, and vice versa
                  const shouldImageBeOpposite = (isFirst || isLast) && item.image;
                  
                  // Get the calculated offset for this marker (defaults to 0 if not calculated yet)
                  const markerOffset = markerPositions[index] ?? 0;
                  
                  return (
                    <div
                      key={`${item.year}-${index}`}
                      ref={(el) => {
                        columnRefs.current[index] = el;
                      }}
                      className="relative flex flex-col items-stretch px-6 h-full"
                      style={{
                        width: "33.3333vw", // ~3 columns per viewport
                        minWidth: "260px",
                        maxWidth: "380px",
                      }}
                    >
                      {/* ------------- RAILWAY POINT MARKER - Alternating above/below track, aligned to sleepers ------------- */}
                      {index % 2 === 0 ? (
                        // Even indices: Marker ABOVE the track - with separation to avoid collision
                        <div 
                          className="absolute top-1/2 z-10 flex flex-col justify-end items-center pointer-events-none" 
                          style={{ 
                            marginTop: '-18px',
                            left: `calc(49.5% + ${markerOffset}px)`,
                            transform: 'translateX(-50%) translateY(-100%)'
                          }}
                        >
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
                        <div 
                          className="absolute top-1/2 z-10 flex flex-col justify-start items-center pointer-events-none" 
                          style={{ 
                            marginTop: '-9px',
                            left: `calc(49.5% + ${markerOffset}px)`,
                            transform: 'translateX(-50%) translateY(100%)'
                          }}
                        >
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