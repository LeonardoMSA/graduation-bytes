import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function AnimatedWave() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position;
    const t = clock.elapsedTime;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(
        i,
        Math.sin(x * 0.4 + t * 0.7) * 0.5 +
        Math.cos(y * 0.3 + t * 0.5) * 0.4
      );
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[28, 28, 80, 80]} />
      <meshStandardMaterial color="#6366f1" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

function FloatingShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[-4, 2, -3]}>
        <mesh>
          <icosahedronGeometry args={[0.7, 0]} />
          <MeshDistortMaterial color="#8b5cf6" transparent opacity={0.5} distort={0.3} speed={2} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5} position={[4, 0.5, -4]}>
        <mesh>
          <torusGeometry args={[0.5, 0.18, 16, 32]} />
          <meshStandardMaterial color="#ec4899" transparent opacity={0.4} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={3} position={[0, 3, -5]}>
        <mesh>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#22d3ee" transparent opacity={0.35} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={1.5} floatIntensity={1} position={[-2, -1, -2]}>
        <mesh>
          <dodecahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#f59e0b" transparent opacity={0.4} />
        </mesh>
      </Float>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.4} />
          <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.2} />
          <AnimatedWave />
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </div>
  );
}
