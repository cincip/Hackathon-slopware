"use client"

import { useState } from "react"
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

export function ClassicalMechanicsAnimation() {
  const [speed, setSpeed] = useState(2)
  const [showForce, setShowForce] = useState(false)

  const toggleSpeed = () => {
    setSpeed(speed === 2 ? 1 : speed === 1 ? 4 : 2)
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
        onClick={toggleSpeed}
        aria-label="Classical mechanics pendulum animation. Click to change speed."
      >
        <rect width="72" height="72" rx="8" fill="white" fillOpacity="0.5" />

        {/* Support Line */}
        <line x1="36" y1="10" x2="36" y2="15" stroke="#2563EB" strokeWidth="2" />

        {/* Pendulum String */}
        <line
          x1="36"
          y1="15"
          x2="36"
          y2="40"
          stroke="#2563EB"
          strokeWidth="2"
          strokeDasharray="1 1"
          onMouseEnter={() => setShowForce(true)}
          onMouseLeave={() => setShowForce(false)}
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="-30 36 15"
            to="30 36 15"
            dur={`${speed}s`}
            repeatCount="indefinite"
            additive="sum"
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
            keyTimes="0; 0.5; 1"
            values="-30 36 15; 30 36 15; -30 36 15"
          />
        </line>

        {/* Pendulum Bob */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <circle
              cx="36"
              cy="40"
              r="8"
              fill="#3B82F6"
              className="hover:fill-blue-700 transition-colors"
              onMouseEnter={() => setShowForce(true)}
              onMouseLeave={() => setShowForce(false)}
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="-30 36 15"
                to="30 36 15"
                dur={`${speed}s`}
                repeatCount="indefinite"
                additive="sum"
                calcMode="spline"
                keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
                keyTimes="0; 0.5; 1"
                values="-30 36 15; 30 36 15; -30 36 15"
              />
            </circle>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Period: T = 2π√(L/g)</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Force Vectors - only show when hovering */}
        {showForce && (
          <>
            <line x1="36" y1="40" x2="36" y2="50" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrowhead)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="-30 36 15"
                to="30 36 15"
                dur={`${speed}s`}
                repeatCount="indefinite"
                additive="sum"
                calcMode="spline"
                keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
                keyTimes="0; 0.5; 1"
                values="-30 36 15; 30 36 15; -30 36 15"
              />
            </line>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
              </marker>
            </defs>
          </>
        )}

        {/* Ground */}
        <line x1="12" y1="62" x2="60" y2="62" stroke="#2563EB" strokeWidth="2" />

        {/* Speed indicator */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <text x="58" y="16" fontSize="10" fill="#2563EB" fontWeight="bold" className="cursor-pointer">
              {speed === 1 ? "1x" : speed === 2 ? "2x" : "4x"}
            </text>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to change speed</p>
          </TooltipContent>
        </TooltipRoot>
      </svg>
    </TooltipProvider>
  )
}
