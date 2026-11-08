import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'action'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const requestRef = useRef<number | null>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    const matchTouch = window.matchMedia('(pointer: coarse)').matches;
    if (matchTouch) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check hovered elements for data-cursor attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorEl) {
        const text = cursorEl.getAttribute('data-cursor') || '';
        setCursorText(text);
        setCursorVariant('action');
      } else {
        const clickable = target.closest('a, button, [role="button"], input, textarea');
        if (clickable) {
          setCursorText('');
          setCursorVariant('hover');
        } else {
          setCursorText('');
          setCursorVariant('default');
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth animation loop
    const animate = () => {
      const ease = 0.18;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;
      setCursorPos({ x: currentPos.current.x, y: currentPos.current.y });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300"
      style={{
        transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {cursorVariant === 'action' ? (
        <div className="-translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase shadow-2xl flex items-center justify-center scale-100 transition-transform duration-200">
          {cursorText || 'İNCELE'}
        </div>
      ) : cursorVariant === 'hover' ? (
        <div className="-translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/60 bg-white/10 backdrop-blur-sm transition-transform duration-200 scale-110" />
      ) : (
        <div className="-translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.7)] transition-transform duration-150" />
      )}
    </div>
  );
}
