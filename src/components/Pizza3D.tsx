import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ThreeElements } from "@react-three/fiber";

type ColorSet = { base?: string; cheese?: string; toppings?: string };

export default function Pizza3D({ colors, ...props }: { colors?: ColorSet } & ThreeElements["group"]) {
  const baseRef = useRef<THREE.Mesh | null>(null);
  const cheeseRef = useRef<THREE.Mesh | null>(null);
  const toppingRefs = useRef<Array<THREE.Mesh | null>>([]);

  useEffect(() => {
    if (baseRef.current && colors?.base) {
      (baseRef.current.material as THREE.MeshStandardMaterial).color.set(colors.base);
    }
    if (cheeseRef.current && colors?.cheese) {
      (cheeseRef.current.material as THREE.MeshStandardMaterial).color.set(colors.cheese);
    }
    toppingRefs.current.forEach((m) => {
      if (m && colors?.toppings) (m.material as THREE.MeshStandardMaterial).color.set(colors.toppings);
    });
  }, [colors]);

  return (
    <group {...(props as any)}>
      {/* Base (masa) */}
      <mesh ref={baseRef} castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.18, 64]} />
        <meshStandardMaterial color={colors?.base ?? "#D2B48C"} />
      </mesh>

      {/* Capa de queso */}
      <mesh ref={cheeseRef} castShadow receiveShadow position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.04, 64]} />
        <meshStandardMaterial color={colors?.cheese ?? "#F7D9A6"} />
      </mesh>

      {/* Toppings simples */}
      {[[0.4, 0.4], [-0.45, 0.2], [0.1, -0.35]].map(([x, z], i) => (
        <mesh
          key={i}
          ref={(el) => {
            toppingRefs.current[i] = el;
          }}
          position={[x, 0.13, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.12, 0.12, 0.02, 32]} />
          <meshStandardMaterial color={colors?.toppings ?? "#C1443C"} />
        </mesh>
      ))}
    </group>
  );
}
