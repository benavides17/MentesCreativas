import { useRef } from "react";
import * as THREE from "three";
import { ThreeElements } from "@react-three/fiber";

export default function Pizza3D(props: ThreeElements["group"]) {
  const baseRef = useRef<THREE.Mesh>(null!);
  const cheeseRef = useRef<THREE.Mesh>(null!);

  return (
    <group {...props}>
      {/* Base (masa) */}
      <mesh
        ref={baseRef}
        castShadow
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[1, 1, 0.18, 64]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>

      {/* Capa de queso */}
      <mesh
        ref={cheeseRef}
        castShadow
        receiveShadow
        position={[0, 0.11, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.92, 0.92, 0.04, 64]} />
        <meshStandardMaterial color="#F7D9A6" />
      </mesh>

      {/* Toppings simples */}
      {[
        [0.4, 0.4],
        [-0.45, 0.2],
        [0.1, -0.35],
      ].map(([x, z], i) => (
        <mesh
          key={i}
          position={[x, 0.13, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.12, 0.12, 0.02, 32]} />
          <meshStandardMaterial color="#C1443C" />
        </mesh>
      ))}
    </group>
  );
}
