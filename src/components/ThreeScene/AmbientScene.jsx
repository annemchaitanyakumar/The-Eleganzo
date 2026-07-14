import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import FloatingParticles from './FloatingParticles';

function AmbientOrbs() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.4}>
        <mesh position={[-2, 0.5, -3]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#B6955B" transparent opacity={0.25} />
        </mesh>
      </Float>
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.5}>
        <mesh position={[2.5, -0.5, -4]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#D4C5A0" transparent opacity={0.2} />
        </mesh>
      </Float>
      <FloatingParticles count={60} color="#B6955B" size={0.008} spread={6} />
    </group>
  );
}

export default function AmbientScene({ className = '' }) {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={['#F7F6F2', 4, 15]} />
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} intensity={0.3} color="#B6955B" />
          <AmbientOrbs />
        </Suspense>
      </Canvas>
    </div>
  );
}
