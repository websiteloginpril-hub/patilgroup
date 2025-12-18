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
  const [svgAspectRatio, setSvgAspectRatio] = useState<number | null>(null);
  
  // Use ref to track current state for immediate updates without race conditions
  const currentStateRef = useRef<string | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);
  
  // Lock mechanism to prevent concurrent state changes
  const stateChangeLockRef = useRef<boolean>(false);
  const pendingStateRef = useRef<string | null>(null);

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
        
        // Extract aspect ratio from SVG before setting markup
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        if (svgElement) {
          const viewBox = svgElement.getAttribute('viewBox');
          const width = svgElement.getAttribute('width');
          const height = svgElement.getAttribute('height');
          
          let aspectRatio: number | null = null;
          
          if (viewBox) {
            const [, , vw, vh] = viewBox.split(' ').map(Number);
            if (vw && vh && !isNaN(vw) && !isNaN(vh)) {
              aspectRatio = vw / vh;
            }
          } else if (width && height) {
            const w = parseFloat(width);
            const h = parseFloat(height);
            if (w && h && !isNaN(w) && !isNaN(h)) {
              aspectRatio = w / h;
            }
          }
          
          // Fallback: common India map aspect ratio (approximately 16:9 or similar)
          if (!aspectRatio) {
            aspectRatio = 1.6; // Default fallback
          }
          
          // Ensure preserveAspectRatio is set
          if (!svgElement.getAttribute('preserveAspectRatio')) {
            svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
          }
          
          // Update the markup with the modified SVG
          const serializer = new XMLSerializer();
          const updatedSvg = serializer.serializeToString(svgDoc);
          setSvgMarkup(updatedSvg);
          setSvgAspectRatio(aspectRatio);
        } else {
          setSvgMarkup(text);
          // Fallback aspect ratio if parsing fails
          setSvgAspectRatio(1.6);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Update SVG paths with active state attribute for hover styling (both desktop and mobile)
  // NOTE: This is a fallback - most updates happen directly in event handlers for instant feedback
  useEffect(() => {
    if (!containerRef.current || !svgMarkup) return;
    const svgEl = containerRef.current.querySelector('svg');
    if (!svgEl) return;

    // Sync React state with DOM - but DOM is usually updated first by event handlers
    const stateToHighlight = hoveredStateId || currentStateRef.current;
    
    // Clear all first
    const allPaths = svgEl.querySelectorAll('[id^="IN-"]');
    allPaths.forEach((path) => {
      path.removeAttribute('data-state-active');
    });

    // Set active state if exists
    if (stateToHighlight) {
      const activePath = svgEl.querySelector(`[id="${stateToHighlight}"]`);
      if (activePath) {
        activePath.setAttribute('data-state-active', 'true');
      }
    }
  }, [hoveredStateId, svgMarkup]);

  useEffect(() => {
    if (!containerRef.current) return;
    const svgEl = containerRef.current.querySelector('svg');
    if (!svgEl) return;

    // Helper to immediately clear ALL states in DOM (synchronous, no delay)
    const clearAllStatesImmediately = () => {
      const svgElForClear = containerRef.current?.querySelector('svg');
      if (svgElForClear) {
        // Clear ALL states immediately - no delay, no animation frame
        // Use more specific selector to avoid clearing non-state elements
        const allPaths = svgElForClear.querySelectorAll('path[id^="IN-"], [id^="IN-"] path');
        allPaths.forEach((path) => {
          // Only clear if it's actually a state path
          const id = path.getAttribute('id');
          if (id && id.startsWith('IN-') && id.length > 3) {
            path.removeAttribute('data-state-active');
          }
        });
      }
    };
    
    // Lock and set state atomically
    const setStateAtomically = (id: string | null) => {
      // If locked, queue the state change
      if (stateChangeLockRef.current) {
        pendingStateRef.current = id;
        return;
      }
      
      // Lock to prevent concurrent changes
      stateChangeLockRef.current = true;
      
      // Clear ALL states first (critical - must happen first)
      clearAllStatesImmediately();
      
      // Update ref
      currentStateRef.current = id;
      
      // Set new state if exists
      if (id) {
        const svgElForSet = containerRef.current?.querySelector('svg');
        if (svgElForSet) {
          // Use exact ID match - be very specific
          const newPath = svgElForSet.querySelector(`path[id="${id}"], [id="${id}"]`);
          if (newPath) {
            newPath.setAttribute('data-state-active', 'true');
          }
        }
      }
      
      // Update React state
      setHoveredStateId(id);
      if (onStateHover) onStateHover(id);
      
      // Unlock after a microtask (allows DOM to update)
      Promise.resolve().then(() => {
        stateChangeLockRef.current = false;
        
        // Process any pending state change
        if (pendingStateRef.current !== null) {
          const pendingId = pendingStateRef.current;
          pendingStateRef.current = null;
          setStateAtomically(pendingId);
        }
      });
    };

    const handleStateInteraction = (id: string | null, immediate: boolean = false) => {
      // Clear any pending transitions
      if (transitionTimeoutRef.current !== null) {
        cancelAnimationFrame(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
      
      // CRITICAL: Clear ALL states FIRST, immediately and synchronously
      // This prevents any overlap during fast transitions
      clearAllStatesImmediately();
      
      // Update ref immediately for synchronous access
      currentStateRef.current = id;
      
      // If we have a new state, set it immediately in DOM (synchronous)
      if (id) {
        const svgElForSet = containerRef.current?.querySelector('svg');
        if (svgElForSet) {
          const newPath = svgElForSet.querySelector(`[id="${id}"]`);
          if (newPath) {
            // Set new state immediately in DOM - no delay
            newPath.setAttribute('data-state-active', 'true');
          }
        }
      }
      
      // Update React state (this triggers re-render but DOM is already updated)
      if (immediate) {
        // Use microtask for state update (faster than requestAnimationFrame)
        Promise.resolve().then(() => {
          setHoveredStateId(id);
          if (onStateHover) onStateHover(id);
        });
      } else {
        setHoveredStateId(id);
        if (onStateHover) onStateHover(id);
      }
    };

    // Helper function to find the actual state path element
    // STRICT: Only matches exact state paths, never groups with multiple states
    const findStatePath = (element: Element | null): Element | null => {
      if (!element) return null;
      
      // Priority 1: Check if the element itself is a path with a state ID
      if (element.tagName === 'path') {
        const id = element.getAttribute('id');
        // Strict check: must be valid state ID format (IN-XX where XX is state code)
        if (id && id.startsWith('IN-') && id.length > 3 && id.length < 10) {
          return element;
        }
      }
      
      // Priority 2: Check if element is inside a SINGLE path with state ID
      // Use closest but verify it's actually a path, not a group
      const pathParent = element.closest('path[id^="IN-"]');
      if (pathParent) {
        const parentId = pathParent.getAttribute('id');
        // Verify it's a valid state ID (not a group ID)
        if (parentId && parentId.startsWith('IN-') && parentId.length > 3 && parentId.length < 10) {
          // Double-check: make sure this path doesn't contain multiple state paths
          const parentElement = pathParent.parentElement;
          if (parentElement) {
            const siblingPaths = parentElement.querySelectorAll('path[id^="IN-"]');
            // If parent has multiple state paths, it's a group - don't match
            if (siblingPaths.length > 1) {
              return null; // This is a group, not a single state
            }
          }
          return pathParent;
        }
      }
      
      // Priority 3: Check parent groups - but ONLY if they contain a SINGLE state path
      if (element.tagName === 'path' || element.tagName === 'g') {
        let parent = element.parentElement;
        while (parent && parent.tagName !== 'svg') {
          const parentId = parent.getAttribute('id');
          if (parentId && parentId.startsWith('IN-') && parentId.length > 3 && parentId.length < 10) {
            // Check if this group contains ONLY ONE state path
            const pathsInGroup = parent.querySelectorAll('path[id^="IN-"]');
            if (pathsInGroup.length === 1) {
              // Single state in group - return the path, not the group
              return pathsInGroup[0] as Element;
            }
            // Multiple paths = group containing multiple states - DON'T MATCH
            return null;
          }
          parent = parent.parentElement;
        }
      }
      
      return null;
    };

    const onOver = (e: Event) => {
      // Stop event propagation to prevent multiple handlers
      e.stopPropagation();
      
      const target = e.target as Element | null;
      if (!target) return;
      
      // Skip if hovering over pins (pins handle their own events)
      if (target.closest('.pin')) {
        return;
      }
      
      // Skip if not in SVG area
      if (!svgEl.contains(target)) {
        return;
      }
      
      // Find state path with strict matching
      const stateEl = findStatePath(target);
      if (!stateEl) {
        // If we're not on a state, clear ALL states immediately
        if (currentStateRef.current) {
          setStateAtomically(null);
        }
        return;
      }
      
      const id = stateEl.getAttribute('id');
      // Strict validation: must be valid state ID
      if (id && id.startsWith('IN-') && id.length > 3 && id.length < 10) {
        // Only update if different state (prevents unnecessary updates)
        if (currentStateRef.current !== id) {
          // Use atomic state setter (handles locking and clearing)
          setStateAtomically(id);
        }
      }
    };

    const onLeave = (e: Event) => {
      // Stop propagation
      e.stopPropagation();
      
      if (!isMobile) {
        const relatedTarget = (e as MouseEvent).relatedTarget as Element | null;
        
        // If leaving to outside SVG, clear ALL states immediately
        if (!relatedTarget || !svgEl.contains(relatedTarget)) {
          setStateAtomically(null);
          return;
        }
        
        // Check if we're moving to another state
        const newStateEl = findStatePath(relatedTarget);
        if (newStateEl) {
          const newStateId = newStateEl.getAttribute('id');
          // If moving to a different state, clear current state immediately
          // The onOver handler will set the new one atomically
          if (newStateId && newStateId !== currentStateRef.current && 
              newStateId.startsWith('IN-') && newStateId.length > 3 && newStateId.length < 10) {
            // Clear current state - onOver will set the new one
            // Don't use setStateAtomically here to avoid double-locking
            clearAllStatesImmediately();
            currentStateRef.current = null;
            setHoveredStateId(null);
            if (onStateHover) onStateHover(null);
          }
        } else {
          // Moving to a non-state element, clear ALL states immediately
          if (currentStateRef.current) {
            setStateAtomically(null);
          }
        }
      }
    };

    // Use event delegation on SVG for better reliability
    // This handles dynamically loaded content and nested structures
    const onSvgMouseEnter = (e: Event) => {
      onOver(e);
    };
    
    const onSvgMouseLeave = (e: Event) => {
      e.stopPropagation();
      onLeave(e);
      // Also clear when leaving SVG entirely - clear ALL states immediately
      const relatedTarget = (e as MouseEvent).relatedTarget as Element | null;
      if (!relatedTarget || !svgEl.contains(relatedTarget)) {
        if (!isMobile) {
          setStateAtomically(null);
        }
      }
    };
    
    // Desktop hover events - use event delegation on SVG
    svgEl.addEventListener('mouseover', onSvgMouseEnter, true); // Capture phase for better control
    svgEl.addEventListener('mouseout', onSvgMouseLeave, true);
    svgEl.addEventListener('pointerover', onOver, true);
    svgEl.addEventListener('pointerout', onLeave, true);

    // Mobile tap/click events
    const onTap = (e: Event) => {
      if (!isMobile) return;
      e.stopPropagation();
      e.preventDefault();
      
      const target = e.target as Element | null;
      if (!target) return;
      
      // Skip if clicking on pins
      if (target.closest('.pin')) {
        return;
      }
      
      const stateEl = findStatePath(target);
      const id = stateEl?.getAttribute('id') ?? null;
      
      // Validate ID format
      if (id && !(id.startsWith('IN-') && id.length > 3 && id.length < 10)) {
        return;
      }
      
      // Toggle state selection on mobile - use atomic setter
      if (currentStateRef.current === id) {
        setStateAtomically(null);
      } else if (id) {
        setStateAtomically(id);
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
      // Clear any pending transitions
      if (transitionTimeoutRef.current !== null) {
        cancelAnimationFrame(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
      
      // Clear lock and pending state
      stateChangeLockRef.current = false;
      pendingStateRef.current = null;
      
      // Remove event listeners
      svgEl.removeEventListener('mouseover', onSvgMouseEnter, true);
      svgEl.removeEventListener('mouseout', onSvgMouseLeave, true);
      svgEl.removeEventListener('pointerover', onOver, true);
      svgEl.removeEventListener('pointerout', onLeave, true);
      
      // Remove mobile tap listeners
      svgEl.removeEventListener('click', onTap);
      svgEl.removeEventListener('touchend', onTap);
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('touchend', handleOutsideClick);
    };
  }, [svgMarkup, onStateHover, isMobile, hoveredStateId]);

  const activePins: Pin[] = useMemo(
    () => [
      // Uttarakhand (IN-UT) - North, mountainous region
      { label: 'Pathri', x: 28, y: 20 },
      
      // Haryana (IN-HR) - North Central
      { label: 'Sholaka', x: 20.5, y: 22.5 },
      
      // Delhi (IN-DL) - North Central, capital
      { label: 'Delhi', x: 24, y: 25 },
      
      // Uttar Pradesh (IN-UP) - North Central
      { label: 'Burhwal', x: 29.5, y: 27 },
      
      // Rajasthan (IN-RJ) - Northwest
      { label: 'Roopangarh', x: 17.5, y: 34 },
      
      // Madhya Pradesh (IN-MP) - Central India
      { label: 'Bhopal', x: 22, y: 39 },
      
      // Chhattisgarh (IN-CT) - Central East
      { label: 'Kargi', x: 36, y: 45 },
      
      // Bihar (IN-BR) - East Central
      { label: 'Gaya', x: 44.5, y: 34 },
      
      // Jharkhand (IN-JH) - East Central
      { label: 'Bokaro', x: 46.5, y: 40 },
      
      // West Bengal (IN-WB) - East
      { label: 'Anara', x: 52.5, y: 39 },
      
      // Odisha (IN-OR) - East Central
      { label: 'Kaipadar', x: 37.5, y: 52 },
      
      // Assam (IN-AS) - Northeast (well within state boundaries)
      { label: 'Mirza', x: 61, y: 31},
      { label: 'Bongaigaon', x: 63, y: 31},
      
      // Gujarat (IN-GJ) - West (inland, avoiding ocean)
      { label: 'Udvada', x: 14, y: 42 },
      
      // Telangana (IN-TG) - South Central
      { label: 'Medchal', x: 26.5, y: 54 },
      { label: 'Kallakal', x: 27, y: 55.5 },
      { label: 'Wadiyaram', x: 29, y: 56.5 },
      
      // Andhra Pradesh (IN-AP) - South Central
      { label: 'Bobbili', x: 30, y: 59 },
      { label: 'Kovvur', x: 28.5, y: 61 },
      
      // Karnataka (IN-KA) - Southwest (well within state)
      { label: 'Hubli', x: 19.5, y: 64 },
      { label: 'Tumkur', x: 21, y: 65 },
      
      // Tamil Nadu (IN-TN) - South (well inland, avoiding ocean)
      { label: 'Tirumangalam', x: 26.5, y: 74 },
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
            // This ensures labels stack from top to bottom
            const yDiff = Math.abs(a.pin.y - b.pin.y);
            if (yDiff < 2) {
              // Same row (very close y positions) - sort by x (left to right)
              return a.pin.x - b.pin.x;
            }
            // Sort by y position (topmost first)
            return a.pin.y - b.pin.y;
          });
        
        // Always apply offset if there are multiple pins in the state
        if (statePins.length > 1) {
          const pinIndex = statePins.findIndex(({ idx }) => idx === index);
          if (pinIndex !== -1) {
            // Check if pins are close together (within 6% distance)
            const topPin = statePins[0].pin;
            const currentPinPos = currentPin;
            const distanceX = Math.abs(currentPinPos.x - topPin.x);
            const distanceY = Math.abs(currentPinPos.y - topPin.y);
            const arePinsClose = distanceX < 6 && distanceY < 6;
            
            // Stack labels vertically with proper spacing to prevent overlap
            // Label height: padding (6px top + 6px bottom = 12px) + line-height (~14px) = ~26px
            // Use 35px spacing to ensure no overlap and clear visibility (increased for close pins)
            const labelHeight = 32; // Approximate label height in pixels
            const baseSpacing = labelHeight + 9; // 32px base spacing
            const spacing = arePinsClose ? baseSpacing + 6 : baseSpacing; // Extra spacing for close pins
            const offsetY = pinIndex * -spacing;
            
            // If pins are close together, add horizontal offset for better visual separation
            if (arePinsClose && statePins.length > 1 && pinIndex > 0) {
              // Alternate horizontal offset to create a staggered effect
              // First label (index 0) stays centered, others alternate left/right
              const offsetX = pinIndex % 2 === 1 ? -12 : 12;
              return { x: offsetX, y: offsetY };
            }
            
            return { x: 0, y: offsetY };
          }
        }
        // Single pin in state - no offset needed, label stays close to pin
        return { x: 0, y: 0 };
      }
    }

    // For individual pin hovers, only apply minimal offsets if pins are VERY close
    // This keeps labels close to the pin dot when hovering
    // Find all pins that are extremely close (within 4% distance) - only for actual overlaps
    const veryClosePins = activePins
      .map((pin, idx) => ({ pin, idx }))
      .filter(({ pin, idx }) => {
        if (idx === index) return false;
        // Calculate distance - use tighter threshold for individual pin hovers
        const dx = Math.abs(pin.x - currentPin.x);
        const dy = Math.abs(pin.y - currentPin.y);
        // Only consider pins within 4% as potentially overlapping (much tighter)
        return dx < 4 && dy < 4;
      });

    // Only apply offsets if pins are extremely close together (actual overlap risk)
    if (veryClosePins.length > 0) {
      // Check if pins are on nearly the same position (within 2%)
      const overlappingPins = veryClosePins.filter(({ pin }) => {
        const dx = Math.abs(pin.x - currentPin.x);
        const dy = Math.abs(pin.y - currentPin.y);
        return dx < 2 && dy < 2;
      });

      if (overlappingPins.length > 0) {
        // Pins are very close - apply minimal offset to prevent exact overlap
        // Use smaller spacing to keep labels closer to pins
        const labelHeight = 28;
        const minimalSpacing = labelHeight + 2; // Reduced spacing (30px instead of 32px)
        // Sort to determine order
        const allPins = [...overlappingPins, { pin: currentPin, idx: index }].sort((a, b) => {
          const yDiff = Math.abs(a.pin.y - b.pin.y);
          if (yDiff < 1) {
            return a.pin.x - b.pin.x;
          }
          return a.pin.y - b.pin.y;
        });
        
        const currentIndex = allPins.findIndex(({ idx }) => idx === index);
        if (currentIndex > 0) {
          // Apply minimal vertical offset only
          const offsetY = currentIndex * -minimalSpacing;
          return { x: 0, y: offsetY };
        }
      }
    }
    
    // Default: no offset - label appears close to pin dot
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
    <div 
      className="map-container" 
      aria-label="India map" 
      ref={containerRef}
      style={svgAspectRatio ? { aspectRatio: svgAspectRatio.toString() } : undefined}
    >
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
                const baseMargin = 6; // Match CSS margin-bottom
                
                // Calculate z-index for proper stacking (higher labels should be on top)
                // Labels with more negative offset (higher up) should be on top
                const zIndex = offset.y < 0 ? 15 + Math.abs(Math.round(offset.y / 10)) : 15;
                
                if (offset.x === 0 && offset.y === 0) {
                  return { 
                    zIndex: 15,
                    marginBottom: `${baseMargin}px`
                  };
                }
                
                // When offset is applied, use base margin
                // The offset handles vertical spacing between stacked labels
                // Each label is positioned relative to its own pin, then offset is applied
                return { 
                  transform: `translateX(calc(-50% + ${offset.x}px)) translateY(${offset.y}px)`,
                  marginBottom: `${baseMargin}px`,
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
