import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { AnimatedWave } from './scene3d/AnimatedWave';
import { FloatingShapes } from './scene3d/FloatingShapes';

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
