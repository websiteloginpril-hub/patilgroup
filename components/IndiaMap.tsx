"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './IndiaMap.css';

type Pin = { x: number; y: number; label: string };

type StateLocation = {
  stateID: string;
  state: string;
  cities: string[];
  color: string;
};

interface IndiaMapProps {
  onStateHover?: (stateId: string | null) => void;
  stateLocationData?: StateLocation[];  // ⭐ Added: to show plant names on state hover
}

const IndiaMap: React.FC<IndiaMapProps> = ({ onStateHover, stateLocationData = [] }) => {
  const [svgMarkup, setSvgMarkup] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  const [activePinIndex, setActivePinIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch('/india.svg')
      .then((res) => res.text())
      .then((text) => {
        if (!isMounted) return;
        setSvgMarkup(text);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Update SVG paths with active state attribute for mobile styling
  useEffect(() => {
    if (!containerRef.current || !svgMarkup) return;
    const svgEl = containerRef.current.querySelector('svg');
    if (!svgEl) return;

    // Remove all active state attributes
    const allPaths = svgEl.querySelectorAll('[id^="IN-"]');
    allPaths.forEach((path) => {
      path.removeAttribute('data-state-active');
    });

    // Add active state attribute to hovered state on mobile
    if (isMobile && hoveredStateId) {
      const activePath = svgEl.querySelector(`[id="${hoveredStateId}"]`);
      if (activePath) {
        activePath.setAttribute('data-state-active', 'true');
      }
    }
  }, [hoveredStateId, isMobile, svgMarkup]);

  useEffect(() => {
    if (!containerRef.current) return;
    const svgEl = containerRef.current.querySelector('svg');
    if (!svgEl) return;

    const handleStateInteraction = (id: string | null) => {
      setHoveredStateId(id);
      if (onStateHover) onStateHover(id);
    };

    const onOver = (e: Event) => {
      const target = e.target as Element | null;
      if (!target) return;
      const stateEl = target.closest('[id^="IN-"]');
      const id = stateEl?.getAttribute('id') ?? null;
      handleStateInteraction(id);
    };

    const onLeave = () => {
      if (!isMobile) {
        handleStateInteraction(null);
      }
    };

    // Desktop hover events
    svgEl.addEventListener('pointerover', onOver);
    svgEl.addEventListener('pointerleave', onLeave);

    // Mobile tap/click events
    const onTap = (e: Event) => {
      if (!isMobile) return;
      const target = e.target as Element | null;
      if (!target) return;
      const stateEl = target.closest('[id^="IN-"]');
      const id = stateEl?.getAttribute('id') ?? null;
      
      // Toggle state selection on mobile
      if (hoveredStateId === id) {
        handleStateInteraction(null);
      } else {
        handleStateInteraction(id);
      }
    };

    svgEl.addEventListener('click', onTap);
    svgEl.addEventListener('touchend', onTap);

    // Close state selection when clicking outside on mobile
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (!isMobile) return;
      const target = e.target as Element;
      if (!containerRef.current?.contains(target)) {
        handleStateInteraction(null);
      }
    };

    if (isMobile) {
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('touchend', handleOutsideClick);
    }

    return () => {
      svgEl.removeEventListener('pointerover', onOver);
      svgEl.removeEventListener('pointerleave', onLeave);
      svgEl.removeEventListener('click', onTap);
      svgEl.removeEventListener('touchend', onTap);
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('touchend', handleOutsideClick);
    };
  }, [svgMarkup, onStateHover, isMobile, hoveredStateId]);

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

  const handlePinClick = (index: number) => {
    if (isMobile) {
      // Toggle pin label on mobile
      setActivePinIndex(activePinIndex === index ? null : index);
    }
  };

  // Get state for a pin label (to show label when state is hovered)
  const getPinState = (pinLabel: string): string | null => {
    if (!hoveredStateId || !stateLocationData.length) return null;
    const stateData = stateLocationData.find(s => s.stateID === hoveredStateId);
    if (stateData && stateData.cities.includes(pinLabel)) {
      return hoveredStateId;
    }
    return null;
  };

  // Calculate label offset to prevent overlap when multiple labels are visible
  const getLabelOffset = (index: number, pinLabel: string): { x: number; y: number } => {
    const currentPin = activePins[index];
    if (!currentPin) return { x: 0, y: 0 };

    // If state is hovered, handle labels in that state
    if (hoveredStateId && stateLocationData.length) {
      const stateData = stateLocationData.find(s => s.stateID === hoveredStateId);
      if (stateData && stateData.cities.includes(pinLabel)) {
        // Get all pins in this state (including current pin)
        const statePins = activePins
          .map((pin, idx) => ({ pin, idx }))
          .filter(({ pin }) => stateData.cities.includes(pin.label))
          .sort((a, b) => {
            // Sort by y position (top to bottom), then x (left to right)
            const yDiff = Math.abs(a.pin.y - b.pin.y);
            if (yDiff < 3) {
              // Same row - sort by x
              return a.pin.x - b.pin.x;
            }
            return a.pin.y - b.pin.y;
          });
        
        // Always apply offset if there are multiple pins in the state
        if (statePins.length > 1) {
          const pinIndex = statePins.findIndex(({ idx }) => idx === index);
          if (pinIndex !== -1) {
            // Use tighter spacing for Telangana (22px), standard spacing (30px) for other states
            const spacing = hoveredStateId === "IN-TG" ? 22 : 30;
            const offsetY = pinIndex * -spacing;
            
            return { x: 0, y: offsetY };
          }
        }
      }
    }

    // For individual pin hovers or nearby pins, check for overlaps
    // Find all pins that are close to this one (within 8% distance)
    const nearbyPins = activePins
      .map((pin, idx) => ({ pin, idx }))
      .filter(({ pin, idx }) => {
        if (idx === index) return false;
        // Calculate distance
        const dx = Math.abs(pin.x - currentPin.x);
        const dy = Math.abs(pin.y - currentPin.y);
        // Consider pins within 8% as potentially overlapping
        return dx < 8 && dy < 8;
      });

    if (nearbyPins.length > 0) {
      // Sort all nearby pins including current one
      const allPins = [...nearbyPins, { pin: currentPin, idx: index }].sort((a, b) => {
        const yDiff = Math.abs(a.pin.y - b.pin.y);
        if (yDiff < 3) {
          return a.pin.x - b.pin.x;
        }
        return a.pin.y - b.pin.y;
      });
      
      const currentIndex = allPins.findIndex(({ idx }) => idx === index);
      if (currentIndex > 0) {
        // Calculate if pins are very close horizontally
        const prevPin = allPins[currentIndex - 1].pin;
        const horizontalDist = Math.abs(currentPin.x - prevPin.x);
        
        if (horizontalDist < 5) {
          // Very close - stack vertically with tighter spacing
          const offsetY = currentIndex * -20;
          return { x: 0, y: offsetY };
        } else {
          // Further apart - slight offset to avoid overlap
          const offsetY = currentIndex * -22;
          const offsetX = currentIndex % 2 === 0 ? -12 : 12;
          return { x: offsetX, y: offsetY };
        }
      }
    }
    
    return { x: 0, y: 0 };
  };

  const getLabelClass = (index: number, pinLabel: string) => {
    const isActive = isMobile ? activePinIndex === index : false;
    const isStateHovered = getPinState(pinLabel) !== null;
    
    return `label transition-all duration-300 ${
      isMobile 
        ? isActive 
          ? 'opacity-100 scale-110' 
          : 'opacity-0'
        : isStateHovered
          ? 'opacity-100 scale-110'
          : 'opacity-0 group-hover:opacity-100 group-hover:scale-110'
    }`;
  };

  return (
    <div className="map-container" aria-label="India map" ref={containerRef}>
      <div className="md:hidden text-center mb-4">
        <p className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-flex items-center gap-1">
          <span className="w-2 h-2 bg-[#F2913F] rounded-full animate-pulse inline-block"></span>
          Tap locations to explore
        </p>
      </div>

      {svgMarkup && (
        <div
          className="map-inline-svg"
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      )}


      {/* FIXED Pins */}
      <div className="pins-overlay">
        {activePins.map((pin, idx) => (
          <div
            key={`${pin.label}-${idx}`}
            className={`pin group ${isMobile && activePinIndex === idx ? 'pin-active' : ''}`}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            role="button"
            tabIndex={0}
            aria-label={`Location: ${pin.label}`}
            onClick={() => handlePinClick(idx)}
            onTouchEnd={(e) => {
              e.preventDefault();
              handlePinClick(idx);
            }}
          >
            <div className="dot" />
            <div 
              className={getLabelClass(idx, pin.label)}
              style={(() => {
                const offset = getLabelOffset(idx, pin.label);
                const baseMargin = 8;
                const spacingAdjustment = Math.abs(offset.y) > 0 ? Math.abs(offset.y) : 0;
                
                // Calculate z-index for proper stacking (higher labels should be on top)
                const zIndex = offset.y < 0 ? 15 + Math.abs(Math.round(offset.y / 10)) : 15;
                
                if (offset.x === 0 && offset.y === 0) {
                  return { zIndex: 15 };
                }
                
                // Combine centering (-50%) with offset
                // Ensure proper spacing between stacked labels
                return { 
                  transform: `translateX(calc(-50% + ${offset.x}px)) translateY(${offset.y}px)`,
                  marginBottom: `${baseMargin + spacingAdjustment}px`,
                  zIndex: zIndex
                };
              })()}
            >
              {pin.label}
            </div>
          </div>
        ))}
      </div>

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
