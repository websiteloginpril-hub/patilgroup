'use client';

import { useEffect, useRef, forwardRef } from 'react';

interface HLSVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  fallbackSrc?: string;
}

const HLSVideo = forwardRef<HTMLVideoElement, HLSVideoProps>(
  ({ src, fallbackSrc, ...videoProps }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<any>(null);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      // Check if browser supports HLS natively (Safari)
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support
        video.src = src;
        console.log('✅ Using native HLS support');
      } else {
        // Use HLS.js for other browsers
        const loadHLS = async () => {
          try {
            const Hls = (await import('hls.js')).default;
            
            if (Hls.isSupported()) {
              const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: false,
                backBufferLength: 90,
                maxBufferLength: 30,
                maxMaxBufferLength: 600,
                maxBufferSize: 60 * 1000 * 1000,
                maxBufferHole: 0.5,
                highBufferWatchdogPeriod: 2,
                nudgeOffset: 0.1,
                nudgeMaxRetry: 3,
                maxFragLookUpTolerance: 0.25,
                liveSyncDurationCount: 3,
                liveMaxLatencyDurationCount: 10,
                liveDurationInfinity: false,
                liveBackBufferLength: null,
                maxLiveSyncPlaybackRate: 1,
                manifestLoadingTimeOut: 10000,
                manifestLoadingMaxRetry: 1,
                levelLoadingTimeOut: 10000,
                levelLoadingMaxRetry: 4,
                fragLoadingTimeOut: 20000,
                fragLoadingMaxRetry: 6,
                // CORS configuration
                xhrSetup: (xhr: XMLHttpRequest, url: string) => {
                  xhr.withCredentials = false;
                  // Add any custom headers if needed
                },
                fetchSetup: (context: any, initParams: any) => {
                  initParams.mode = 'cors';
                  initParams.credentials = 'omit';
                  return new Request(context.url, initParams);
                },
              });

              hlsRef.current = hls;
              hls.loadSource(src);
              hls.attachMedia(video);

              hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log('✅ HLS manifest loaded, quality levels:', hls.levels.length);
              });

              hls.on(Hls.Events.ERROR, (event, data) => {
                console.error('❌ HLS error:', data);
                if (data.fatal) {
                  switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                      console.log('🔄 Network error, trying to recover...');
                      hls.startLoad();
                      break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                      console.log('🔄 Media error, trying to recover...');
                      hls.recoverMediaError();
                      break;
                    default:
                      console.log('💥 Fatal error, falling back to MP4');
                      if (fallbackSrc) {
                        video.src = fallbackSrc;
                      }
                      break;
                  }
                }
              });

              hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
                console.log('🔄 Quality switched to:', hls.levels[data.level].height + 'p');
              });

              console.log('✅ Using HLS.js for adaptive streaming');
            } else {
              console.log('❌ HLS.js not supported, falling back to MP4');
              if (fallbackSrc) {
                video.src = fallbackSrc;
              }
            }
          } catch (error) {
            console.error('❌ Failed to load HLS.js:', error);
            if (fallbackSrc) {
              video.src = fallbackSrc;
            }
          }
        };

        loadHLS();
      }

      // Cleanup function
      return () => {
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      };
    }, [src, fallbackSrc]);

    // Forward both refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(videoRef.current);
        } else {
          ref.current = videoRef.current;
        }
      }
    }, [ref]);

    return (
      <video
        ref={videoRef}
        {...videoProps}
      >
        {fallbackSrc && (
          <source src={fallbackSrc} type="video/mp4" />
        )}
        Your browser does not support the video tag.
      </video>
    );
  }
);

HLSVideo.displayName = 'HLSVideo';

export default HLSVideo;
