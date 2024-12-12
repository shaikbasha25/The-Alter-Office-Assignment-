import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export function useVideoPlayback() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (!videoRef.current) return;

    if (inView) {
      videoRef.current.play().catch(() => {
        // Handle autoplay failure (e.g., browser restrictions)
      });
    } else {
      videoRef.current.pause();
    }
  }, [inView]);

  return { videoRef, containerRef: ref };
}