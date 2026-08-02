import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Animated Bar Chart Tower in 3D
function ChartBar({ position, height, color, label, targetValue }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth height animation scale
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, height, delta * 3);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} position={[0, height / 2, 0]}>
        <boxGeometry args={[0.35, 1, 0.35]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.2} 
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* 3D Value Text floating above */}
      <Text
        position={[0, height + 0.3, 0]}
        fontSize={0.22}
        color="#FFFFFF"
        anchorX="center"
        anchorY="bottom"
      >
        {targetValue}
      </Text>
      {/* Label under bar */}
      <Text
        position={[0, -0.2, 0]}
        fontSize={0.18}
        color="#9CA3AF"
        anchorX="center"
        anchorY="top"
      >
        {label}
      </Text>
    </group>
  );
}

// Floating Glass Dashboard Glass Frame in 3D
function GlassDashboardFrame({ viewMode }) {
  const groupRef = useRef();

  // Data views based on interactive selection
  const dataSets = {
    quarterly: [
      { label: 'Q1', height: 1.8, val: '$120K', color: '#F2C811' },
      { label: 'Q2', height: 2.6, val: '$240K', color: '#00D2FF' },
      { label: 'Q3', height: 3.2, val: '$380K', color: '#BFFF00' },
      { label: 'Q4', height: 4.1, val: '$510K', color: '#F2C811' },
    ],
    regional: [
      { label: 'US', height: 3.8, val: '45%', color: '#00D2FF' },
      { label: 'EU', height: 2.9, val: '30%', color: '#F2C811' },
      { label: 'ASIA', height: 2.2, val: '18%', color: '#BFFF00' },
      { label: 'LATAM', height: 1.4, val: '7%', color: '#FF5555' },
    ],
    ai: [
      { label: 'DAX', height: 4.2, val: '98%', color: '#BFFF00' },
      { label: 'SQL', height: 3.9, val: '94%', color: '#F2C811' },
      { label: 'Fabric', height: 3.5, val: '89%', color: '#00D2FF' },
      { label: 'MCP', height: 4.5, val: '99%', color: '#BFFF00' },
    ]
  };

  const activeBars = dataSets[viewMode] || dataSets.quarterly;

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating inclination based on mouse move
      const pointerX = state.pointer.x * 0.2;
      const pointerY = state.pointer.y * 0.2;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointerX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointerY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dashboard Backing Glass Card */}
      <mesh position={[0, 1.5, -0.3]}>
        <boxGeometry args={[4.8, 3.8, 0.08]} />
        <meshPhysicalMaterial
          color="#0B0B0B"
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.6}
          thickness={0.5}
        />
      </mesh>

      {/* Gold Border Highlight Frame */}
      <lineSegments position={[0, 1.5, -0.25]}>
        <edgesGeometry args={[new THREE.BoxGeometry(4.85, 3.85, 0.09)]} />
        <lineBasicMaterial color="#F2C811" linewidth={2} transparent opacity={0.4} />
      </lineSegments>

      {/* Title Header inside 3D Dashboard */}
      <Text
        position={[-1.9, 3.0, 0]}
        fontSize={0.28}
        color="#F2C811"
        anchorX="left"
        anchorY="top"
      >
        POWER BI EXECUTIVE HUD
      </Text>
      <Text
        position={[-1.9, 2.65, 0]}
        fontSize={0.16}
        color="#9CA3AF"
        anchorX="left"
        anchorY="top"
      >
        LIVE ANALYTICS ENGINE • HAKAM DATA STUDIO
      </Text>

      {/* KPI Cards Floating in 3D */}
      <group position={[-1.4, 1.8, 0]}>
        <mesh>
          <boxGeometry args={[1.3, 0.7, 0.05]} />
          <meshStandardMaterial color="#16171D" metalness={0.5} roughness={0.2} />
        </mesh>
        <Text position={[-0.5, 0.18, 0.04]} fontSize={0.12} color="#9CA3AF" anchorX="left">
          ACTIVE METRIC
        </Text>
        <Text position={[-0.5, -0.1, 0.04]} fontSize={0.22} color="#00D2FF" anchorX="left">
          $1.45M +24%
        </Text>
      </group>

      <group position={[1.4, 1.8, 0]}>
        <mesh>
          <boxGeometry args={[1.3, 0.7, 0.05]} />
          <meshStandardMaterial color="#16171D" metalness={0.5} roughness={0.2} />
        </mesh>
        <Text position={[-0.5, 0.18, 0.04]} fontSize={0.12} color="#9CA3AF" anchorX="left">
          ACCURACY
        </Text>
        <Text position={[-0.5, -0.1, 0.04]} fontSize={0.22} color="#BFFF00" anchorX="left">
          99.8% AI MCP
        </Text>
      </group>

      {/* Dynamic Bar Chart Towers */}
      <group position={[-1.2, 0.2, 0]}>
        {activeBars.map((bar, i) => (
          <ChartBar 
            key={i} 
            position={[i * 0.8, 0, 0]} 
            height={bar.height} 
            color={bar.color} 
            label={bar.label} 
            targetValue={bar.val} 
          />
        ))}
      </group>
    </group>
  );
}

// Background Particle Starfield
function ParticleGrid() {
  const pointsRef = useRef();
  const particleCount = 200;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#F2C811" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

// Main Interactive Hero 3D Component
export default function Hero3DDashboard() {
  const [viewMode, setViewMode] = useState('quarterly');

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
      {/* Floating Mode Switcher Overlay */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-2 p-1.5 rounded-full bg-[#0B0B0B]/80 backdrop-blur-xl border border-white/10">
        <button
          onClick={() => setViewMode('quarterly')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
            viewMode === 'quarterly' 
              ? 'bg-[#F2C811] text-black font-semibold shadow-md shadow-yellow-500/20' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Quarterly Growth
        </button>
        <button
          onClick={() => setViewMode('regional')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
            viewMode === 'regional' 
              ? 'bg-[#00D2FF] text-black font-semibold shadow-md shadow-cyan-500/20' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Global Share
        </button>
        <button
          onClick={() => setViewMode('ai')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
            viewMode === 'ai' 
              ? 'bg-[#BFFF00] text-black font-semibold shadow-md shadow-lime-500/20' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          AI Pipeline Score
        </button>
      </div>

      {/* Interactive Helper Badge */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-400 font-mono">
        <span className="w-2 h-2 rounded-full bg-[#BFFF00] animate-ping"></span>
        <span>Drag mouse to tilt 3D canvas</span>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 1.5, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#F2C811" />
        <pointLight position={[-10, -5, 5]} intensity={1.2} color="#00D2FF" />
        <spotLight position={[0, 8, 8]} angle={0.4} penumbra={1} intensity={2} color="#FFFFFF" />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <GlassDashboardFrame viewMode={viewMode} />
        </Float>

        <ParticleGrid />
      </Canvas>
    </div>
  );
}
