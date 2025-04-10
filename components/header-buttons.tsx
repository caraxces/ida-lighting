"use client"
import { useRouter } from "next/navigation"
import { Volume2, VolumeX } from "lucide-react"

interface HeaderButtonsProps {
  soundOn: boolean
  onSoundToggle: () => void
  playSound: () => void
}

export default function HeaderButtons({ soundOn, onSoundToggle, playSound }: HeaderButtonsProps) {
  const router = useRouter()

  return (
    <div className="flex items-center space-x-3">
      {/* Unified button style for all three buttons */}
      <button
        onClick={onSoundToggle}
        className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] text-white"
        aria-label={soundOn ? "Mute sound" : "Enable sound"}
      >
        {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      <a
        href="/IDA LIGHTING 02 03 2025.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] text-white"
        onClick={() => playSound()}
      >
        Download catalogue  
      </a>

    </div>
  )
}
