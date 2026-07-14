import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import FloatingParticles from './FloatingParticles';
import useMousePosition from '../../hooks/useMousePosition';

function CameraRig() {
  const { normalizedX, normalizedY } = useMousePosition();
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetX = normalizedX * 0.3;
    const targetY = normalizedY * 0.2;

    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * delta * 1.5;
    groupRef.current.rotation.x += (-targetY * 0.5 - groupRef.current.rotation.x) * delta * 1.5;
  });

  return <group ref={groupRef} />;
}

function SceneContent() {
  const groupRef = useRef();
  const { normalizedX, normalizedY } = useMousePosition();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle auto-drift
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.05 + normalizedX * 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.03 + normalizedY * -0.04;
  });

  return (
    <group ref={groupRef}>
      {/* Ambient glow orbs */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-3, 1, -5]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#B6955B" transparent opacity={0.3} />
        </mesh>
      </Float>

      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.8}>
        <mesh position={[4, -1, -6]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#D4C5A0" transparent opacity={0.2} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh position={[1, 2, -4]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#B6955B" transparent opacity={0.4} />
        </mesh>
      </Float>

      <FloatingParticles count={150} color="#B6955B" size={0.012} spread={10} />
      <FloatingParticles count={80} color="#D4C5A0" size={0.008} spread={12} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={['#1a1a1a', 5, 20]} />
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#B6955B" />
          <pointLight position={[-5, -3, 3]} intensity={0.2} color="#D4C5A0" />

          <Stars
            radius={50}
            depth={50}
            count={1500}
            factor={3}
            saturation={0}
            fade
            speed={0.5}
          />

          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
