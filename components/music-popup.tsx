"use client"
import { useState, useEffect, useCallback } from "react";
import { useSound } from "@/hooks/use-sound";
import Image from "next/image";

// Define types for Howler
interface ExtendedWindow extends Window {
  Howler?: {
    _howls?: Array<{
      play: () => void;
      playing: () => boolean;
    }>;
  }
}

declare global {
  interface Window {
    Howler?: {
      _howls?: Array<{
        play: () => void;
        playing: () => boolean;
      }>;
    }
  }
}

function MusicPopup() {
  const [isVisible, setIsVisible] = useState(true);
  const [isTextBlink, setIsTextBlink] = useState(true);
  const { playBackgroundMusic } = useSound();

  // Control text blink effect
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setIsTextBlink(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  // Handle entry to website with music
  const handleEnterWebsite = useCallback(() => {
    if (!isVisible) return;

    // Play background music
    playBackgroundMusic();
    
    // Remove entry-active class from body
    if (typeof document !== 'undefined') {
      document.body.classList.remove("entry-active");
    }
    
    // Hide the overlay
    setIsVisible(false);
  }, [isVisible, playBackgroundMusic]);

  // Handle click outside of popup
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleEnterWebsite();
    }
  }, [handleEnterWebsite]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isVisible && (e.key === "Escape" || e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        handleEnterWebsite();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, handleEnterWebsite]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black"
      onClick={handleOverlayClick}
    >
      <div className="max-w-4xl px-4 py-12 text-center">
        <Image 
          src="/Ida B-W2.png" 
          alt="IDA Lighting" 
          width={180} 
          height={90}
          className="mx-auto mb-16"
        />
        
        <h1 className="mb-16 text-3xl md:text-5xl font-bold text-white tracking-wider">
          GIẢI PHÁP CHIẾU SÁNG CHUYÊN NGHIỆP
        </h1>
        
        <p
          className={`mb-12 text-lg md:text-xl text-white tracking-wider transition-opacity duration-300 ${
            isTextBlink ? "opacity-100" : "opacity-60"
          }`}
        >
          Trang web có nhạc nền để mang lại trải nghiệm tốt nhất
        </p>
        
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </div>
          
          <button
            onClick={handleEnterWebsite}
            className="w-64 h-12 bg-white/10 hover:bg-white/20 text-white font-medium border border-white/30 rounded-sm transition-all duration-300 uppercase tracking-wider"
          >
            BẮT ĐẦU
          </button>
          
          <div className="mt-6 animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/60">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MusicPopup }; 