import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  useImage?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', useImage = false }) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const dimMap = {
    sm: 28,
    md: 40,
    lg: 56,
    xl: 80
  };

  const currentSizeClass = sizeMap[size] || sizeMap.md;
  const dimension = dimMap[size] || 40;

  if (useImage) {
    return (
      <img
        src="/images/logo.png"
        alt="Taj Mahal Carpet Logo"
        className={`${currentSizeClass} object-contain ${className}`}
        width={dimension}
        height={dimension}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${currentSizeClass} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Taj Mahal Carpet Hexagon Logo"
    >
      {/* Outer Hexagon */}
      <polygon
        points="50,6 88,28 88,72 50,94 12,72 12,28"
        stroke="url(#goldGradient)"
        strokeWidth="6"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Inner Concentric Hexagon */}
      <polygon
        points="50,22 74,36 74,64 50,78 26,64 26,36"
        stroke="url(#goldGradient)"
        strokeWidth="4"
        strokeLinejoin="round"
        fill="none"
        opacity="0.9"
      />
      {/* Center Dot */}
      <circle cx="50" cy="50" r="8" fill="url(#goldGradient)" />

      <defs>
        <linearGradient id="goldGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DFB971" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#9B7832" />
        </linearGradient>
      </defs>
    </svg>
  );
};
