"use client"
import { useRouter } from "next/navigation"
import { Volume2, VolumeX, Box } from "lucide-react"

interface HeaderButtonsProps {
  soundOn: boolean
  onSoundToggle: () => void
  playSound: () => void
}

export default function HeaderButtons({ soundOn, onSoundToggle, playSound }: HeaderButtonsProps) {
  const router = useRouter()

  return (
    <div className="flex items-center space-x-2 md:space-x-3">
      {/* Sound toggle button */}
      <button
        onClick={onSoundToggle}
        className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] text-white"
        aria-label={soundOn ? "Mute sound" : "Enable sound"}
      >
        {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      {/* Download catalogue button */}
      <a
        href="/IDA LIGHTING 02 03 2025.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex items-center px-4 md:px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] text-white text-sm whitespace-nowrap"
        onClick={() => playSound()}
      >
        Download catalogue  
      </a>

      {/* 3D model button */}
      <a
        href="https://1miba.com/"
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center px-3 md:px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] text-white text-sm"
        onClick={() => playSound()}
      >
        <Box size={16} className="mr-1" />
        <span className="hidden sm:inline">3D model</span>
      </a>
    </div>
  )
}
