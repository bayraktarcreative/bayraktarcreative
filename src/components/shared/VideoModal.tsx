import React, { useEffect, useRef, useState } from 'react';
import { X, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  title: string;
  category?: string;
  aspectRatio?: '9/16' | '16/9';
  onClose: () => void;
}

export default function VideoModal({
  isOpen,
  videoUrl,
  title,
  category,
  aspectRatio = '16/9',
  onClose,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoUrl) return null;

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const isVertical = aspectRatio === '9/16';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-title"
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full rounded-2xl bg-black border border-white/10 shadow-2xl overflow-hidden flex flex-col items-center justify-center ${
          isVertical ? 'max-w-md h-[88vh]' : 'max-w-5xl aspect-video'
        }`}
      >
        {/* Video Player */}
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          playsInline
          controls
          className="w-full h-full object-contain bg-black"
        />

        {/* Top Floating Controls Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <div className="pointer-events-auto bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            {category && (
              <span className="text-[10px] text-white/50 tracking-wider uppercase mr-2 font-mono">
                {category}
              </span>
            )}
            <span id="video-title" className="text-xs font-semibold text-white">
              {title}
            </span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 backdrop-blur-md transition-colors"
              title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 backdrop-blur-md transition-colors hidden sm:flex"
              title="Tam Ekran"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/60 hover:bg-white text-white/80 hover:text-black border border-white/10 backdrop-blur-md transition-colors"
              title="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
