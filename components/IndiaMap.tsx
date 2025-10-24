"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './IndiaMap.css';

type Pin = { x: number; y: number; label: string };

const IndiaMap: React.FC = () => {
  const [svgMarkup, setSvgMarkup] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch('/india.svg')
      .then((res) => res.text())
      .then((text) => {
        if (!isMounted) return;
        setSvgMarkup(text);
      })
      .catch(() => {
        // ignore; component will remain empty if fetch fails
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const svgEl = containerRef.current.querySelector('svg');
    if (!svgEl) return;
    // Use pointerover (bubbling) to detect the closest parent state group/path with IN-XX id
    const onOver = (e: Event) => {
      const target = e.target as Element | null;
      if (!target) return;
      const stateEl = target.closest('[id^="IN-"]');
      const id = stateEl?.getAttribute('id');
      if (id) setHoveredStateId(id);
    };
    const onLeave = () => {
      setHoveredStateId(null);
    };
    svgEl.addEventListener('pointerover', onOver);
    svgEl.addEventListener('pointerleave', onLeave);
    return () => {
      svgEl.removeEventListener('pointerover', onOver);
      svgEl.removeEventListener('pointerleave', onLeave);
    };
  }, [svgMarkup]);

  // Each pin has independent coordinates (percentages of the map container)
  const activePins: Pin[] = useMemo(
    () => [
      { label: 'Pathri', x: 28, y: 30 },
      { label: 'Sholaka', x: 20, y: 31 },
      { label: 'Delhi', x: 22, y: 32 },
      { label: 'Roopangarh', x: 17, y: 40 },
      { label: 'Bhopal', x: 22, y: 45 },
      { label: 'Kargi', x: 35, y: 50 },
      { label: 'Gaya', x: 41, y: 43 },
      { label: 'Bokaro', x: 42, y: 48 },
      { label: 'Anara', x: 48, y: 47 },
      { label: 'Kaipadar', x: 40, y: 59 },
      { label: 'Mirza', x: 53, y: 39 },
      { label: 'Bongaigaon', x: 57, y: 39 },
      { label: 'Udvada', x: 11, y: 55 },
      { label: 'Medchal', x: 24, y: 68 },
      { label: 'Kallakal', x: 26, y: 66.5 },
      { label: 'Wadiyaram', x: 27, y: 68 },
      { label: 'Bobbili', x: 35, y: 67 },
      { label: 'Kovvur', x: 28, y: 73 },
      { label: 'Hubli', x: 17, y: 75 },
      { label: 'Tumkur', x: 20, y: 80 },
      { label: 'Tirumangalam', x: 24, y: 92 },
      { label: 'Burhwal', x: 28, y: 33 },
    ],
    []
  );
  return (
    <div className="map-container" aria-label="India map" ref={containerRef}>
      {/* Enhanced Mobile Instructions */}
      <div className="md:hidden text-center mb-4">
        <p className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-flex items-center gap-1">
          <div className="w-2 h-2 bg-[#F2913F] rounded-full animate-pulse"></div>
          Tap locations to explore
        </p>
      </div>
      
      {/* Inline the SVG so we can style paths and hover states */}
      {svgMarkup && (
        <div
          className="map-inline-svg"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      )}
      
      {/* Enhanced Pins overlay */}
      <div className="pins-overlay">
        {activePins.map((pin, idx) => (
          <div
            key={`${pin.label}-${idx}`}
            className="pin group"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            role="button"
            tabIndex={0}
            aria-label={`Location: ${pin.label}`}
          >
            <div className="dot" />
            <div className="label group-hover:scale-110 transition-transform duration-300">{pin.label}</div>
          </div>
        ))}
      </div>
      
      {/* Mobile Map Legend */}
      <div className="md:hidden mt-6 flex justify-center">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#F2913F] rounded-full"></div>
            <span className="text-xs text-gray-600 font-medium">Manufacturing Hub</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#8A393B] rounded-full"></div>
            <span className="text-xs text-gray-600 font-medium">Project Site</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;
