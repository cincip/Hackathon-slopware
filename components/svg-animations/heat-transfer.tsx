"use client"

import React from 'react';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export function HeatTransferAnimation() {
  const duration = "6s";

  return (
    <TooltipProvider>
      <svg
        width="100%"
        height="150"
        viewBox="0 0 400 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-label="Heat transfer animation"
      >
        {/* Background */}
        <rect width="400" height="150" rx="8" fill="white" fillOpacity="0.5" />

        {/* Hot Object (Left) */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <rect x="50" y="50" width="100" height="50" fill="#f97316" rx="4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Hot Object (T_hot)</p>
          </TooltipContent>
        </TooltipRoot>
        <text x="100" y="40" fontSize="10" fill="#c2410c" textAnchor="middle">Hot</text>

        {/* Cold Object (Right) */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <rect x="250" y="50" width="100" height="50" fill="#3b82f6" rx="4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Cold Object (T_cold)</p>
          </TooltipContent>
        </TooltipRoot>
         <text x="300" y="40" fontSize="10" fill="#1d4ed8" textAnchor="middle">Cold</text>

        {/* Heat Flow Particles */}
        <g>
          {[...Array(8)].map((_, i) => (
            <circle key={i} cy="75" r="3">
              <animate
                attributeName="cx"
                values="150; 250"
                dur={duration}
                begin={`${i * 0.5}s`} // Stagger start times
                repeatCount="indefinite"
              />
               <animate
                attributeName="fill"
                values="#f97316; #60a5fa" // Orange to light blue
                dur={duration}
                 begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
               <animate
                attributeName="opacity"
                values="1; 0"
                dur={duration}
                 begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

         {/* Heat Flow Arrow */}
         <line x1="160" y1="75" x2="240" y2="75" stroke="#fb923c" strokeWidth="2" strokeDasharray="4 2">
            <animate attributeName="stroke-dashoffset" values="0; -6" dur="0.5s" repeatCount="indefinite" />
         </line>
         <polygon points="240,75 230,70 230,80" fill="#fb923c" />
         <text x="200" y="95" fontSize="10" fill="#ea580c" textAnchor="middle">Heat Flow (Q)</text>

      </svg>
    </TooltipProvider>
  );
}