"use client"

import React from 'react';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export function LengthContractionAnimation() {
  const duration = "5s";
  const startX = -150; // Start position further off-screen left
  const endX = 400;   // End position off-screen right
  const contractedWidth = 100;
  const properWidth = 300;
  const contractTime = 0.1; // Time fraction to contract/expand (e.g., 10% of duration)

  return (
    <TooltipProvider>
      <svg
        width="100%"
        height="150"
        viewBox="0 0 400 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-label="Length contraction animation"
      >
        {/* Background */}
        <rect width="400" height="150" rx="8" fill="white" fillOpacity="0.5" />

        {/* Stationary Ruler */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <g>
              <rect x="50" y="40" width={properWidth} height="15" fill="#d1d5db" rx="3" />
              <text x="200" y="70" fontSize="10" fill="#4b5563" textAnchor="middle">Stationary Ruler (L₀)</text>
            </g>
          </TooltipTrigger>
          <TooltipContent>
            <p>Proper Length L₀ = {properWidth}</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Moving Ruler Group (Contracts and Moves) */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            {/* Group to handle the translation */}
            <g>
               <animateTransform
                 attributeName="transform"
                 type="translate"
                 values={`${startX},0; ${endX},0`} // Move horizontally linearly
                 dur={duration}
                 repeatCount="indefinite"
               />

              {/* The ruler rectangle itself - width changes */}
              <rect y="100" height="15" fill="#fbbf24" rx="3">
                 {/* Width contracts quickly, stays contracted, expands quickly */}
                 <animate
                   attributeName="width"
                   values={`${properWidth}; ${contractedWidth}; ${contractedWidth}; ${properWidth}`}
                   keyTimes={`0; ${contractTime}; ${1 - contractTime}; 1`}
                   dur={duration}
                   repeatCount="indefinite" />
                 {/* Adjust x to keep center roughly aligned during contraction/expansion */}
                 <animate
                   attributeName="x"
                   values={`0; ${(properWidth - contractedWidth) / 2}; ${(properWidth - contractedWidth) / 2}; 0`}
                   keyTimes={`0; ${contractTime}; ${1 - contractTime}; 1`}
                   dur={duration}
                   repeatCount="indefinite" />
              </rect>

              {/* Text label moves with the ruler's visual center */}
              <text y="130" fontSize="10" fill="#ca8a04" textAnchor="middle">
                 {/* Animate x based on the changing width to stay centered */}
                 <animate
                   attributeName="x"
                   values={`${properWidth / 2}; ${contractedWidth / 2 + (properWidth - contractedWidth) / 2}; ${contractedWidth / 2 + (properWidth - contractedWidth) / 2}; ${properWidth / 2}`}
                   keyTimes={`0; ${contractTime}; ${1 - contractTime}; 1`}
                   dur={duration}
                   repeatCount="indefinite" />
                 Moving Ruler (L)
              </text>
            </g>
          </TooltipTrigger>
          <TooltipContent>
            <p>Contracted Length L = L₀ / γ</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Velocity Indicator (Optional - Static) */}
        <text x="350" y="140" fontSize="10" fill="#ca8a04" textAnchor="end">
          v ≈ 0.94c
        </text>

      </svg>
    </TooltipProvider>
  );
}