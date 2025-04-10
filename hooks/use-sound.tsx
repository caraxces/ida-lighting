"use client"

import React, { useCallback, createContext, useContext, ReactNode, useState, useEffect, useRef } from "react"

// Tạo sound context
type SoundContextType = {
  playSound: () => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Sound provider component
export function SoundProvider({ children }: { children: ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Khởi tạo audio trong effect để tránh vấn đề SSR
  useEffect(() => {
    try {
      // Tạo audio element
      audioRef.current = new Audio('/sound.mp3');
      
      // Preload
      audioRef.current.load();
      
      setIsInitialized(true);
      console.log("Audio system initialized");
      
      // Click handler để kích hoạt audio với user interaction
      const enableAudio = () => {
        if (audioRef.current) {
          // Play và tạm dừng ngay lập tức để kích hoạt audio
          audioRef.current.volume = 0;
          audioRef.current.play().then(() => {
            audioRef.current!.pause();
            audioRef.current!.currentTime = 0;
            audioRef.current!.volume = 0.5;
            console.log("Audio activated by user interaction");
            document.removeEventListener("click", enableAudio);
          }).catch(err => {
            console.warn("Could not activate audio:", err);
          });
        }
      };
      
      // Thêm event listener
      document.addEventListener("click", enableAudio, { once: true });
      
      return () => {
        document.removeEventListener("click", enableAudio);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    } catch (error) {
      console.error("Failed to initialize audio:", error);
      // Fallback nếu không thể tạo audio
      setIsInitialized(false);
    }
  }, []);

  const playSound = useCallback(() => {
    if (!isInitialized || !isSoundEnabled || !audioRef.current) {
      return;
    }
    
    try {
      // Nếu âm thanh đang phát, reset trước khi phát lại
      audioRef.current.currentTime = 0;
      
      // Phát âm thanh
      audioRef.current.play().catch(err => {
        console.warn("Could not play sound:", err);
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }, [isInitialized, isSoundEnabled]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => !prev);
  }, []);

  return (
    <SoundContext.Provider value={{ playSound, isSoundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
}

// Hook để sử dụng sound
export const useSound = () => {
  const context = useContext(SoundContext);
  
  // Fallback nếu không có provider
  if (context === undefined) {
    return {
      playSound: () => {},
      isSoundEnabled: false,
      toggleSound: () => {},
    };
  }
  
  return context;
};

