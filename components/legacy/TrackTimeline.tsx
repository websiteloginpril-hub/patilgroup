"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export type TimelineSide = 'left' | 'right';

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
	trackSrc = '/legacytrack.svg',
	trainSrc = '/legacytrain.svg',
	trainXOffset = 0,
}: TrackTimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

    // Dynamically compute the available travel height for the train in px
    const TRAIN_HEIGHT_PX = 192; // approx default train height (md breakpoint). Adjust with class if you change size
    const [travelPx, setTravelPx] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const el = containerRef.current;
        const update = () => {
            const h = el.getBoundingClientRect().height;
            setTravelPx(Math.max(0, h - TRAIN_HEIGHT_PX));
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // Train translateY in px – from 0 to the computed travel height
    const trainY = useTransform(scrollYProgress, [0, 1], [0, travelPx]);
    // Overlay starts just beneath the train's bottom edge
    const overlayTopPx = useTransform(trainY, (v) => v + TRAIN_HEIGHT_PX);

	const normalizedItems = useMemo(() => {
		return items.map((it, idx) => ({ ...it, side: it.side ?? (idx % 2 === 0 ? 'left' : 'right') as TimelineSide }));
	}, [items]);

	return (
		<section ref={containerRef} className="relative bg-white py-16 sm:py-24 md:py-32">
			{/* Mobile Timeline Layout */}
			<div className="md:hidden px-4 sm:px-6">
				<div className="relative max-w-2xl mx-auto">
					{/* Simple Mobile Track Line */}
					<div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F2913F] via-[#8A393B] to-[#1E3888] rounded-full" />
					
					{/* Mobile Timeline Items */}
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
								{/* Enhanced Timeline Dot */}
								<div className="absolute left-6 top-2 w-6 h-6 bg-[#F2913F] rounded-full border-4 border-white shadow-lg timeline-dot" />
								
								{/* Enhanced Content Card */}
								<div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm timeline-card border border-gray-100">
                                    <p className="fluid-h4 font-extrabold text-[#F2913F] mb-3">{item.year}</p>
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
                                    <h4 className="fluid-h4 font-semibold text-[#8A393B] leading-relaxed mb-2 text-justify">{item.title}</h4>
                                    {item.body && <p className="fluid-body-sm text-gray-700">{item.body}</p>}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
			
			{/* Desktop Timeline Layout - Original */}
			<div className="hidden md:block relative max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
				{/* Centered vertical track (background image), layered twice to avoid visible seams */}
				<div
					className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-48 md:w-60 lg:w-64 pointer-events-none"
					style={{
						// Sleepers (horizontal ties): 18px spacing, 6px thickness
						backgroundImage:
							'repeating-linear-gradient(to bottom, transparent 0, transparent 12px, #e6e6e6 12px, #e6e6e6 18px), ' +
							// Rails (two vertical bars)
							'linear-gradient(to right, transparent 0, transparent 46%, #9e9e9e 46%, #6e6e6e 48%, transparent 48%, transparent 52%, #6e6e6e 52%, #9e9e9e 54%, transparent 54%, transparent 100%)',
						backgroundRepeat: 'no-repeat repeat, no-repeat',
						backgroundSize: '12% 18px, 100% 100%',
						backgroundPosition: 'center top, center',
					}}
				/>

				{/* Track unrevealed overlay (below the train). This makes the track appear revealed as train passes. */}
				<motion.div
					className="absolute left-1/2 -translate-x-1/2 w-48 md:w-60 lg:w-64 bg-white pointer-events-none"
					style={{ top: overlayTopPx, bottom: 0 }}
				/>

                <motion.img
                    src={trainSrc}
                    alt="Train"
                    className="absolute left-1/2 -translate-x-1/2 top-0 w-40 md:w-48 select-none"
                    style={{ y: trainY, x: trainXOffset }}
                />

				{/* 1970s - Single vertical layout */}
				<div className="relative mb-32">
					{normalizedItems.slice(0, 1).map((item, index) => (
						<div key={`${item.year}-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 items-start">
							{item.image ? (
								<motion.div
									initial={{ opacity: 0, x: -40 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6 }}
									viewport={{ once: true, amount: 0.3 }}
									className="flex justify-end"
								>
									<Image
										src={item.image}
										alt={`${item.year} timeline image`}
										width={500}
										height={350}
										className="rounded-lg shadow-lg object-cover max-w-full h-auto"
									/>
								</motion.div>
							) : (
								<div className="hidden md:block" />
							)}
							<motion.div
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								viewport={{ once: true, amount: 0.3 }}
							>
                                <p className="fluid-h3 font-extrabold text-[#F2913F]">{item.year}</p>
                                <h4 className="fluid-h4 font-semibold mt-4 text-[#8A393B] leading-relaxed text-justify">{item.title}</h4>
                                {item.body && <p className="fluid-body-sm text-gray-700 mt-4">{item.body}</p>}
							</motion.div>
						</div>
					))}
				</div>

				{/* 1980s to Late 2020s - Paired horizontal layout */}
				<div className="relative space-y-16">
					{/* Group items in pairs, excluding first (1970s) and last (2025) */}
					{Array.from({ length: Math.ceil((normalizedItems.length - 2) / 2) }, (_, pairIndex) => {
						const startIndex = 1 + pairIndex * 2; // Start from index 1 (skip 1970s)
						const leftItem = normalizedItems[startIndex];
						const rightItem = normalizedItems[startIndex + 1];
						
						return (
							<div key={`pair-${pairIndex}`} className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 items-start">
								{/* Left side item */}
								{leftItem && (
									<motion.div
										initial={{ opacity: 0, x: -40 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.6 }}
										viewport={{ once: true, amount: 0.3 }}
										className="text-right"
									>
                                        <p className="fluid-h3 font-extrabold text-[#F2913F]">{leftItem.year}</p>
                                        <h4 className="fluid-h4 font-semibold mt-4 text-[#8A393B] leading-relaxed text-justify">{leftItem.title}</h4>
                                        {leftItem.body && <p className="fluid-body-sm text-gray-700 mt-4">{leftItem.body}</p>}
										{leftItem.image && (
											<div className="mt-6">
												<Image
													src={leftItem.image}
													alt={`${leftItem.year} timeline image`}
													width={500}
													height={350}
													className="rounded-lg shadow-lg object-cover max-w-full h-auto ml-auto"
												/>
											</div>
										)}
									</motion.div>
								)}
								
								{/* Right side item */}
								{rightItem && (
									<motion.div
										initial={{ opacity: 0, x: 40 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.6, delay: 0.2 }}
										viewport={{ once: true, amount: 0.3 }}
									>
                                        <p className="fluid-h3 font-extrabold text-[#F2913F]">{rightItem.year}</p>
                                        <h4 className="fluid-h4 font-semibold mt-4 text-[#8A393B] leading-relaxed text-justify">{rightItem.title}</h4>
                                        {rightItem.body && <p className="fluid-body-sm text-gray-700 mt-4">{rightItem.body}</p>}
										{rightItem.image && (
											<div className="mt-6">
												<Image
													src={rightItem.image}
													alt={`${rightItem.year} timeline image`}
													width={500}
													height={350}
													className="rounded-lg shadow-lg object-cover max-w-full h-auto"
												/>
											</div>
										)}
									</motion.div>
								)}
								
								{/* Fill empty space if only one item in pair */}
								{!rightItem && <div className="hidden md:block" />}
							</div>
						);
					})}
				</div>

				{/* 2025 - Single vertical layout */}
				<div className="relative mt-32">
					{normalizedItems.slice(-1).map((item, index) => (
						<div key={`${item.year}-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 items-start">
							<motion.div
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								viewport={{ once: true, amount: 0.3 }}
								className="text-right"
							>
                                <p className="fluid-h3 font-extrabold text-[#F2913F]">{item.year}</p>
                                <h4 className="fluid-h4 font-semibold mt-4 text-[#8A393B] leading-relaxed text-justify">{item.title}</h4>
                                {item.body && <p className="fluid-body-sm text-gray-700 mt-4">{item.body}</p>}
							</motion.div>
							{item.image ? (
								<motion.div
									initial={{ opacity: 0, x: 40 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6 }}
									viewport={{ once: true, amount: 0.3 }}
									className="flex justify-start mt-8"
								>
									<Image
										src={item.image}
										alt={`${item.year} timeline image`}
										width={800}
										height={500}
										className="rounded-lg shadow-lg object-cover max-w-full h-auto"
									/>
								</motion.div>
							) : (
								<div className="hidden md:block" />
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}


