import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'rink' | 'sports' | 'logo';
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Sports image',
  className = '',
  fallbackType = 'rink',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  // High quality inline SVG fallbacks for offline or network issues
  const fallbackSVGs = {
    rink: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" fill="%2318283A"><rect width="800" height="500" fill="%2318283A"/><rect x="150" y="80" width="500" height="340" rx="100" stroke="%237794A8" stroke-width="4" fill="%2321364B"/><line x1="400" y1="80" x2="400" y2="420" stroke="%23E9F1F5" stroke-width="4" stroke-dasharray="8 8"/><circle cx="400" cy="250" r="50" stroke="%23B99762" stroke-width="4" fill="none"/><circle cx="400" cy="250" r="8" fill="%23B99762"/><circle cx="260" cy="250" r="40" stroke="%237794A8" stroke-width="3" fill="none"/><circle cx="540" cy="250" r="40" stroke="%237794A8" stroke-width="3" fill="none"/><text x="400" y="460" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23E9F1F5" text-anchor="middle" letter-spacing="2">RINK REVIEW • ARENA FACILITY</text></svg>`,
    sports: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" fill="%2321364B"><rect width="800" height="500" fill="%2321364B"/><circle cx="400" cy="230" r="70" stroke="%23B99762" stroke-width="6" fill="%2318283A"/><text x="400" y="245" font-family="sans-serif" font-size="42" font-weight="bold" fill="%23B99762" text-anchor="middle">🏒</text><text x="400" y="360" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23E9F1F5" text-anchor="middle" letter-spacing="3">ATHLETIC DEVELOPMENT</text></svg>`,
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="%2318283A"><rect width="200" height="200" rx="30" fill="%2318283A"/><rect x="35" y="45" width="130" height="110" rx="35" stroke="%23E9F1F5" stroke-width="6" fill="none"/><line x1="100" y1="45" x2="100" y2="155" stroke="%237794A8" stroke-width="4" stroke-dasharray="4 4"/><circle cx="100" cy="100" r="22" stroke="%23B99762" stroke-width="5" fill="none"/><circle cx="100" cy="100" r="6" fill="%23B99762"/></svg>`,
  };

  const imageSrc = hasError || !src ? fallbackSVGs[fallbackType] : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={() => {
        if (!hasError) setHasError(true);
      }}
      className={className}
      {...props}
    />
  );
};
