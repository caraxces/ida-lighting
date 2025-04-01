"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Text3D, OrbitControls, Stars, Html } from "@react-three/drei"
import * as THREE from "three"

// Tạo component 3D cho đèn tròn
function SphericalLights({ position = [0, 0, 0], count = 9, radius = 2 }) {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  // Tạo mảng vị trí cho các quả cầu ánh sáng
  const spheres = []
  const angleStep = (2 * Math.PI) / count

  for (let i = 0; i < count; i++) {
    const angle = i * angleStep
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    spheres.push([x, 0, z])
  }

  return (
    <group ref={group} position={position}>
      {spheres.map((pos, index) => (
        <Float key={index} speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={pos as [number, number, number]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial
              color="#fff8e1"
              emissive="#ffe082"
              emissiveIntensity={0.5}
              roughness={0.1}
              metalness={0.2}
            />
            <pointLight color="#ffe082" intensity={5} distance={3} decay={2} />
          </mesh>
        </Float>
      ))}

      {/* Thêm quả cầu ở giữa */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#fff8e1"
          emissive="#ffe082"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.2}
        />
        <pointLight color="#ffe082" intensity={10} distance={5} decay={2} />
      </mesh>
    </group>
  )
}

// Tạo component 3D cho đèn vòng treo
function RingLight({ position = [0, 0, 0] }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05
    }
  })

  return (
    <group position={position}>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.2, 16, 100]} />
        <meshStandardMaterial color="#333333" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Thêm ánh sáng bên trong vòng */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#ffe082"
          emissive="#ffe082"
          emissiveIntensity={2}
          roughness={0.1}
          metalness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Dây treo */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 6, 8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      <pointLight position={[0, -1, 0]} color="#ffe082" intensity={15} distance={10} decay={2} />
    </group>
  )
}

// Tạo component 3D cho đèn bàn
function DeskLamp({ position = [0, 0, 0] }) {
  const lampRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (lampRef.current) {
      lampRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <group ref={lampRef} position={position}>
      {/* Chân đèn */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 0.3, 32]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 2, 16]} />
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Phần đầu đèn */}
      <mesh position={[0, 1, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#b28704" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Ánh sáng */}
      <pointLight position={[0, 0.5, 0]} color="#ffe082" intensity={10} distance={8} decay={2} />
    </group>
  )
}

// Component chính cho scene 3D
function Scene() {
  const { camera } = useThree()
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    // Thiết lập vị trí camera ban đầu
    camera.position.set(0, 0, 10)

    // Thiết lập timer để chuyển section
    const timer = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3)
    }, 8000)

    return () => clearInterval(timer)
  }, [camera])

  useFrame((state) => {
    // Di chuyển camera dựa trên section hiện tại
    if (activeSection === 0) {
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, -4, 0.05)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.05)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8, 0.05)
    } else if (activeSection === 1) {
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 4, 0.05)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2, 0.05)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8, 0.05)
    } else if (activeSection === 2) {
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.05)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, -3, 0.05)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 10, 0.05)
    }

    // Luôn nhìn vào trung tâm scene
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      {/* Nền galaxy */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Ánh sáng môi trường */}
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} />

      {/* Các đối tượng đèn */}
      <SphericalLights position={[-5, 0, 0]} />
      <RingLight position={[5, 2, 0]} />
      <DeskLamp position={[0, -4, 0]} />

      {/* Text 3D */}
      <Float position={[0, 5, 0]} rotation={[0, 0, 0]} floatIntensity={0.5} rotationIntensity={0.2}>
        <Text3D font="/fonts/Inter_Bold.json" size={1.5} height={0.2} curveSegments={12}>
          LUMINATE
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.8}
          />
        </Text3D>
      </Float>

      {/* HTML Overlays */}
      <Html position={[-5, 2.5, 0]} transform distanceFactor={10} style={{ width: "300px" }}>
        <div
          className={`p-4 rounded-lg bg-black/50 backdrop-blur-md text-white transition-opacity duration-500 ${activeSection === 0 ? "opacity-100" : "opacity-0"}`}
        >
          <h2 className="text-xl font-bold mb-2">DISCOVER OUR JOURNEY</h2>
          <p className="text-sm">
            Founded in 1986 by Chris and Claire Turner, CTO Lighting continues to create products built on the guiding
            principles of designing lights of uncompromising quality.
          </p>
        </div>
      </Html>

      <Html position={[5, 4.5, 0]} transform distanceFactor={10} style={{ width: "300px" }}>
        <div
          className={`p-4 rounded-lg bg-black/50 backdrop-blur-md text-white transition-opacity duration-500 ${activeSection === 1 ? "opacity-100" : "opacity-0"}`}
        >
          <h2 className="text-xl font-bold mb-2">REDEFINING EXCELLENCE</h2>
          <p className="text-sm">
            We are driven by a passion for perfection and a dedication to delivering exceptional quality.
          </p>
          <div className="text-xs mt-2">SINCE 1986</div>
        </div>
      </Html>

      <Html position={[0, -1.5, 0]} transform distanceFactor={10} style={{ width: "300px" }}>
        <div
          className={`p-4 rounded-lg bg-black/50 backdrop-blur-md text-white transition-opacity duration-500 ${activeSection === 2 ? "opacity-100" : "opacity-0"}`}
        >
          <h2 className="text-xl font-bold mb-2">LIGHTING STRATEGIST</h2>
          <p className="text-sm">
            Founded with the vision to create products that inspire, our mission is to provide sophisticated solutions
            that elevate the everyday.
          </p>
        </div>
      </Html>
    </>
  )
}

// Export the complete Canvas component
export default function Scene3DComponents() {
  return (
    <Canvas className="w-full h-full">
      <Scene />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
} 