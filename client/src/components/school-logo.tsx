interface SchoolLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SchoolLogo({ size = "md", className = "" }: SchoolLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* School Building */}
        <rect x="20" y="40" width="60" height="50" fill="currentColor" className="text-green-600 dark:text-green-400" />
        
        {/* Roof */}
        <polygon points="15,40 50,20 85,40" fill="currentColor" className="text-green-700 dark:text-green-500" />
        
        {/* Flag pole */}
        <rect x="48" y="10" width="2" height="15" fill="currentColor" className="text-gray-600 dark:text-gray-400" />
        
        {/* Flag */}
        <rect x="50" y="10" width="15" height="8" fill="currentColor" className="text-red-500" />
        
        {/* Windows */}
        <rect x="25" y="45" width="8" height="8" fill="white" />
        <rect x="37" y="45" width="8" height="8" fill="white" />
        <rect x="55" y="45" width="8" height="8" fill="white" />
        <rect x="67" y="45" width="8" height="8" fill="white" />
        
        <rect x="25" y="58" width="8" height="8" fill="white" />
        <rect x="37" y="58" width="8" height="8" fill="white" />
        <rect x="55" y="58" width="8" height="8" fill="white" />
        <rect x="67" y="58" width="8" height="8" fill="white" />
        
        {/* Main Door */}
        <rect x="45" y="70" width="10" height="20" fill="currentColor" className="text-yellow-600 dark:text-yellow-400" />
        
        {/* Door handle */}
        <circle cx="52" cy="80" r="1" fill="currentColor" className="text-gray-600 dark:text-gray-400" />
        
        {/* School name banner */}
        <rect x="22" y="32" width="56" height="6" fill="currentColor" className="text-blue-600 dark:text-blue-400" />
        
        {/* Steps */}
        <rect x="40" y="88" width="20" height="2" fill="currentColor" className="text-gray-500 dark:text-gray-300" />
      </svg>
    </div>
  );
}