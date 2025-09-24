import { useRef, useEffect } from 'react';

interface SwipeHandlers {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export const useSwipe = (handlers: SwipeHandlers, threshold = 50) => {
  const ref = useRef<HTMLDivElement>(null);
  const startTouch = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startTouch.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - startTouch.current.x;
      const deltaY = touch.clientY - startTouch.current.y;

      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Determine if it's a horizontal or vertical swipe
      if (absDeltaX > absDeltaY && absDeltaX > threshold) {
        // Horizontal swipe
        if (deltaX > 0) {
          handlers.onSwipeRight?.();
        } else {
          handlers.onSwipeLeft?.();
        }
      } else if (absDeltaY > absDeltaX && absDeltaY > threshold) {
        // Vertical swipe
        if (deltaY > 0) {
          handlers.onSwipeDown?.();
        } else {
          handlers.onSwipeUp?.();
        }
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handlers, threshold]);

  return ref;
};