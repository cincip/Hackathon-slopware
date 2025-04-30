"use client"

import React from 'react';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"; // Corrected import path

export function QuantumTunnelingAnimation() {
  const duration = "5s";

  return (
    <TooltipProvider>
      <svg
        width="100%"
        height="150"
        viewBox="0 0 400 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-label="Quantum tunneling animation"
      >
        {/* Background */}
        <rect width="400" height="150" rx="8" fill="white" fillOpacity="0.5" />

        {/* Potential Barrier */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <rect x="180" y="30" width="40" height="90" fill="#4b5563" rx="4" opacity="0.7" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Potential Energy Barrier</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Incoming Particle/Wave Packet */}
        <g>
           <circle cx="50" cy="75" r="8" fill="#8B5CF6">
             <animate attributeName="cx" from="50" to="170" dur={duration} repeatCount="indefinite" />
             <animate attributeName="opacity" from="1" to="0.1" dur={duration} repeatCount="indefinite" />
           </circle>
           {/* Represent wave nature */}
           <ellipse cx="50" cy="75" rx="20" ry="10" stroke="#8B5CF6" strokeWidth="1" fill="none" opacity="0.5">
              <animate attributeName="cx" from="50" to="170" dur={duration} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.5" to="0" dur={duration} repeatCount="indefinite" />
              <animate attributeName="rx" from="20" to="5" dur={duration} repeatCount="indefinite" />
           </ellipse>
        </g>

        {/* Tunneling Particle/Wave Packet (Lower Probability) */}
        <g>
           <circle cx="230" cy="75" r="6" fill="#A78BFA" opacity="0">
             <animate attributeName="cx" from="230" to="350" dur={duration} repeatCount="indefinite" />
             {/* Start animation slightly after the incoming one hits */}
             <animate attributeName="opacity" from="0" to="0.8" begin="0.1s" dur={duration} repeatCount="indefinite" />
           </circle>
            {/* Represent wave nature */}
           <ellipse cx="230" cy="75" rx="15" ry="8" stroke="#A78BFA" strokeWidth="1" fill="none" opacity="0">
              <animate attributeName="cx" from="230" to="350" dur={duration} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0" to="0.4" begin="0.1s" dur={duration} repeatCount="indefinite" />
              <animate attributeName="rx" from="15" to="30" dur={duration} repeatCount="indefinite" />
           </ellipse>
        </g>

        {/* Reflected Particle/Wave Packet (Higher Probability - simplified) */}
         <g>
           <circle cx="170" cy="75" r="7" fill="#C4B5FD" opacity="0">
             <animate attributeName="cx" from="170" to="50" dur={duration} repeatCount="indefinite" />
             <animate attributeName="opacity" from="0.9" to="0" begin="0.05s" dur={duration} repeatCount="indefinite" />
           </circle>
         </g>

      </svg>
    </TooltipProvider>
  );
}