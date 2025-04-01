"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Scene } from "./ThreeJSComponents" // Move all your 3D components here

export default function Scene3DComponent() {
  return (
    <Canvas className="w-full h-full">
      <Scene />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
} 