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
      <img
        src="/assets/SJNHS.png"
        alt="San Jose National High School Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
}