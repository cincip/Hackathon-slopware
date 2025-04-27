"use client"

import { useState } from "react"
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

export function ElectromagnetismAnimation() {
  const [waveType, setWaveType] = useState("both") // "both", "electric", "magnetic"
  const [showEquation, setShowEquation] = useState(false)

  const toggleWaveType = () => {
    if (waveType === "both") setWaveType("electric")
    else if (waveType === "electric") setWaveType("magnetic")
    else setWaveType("both")
  }

  return (
    <TooltipProvider>
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full cursor-pointer"
        onClick={toggleWaveType}
      >
        <rect width="72" height="72" rx="8" fill="white" fillOpacity="0.5" />

        {/* Propagation Direction Arrow */}
        <line x1="12" y1="36" x2="60" y2="36" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
        <polygon points="60,36 55,33 55,39" fill="#64748B" />

        {/* Electric Field Wave (vertical) */}
        {(waveType === "both" || waveType === "electric") && (
          <TooltipRoot>
            <TooltipTrigger asChild>
              <path
                d="M12,36 Q20,16 28,36 Q36,56 44,36 Q52,16 60,36"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                className="cursor-help"
                onMouseEnter={() => setShowEquation(true)}
                onMouseLeave={() => setShowEquation(false)}
              >
                <animate
                  attributeName="d"
                  values="
                    M12,36 Q20,16 28,36 Q36,56 44,36 Q52,16 60,36;
                    M12,36 Q20,56 28,36 Q36,16 44,36 Q52,56 60,36;
                    M12,36 Q20,16 28,36 Q36,56 44,36 Q52,16 60,36
                  "
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
            </TooltipTrigger>
            <TooltipContent>
              <p>Electric field oscillates perpendicular to direction of propagation</p>
            </TooltipContent>
          </TooltipRoot>
        )}

        {/* Magnetic Field Wave (horizontal) */}
        {(waveType === "both" || waveType === "magnetic") && (
          <TooltipRoot>
            <TooltipTrigger asChild>
              <path
                d="M12,36 Q20,56 28,36 Q36,16 44,36 Q52,56 60,36"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                className="cursor-help"
                onMouseEnter={() => setShowEquation(true)}
                onMouseLeave={() => setShowEquation(false)}
              >
                <animate
                  attributeName="d"
                  values="
                    M12,36 Q20,56 28,36 Q36,16 44,36 Q52,56 60,36;
                    M12,36 Q20,16 28,36 Q36,56 44,36 Q52,16 60,36;
                    M12,36 Q20,56 28,36 Q36,16 44,36 Q52,56 60,36
                  "
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
            </TooltipTrigger>
            <TooltipContent>
              <p>Magnetic field oscillates perpendicular to both electric field and direction of propagation</p>
            </TooltipContent>
          </TooltipRoot>
        )}

        {/* Electric Field Label */}
        {(waveType === "both" || waveType === "electric") && (
          <text x="14" y="20" fill="#EF4444" fontSize="10" fontWeight="500">
            E
          </text>
        )}

        {/* Magnetic Field Label */}
        {(waveType === "both" || waveType === "magnetic") && (
          <text x="14" y="54" fill="#3B82F6" fontSize="10" fontWeight="500">
            B
          </text>
        )}

        {/* Maxwell's Equation */}
        {showEquation && (
          <TooltipRoot>
            <TooltipTrigger asChild>
              <text x="36" y="64" textAnchor="middle" fontSize="6" fill="#64748B" fontWeight="bold">
                c = 1/√(ε₀μ₀)
              </text>
            </TooltipTrigger>
            <TooltipContent>
              <p>Speed of light equals 1/√(electric permittivity × magnetic permeability)</p>
            </TooltipContent>
          </TooltipRoot>
        )}

        {/* Wave Type Indicator */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <text x="58" y="16" fontSize="8" fill="#64748B" fontWeight="bold" className="cursor-pointer">
              {waveType === "both" ? "E+B" : waveType === "electric" ? "E" : "B"}
            </text>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to toggle wave display</p>
          </TooltipContent>
        </TooltipRoot>
      </svg>
    </TooltipProvider>
  )
}
