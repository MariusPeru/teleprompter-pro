import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PlayIcon, PauseIcon, PlusIcon, MinusIcon, ResetIcon, TextSizeIcon } from './icons';

interface TeleprompterDisplayProps {
  script: string;
  onReset: () => void;
}

const ControlButton: React.FC<{ onClick: () => void; children: React.ReactNode; label: string }> = ({ onClick, children, label }) => (
    <button
        onClick={onClick}
        aria-label={label}
        className="p-3 bg-gray-800/80 rounded-full text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors duration-200"
    >
        {children}
    </button>
);

const TeleprompterDisplay: React.FC<TeleprompterDisplayProps> = ({ script, onReset }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(25); // pixels per second
  const [fontSize, setFontSize] = useState<number>(5); // rem units

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const lastTimestamp = useRef<number>(0);

  const animateScroll = useCallback((timestamp: number) => {
    if (lastTimestamp.current > 0 && scrollContainerRef.current) {
      const deltaTime = timestamp - lastTimestamp.current;
      const scrollDistance = (deltaTime / 1000) * speed;
      scrollContainerRef.current.scrollTop += scrollDistance;
    }
    lastTimestamp.current = timestamp;
    animationFrameId.current = requestAnimationFrame(animateScroll);
  }, [speed]);

  useEffect(() => {
    if (isPlaying) {
      lastTimestamp.current = performance.now();
      animationFrameId.current = requestAnimationFrame(animateScroll);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      lastTimestamp.current = 0;
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying, animateScroll]);
  
  useEffect(() => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
    }
  }, [script]);

  const handleSpeedChange = (delta: number) => {
    setSpeed(prev => Math.max(5, prev + delta));
  };

  const handleFontSizeChange = (delta: number) => {
    setFontSize(prev => Math.max(1, Math.min(15, prev + delta)));
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-red-500/50 transform -translate-y-1/2 z-10 pointer-events-none"></div>
      
      <div ref={scrollContainerRef} className="h-full w-full overflow-y-scroll no-scrollbar" onClick={() => setIsPlaying(p => !p)}>
        <div className="w-full max-w-5xl mx-auto px-10" style={{ paddingTop: '50vh', paddingBottom: '50vh' }}>
          <p style={{ fontSize: `${fontSize}rem`, lineHeight: 1.5 }} className="text-yellow-400 font-bold text-center whitespace-pre-wrap">
            {script}
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/30 backdrop-blur-sm z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <ControlButton onClick={onReset} label="Reset">
                <ResetIcon />
            </ControlButton>
            
            <div className="flex items-center gap-3">
                <ControlButton onClick={() => handleFontSizeChange(-0.5)} label="Decrease font size"><MinusIcon /></ControlButton>
                <div className="flex items-center gap-2 text-yellow-400">
                    <TextSizeIcon />
                    <span className="font-mono text-lg w-10 text-center">{fontSize.toFixed(1)}</span>
                </div>
                <ControlButton onClick={() => handleFontSizeChange(0.5)} label="Increase font size"><PlusIcon /></ControlButton>
            </div>

            <button onClick={() => setIsPlaying(p => !p)} className="p-4 bg-yellow-400 text-black rounded-full transform hover:scale-110 transition-transform">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            
            <div className="flex items-center gap-3">
                <ControlButton onClick={() => handleSpeedChange(-5)} label="Decrease speed"><MinusIcon /></ControlButton>
                <div className="text-yellow-400 font-mono text-lg w-8 text-center">{speed}</div>
                <ControlButton onClick={() => handleSpeedChange(5)} label="Increase speed"><PlusIcon /></ControlButton>
            </div>

            <div className="w-12 h-12"></div>
        </div>
      </div>
    </div>
  );
};

export default TeleprompterDisplay;
