"use client"

import React from 'react';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export function RefractionAnimation() {
  const duration = "3s";
  const lensCenterX = 200;
  const lensWidth = 20; // Half-width for arc control
  const lensHeight = 60; // Half-height for arc control
  const focalPointX = 300;

  return (
    <TooltipProvider>
      <svg
        width="100%"
        height="150"
        viewBox="0 0 400 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-label="Light refraction through a converging lens animation"
      >
        {/* Background */}
        <rect width="400" height="150" rx="8" fill="white" fillOpacity="0.5" />

        {/* Optical Axis */}
        <line x1="0" y1="75" x2="400" y2="75" stroke="#9ca3af" strokeWidth="1" />

        {/* Single Converging Lens */}
        <TooltipRoot>
          <TooltipTrigger asChild>
             {/* Draw a single biconvex lens shape */}
             <path
               d={`M ${lensCenterX - lensWidth/2} ${75 - lensHeight} 
                  A ${lensWidth*2} ${lensHeight} 0 0 1 ${lensCenterX - lensWidth/2} ${75 + lensHeight}
                  A ${lensWidth*2} ${lensHeight} 0 0 1 ${lensCenterX - lensWidth/2} ${75 - lensHeight} Z`}
               transform={`translate(${lensWidth/2}, 0)`} // Center the lens visually
               fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5"
             />
          </TooltipTrigger>
           <TooltipContent>
            <p>Converging Lens</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Focal Point */}
        <circle cx={focalPointX} cy="75" r="3" fill="#ef4444" />
        <text x={focalPointX} y="90" fontSize="10" fill="#ef4444" textAnchor="middle">F</text>

        {/* Incoming Parallel Rays - Bending at the lens center */}
        <g stroke="#f59e0b" strokeWidth="1.5">
          {/* Ray 1 */}
          <line x1="0" y1="55">
            {/* Animate x2: 0 -> lens center -> focal point */}
            <animate attributeName="x2" values={`0; ${lensCenterX}; ${focalPointX}`} keyTimes="0; 0.5; 1" dur={duration} repeatCount="indefinite" />
            {/* Animate y2: stays level -> bends to focal point */}
            <animate attributeName="y2" values="55; 55; 75" keyTimes="0; 0.5; 1" dur={duration} repeatCount="indefinite" />
          </line>
          {/* Ray 2 (Center ray - no deviation) */}
          <line x1="0" y1="75">
             {/* Animate x2: 0 -> lens center -> continues straight (effectively to focal point for parallel rays) */}
             <animate attributeName="x2" values={`0; ${lensCenterX}; ${focalPointX}`} keyTimes="0; 0.5; 1" dur={duration} repeatCount="indefinite" />
             {/* Animate y2: stays level */}
             <animate attributeName="y2" values="75; 75; 75" keyTimes="0; 0.5; 1" dur={duration} repeatCount="indefinite" />
          </line>
          {/* Ray 3 */}
          <line x1="0" y1="95">
             {/* Animate x2: 0 -> lens center -> focal point */}
             <animate attributeName="x2" values={`0; ${lensCenterX}; ${focalPointX}`} keyTimes="0; 0.5; 1" dur={duration} repeatCount="indefinite" />
             {/* Animate y2: stays level -> bends to focal point */}
             <animate attributeName="y2" values="95; 95; 75" keyTimes="0; 0.5; 1" dur={duration} repeatCount="indefinite" />
          </line>
        </g>

      </svg>
    </TooltipProvider>
  );
}