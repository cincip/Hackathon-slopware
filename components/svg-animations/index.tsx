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
