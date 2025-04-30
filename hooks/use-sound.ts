"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Howl } from "howler"

// Define extended Howler type to allow access to internal properties
interface ExtendedWindow extends Window {
  Howler: {
    _howls: Howl[];
  }
}

// Create a global state for sound
let globalIsSoundEnabled = false;
let globalSoundInstance: Howl | null = null;

// Initialize sound - this will run once on module import
function initializeSound() {
  if (typeof window !== 'undefined' && !globalSoundInstance) {
    try {
      console.log("Initializing global sound instance");
      
      globalSoundInstance = new Howl({
        src: ["/sound-jazz.mp3"],
        volume: 0.5,
        preload: true,
        loop: true,
        autoplay: false,
        html5: true,
        onload: () => {
          console.log("Sound loaded successfully");
        },
        onloaderror: (id, error) => {
          console.error("Sound loading error:", error);
        }
      });
      
      // Expose the sound instance globally for debugging
      (window as any).soundInstance = globalSoundInstance;
      
      // Register events for debugging
      globalSoundInstance.on('play', () => {
        console.log('Sound: Play event triggered');
        globalIsSoundEnabled = true;
      });
      
      globalSoundInstance.on('pause', () => {
        console.log('Sound: Pause event triggered');
        globalIsSoundEnabled = false;
      });
      
      globalSoundInstance.on('stop', () => {
        console.log('Sound: Stop event triggered');
        globalIsSoundEnabled = false;
      });
      
      return true;
    } catch (error) {
      console.error("Failed to initialize global sound:", error);
      return false;
    }
  }
  return false;
}

// Trigger the initialization
initializeSound();

// Hook to use sound functionality
export const useSound = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(globalIsSoundEnabled);
  
  // Ensure sound is initialized
  useEffect(() => {
    if (!globalSoundInstance) {
      initializeSound();
    }
    
    // Sync local state with global state
    setIsSoundEnabled(globalIsSoundEnabled);
    
    // Check if sound is already playing
    if (globalSoundInstance && globalSoundInstance.playing()) {
      setIsSoundEnabled(true);
      globalIsSoundEnabled = true;
    }
  }, []);
  
  // Play background music
  const playBackgroundMusic = useCallback(() => {
    try {
      console.log("Attempting to play background music");
      
      if (!globalSoundInstance && !initializeSound()) {
        console.error("Could not initialize sound");
        return;
      }
      
      if (globalSoundInstance) {
        if (!globalSoundInstance.playing()) {
          console.log("Playing sound");
          globalSoundInstance.volume(0.5);
          globalSoundInstance.play();
        }
        globalIsSoundEnabled = true;
        setIsSoundEnabled(true);
      } else if (typeof window !== 'undefined') {
        // Fallback: Try to access global Howler
        const win = window as unknown as ExtendedWindow;
        if (win.Howler && win.Howler._howls && win.Howler._howls.length > 0) {
          const bg = win.Howler._howls[0];
          if (bg && !bg.playing()) {
            console.log("Playing from global Howler");
            bg.play();
          }
          globalIsSoundEnabled = true;
          setIsSoundEnabled(true);
        }
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }, []);

  // Pause background music
  const pauseBackgroundMusic = useCallback(() => {
    try {
      console.log("Attempting to pause background music");
      
      if (globalSoundInstance) {
        if (globalSoundInstance.playing()) {
          console.log("Pausing sound");
          globalSoundInstance.pause();
        }
      } else if (typeof window !== 'undefined') {
        // Fallback: Try to access global Howler
        const win = window as unknown as ExtendedWindow;
        if (win.Howler && win.Howler._howls && win.Howler._howls.length > 0) {
          const bg = win.Howler._howls[0];
          if (bg && bg.playing()) {
            console.log("Pausing from global Howler");
            bg.pause();
          }
        }
      }
      
      globalIsSoundEnabled = false;
      setIsSoundEnabled(false);
    } catch (error) {
      console.error("Error pausing sound:", error);
    }
  }, []);

  // Toggle sound on/off
  const toggleSound = useCallback(() => {
    console.log("Toggle sound called, current state:", isSoundEnabled);
    
    if (isSoundEnabled) {
      pauseBackgroundMusic();
    } else {
      playBackgroundMusic();
    }
  }, [isSoundEnabled, playBackgroundMusic, pauseBackgroundMusic]);
  
  return {
    isSoundEnabled,
    toggleSound,
    playBackgroundMusic,
    pauseBackgroundMusic
  };
}; 