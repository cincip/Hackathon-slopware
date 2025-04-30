"use client"

import React from 'react';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export function EMWaveAnimation() {
  const duration = "4s";

  return (
    <TooltipProvider>
      <svg
        width="100%"
        height="150"
        viewBox="0 0 400 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-label="Electromagnetic wave animation"
      >
        {/* Background */}
        <rect width="400" height="150" rx="8" fill="white" fillOpacity="0.5" />

        {/* Propagation Axis */}
        <line x1="20" y1="75" x2="380" y2="75" stroke="#9ca3af" strokeWidth="1" />
        <polygon points="380,75 370,70 370,80" fill="#9ca3af" />
        <text x="200" y="95" fontSize="10" fill="#6b7280" textAnchor="middle">Propagation (v=c)</text>

        {/* Electric Field (Vertical - Red) */}
        <path stroke="#EF4444" strokeWidth="2" fill="none">
          <animate
            attributeName="d"
            dur={duration}
            repeatCount="indefinite"
            values="
              M 20 75 Q 70 25, 120 75 T 220 75 T 320 75 T 420 75;
              M 20 75 Q 70 125, 120 75 T 220 75 T 320 75 T 420 75;
              M 20 75 Q 70 25, 120 75 T 220 75 T 320 75 T 420 75
            "
          />
        </path>
        <text x="50" y="20" fontSize="10" fill="#EF4444">Electric Field (E)</text>


        {/* Magnetic Field (Horizontal - Blue - represented by thickness) */}
         <path stroke="#3B82F6" strokeWidth="2" fill="none">
           <animate
            attributeName="d"
            dur={duration}
            repeatCount="indefinite"
            values="
              M 20 75 Q 70 75, 120 75 T 220 75 T 320 75 T 420 75;
              M 20 75 Q 70 75, 120 75 T 220 75 T 320 75 T 420 75;
              M 20 75 Q 70 75, 120 75 T 220 75 T 320 75 T 420 75
            "
          />
           <animate
            attributeName="stroke-width"
            dur={duration}
            repeatCount="indefinite"
            values="1; 6; 1; 6; 1" // Simulate oscillation in/out of plane
            keyTimes="0; 0.25; 0.5; 0.75; 1"
          />
        </path>
         <text x="350" y="130" fontSize="10" fill="#3B82F6" textAnchor="end">Magnetic Field (B)</text>

      </svg>
    </TooltipProvider>
  );
}