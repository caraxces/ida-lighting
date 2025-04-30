"use client"

import React, { useCallback, createContext, useContext, ReactNode, useState, useEffect, useRef } from "react"

// Tạo sound context
type SoundContextType = {
  playSound: () => void;
  playBackgroundMusic: () => void;
  isSoundEnabled: boolean;
  isMusicPlaying: boolean;
  toggleSound: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

function InternalSoundProvider({ children }: { children: ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  // Khởi tạo audio trong effect để tránh vấn đề SSR
  useEffect(() => {
    try {
      // Tạo audio element
      audioRef.current = new Audio('/sound.mp3');
      backgroundMusicRef.current = new Audio('/background-music.mp3');
      
      // Configure background music
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.loop = true;
        backgroundMusicRef.current.volume = 0.3;
      }
      
      // Preload
      audioRef.current.load();
      backgroundMusicRef.current.load();
      
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
        if (backgroundMusicRef.current) {
          backgroundMusicRef.current.pause();
          backgroundMusicRef.current = null;
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

  const playBackgroundMusic = useCallback(() => {
    if (!isInitialized || !isSoundEnabled || !backgroundMusicRef.current) {
      return;
    }
    
    try {
      backgroundMusicRef.current.play().then(() => {
        setIsMusicPlaying(true);
        console.log("Background music started");
      }).catch(err => {
        console.warn("Could not play background music:", err);
      });
    } catch (error) {
      console.error("Error playing background music:", error);
    }
  }, [isInitialized, isSoundEnabled]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => {
      const newState = !prev;
      
      // If sound is being disabled, pause background music
      if (!newState && backgroundMusicRef.current && isMusicPlaying) {
        backgroundMusicRef.current.pause();
        setIsMusicPlaying(false);
      }
      
      // If sound is being enabled and music was playing, restart it
      if (newState && backgroundMusicRef.current) {
        backgroundMusicRef.current.play().catch(console.error);
        setIsMusicPlaying(true);
      }
      
      return newState;
    });
  }, [isMusicPlaying]);

  return (
    <SoundContext.Provider value={{ 
      playSound, 
      playBackgroundMusic,
      isSoundEnabled, 
      isMusicPlaying,
      toggleSound 
    }}>
      {children}
    </SoundContext.Provider>
  );
}

// Export the SoundProvider component
export const SoundProvider = InternalSoundProvider;

// Hook để sử dụng sound
export const useSound = () => {
  const context = useContext(SoundContext);
  
  // Fallback nếu không có provider
  if (context === undefined) {
    return {
      playSound: () => {},
      playBackgroundMusic: () => {},
      isSoundEnabled: false,
      isMusicPlaying: false,
      toggleSound: () => {},
    };
  }
  
  return context;
};

