"use client"

import React from 'react';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"; // Corrected import path

export function CollisionAnimation() {
  const duration = "4s";

  return (
    <TooltipProvider>
      <svg
        width="100%"
        height="100" // Adjusted height
        viewBox="0 0 400 100" // Adjusted viewBox
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-label="Elastic collision animation between two balls"
      >
        {/* Background */}
        <rect width="400" height="100" rx="8" fill="white" fillOpacity="0.5" />

        {/* Ground/Surface (optional visual) */}
        <line x1="0" y1="80" x2="400" y2="80" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 4" />

        {/* Ball 1 (Blue) */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <circle cy="50" r="15" fill="#3B82F6" className="hover:fill-blue-700 transition-colors">
              <animate
                attributeName="cx"
                values="50; 185; 185; 50" // Moves right, pauses during collision, moves left
                keyTimes="0; 0.45; 0.55; 1" // Timing: move, collide, move back
                dur={duration}
                repeatCount="indefinite"
                calcMode="linear" // Use linear for simpler motion control
              />
            </circle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ball 1: Momentum p = mv</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Ball 2 (Red) */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <circle cy="50" r="15" fill="#EF4444" className="hover:fill-red-700 transition-colors">
               <animate
                attributeName="cx"
                values="350; 215; 215; 350" // Moves left, pauses during collision, moves right
                keyTimes="0; 0.45; 0.55; 1" // Timing: move, collide, move back
                dur={duration}
                repeatCount="indefinite"
                calcMode="linear"
              />
            </circle>
          </TooltipTrigger>
          <TooltipContent>
             <p>Ball 2: Conservation of Momentum: p_initial = p_final</p>
          </TooltipContent>
        </TooltipRoot>

      </svg>
    </TooltipProvider>
  );
}