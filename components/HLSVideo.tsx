'use client';

import { forwardRef } from 'react';

interface HLSVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  fallbackSrc?: string;
}

const HLSVideo = forwardRef<HTMLVideoElement, HLSVideoProps>(
  ({ src, fallbackSrc, ...videoProps }, ref) => {
    return (
      <video
        ref={ref}
        src={fallbackSrc || src}
        {...videoProps}
        playsInline
        preload="auto"
      />
    );
  }
);

HLSVideo.displayName = 'HLSVideo';

export default HLSVideo;
