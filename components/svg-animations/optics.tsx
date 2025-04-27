"use client"

import { useState } from "react"
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

export function OpticsAnimation() {
  const [prismAngle, setPrismAngle] = useState(0)
  const [highlightBeam, setHighlightBeam] = useState<string | null>(null)

  const rotatePrism = () => {
    setPrismAngle((prev) => (prev + 15) % 45)
  }

  return (
    <TooltipProvider>
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <rect width="72" height="72" rx="8" fill="white" fillOpacity="0.5" />

        {/* Prism */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <path
              d={`M${24 - prismAngle} 46L36 20L${48 + prismAngle} 46H${24 - prismAngle}Z`}
              fill="white"
              fillOpacity="0.8"
              stroke="#10B981"
              strokeWidth="2"
              className="cursor-pointer hover:stroke-green-700 transition-colors"
              onClick={rotatePrism}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Prism: Click to rotate {prismAngle}°</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Light Source */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <circle cx="16" cy="36" r="4" fill="#FBBF24" className="cursor-help">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </circle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Light source: white light contains all wavelengths</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Incoming Light Beam */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <line
              x1="20"
              y1="36"
              x2="32"
              y2="36"
              stroke={highlightBeam === "incoming" ? "#FBBF24" : "#FBBF24"}
              y2="36"
              stroke={highlightBeam === "incoming" ? "#FBBF24" : "#FBBF24"}
              strokeWidth="2"
              className="cursor-help"
              onMouseEnter={() => setHighlightBeam("incoming")}
              onMouseLeave={() => setHighlightBeam(null)}
            >
              <animate attributeName="stroke-dasharray" values="1,12;12,1;1,12" dur="2s" repeatCount="indefinite" />
            </line>
          </TooltipTrigger>
          <TooltipContent>
            <p>Incident ray: light entering the prism</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Refracted Light - Red */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <line
              x1="38"
              y1="38"
              x2="54"
              y2="44"
              stroke={highlightBeam === "red" ? "#EF4444" : "#EF4444"}
              strokeWidth="2"
              className="cursor-help"
              onMouseEnter={() => setHighlightBeam("red")}
              onMouseLeave={() => setHighlightBeam(null)}
            >
              <animate attributeName="stroke-dasharray" values="1,12;12,1;1,12" dur="2s" repeatCount="indefinite" />
            </line>
          </TooltipTrigger>
          <TooltipContent>
            <p>Red light: longest visible wavelength (650nm)</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Refracted Light - Green */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <line
              x1="38"
              y1="36"
              x2="54"
              y2="36"
              stroke={highlightBeam === "green" ? "#10B981" : "#10B981"}
              strokeWidth="2"
              className="cursor-help"
              onMouseEnter={() => setHighlightBeam("green")}
              onMouseLeave={() => setHighlightBeam(null)}
            >
              <animate attributeName="stroke-dasharray" values="1,12;12,1;1,12" dur="2s" repeatCount="indefinite" />
            </line>
          </TooltipTrigger>
          <TooltipContent>
            <p>Green light: medium wavelength (550nm)</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Refracted Light - Blue */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <line
              x1="38"
              y1="34"
              x2="54"
              y2="28"
              stroke={highlightBeam === "blue" ? "#3B82F6" : "#3B82F6"}
              strokeWidth="2"
              className="cursor-help"
              onMouseEnter={() => setHighlightBeam("blue")}
              onMouseLeave={() => setHighlightBeam(null)}
            >
              <animate attributeName="stroke-dasharray" values="1,12;12,1;1,12" dur="2s" repeatCount="indefinite" />
            </line>
          </TooltipTrigger>
          <TooltipContent>
            <p>Blue light: shortest visible wavelength (450nm)</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Snell's Law Formula */}
        {highlightBeam && (
          <text x="36" y="60" textAnchor="middle" fontSize="6" fill="#10B981" fontWeight="bold">
            n₁sin(θ₁) = n₂sin(θ₂)
          </text>
        )}
      </svg>
    </TooltipProvider>
  )
}
