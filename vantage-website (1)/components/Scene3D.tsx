"use client"

import dynamic from 'next/dynamic'

// Dynamically import the entire 3D scene
const Scene3DComponent = dynamic(() => import('./Scene3DComponent'), { ssr: false })

export default function Scene3D() {
  return <Scene3DComponent />
} 