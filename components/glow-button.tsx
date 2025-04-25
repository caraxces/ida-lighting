import { useState, useEffect } from "react";

interface GlowButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  width?: string;
  smallGlow?: boolean;
}

export default function GlowButton({
  text,
  onClick,
  className = "",
  width = "auto",
  smallGlow = false,
}: GlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animate the glow effect and pulsing
  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Complete rotation every 3 seconds
      setRotation((elapsed / 3000) % 1);
      
      // Pulse effect (0-1-0) cycle every 2 seconds
      setPulsePhase(Math.sin(elapsed / 1000) * 0.5 + 0.5);

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Adjustments for small glow version
  const glowSize = smallGlow ? {
    // Much smaller glow settings
    outerBlur: '0.5px',
    outerScale: 1.002 + pulsePhase * 0.001,
    outerOpacity: isHovered ? 0.3 : 0.15,
    primaryBlur: isHovered ? '0.3px' : '0.2px',
    primaryScale: 1.001 + pulsePhase * 0.0005,
    innerShadow: isHovered
      ? `inset 0 0 2px rgba(255, 255, 255, 0.1), 
         inset 0 0 1px rgba(255, 51, 0, 0.1)`
      : `inset 0 0 1px rgba(255, 255, 255, 0.05), 
         inset 0 0 0.5px rgba(255, 51, 0, 0.05)`,
    buttonShadow: isHovered 
      ? `0 0 2px rgba(255, 51, 0, 0.2), 
         0 0 4px rgba(255, 69, 0, 0.1)`
      : `0 0 1px rgba(255, 51, 0, 0.1), 
         0 0 2px rgba(255, 69, 0, 0.05)`,
    buttonPadding: "px-1.5 py-0.5",
    fontSize: "text-[14px]",
    fontWeight: "font-normal",
    buttonSize: isHovered ? "scale(1)" : "scale(1)"
  } : {
    outerBlur: '5px',
    outerScale: 1.02 + pulsePhase * 0.01,
    outerOpacity: isHovered ? 0.8 : 0.6,
    primaryBlur: isHovered ? '1.8px' : '1px',
    primaryScale: 1.005 + pulsePhase * 0.005,
    innerShadow: isHovered
      ? `inset 0 0 10px rgba(255, 255, 255, 0.3), 
         inset 0 0 3px rgba(255, 51, 0, 0.6)`
      : `inset 0 0 5px rgba(255, 255, 255, 0.2), 
         inset 0 0 2px rgba(255, 51, 0, 0.4)`,
    buttonShadow: isHovered 
      ? `0 0 12px rgba(255, 51, 0, 0.7), 
         0 0 25px rgba(255, 69, 0, 0.4),
         0 0 40px rgba(255, 94, 26, 0.2)`
      : `0 0 8px rgba(255, 51, 0, 0.5), 
         0 0 18px rgba(255, 69, 0, 0.3),
         0 0 30px rgba(255, 94, 26, 0.1)`,
    buttonPadding: isMobile ? "px-2 py-1" : "px-4 py-1.5",
    fontSize: "text-[14px]",
    fontWeight: "font-medium",
    buttonSize: isHovered ? "scale(1.01)" : "scale(1)"
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ 
        maxWidth: width, 
        width: width 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer glow layer - tighter spread */}
      <div
        className={`absolute rounded-sm overflow-hidden ${smallGlow ? 'inset-0' : 'inset-[-2px]'}`}
        style={{
          filter: `blur(${glowSize.outerBlur}) brightness(${isHovered ? 1.2 : 1})`,
          background: `conic-gradient(
            from ${(rotation * 360 + 45) % 360}deg,
            #ff3300, 
            #ff4500, 
            #ff5e1a, 
            #ff6a33, 
            #ff3300, 
            #ff4500,
            #ff5e1a, 
            #ff6a33,
            #ff3300
          )`,
          opacity: glowSize.outerOpacity,
          transform: `scale(${glowSize.outerScale})`,
          transition: "transform 0.2s ease-out, opacity 0.3s ease-out, filter 0.3s ease-out",
        }}
      />

      {/* Main glow effect container */}
      <div className="absolute inset-0 overflow-hidden rounded-sm">
        {/* Primary animated gradient border */}
        <div
          className={`absolute rounded-sm ${smallGlow ? 'inset-0' : 'inset-[-1px]'}`}
          style={{
            background: `conic-gradient(
              from ${rotation * 360}deg,
              #ff3300, 
              #ff4500, 
              #ff5e1a, 
              #ff6a33, 
              #ff3300, 
              #ff4500,
              #ff5e1a, 
              #ff6a33,
              #ff3300
            )`,
            filter: `blur(${glowSize.primaryBlur}) brightness(${isHovered ? 1.1 : 0.9})`,
            opacity: isHovered ? 0.9 : 0.7,
            transform: `scale(${glowSize.primaryScale})`,
            transition: "transform 0.2s ease-out, filter 0.3s ease-out",
          }}
        />
      </div>

      {/* Inner glow accent layer */}
      <div
        className="absolute inset-0 rounded-sm overflow-hidden pointer-events-none"
        style={{
          background: "transparent",
          boxShadow: glowSize.innerShadow,
          opacity: isHovered ? 0.8 : 0.6,
          transition: "opacity 0.3s ease-out, box-shadow 0.3s ease-out",
        }}
      />

      {/* Button content */}
      <button
        onClick={onClick}
        className={`relative z-10 ${glowSize.buttonPadding} ${glowSize.fontSize} ${glowSize.fontWeight} bg-black bg-opacity-90 text-white transition-all duration-300 rounded-sm whitespace-nowrap`}
        style={{
          boxShadow: glowSize.buttonShadow,
          transform: glowSize.buttonSize,
          textShadow: isHovered 
            ? "0 0 4px rgba(255, 255, 255, 0.5)" 
            : "0 0 2px rgba(255, 255, 255, 0.3)",
          letterSpacing: smallGlow ? "0.02em" : "normal"
        }}
      >
        {text}
      </button>
    </div>
  );
}