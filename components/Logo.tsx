import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
  color?: string;
  src?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 32, className = "", color = "currentColor", src }) => {
  if (src) {
    return (
      <div className={`${className} flex items-center justify-center overflow-hidden`} style={{ width: size, height: size }}>
        <Image 
          src={src} 
          alt="Logo" 
          width={size}
          height={size}
          className="w-full h-full object-contain"
          unoptimized
        />
      </div>
    );
  }

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Circle/Shield */}
      <rect x="10" y="10" width="80" height="80" rx="20" fill={color} fillOpacity="0.1" />
      
      {/* Stylized 'A' + Upward Trend */}
      <path 
        d="M30 75L50 25L70 75" 
        stroke={color} 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M40 55H60" 
        stroke={color} 
        strokeWidth="10" 
        strokeLinecap="round" 
      />
      
      {/* Financial Spark/Dot */}
      <circle cx="75" cy="25" r="8" fill="#3B82F6" />
      <path 
        d="M75 25V15M75 25V35M75 25H65M75 25H85" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
    </svg>
  );
};

export default Logo;
