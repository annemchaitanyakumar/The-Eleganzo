import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingParticles({ count = 200, color = '#B6955B', size = 0.015, spread = 8 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread * 0.5,
        ],
        speed: 0.002 + Math.random() * 0.005,
        offset: Math.random() * Math.PI * 2,
        scale: 0.5 + Math.random() * 1,
      });
    }
    return arr;
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    particles.forEach((particle, i) => {
      const { position, speed, offset, scale } = particle;

      dummy.position.set(
        position[0] + Math.sin(t * speed * 50 + offset) * 0.3,
        position[1] + Math.sin(t * speed * 30 + offset) * 0.5 + t * speed * 0.2,
        position[2] + Math.cos(t * speed * 40 + offset) * 0.2
      );

      // Wrap particles that drift too high
      if (dummy.position.y > spread / 2) {
        dummy.position.y = -spread / 2;
      }

      const pulse = 0.6 + Math.sin(t * 2 + offset) * 0.4;
      dummy.scale.setScalar(scale * size * pulse);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  );
}
