"use client"

import { useState } from "react"
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

export function SpecialRelativityAnimation() {
  const [speed, setSpeed] = useState(0.7) // as fraction of c
  const [showFormula, setShowFormula] = useState(false)

  const changeSpeed = () => {
    setSpeed((prev) => (prev === 0.7 ? 0.5 : prev === 0.5 ? 0.9 : 0.7))
  }

  // Calculate relativistic factor gamma
  const gamma = 1 / Math.sqrt(1 - speed ** 2)

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

        {/* Light Clock - Stationary Frame */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <rect
              x="16"
              y="18"
              width="16"
              height="36"
              rx="2"
              stroke="#D97706"
              strokeWidth="2"
              fill="white"
              fillOpacity="0.3"
              className="cursor-help"
              onMouseEnter={() => setShowFormula(true)}
              onMouseLeave={() => setShowFormula(false)}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Stationary reference frame</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Light Pulse in Stationary Frame */}
        <circle cx="24" cy="36" r="3" fill="#FBBF24">
          <animate
            attributeName="cy"
            values="21;51;21"
            dur="2s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
          />
          <animate
            attributeName="opacity"
            values="1;0.7;1"
            dur="2s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
          />
        </circle>

        {/* Light Clock - Moving Frame */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <rect
              x="40"
              y="18"
              width="16"
              height="36"
              rx="2"
              stroke="#D97706"
              strokeWidth="2"
              fill="white"
              fillOpacity="0.3"
              className="cursor-pointer hover:stroke-amber-700 transition-colors"
              onClick={changeSpeed}
            >
              <animate
                attributeName="x"
                values={`40;${40 + 4 * speed};${40 + 8 * speed};${40 + 4 * speed};40`}
                dur="4s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
              />
            </rect>
          </TooltipTrigger>
          <TooltipContent>
            <p>Moving reference frame (v = {speed}c). Click to change speed.</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Light Pulse in Moving Frame - Diagonal Path */}
        <circle cx="48" cy="36" r="3" fill="#FBBF24">
          <animate
            attributeName="cx"
            values={`48;${48 + 4 * speed};${48 + 8 * speed};${48 + 4 * speed};48`}
            dur="4s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
          />
          <animate
            attributeName="cy"
            values="21;36;51;36;21"
            dur="4s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
          />
          <animate
            attributeName="opacity"
            values="1;0.7;0.7;0.7;1"
            dur="4s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
          />
        </circle>

        {/* Direction Arrow */}
        <line x1="40" y1="60" x2="52" y2="60" stroke="#D97706" strokeWidth="1.5" />
        <polygon points="52,60 49,58 49,62" fill="#D97706" />

        {/* Speed and Time Dilation Factor */}
        <text x="24" y="12" textAnchor="middle" fontSize="6" fill="#D97706" fontWeight="bold">
          t = 1.0
        </text>

        <text x="48" y="12" textAnchor="middle" fontSize="6" fill="#D97706" fontWeight="bold">
          t' = {(1 / gamma).toFixed(2)}
        </text>

        {/* Time Dilation Formula */}
        {showFormula && (
          <TooltipRoot>
            <TooltipTrigger asChild>
              <text x="36" y="64" textAnchor="middle" fontSize="6" fill="#D97706" fontWeight="bold">
                t' = t/γ, γ = {gamma.toFixed(2)}
              </text>
            </TooltipTrigger>
            <TooltipContent>
              <p>Time dilation: moving clocks run slower by a factor of γ = 1/√(1-v²/c²)</p>
            </TooltipContent>
          </TooltipRoot>
        )}
      </svg>
    </TooltipProvider>
  )
}
