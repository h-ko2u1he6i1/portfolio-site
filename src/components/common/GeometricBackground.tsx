"use client";

import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Tetrahedron, Octahedron, Icosahedron } from '@react-three/drei';
import { useRef, useMemo } from 'react';

const COUNT = 100; // オブジェクトの数を減らします
const SHAPE_SIZE = 0.8; // オブジェクトのサイズを大きくします

const SHAPES = [Tetrahedron, Octahedron, Icosahedron];
const GRAY_COLORS = [new THREE.Color('#F7F7F7'), new THREE.Color('#FAFAFA'), new THREE.Color('#FEFEFE')];

function Shape({ position, color, size, shapeType }: { position: THREE.Vector3, color: THREE.Color, size: number, shapeType: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const ShapeComponent = SHAPES[shapeType];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.2;
    ref.current.rotation.x = t * 0.1;
    ref.current.rotation.z = t * 0.15;
  });

  return (
    <ShapeComponent ref={ref} args={[size, 0]} position={position}>
      {/* metalnessを下げ、roughnessを上げて、よりマットな質感に変更 */}
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.3} />
    </ShapeComponent>
  );
}

function Scene() {
  const mouse = useRef([0, 0]);

  const shapes = useMemo(() => {
    return Array.from({ length: COUNT }).map((_, i) => {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 18, // 範囲を狭めて密度を上げます
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18
      );
      const color = GRAY_COLORS[Math.floor(Math.random() * GRAY_COLORS.length)];
      const size = SHAPE_SIZE * (Math.random() * 0.5 + 0.5);
      const shapeType = Math.floor(Math.random() * SHAPES.length);
      return { position, color, size, shapeType };
    });
  }, []);

  useFrame((state) => {
    // カメラを少し近づけ、マウスの動きを少し緩やかにします
    state.camera.position.lerp({ x: (mouse.current[0] / window.innerWidth - 0.5) * 1, y: (mouse.current[1] / window.innerHeight - 0.5) * -1, z: 4 } as THREE.Vector3, 0.03);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group onPointerMove={(e) => (mouse.current = [e.clientX, e.clientY])}>
      {/* ライトをさらに強くして、オブジェクトの色を薄くする */}
      <ambientLight intensity={4.0} />
      <directionalLight position={[10, 10, 5]} intensity={3.0} />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
      {shapes.map((shape, i) => (
        <Shape key={i} {...shape} />
      ))}
    </group>
  );
}

export default function GeometricBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <Scene />
    </Canvas>
  );
}