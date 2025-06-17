'use client';
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

const AGE_MIN = 18;
const AGE_MAX = 100;
const AGE_GAP = 1;
const DIST_MIN = 1;
const DIST_MAX = 100;

export default function MatchFilter() {
  const router = useRouter();
  // Age range state
  const [ageMin, setAgeMin] = useState(AGE_MIN);
  const [ageMax, setAgeMax] = useState(AGE_MAX);
  // Distance state
  const [distance, setDistance] = useState(14);

  // For thumb dragging
  const trackRef = useRef<HTMLDivElement>(null);
  const distTrackRef = useRef<HTMLDivElement>(null);

  // Calculate percent positions
  const minPercent = ((ageMin - AGE_MIN) / (AGE_MAX - AGE_MIN)) * 100;
  const maxPercent = ((ageMax - AGE_MIN) / (AGE_MAX - AGE_MIN)) * 100;
  const distPercent = ((distance - DIST_MIN) / (DIST_MAX - DIST_MIN)) * 100;

  // Handle thumb drag for age
  const handleThumbDrag = (which: 'min' | 'max', e: React.TouchEvent | React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    let percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    let value = Math.round(AGE_MIN + ((AGE_MAX - AGE_MIN) * percent) / 100);
    if (which === 'min') {
      value = Math.min(value, ageMax - AGE_GAP);
      value = Math.max(AGE_MIN, value);
      setAgeMin(value);
    } else {
      value = Math.max(value, ageMin + AGE_GAP);
      value = Math.min(AGE_MAX, value);
      setAgeMax(value);
    }
  };

  // Mouse/touch handlers for age
  const startDrag = (which: 'min' | 'max') => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const moveHandler = (ev: any) => handleThumbDrag(which, ev);
    const upHandler = () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
      window.removeEventListener('touchend', upHandler);
    };
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('touchmove', moveHandler);
    window.addEventListener('mouseup', upHandler);
    window.addEventListener('touchend', upHandler);
  };

  // Handle thumb drag for distance
  const handleDistThumbDrag = (e: React.TouchEvent | React.MouseEvent) => {
    const track = distTrackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    let percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    let value = Math.round(DIST_MIN + ((DIST_MAX - DIST_MIN) * percent) / 100);
    value = Math.max(DIST_MIN, Math.min(DIST_MAX, value));
    setDistance(value);
  };
  const startDistDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const moveHandler = (ev: any) => handleDistThumbDrag(ev);
    const upHandler = () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
      window.removeEventListener('touchend', upHandler);
    };
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('touchmove', moveHandler);
    window.addEventListener('mouseup', upHandler);
    window.addEventListener('touchend', upHandler);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60">
      <div className="w-full max-w-[430px] bg-container rounded-t-3xl p-6 pb-10 shadow-2xl animate-slideUp relative">
        <button
          className="absolute top-4 right-6 text-main hover:text-purple text-2xl"
          onClick={() => router.back()}
          title="Chiudi"
        >
          <X size={28} />
        </button>
        <h2 className="text-center text-lg font-semibold text-main mb-6">Filtri Discovery</h2>
        {/* Distance Slider (custom) */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-main text-base font-medium">Distanza massima</span>
            <span className="text-main text-sm font-semibold">{distance === 100 ? '100+ km' : `${distance} km`}</span>
          </div>
          <div ref={distTrackRef} className="relative w-full h-8 flex items-center select-none" style={{ touchAction: 'none' }}>
            {/* Track */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 rounded-lg bg-main" />
            {/* Range highlight */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-2 rounded-lg bg-purple"
              style={{ left: 0, width: `${distPercent}%` }}
            />
            {/* Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple border-4 border-white shadow-lg cursor-pointer z-10"
              style={{ left: `calc(${distPercent}% - 16px)` }}
              onMouseDown={startDistDrag}
              onTouchStart={startDistDrag}
              tabIndex={0}
              aria-label="Distanza massima"
              role="slider"
              aria-valuenow={distance}
              aria-valuemin={DIST_MIN}
              aria-valuemax={DIST_MAX}
            />
          </div>
        </div>
        {/* Age Range Slider (custom double-thumb) */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-main text-base font-medium">Fascia d'età</span>
            <span className="text-main text-sm font-semibold">{ageMin} - {ageMax === 100 ? '100+' : ageMax}</span>
          </div>
          <div ref={trackRef} className="relative w-full h-8 flex items-center select-none" style={{ touchAction: 'none' }}>
            {/* Track */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 rounded-lg bg-main" />
            {/* Range highlight */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-2 rounded-lg bg-purple"
              style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
            />
            {/* Min thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple border-4 border-white shadow-lg cursor-pointer z-10"
              style={{ left: `calc(${minPercent}% - 16px)` }}
              onMouseDown={startDrag('min')}
              onTouchStart={startDrag('min')}
              tabIndex={0}
              aria-label="Età minima"
              role="slider"
              aria-valuenow={ageMin}
              aria-valuemin={AGE_MIN}
              aria-valuemax={ageMax - AGE_GAP}
            />
            {/* Max thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple border-4 border-white shadow-lg cursor-pointer z-10"
              style={{ left: `calc(${maxPercent}% - 16px)` }}
              onMouseDown={startDrag('max')}
              onTouchStart={startDrag('max')}
              tabIndex={0}
              aria-label="Età massima"
              role="slider"
              aria-valuenow={ageMax}
              aria-valuemin={ageMin + AGE_GAP}
              aria-valuemax={AGE_MAX}
            />
          </div>
        </div>
        {/* Apply Button */}
        <button
          className="w-full mt-4 py-3 rounded-xl bg-cta text-main font-bold text-lg shadow-lg active:scale-95 transition-all"
          onClick={() => router.back()}
        >
          Applica filtri
        </button>
      </div>
    </div>
  );
} 