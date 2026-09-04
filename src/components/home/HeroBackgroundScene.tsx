"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uAspect;
  uniform vec3 uPaper;
  uniform vec3 uCyan;
  uniform vec3 uPink;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  mat2 rot(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, -s, s, c);
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0) * 2.4;
    float t = uTime * 0.06;

    vec2 mo = (uMouse - 0.5) * vec2(uAspect, 1.0);
    p += mo * 0.55;

    // swirling domain warp
    vec2 q = vec2(fbm(p * 0.7 + vec2(0.0, t)), fbm(p * 0.7 + vec2(3.4, -t)));
    q = rot(t * 0.7) * q;
    vec2 r = vec2(
      fbm(p * 0.9 + 2.4 * q + vec2(1.7, 9.2) + t),
      fbm(p * 0.9 + 2.4 * q + vec2(8.3, 2.8) - t)
    );
    float f = fbm(p + 2.0 * r);

    // two orbiting colour poles, nudged by the cursor
    vec2 cyanPole = vec2(cos(t * 1.3), sin(t * 1.15)) * 0.95 + mo * 0.6;
    vec2 pinkPole = vec2(cos(t * 0.9 + 2.0), sin(t * 1.45 + 1.0)) * 1.0 - mo * 0.45;

    float dc = smoothstep(1.7, 0.0, distance(p, cyanPole));
    float dp = smoothstep(1.8, 0.0, distance(p, pinkPole));

    float cyanAmt = clamp(dc * (0.45 + f), 0.0, 1.0);
    float pinkAmt = clamp(dp * (1.15 - f), 0.0, 1.0);

    vec3 col = uPaper;
    col = mix(col, uCyan, cyanAmt * 0.82);
    col = mix(col, uPink, pinkAmt * 0.72);
    // lavender where the two overlap
    col = mix(col, mix(uCyan, uPink, 0.5), cyanAmt * pinkAmt * 0.55);

    // keep the headline side a touch calmer for legibility
    float calm = 0.5 + 0.5 * smoothstep(0.0, 0.6, uv.x);
    col = mix(uPaper, col, calm);

    // fine grain
    col += (hash(uv * 900.0 + fract(t)) - 0.5) * 0.015;

    // fade edges toward paper
    float vig = smoothstep(1.35, 0.32, distance(uv, vec2(0.5)));
    col = mix(uPaper, col, 0.45 + 0.55 * vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function FluidPlane({ active }: { active: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uAspect: { value: 1 },
      uPaper: { value: new THREE.Color("#fbfaf7") },
      uCyan: { value: new THREE.Color("#22d3ee") },
      uPink: { value: new THREE.Color("#ff6bd0") },
    }),
    [],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      targetMouse.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const u = matRef.current.uniforms;
    u.uAspect.value = state.size.width / Math.max(1, state.size.height);
    if (!active) return;
    u.uTime.value += Math.min(delta, 0.05);
    (u.uMouse.value as THREE.Vector2).lerp(targetMouse.current, 0.045);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function HeroBackgroundScene({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[0.65, 1.1]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      frameloop={active ? "always" : "demand"}
      style={{ background: "transparent" }}
    >
      <FluidPlane active={active} />
    </Canvas>
  );
}
