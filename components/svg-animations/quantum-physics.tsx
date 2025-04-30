"use client"

import { useState } from "react"
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

export function QuantumPhysicsAnimation() {
  const [showProbabilityCloud, setShowProbabilityCloud] = useState(false)
  const [orbitView, setOrbitView] = useState("standard") // standard, probability, energy

  const toggleOrbitView = () => {
    if (orbitView === "standard") setOrbitView("probability")
    else if (orbitView === "probability") setOrbitView("energy")
    else setOrbitView("standard")
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
        onClick={toggleOrbitView}
      >
        <rect width="72" height="72" rx="8" fill="white" fillOpacity="0.5" />

        {/* Nucleus */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <circle
              cx="36"
              cy="36"
              r="8"
              fill="#8B5CF6"
              className="cursor-pointer hover:fill-purple-700 transition-colors"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Nucleus: contains protons and neutrons</p>
          </TooltipContent>
        </TooltipRoot>

        {/* Probability Cloud - only shown when hovering over electrons */}
        {showProbabilityCloud && (
          <circle cx="36" cy="36" r="24" fill="url(#probabilityGradient)" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Gradient for probability cloud */}
        <defs>
          <radialGradient id="probabilityGradient" cx="36" cy="36" r="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Electron Orbits - different views based on state */}
        {orbitView === "standard" && (
          <>
            <ellipse cx="36" cy="36" rx="24" ry="10" stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.6" fill="none">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 36 36"
                to="360 36 36"
                dur="6s"
                repeatCount="indefinite"
              />
            </ellipse>

            <ellipse
              cx="36"
              cy="36"
              rx="24"
              ry="10"
              stroke="#8B5CF6"
              strokeWidth="1.5"
              strokeOpacity="0.6"
              fill="none"
              transform="rotate(60 36 36)"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="60 36 36"
                to="420 36 36"
                dur="8s"
                repeatCount="indefinite"
              />
            </ellipse>

            <ellipse
              cx="36"
              cy="36"
              rx="24"
              ry="10"
              stroke="#8B5CF6"
              strokeWidth="1.5"
              strokeOpacity="0.6"
              fill="none"
              transform="rotate(120 36 36)"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="120 36 36"
                to="480 36 36"
                dur="10s"
                repeatCount="indefinite"
              />
            </ellipse>
          </>
        )}

        {orbitView === "probability" && (
          <>
            <circle cx="36" cy="36" r="16" fill="none" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="36" cy="36" r="24" fill="none" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="36" cy="36" r="32" fill="none" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="2 2" />

            {/* Probability dots */}
            {Array.from({ length: 40 }).map((_, i) => {
              const angle = Math.random() * Math.PI * 2
              const distance = 16 + Math.random() * 16
              const x = 36 + Math.cos(angle) * distance
              const y = 36 + Math.sin(angle) * distance
              const opacity = 0.3 + Math.random() * 0.7
              const size = 0.5 + Math.random() * 1.5

              return (
                <circle key={i} cx={x} cy={y} r={size} fill="#A78BFA" opacity={opacity}>
                  <animate
                    attributeName="opacity"
                    values={`${opacity};${opacity * 0.5};${opacity}`}
                    dur={`${1 + Math.random() * 2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )
            })}
          </>
        )}

        {orbitView === "energy" && (
          <>
            <circle cx="36" cy="36" r="16" fill="none" stroke="#8B5CF6" strokeWidth="1.5" />
            <circle cx="36" cy="36" r="24" fill="none" stroke="#A78BFA" strokeWidth="1.5" />
            <circle cx="36" cy="36" r="32" fill="none" stroke="#C4B5FD" strokeWidth="1.5" />

            <text x="36" y="36" textAnchor="middle" fill="#8B5CF6" fontSize="6" fontWeight="bold">
              n=1
            </text>
            <text x="36" y="24" textAnchor="middle" fill="#A78BFA" fontSize="6" fontWeight="bold">
              n=2
            </text>
            <text x="36" y="12" textAnchor="middle" fill="#C4B5FD" fontSize="6" fontWeight="bold">
              n=3
            </text>
          </>
        )}

        {/* Electrons */}
        {orbitView === "standard" && (
          <>
            <TooltipRoot>
              <TooltipTrigger asChild>
                <circle
                  cx="60"
                  cy="36"
                  r="3"
                  fill="#A78BFA"
                  className="cursor-help"
                  onMouseEnter={() => setShowProbabilityCloud(true)}
                  onMouseLeave={() => setShowProbabilityCloud(false)}
                >
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from="0 36 36"
                    to="360 36 36"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </circle>
              </TooltipTrigger>
              <TooltipContent>
                <p>Electron: n=1, l=0, m=0</p>
              </TooltipContent>
            </TooltipRoot>

            <TooltipRoot>
              <TooltipTrigger asChild>
                <circle
                  cx="36"
                  cy="46"
                  r="3"
                  fill="#A78BFA"
                  transform="rotate(60 36 36)"
                  className="cursor-help"
                  onMouseEnter={() => setShowProbabilityCloud(true)}
                  onMouseLeave={() => setShowProbabilityCloud(false)}
                >
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from="60 36 36"
                    to="420 36 36"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </circle>
              </TooltipTrigger>
              <TooltipContent>
                <p>Electron: n=2, l=1, m=0</p>
              </TooltipContent>
            </TooltipRoot>

            <TooltipRoot>
              <TooltipTrigger asChild>
                <circle
                  cx="36"
                  cy="46"
                  r="3"
                  fill="#A78BFA"
                  transform="rotate(120 36 36)"
                  className="cursor-help"
                  onMouseEnter={() => setShowProbabilityCloud(true)}
                  onMouseLeave={() => setShowProbabilityCloud(false)}
                >
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from="120 36 36"
                    to="480 36 36"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </circle>
              </TooltipTrigger>
              <TooltipContent>
                <p>Electron: n=2, l=1, m=1</p>
              </TooltipContent>
            </TooltipRoot>
          </>
        )}

        {/* View mode indicator */}
        <TooltipRoot>
          <TooltipTrigger asChild>
            <text x="58" y="16" fontSize="8" fill="#8B5CF6" fontWeight="bold" className="cursor-pointer">
              {orbitView === "standard" ? "Orbit" : orbitView === "probability" ? "Cloud" : "Energy"}
            </text>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to change view mode</p>
          </TooltipContent>
        </TooltipRoot>
      </svg>
    </TooltipProvider>
  )
}
