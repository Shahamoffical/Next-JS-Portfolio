"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleCloud() {
  const pointsRef = useRef();
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const particleCount = 1800;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color("#ef4444");
    const colorIndigo = new THREE.Color("#f43f5e");
    const colorSlate = new THREE.Color("#fb7185");

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const distance = 1.8 + Math.random() * 1.5;

      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = distance * Math.sin(phi) * Math.sin(theta);
      const z = distance * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const mixRatio = Math.random();
      let mixedColor;
      if (mixRatio < 0.4) {
        mixedColor = colorBlue.clone().lerp(colorIndigo, Math.random());
      } else if (mixRatio < 0.75) {
        mixedColor = colorIndigo.clone().lerp(colorSlate, Math.random() * 0.6);
      } else {
        mixedColor = colorBlue.clone().lerp(colorSlate, Math.random() * 0.5);
      }

      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.08 + mouse.current.x * 0.25;
      pointsRef.current.rotation.x = time * 0.05 + mouse.current.y * 0.25;

      const positionsArray =
        pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const px = positionsArray[i3];
        const py = positionsArray[i3 + 1];
        const wave = Math.sin(time + px + py) * 0.003;
        positionsArray[i3] += wave;
        positionsArray[i3 + 1] += wave;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-40 md:opacity-50">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={0.8} />
        <ParticleCloud />
      </Canvas>
    </div>
  );
}
