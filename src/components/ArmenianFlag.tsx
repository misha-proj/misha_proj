import React from 'react';

interface ArmenianFlagProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  blur?: boolean;
}

export const ArmenianFlag: React.FC<ArmenianFlagProps> = ({ className = '', size = 'md', blur = false }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-white/20 shadow-lg relative ${className}`}>
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 bg-[#D90429]" />
        <div className="flex-1 bg-[#003F91]" />
        <div className="flex-1 bg-[#FF8F00]" />
      </div>
      {blur && (
        <div className="absolute inset-0 backdrop-blur-sm bg-white/10 rounded-full"></div>
      )}
    </div>
  );
};

export const ArmenianLogo: React.FC<ArmenianFlagProps> = ({ className = '', size = 'md', blur = false }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full relative overflow-hidden shadow-2xl ${className}`}>
      {/* Gradient background with Armenian colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D90429] via-[#003F91] to-[#FF8F00] opacity-90"></div>
      
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10"></div>
      
      {/* Central symbol - stylized mountain/triangle for Ararat */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-white/90 clip-triangle"></div>
      </div>
      
      {/* Subtle inner glow */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
      
      {/* Blur overlay if needed */}
      {blur && (
        <div className="absolute inset-0 backdrop-blur-sm bg-white/5 rounded-full"></div>
      )}
    </div>
  );
};