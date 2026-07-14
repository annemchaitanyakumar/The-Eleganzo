import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for tracking normalized mouse position.
 * Returns values from -1 to 1 (centered at viewport center).
 */
export default function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

  const handleMouseMove = useCallback((e) => {
    const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
    const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;

    setPosition({
      x: e.clientX,
      y: e.clientY,
      normalizedX,
      normalizedY,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return position;
}
