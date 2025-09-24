import { useEffect } from 'react';

export interface KeyboardShortcuts {
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onSpace?: () => void;
  onEscape?: () => void;
}

export const useKeyboard = (shortcuts: KeyboardShortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default behavior for specific keys
      if (['ArrowUp', 'ArrowDown', 'Space'].includes(event.code)) {
        event.preventDefault();
      }

      switch (event.code) {
        case 'ArrowUp':
          shortcuts.onArrowUp?.();
          break;
        case 'ArrowDown':
          shortcuts.onArrowDown?.();
          break;
        case 'ArrowLeft':
          shortcuts.onArrowLeft?.();
          break;
        case 'ArrowRight':
          shortcuts.onArrowRight?.();
          break;
        case 'Space':
          shortcuts.onSpace?.();
          break;
        case 'Escape':
          shortcuts.onEscape?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
};