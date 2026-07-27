"use client";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./IndiaMap.css";
import { StateLocation } from "@/types/locations";

type Pin = { x: number; y: number; label: string };

interface IndiaMapProps {
  onStateHover?: (stateId: string | null) => void;
  stateLocationData?: StateLocation[];
}

type Rect = { x: number; y: number; w: number; h: number };
const intersects = (a: Rect, b: Rect) =>
  a.x < b.x + b.w &&
  a.x + a.w > b.x &&
  a.y < b.y + b.h &&
  a.y + a.h > b.y;

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const IndiaMap: React.FC<IndiaMapProps> = ({ onStateHover, stateLocationData = [] }) => {
  const [svgMarkup, setSvgMarkup] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [activePinIndex, setActivePinIndex] = useState<number | null>(null);

  // desktop pin hover
  const [hoveredPinIndex, setHoveredPinIndex] = useState<number | null>(null);

  const [supportsHover, setSupportsHover] = useState(true);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const isTapMode = !supportsHover || isCoarsePointer;

  const [svgBounds, setSvgBounds] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const calculationLockRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const lastBoundsRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const hoverRafRef = useRef<number | null>(null);
  const pendingHoverStateRef = useRef<string | null>(null);
  const lastCommittedHoverRef = useRef<string | null>(null);

  // store measured label sizes (per index)
  const labelRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [labelSizes, setLabelSizes] = useState<Map<number, { w: number; h: number }>>(
    () => new Map()
  );

  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: hover)");
    const coarseMq = window.matchMedia("(pointer: coarse)");

    const apply = () => {
      setSupportsHover(!!hoverMq.matches);
      setIsCoarsePointer(!!coarseMq.matches);
    };

    apply();
    hoverMq.addEventListener?.("change", apply);
    coarseMq.addEventListener?.("change", apply);

    return () => {
      hoverMq.removeEventListener?.("change", apply);
      coarseMq.removeEventListener?.("change", apply);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    fetch("/india.svg")
      .then((r) => r.text())
      .then((t) => mounted && setSvgMarkup(t))
      .catch((err) => console.error("Failed to load SVG:", err));
    return () => {
      mounted = false;
    };
  }, []);

  const calculateSvgBounds = React.useCallback(() => {
    if (calculationLockRef.current) return;
    if (!containerRef.current) return;

    const svg = containerRef.current.querySelector("svg");
    if (!svg) return;

    calculationLockRef.current = true;
    if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!containerRef.current) {
          calculationLockRef.current = false;
          return;
        }
        const svg = containerRef.current.querySelector("svg");
        if (!svg) {
          calculationLockRef.current = false;
          return;
        }

        const containerRect = containerRef.current.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();

        const x = svgRect.left - containerRect.left;
        const y = svgRect.top - containerRect.top;
        const width = svgRect.width;
        const height = svgRect.height;

        const newBounds = { x, y, width, height };
        const newContainerSize = { width: containerRect.width, height: containerRect.height };
        const last = lastBoundsRef.current;
        const threshold = 0.5;

        const changed =
          Math.abs(newBounds.x - last.x) > threshold ||
          Math.abs(newBounds.y - last.y) > threshold ||
          Math.abs(newBounds.width - last.width) > threshold ||
          Math.abs(newBounds.height - last.height) > threshold;

        if (changed) {
          setSvgBounds(newBounds);
          setContainerSize(newContainerSize);
          lastBoundsRef.current = newBounds;
        }

        calculationLockRef.current = false;
        rafIdRef.current = null;
      });
    });
  }, []);

  useEffect(() => {
    if (!svgMarkup) return;
    const t = setTimeout(() => calculateSvgBounds(), 150);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => calculateSvgBounds(), 16);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    const vv = (window as any).visualViewport;
    if (vv) {
      vv.addEventListener("resize", handleResize);
      vv.addEventListener("scroll", handleResize);
    }

    return () => {
      clearTimeout(t);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (vv) {
        vv.removeEventListener("resize", handleResize);
        vv.removeEventListener("scroll", handleResize);
      }
    };
  }, [svgMarkup, calculateSvgBounds]);

  useEffect(() => {
    if (!containerRef.current || !svgMarkup) return;
    const svg = containerRef.current.querySelector("svg");
    if (!svg) return;

    calculateSvgBounds();

    const ro = new ResizeObserver(() => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        calculateSvgBounds();
        rafIdRef.current = null;
      });
    });

    ro.observe(svg);
    ro.observe(containerRef.current);
    const parent = svg.parentElement;
    if (parent) ro.observe(parent);

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      ro.disconnect();
    };
  }, [svgMarkup, calculateSvgBounds]);

  const highlightedStateId = isTapMode ? selectedStateId : hoveredStateId;

  useEffect(() => {
    if (!containerRef.current || !svgMarkup) return;
    const svgEl = containerRef.current.querySelector("svg");
    if (!svgEl) return;

    const allPaths = svgEl.querySelectorAll('path[id^="IN-"]');
    allPaths.forEach((p) => {
      p.removeAttribute("data-state-active");
      p.removeAttribute("data-state-hovered");
    });

    if (highlightedStateId) {
      const activePath = svgEl.querySelector(`path[id="${highlightedStateId}"]`);
      if (activePath) {
        if (isTapMode) activePath.setAttribute("data-state-active", "true");
        else activePath.setAttribute("data-state-hovered", "true");
      }
    }
  }, [highlightedStateId, isTapMode, svgMarkup]);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const commitHover = () => {
      hoverRafRef.current = null;
      if (hoveredPinIndex !== null) return;

      const next = pendingHoverStateRef.current;
      if (lastCommittedHoverRef.current === next) return;

      lastCommittedHoverRef.current = next;
      setHoveredStateId(next);
      onStateHover?.(next);
    };

    const scheduleCommit = () => {
      // ✅ Block sidebar updates when pin is hovered
      if (hoveredPinIndex !== null) return;
      if (hoverRafRef.current != null) return;
      hoverRafRef.current = requestAnimationFrame(commitHover);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isTapMode) return;
      // ✅ Block state hover detection if pin is currently hovered
      if (hoveredPinIndex !== null) return;

      const under = document.elementFromPoint(e.clientX, e.clientY) as Element | null;
      if (!under) return;

      if (under.closest(".pin")) return;

      const statePath = under.closest('path[id^="IN-"]');
      const stateId = statePath?.getAttribute("id") ?? null;

      if (pendingHoverStateRef.current !== stateId) {
        pendingHoverStateRef.current = stateId;
        scheduleCommit();
      }
    };

    const handleLeave = () => {
      if (isTapMode) return;
      // ✅ Don't update sidebar when leaving if pin is hovered
      if (hoveredPinIndex !== null) return;
      pendingHoverStateRef.current = null;
      scheduleCommit();
    };

    const handleTap = (e: Event) => {
      if (!isTapMode) return;
      const target = e.target as Element | null;
      if (!target) return;

      const stateEl = target.closest('path[id^="IN-"]');
      const id = stateEl?.getAttribute("id") ?? null;
      const next = selectedStateId === id ? null : id;

      setSelectedStateId(next);
      onStateHover?.(next);
    };

    const handleOutsideTap = (e: MouseEvent | TouchEvent) => {
      if (!isTapMode) return;
      const target = e.target as Element;
      if (!containerRef.current?.contains(target)) {
        setSelectedStateId(null);
        setActivePinIndex(null);
        onStateHover?.(null);
      }
    };

    el.addEventListener("pointermove", handlePointerMove, { passive: true });
    el.addEventListener("pointerleave", handleLeave, { passive: true });

    const svg = el.querySelector("svg");
    svg?.addEventListener("click", handleTap);
    svg?.addEventListener("touchend", handleTap);

    if (isTapMode) {
      document.addEventListener("click", handleOutsideTap);
      document.addEventListener("touchend", handleOutsideTap);
    }

    return () => {
      if (hoverRafRef.current != null) cancelAnimationFrame(hoverRafRef.current);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handleLeave);

      svg?.removeEventListener("click", handleTap);
      svg?.removeEventListener("touchend", handleTap);

      document.removeEventListener("click", handleOutsideTap);
      document.removeEventListener("touchend", handleOutsideTap);
    };
  }, [onStateHover, isTapMode, selectedStateId, hoveredPinIndex]);

  // ✅ pins (same as yours)
  const activePins: Pin[] = useMemo(
    () => [
      { label: "Pathri", x: 38.85, y: 27.35 },
      { label: "Sholaka", x: 30.35, y: 32 },
      { label: "Burhwal", x: 47.14, y: 35 },
      { label: "Gaya", x: 58.25, y: 42.25 },
      { label: "Mirza", x: 81, y: 38 },
      { label: "Roopangarh", x: 22.35, y: 38.13 },
      { label: "Bharatpur", x: 30.5, y: 35.5 },
      { label: "Delhi", x: 29.35, y: 30 },
      { label: "Bongaigaon", x: 78, y: 37.85 },
      { label: "Bokaro", x: 59.63, y: 46.35 },
      { label: "Anara", x: 64.89, y: 48.35 },
      { label: "Kaipadar", x: 60.8, y: 56.97 },
      { label: "Kargi", x: 49, y: 50 },
      { label: "Udvada", x: 16.92, y: 55.78 },
      { label: "Chandrapur", x: 39.85, y: 57.55 },
      { label: "Kallakal", x: 35.35, y: 65.85 },
      { label: "Wadiyaram", x: 36.12, y: 63.46 },
      { label: "Medchal", x: 35.35, y: 68.5 },
      { label: "Hyderabad", x: 35.5, y: 70.53 },
      { label: "Kovvur", x: 51.44, y: 63.85 },
      { label: "Bobili", x: 44.75, y: 70.55 },
      { label: "Hubli", x: 24.05, y: 74 },
      { label: "Tumkur", x: 27.55, y: 78.55 },
      { label: "Bengaluru", x: 30.32, y: 81.35 },
      { label: "Tirumangalam", x: 33.78, y: 88.64 },
      { label: "Hosur", x: 34, y: 83.5 },
    ],
    []
  );

  const pinPositions = useMemo(() => {
    if (
      svgBounds.width === 0 ||
      svgBounds.height === 0 ||
      containerSize.width === 0 ||
      containerSize.height === 0
    ) {
      return activePins.map((pin) => ({ left: `${pin.x}%`, top: `${pin.y}%` }));
    }

    const viewBoxWidth = 611.85999;
    const viewBoxHeight = 695.70178;
    const viewBoxAspectRatio = viewBoxWidth / viewBoxHeight;
    const svgAspectRatio = svgBounds.width / svgBounds.height;

    let scale: number;
    let offsetX: number;
    let offsetY: number;

    if (svgAspectRatio > viewBoxAspectRatio) {
      scale = svgBounds.height / viewBoxHeight;
      const contentWidth = viewBoxWidth * scale;
      offsetX = svgBounds.x + (svgBounds.width - contentWidth) / 2;
      offsetY = svgBounds.y;
    } else {
      scale = svgBounds.width / viewBoxWidth;
      const contentHeight = viewBoxHeight * scale;
      offsetX = svgBounds.x;
      offsetY = svgBounds.y + (svgBounds.height - contentHeight) / 2;
    }

    return activePins.map((pin) => {
      const pinXInViewBox = (pin.x / 100) * viewBoxWidth;
      const pinYInViewBox = (pin.y / 100) * viewBoxHeight;

      const pinXInPixels = offsetX + pinXInViewBox * scale;
      const pinYInPixels = offsetY + pinYInViewBox * scale;

      const leftPercent = (pinXInPixels / containerSize.width) * 100;
      const topPercent = (pinYInPixels / containerSize.height) * 100;

      return { left: `${leftPercent}%`, top: `${topPercent}%` };
    });
  }, [activePins, svgBounds, containerSize]);

  const getStateIdByPin = (pinLabel: string): string | null => {
    const match = stateLocationData.find((s) =>
      s.cities.some((city) => city.name === pinLabel)
    );
    return match?.stateID || null;
  };

  const handlePinTap = (index: number, pinLabel: string) => {
    if (!isTapMode) return;

    const nextIndex = activePinIndex === index ? null : index;
    setActivePinIndex(nextIndex);

    const stateId = getStateIdByPin(pinLabel);
    const nextState = stateId && nextIndex !== null ? stateId : null;

    setSelectedStateId(nextState);
    onStateHover?.(nextState);
  };

  const isPinInHoveredState = (pinLabel: string): boolean => {
    if (!hoveredStateId) return false;
    const stateData = stateLocationData.find((s) => s.stateID === hoveredStateId);
    return !!(stateData && stateData.cities.some((city) => city.name === pinLabel));
  };

  // ✅ Measure real label sizes after render
  useLayoutEffect(() => {
    const m = new Map<number, { w: number; h: number }>();
    labelRefs.current.forEach((el, idx) => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height) m.set(idx, { w: r.width, h: r.height });
    });
    setLabelSizes(m);
  }, [containerSize.width, containerSize.height, svgMarkup]);

  // ✅ Collision-free offsets using measured sizes
  const labelOffsetMap = useMemo(() => {
    const map = new Map<number, { dx: number; dy: number }>();

    if (isTapMode) return map;
    if (!hoveredStateId) return map;
    if (hoveredPinIndex !== null) return map;

    const indexes = activePins
      .map((p, idx) => ({ idx, stateId: getStateIdByPin(p.label) }))
      .filter((x) => x.stateId === hoveredStateId)
      .map((x) => x.idx);

    if (indexes.length <= 1) return map;

    // Many candidate offsets (near pin first, then expand)
    const slots: Array<{ dx: number; dy: number }> = [];
    const rings = [0, 18, 30, 44, 60, 78, 96];
    const angles = [270, 300, 240, 330, 210, 0, 180, 30, 150, 60, 120]; // bias upward

    for (const r of rings) {
      for (const a of angles) {
        const rad = (a * Math.PI) / 180;
        slots.push({ dx: Math.round(Math.cos(rad) * r), dy: Math.round(Math.sin(rad) * r) });
      }
    }

    const pinPx = (idx: number) => {
      const p =
        pinPositions[idx] || {
          left: `${activePins[idx].x}%`,
          top: `${activePins[idx].y}%`,
        };
      const leftPct = parseFloat(p.left);
      const topPct = parseFloat(p.top);

      return {
        x: (leftPct / 100) * containerSize.width,
        y: (topPct / 100) * containerSize.height,
      };
    };

    const placed: Rect[] = [];
    const GAP = 10;

    for (const idx of indexes) {
      const { x, y } = pinPx(idx);

      const size = labelSizes.get(idx) || { w: 120, h: 40 };
      const LW = size.w;
      const LH = size.h;

      let chosen = { dx: 0, dy: 0 };

      for (const s of slots) {
        // NOTE: label anchored above dot, so push box upward
        let rect: Rect = {
          x: x + s.dx - LW / 2,
          y: y + s.dy - (LH + 22),
          w: LW + GAP,
          h: LH + GAP,
        };

        rect = {
          ...rect,
          x: clamp(rect.x, 6, containerSize.width - rect.w - 6),
          y: clamp(rect.y, 6, containerSize.height - rect.h - 6),
        };

        const collision = placed.some((p) => intersects(rect, p));
        if (!collision) {
          // make offset relative to pin center (for transform translate)
          chosen = { dx: rect.x + rect.w / 2 - x, dy: rect.y + rect.h / 2 - y };
          placed.push(rect);
          break;
        }
      }

      map.set(idx, chosen);
    }

    return map;
  }, [
    isTapMode,
    hoveredStateId,
    hoveredPinIndex,
    activePins,
    pinPositions,
    containerSize.width,
    containerSize.height,
    stateLocationData,
    labelSizes,
  ]);

  const getLabelClass = (index: number, pinLabel: string) => {
    if (isTapMode) {
      return `label ${activePinIndex === index ? "is-visible" : "is-hidden"}`;
    }
    if (hoveredPinIndex !== null) {
      return `label ${hoveredPinIndex === index ? "is-visible" : "is-hidden"}`;
    }
    if (hoveredStateId) {
      const show = isPinInHoveredState(pinLabel);
      return `label ${show ? "is-visible" : "is-hidden"}`;
    }
    return "label is-hidden";
  };

  return (
    <div className="map-container" ref={containerRef} aria-label="India map">
      {svgMarkup && (
        <div className="map-inline-svg" dangerouslySetInnerHTML={{ __html: svgMarkup }} />
      )}

      <div className="pins-overlay">
        {activePins.map((pin, idx) => {
          const position =
            pinPositions[idx] || { left: `${pin.x}%`, top: `${pin.y}%` };

          const off = labelOffsetMap.get(idx) || { dx: 0, dy: 0 };

          return (
            <div
              key={`${pin.label}-${idx}`}
              className={`pin ${isTapMode && activePinIndex === idx ? "pin-active" : ""}`}
              style={{
                left: position.left,
                top: position.top,
                opacity: 1, // ✅ ALWAYS show all pins
              }}
              role="button"
              tabIndex={isTapMode ? 0 : -1}
              aria-label={`Location: ${pin.label}`}
              onPointerEnter={() => {
                if (isTapMode) return;
                setHoveredPinIndex(idx);
                // ✅ Clear state hover to show all locations in sidebar
                onStateHover?.(null);
              }}
              onPointerLeave={(e) => {
                if (isTapMode) return;
                setHoveredPinIndex(null);

                // ✅ Check if pointer is now over a state path when leaving pin
                // Use requestAnimationFrame to ensure pointer has moved to the state
                requestAnimationFrame(() => {
                  const under = document.elementFromPoint(e.clientX, e.clientY) as Element | null;
                  if (!under) return;

                  // Skip if still over a pin
                  if (under.closest(".pin")) return;

                  // Check if over a state path
                  const statePath = under.closest('path[id^="IN-"]');
                  const stateId = statePath?.getAttribute("id") ?? null;

                  if (stateId) {
                    // Update pending hover state and commit immediately
                    pendingHoverStateRef.current = stateId;
                    lastCommittedHoverRef.current = stateId;
                    setHoveredStateId(stateId);
                    onStateHover?.(stateId);
                  }
                });
              }}
              onClick={() => handlePinTap(idx, pin.label)}
              onTouchEnd={(e) => {
                if (!isTapMode) return;
                e.preventDefault();
                handlePinTap(idx, pin.label);
              }}
            >
              <div className="dot" />

              <div
                ref={(el) => {
                  if (!el) {
                    labelRefs.current.delete(idx);
                    return;
                  }
                  labelRefs.current.set(idx, el);
                }}
                className={getLabelClass(idx, pin.label)}
                // ✅ IMPORTANT: inline transform is what positions labels uniquely
                style={{
                  transform:
                    hoveredPinIndex !== null
                      ? "translateX(-50%) translateY(-2px) scale(1.04)"
                      : `translateX(-50%) translate(${off.dx}px, ${off.dy}px)`,
                }}
              >
                {pin.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndiaMap;
