interface SchoolLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SchoolLogo({ className = "", size = "md" }: SchoolLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  };

  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer green border - flower shape */}
      <path
        d="M100 20 C120 20, 140 40, 140 60 C160 60, 180 80, 180 100 C180 120, 160 140, 140 140 C140 160, 120 180, 100 180 C80 180, 60 160, 60 140 C40 140, 20 120, 20 100 C20 80, 40 60, 60 60 C60 40, 80 20, 100 20 Z"
        fill="hsl(142, 71%, 45%)"
        stroke="hsl(142, 71%, 35%)"
        strokeWidth="3"
      />
      
      {/* Inner white circle */}
      <circle cx="100" cy="100" r="65" fill="white" stroke="hsl(142, 71%, 45%)" strokeWidth="2"/>
      
      {/* Orange/yellow gradient background for center */}
      <defs>
        <radialGradient id="centerGradient" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFD700"/>
          <stop offset="50%" stopColor="#FFA500"/>
          <stop offset="100%" stopColor="#FF8C00"/>
        </radialGradient>
      </defs>
      
      {/* Center circle with gradient */}
      <circle cx="100" cy="100" r="50" fill="url(#centerGradient)"/>
      
      {/* Torch - main vertical line */}
      <rect x="95" y="80" width="10" height="35" fill="hsl(142, 71%, 25%)" rx="2"/>
      
      {/* Torch handle - horizontal part */}
      <rect x="85" y="110" width="30" height="8" fill="hsl(142, 71%, 25%)" rx="4"/>
      
      {/* Torch flame */}
      <path
        d="M100 65 C105 65, 110 70, 110 75 C110 80, 105 85, 100 85 C95 85, 90 80, 90 75 C90 70, 95 65, 100 65 Z"
        fill="#FF4500"
      />
      
      {/* Inner flame */}
      <path
        d="M100 68 C103 68, 106 71, 106 74 C106 77, 103 80, 100 80 C97 80, 94 77, 94 74 C94 71, 97 68, 100 68 Z"
        fill="#FFD700"
      />
      
      {/* Left laurel branch */}
      <path
        d="M65 85 Q70 80, 65 75 Q70 70, 65 65 Q70 60, 65 55"
        stroke="hsl(142, 71%, 35%)"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Left laurel leaves */}
      <ellipse cx="62" cy="82" rx="4" ry="8" fill="hsl(142, 71%, 35%)" transform="rotate(-30 62 82)"/>
      <ellipse cx="62" cy="72" rx="4" ry="8" fill="hsl(142, 71%, 35%)" transform="rotate(-45 62 72)"/>
      <ellipse cx="62" cy="62" rx="4" ry="8" fill="hsl(142, 71%, 35%)" transform="rotate(-30 62 62)"/>
      
      {/* Right laurel branch */}
      <path
        d="M135 85 Q130 80, 135 75 Q130 70, 135 65 Q130 60, 135 55"
        stroke="hsl(142, 71%, 35%)"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Right laurel leaves */}
      <ellipse cx="138" cy="82" rx="4" ry="8" fill="hsl(142, 71%, 35%)" transform="rotate(30 138 82)"/>
      <ellipse cx="138" cy="72" rx="4" ry="8" fill="hsl(142, 71%, 35%)" transform="rotate(45 138 72)"/>
      <ellipse cx="138" cy="62" rx="4" ry="8" fill="hsl(142, 71%, 35%)" transform="rotate(30 138 62)"/>
      
      {/* Book pages */}
      <path
        d="M75 120 L125 120 L120 135 L80 135 Z"
        fill="#FFF8DC"
        stroke="hsl(142, 71%, 35%)"
        strokeWidth="1"
      />
      
      {/* Book binding */}
      <rect x="97" y="120" width="6" height="15" fill="hsl(142, 71%, 25%)"/>
      
      {/* Text "1971" */}
      <text x="100" y="150" textAnchor="middle" fontSize="12" fontWeight="bold" fill="hsl(142, 71%, 25%)">
        1971
      </text>
    </svg>
  );
}