"use client"

import { useState } from "react"
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

export function ThermodynamicsAnimation() {
  const [hotTemperature, setHotTemperature] = useState(90)
  const [coldTemperature, setColdTemperature] = useState(30)
  const [showHeatFlow, setShowHeatFlow] = useState(false)

  const increaseHotTemp = () => {
    if (hotTemperature < 99) setHotTemperature(hotTemperature + 10)
  }

  const decreaseColdTemp = () => {
    if (coldTemperature > 10) setColdTemperature(coldTemperature - 10)
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

        {/* Hot Container */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <rect
              x="12"
              y="22"
              width="20"
              height="28"
              fill="#FED7AA"
              stroke="#F97316"
              strokeWidth="2"
              className="cursor-pointer hover:fill-orange-200 transition-colors"
              onClick={increaseHotTemp}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Hot container: {hotTemperature}°C (Click to heat)</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Cold Container */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <rect
              x="40"
              y="22"
              width="20"
              height="28"
              fill="#BFDBFE"
              stroke="#3B82F6"
              strokeWidth="2"
              className="cursor-pointer hover:fill-blue-200 transition-colors"
              onClick={decreaseColdTemp}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Cold container: {coldTemperature}°C (Click to cool)</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Heat Flow Indicator */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <g
              className="cursor-help"
              onMouseEnter={() => setShowHeatFlow(true)}
              onMouseLeave={() => setShowHeatFlow(false)}
            >
              <rect x="32" y="30" width="8" height="12" fill="transparent" />
              {showHeatFlow && (
                <>
                  <line x1="32" y1="36" x2="40" y2="36" stroke="#F97316" strokeWidth="1.5" strokeDasharray="1 1" />
                  <polygon points="40,36 37,34 37,38" fill="#F97316" />
                </>
              )}
            </g>
          </TooltipTrigger>
          <TooltipContent>
            <p>Heat flows from hot to cold: Q = mc∆T</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Hot Container Temperature */}
        <text x="22" y="18" textAnchor="middle" fontSize="8" fill="#F97316" fontWeight="bold">
          {hotTemperature}°C
        </text>

        {/* Cold Container Temperature */}
        <text x="50" y="18" textAnchor="middle" fontSize="8" fill="#3B82F6" fontWeight="bold">
          {coldTemperature}°C
        </text>

        {/* Heat Particles */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <circle cx="18" cy="30" r="3" fill="#F97316" className="cursor-help">
              <animate
                attributeName="cy"
                values="30;26;32;28;30"
                dur="2s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
              />
            </circle>
          </TooltipTrigger>
          <TooltipContent>
            <p>High energy particle</p>
          </TooltipContent>
        </TooltipRoot>

        <circle cx="26" cy="36" r="3" fill="#F97316">
          <animate
            attributeName="cy"
            values="36;40;32;38;36"
            dur="2.3s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
          />
        </circle>

        {/* Moving Heat Particles */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <circle cx="30" cy="36" r="2.5" fill="#FB923C" className="cursor-help">
              <animate
                attributeName="cx"
                values="30;46;30"
                dur="3s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
              />
              <animate attributeName="fill" values="#FB923C;#93C5FD;#FB923C" dur="3s" repeatCount="indefinite" />
            </circle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Energy transfer between systems</p>
          </TooltipContent>
        </TooltipRoot>

        <circle cx="34" cy="30" r="2.5" fill="#FB923C">
          <animate
            attributeName="cx"
            values="34;50;34"
            dur="4s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
          />
          <animate attributeName="fill" values="#FB923C;#93C5FD;#FB923C" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Cold Particles */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <circle cx="46" cy="30" r="3" fill="#3B82F6" className="cursor-help">
              <animate
                attributeName="cy"
                values="30;34;28;32;30"
                dur="3s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
              />
            </circle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Low energy particle</p>
          </TooltipContent>
        </TooltipRoot>

        <circle cx="54" cy="36" r="3" fill="#3B82F6">
          <animate
            attributeName="cy"
            values="36;32;38;34;36"
            dur="2.7s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
          />
        </circle>
      </svg>
    </TooltipProvider>
  )
}
