import React, { useRef, useEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';

// Default BlurHash: soft neutral placeholder, feel free to swap this
const DEFAULT_BLURHASH = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';

const BlurBackground = ({ blurHash = DEFAULT_BLURHASH, punch = 1.5, style = {}, children }) => {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: style.borderRadius || 0,
        width: style.width || '100%',
        height: style.height || '100%',
        ...style,
      }}
    >
      {size.width > 0 && size.height > 0 && (
        <Blurhash
          hash={blurHash}
          width={size.width}
          height={size.height}
          resolutionX={32}
          resolutionY={32}
          punch={punch}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        />
      )}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          backgroundColor: 'rgba(255,255,255,0.3)', // mimic light frosted glass
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BlurBackground;
