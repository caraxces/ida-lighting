import Image from "next/image"
import Link from "next/link"

interface CollectionBannerProps {
  title: string
  subtitle?: string
  description?: string
  image: string
  height?: string
  overlayColor?: string
  overlayOpacity?: number
  titlePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
  buttonText?: string
  buttonLink?: string
}

export default function CollectionBanner({
  title,
  subtitle,
  description,
  image,
  height = "50vh",
  overlayColor = "black",
  overlayOpacity = 0.5,
  titlePosition = "bottom-left",
  buttonText,
  buttonLink
}: CollectionBannerProps) {
  // Map titlePosition to CSS classes
  const positionClasses = {
    "top-left": "top-8 left-8",
    "top-right": "top-8 right-8",
    "bottom-left": "bottom-8 left-8",
    "bottom-right": "bottom-8 right-8",
    "center": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
  }

  const positionClass = positionClasses[titlePosition]
  
  return (
    <div className="relative w-full mb-12" style={{ height }}>
      {/* Image */}
      <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
      
      {/* Optional overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundColor: overlayColor, 
          opacity: overlayOpacity 
        }}
      ></div>
      
      {/* Content container */}
      <div className={`absolute ${positionClass} px-6 py-4 bg-black/50 max-w-md`}>
        {subtitle && (
          <p className="text-white/80 text-sm uppercase tracking-wide mb-1">{subtitle}</p>
        )}
        <h1 className="text-white text-3xl md:text-4xl font-bold uppercase">{title}</h1>
        {description && (
          <p className="text-white/90 mt-2">{description}</p>
        )}
        {buttonText && buttonLink && (
          <Link href={buttonLink}>
            <button className="mt-4 px-6 py-2 bg-white text-black font-medium hover:bg-white/90 transition-colors">
              {buttonText}
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}
