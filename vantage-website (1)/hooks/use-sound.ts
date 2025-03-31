"use client"

import { useCallback, createContext, useContext, ReactNode, useState, useEffect, useRef } from "react"
import { Howl } from "howler"

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
  const soundRef = useRef<Howl | null>(null);

  // Khởi tạo Howl một lần duy nhất khi component mount
  useEffect(() => {
    try {
      soundRef.current = new Howl({
        src: ["/sounds/sound.mp3"],
        volume: 0.5,
        preload: true,
        onload: () => {
          console.log("Sound loaded successfully");
        },
        onloaderror: (id, error) => {
          console.error("Sound loading error:", error);
        },
        onplayerror: (id, error) => {
          console.error("Sound play error:", error);
        }
      });

      // Cleanup khi unmount
      return () => {
        if (soundRef.current) {
          soundRef.current.unload();
        }
      };
    } catch (error) {
      console.error("Failed to initialize sound:", error);
    }
  }, []);

  const playSound = useCallback(() => {
    if (isSoundEnabled && soundRef.current) {
      try {
        // Dừng âm thanh đang phát (nếu có)
        soundRef.current.stop();
        
        // Phát âm thanh mới
        soundRef.current.play();
        console.log("Playing sound");
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }
  }, [isSoundEnabled]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => {
      console.log("Sound enabled:", !prev);
      return !prev;
    });
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
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}; 