"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const CAMERA = { fov: 90, near: 0.1, far: 5000 };
const ORBIT = { radius: 27, height: 5, speed: 0.001 };
const PIVOT = { x: -3, y: 20, z: 3 };
const SHADOW_AREA = 450;
const SHADOW_MAP_SIZE = 2048;
const EDGE_ANGLE = 12;
const DEBUG_ORIGIN = false;
const OBJ_URL = "/assets/model/rondo1_model.obj";
const TERRAIN_URL = "/assets/model/terrain_map.jpg";
const THEMES = {
  light: {
    label: "Light",
    ui: {
      background: "#ffffff",
      overlay: "none",
      overlayOpacity: 0,
      buttonBg: "rgba(255, 255, 255, 0.86)",
      buttonText: "#0b0b0b",
      buttonBorder: "rgba(0, 0, 0, 0.12)",
      buttonGlow: "0 10px 24px rgba(0, 0, 0, 0.12)",
      buttonTextShadow: "none",
    },
    scene: {
      clearColor: 0xffffff,
      fog: { color: 0xffffff, near: 0, far: 120 },
      toneMappingExposure: 1.05,
    },
    lights: {
      ambient: { color: 0xffffff, intensity: 0.5 },
      top: { color: 0xffffff, intensity: 3 },
      sun: { color: 0xffffff, intensity: 4 },
      rim: { color: 0xffffff, intensity: 0.15 },
    },
    materials: {
      base: {
        color: 0xffffff,
        roughness: 0.98,
        metalness: 0,
        opacity: 1,
        emissive: 0x000000,
        emissiveIntensity: 0,
      },
      hover: {
        color: 0x00c6af,
        roughness: 0.75,
        metalness: 0,
        opacity: 0.5,
        emissive: 0x000000,
        emissiveIntensity: 0,
      },
      faint: {
        color: 0xffffff,
        roughness: 1,
        metalness: 0,
        opacity: 0.5,
        emissive: 0x000000,
        emissiveIntensity: 0,
      },
      pencil: { color: 0x808080, opacity: 0.5 },
      terrain: { color: 0xffffff, roughness: 1, metalness: 0 },
    },
  },
  dark: {
    label: "Neo Dark",
    ui: {
      background: "#05070c",
      overlay:
        "radial-gradient(900px 520px at 15% 10%, rgba(80, 255, 255, 0.25), transparent 60%), radial-gradient(700px 420px at 85% 20%, rgba(255, 86, 210, 0.2), transparent 55%), radial-gradient(1200px 700px at 60% 120%, rgba(64, 140, 255, 0.18), transparent 65%)",
      overlayOpacity: 0.85,
      buttonBg: "rgba(8, 14, 20, 0.82)",
      buttonText: "#e8f6ff",
      buttonBorder: "rgba(94, 214, 255, 0.45)",
      buttonGlow:
        "0 0 18px rgba(120, 255, 250, 0.4), 0 0 32px rgba(255, 86, 210, 0.35)",
      buttonTextShadow:
        "0 0 10px rgba(120, 255, 255, 0.7), 0 0 18px rgba(255, 86, 210, 0.5)",
    },
    scene: {
      clearColor: 0x05070c,
      fog: { color: 0x070b12, near: 16, far: 150 },
      toneMappingExposure: 1.35,
    },
    lights: {
      ambient: { color: 0x17324a, intensity: 0.28 },
      top: { color: 0x4fe7ff, intensity: 2.2 },
      sun: { color: 0xff4fcf, intensity: 1.6 },
      rim: { color: 0x9cf6ff, intensity: 0.9 },
    },
    materials: {
      base: {
        color: 0x0b1118,
        roughness: 0.55,
        metalness: 0.45,
        opacity: 1,
        emissive: 0x0b1c2a,
        emissiveIntensity: 0.55,
      },
      hover: {
        color: 0x32ffd8,
        roughness: 0.35,
        metalness: 0.35,
        opacity: 0.95,
        emissive: 0x52ffe7,
        emissiveIntensity: 0.9,
      },
      faint: {
        color: 0x070b10,
        roughness: 0.9,
        metalness: 0.2,
        opacity: 0.28,
        emissive: 0x0a1822,
        emissiveIntensity: 0.35,
      },
      pencil: { color: 0x5fd6ff, opacity: 0.7 },
      terrain: { color: 0x0b1016, roughness: 1, metalness: 0 },
    },
  },
} as const;

type ThemeName = keyof typeof THEMES;
type ThemeConfig = (typeof THEMES)[ThemeName];

const isMesh = (obj: THREE.Object3D): obj is THREE.Mesh =>
  (obj as THREE.Mesh).isMesh === true;

const getMeshFromHit = (obj: THREE.Object3D | null): THREE.Mesh | null => {
  if (!obj) return null;
  if (isMesh(obj)) return obj;
  const parent = obj.parent;
  return parent && isMesh(parent) ? parent : null;
};

export default function ObjViewer() {
  const [theme, setTheme] = useState<ThemeName>("light");
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const topLightRef = useRef<THREE.DirectionalLight | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const baseMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const hoverMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const faintMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const pencilLineMatRef = useRef<THREE.LineBasicMaterial | null>(null);
  const terrainMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  const applyTheme = useCallback((nextTheme: ThemeConfig) => {
    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    if (!scene || !renderer) return;

    scene.fog = new THREE.Fog(
      nextTheme.scene.fog.color,
      nextTheme.scene.fog.near,
      nextTheme.scene.fog.far,
    );
    scene.background = new THREE.Color(nextTheme.scene.clearColor);

    renderer.setClearColor(nextTheme.scene.clearColor, 1);
    renderer.toneMappingExposure = nextTheme.scene.toneMappingExposure;

    const ambient = ambientLightRef.current;
    if (ambient) {
      ambient.color.setHex(nextTheme.lights.ambient.color);
      ambient.intensity = nextTheme.lights.ambient.intensity;
    }

    const top = topLightRef.current;
    if (top) {
      top.color.setHex(nextTheme.lights.top.color);
      top.intensity = nextTheme.lights.top.intensity;
    }

    const sun = sunLightRef.current;
    if (sun) {
      sun.color.setHex(nextTheme.lights.sun.color);
      sun.intensity = nextTheme.lights.sun.intensity;
    }

    const rim = rimLightRef.current;
    if (rim) {
      rim.color.setHex(nextTheme.lights.rim.color);
      rim.intensity = nextTheme.lights.rim.intensity;
    }

    const baseMat = baseMatRef.current;
    if (baseMat) {
      baseMat.color.setHex(nextTheme.materials.base.color);
      baseMat.roughness = nextTheme.materials.base.roughness;
      baseMat.metalness = nextTheme.materials.base.metalness;
      baseMat.opacity = nextTheme.materials.base.opacity;
      baseMat.transparent = nextTheme.materials.base.opacity < 1;
      baseMat.emissive.setHex(nextTheme.materials.base.emissive);
      baseMat.emissiveIntensity = nextTheme.materials.base.emissiveIntensity;
      baseMat.needsUpdate = true;
    }

    const hoverMat = hoverMatRef.current;
    if (hoverMat) {
      hoverMat.color.setHex(nextTheme.materials.hover.color);
      hoverMat.roughness = nextTheme.materials.hover.roughness;
      hoverMat.metalness = nextTheme.materials.hover.metalness;
      hoverMat.opacity = nextTheme.materials.hover.opacity;
      hoverMat.transparent = nextTheme.materials.hover.opacity < 1;
      hoverMat.emissive.setHex(nextTheme.materials.hover.emissive);
      hoverMat.emissiveIntensity = nextTheme.materials.hover.emissiveIntensity;
      hoverMat.needsUpdate = true;
    }

    const faintMat = faintMatRef.current;
    if (faintMat) {
      faintMat.color.setHex(nextTheme.materials.faint.color);
      faintMat.roughness = nextTheme.materials.faint.roughness;
      faintMat.metalness = nextTheme.materials.faint.metalness;
      faintMat.opacity = nextTheme.materials.faint.opacity;
      faintMat.transparent = nextTheme.materials.faint.opacity < 1;
      faintMat.emissive.setHex(nextTheme.materials.faint.emissive);
      faintMat.emissiveIntensity = nextTheme.materials.faint.emissiveIntensity;
      faintMat.needsUpdate = true;
    }

    const pencilMat = pencilLineMatRef.current;
    if (pencilMat) {
      pencilMat.color.setHex(nextTheme.materials.pencil.color);
      pencilMat.opacity = nextTheme.materials.pencil.opacity;
      pencilMat.transparent = nextTheme.materials.pencil.opacity < 1;
      pencilMat.fog = true;
      pencilMat.needsUpdate = true;
    }

    const terrainMat = terrainMatRef.current;
    if (terrainMat) {
      terrainMat.color.setHex(nextTheme.materials.terrain.color);
      terrainMat.roughness = nextTheme.materials.terrain.roughness;
      terrainMat.metalness = nextTheme.materials.terrain.metalness;
      terrainMat.needsUpdate = true;
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let disposed = false;

    const getSize = () => ({
      width: el.clientWidth || window.innerWidth,
      height: el.clientHeight || window.innerHeight,
    });

    const scene = new THREE.Scene();
    const { width, height } = getSize();

    const camera = new THREE.PerspectiveCamera(
      CAMERA.fov,
      width / height,
      CAMERA.near,
      CAMERA.far,
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const canvas = renderer.domElement;
    el.appendChild(canvas);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const topLight = new THREE.DirectionalLight(0xffffff, 3);
    topLight.position.set(0, 1000, 0);

    const sunLight = new THREE.DirectionalLight(0xffffff, 4);
    sunLight.position.set(-300, 1000, 300);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(SHADOW_MAP_SIZE, SHADOW_MAP_SIZE);
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 2000;
    sunLight.shadow.camera.left = -SHADOW_AREA;
    sunLight.shadow.camera.right = SHADOW_AREA;
    sunLight.shadow.camera.top = SHADOW_AREA;
    sunLight.shadow.camera.bottom = -SHADOW_AREA;
    sunLight.shadow.bias = -0.0001;
    sunLight.shadow.normalBias = 0.02;
    sunLight.shadow.radius = 3;

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.15);
    rimLight.position.set(0, 600, -600);

    scene.add(ambientLight, topLight, sunLight, sunLight.target, rimLight);

    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.98,
      metalness: 0,
      depthWrite: true,
    });

    const hoverMat = new THREE.MeshStandardMaterial({
      color: 0x00c6af,
      roughness: 0.75,
      metalness: 0,
      transparent: true,
      opacity: 0.5,
    });

    const faintMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0.5,
      depthWrite: true,
    });

    const pencilLineMat = new THREE.LineBasicMaterial({
      color: 0x808080,
      transparent: true,
      opacity: 0.5,
      depthTest: true,
      depthWrite: false,
    });

    const textureLoader = new THREE.TextureLoader();
    const terrainTex = textureLoader.load(TERRAIN_URL);
    terrainTex.colorSpace = THREE.SRGBColorSpace;
    terrainTex.anisotropy = Math.min(
      8,
      renderer.capabilities.getMaxAnisotropy(),
    );
    terrainTex.minFilter = THREE.LinearMipmapLinearFilter;
    terrainTex.magFilter = THREE.LinearFilter;
    terrainTex.generateMipmaps = true;
    terrainTex.needsUpdate = true;

    const terrainMat = new THREE.MeshStandardMaterial({
      map: terrainTex,
      color: 0xffffff,
      roughness: 1,
      metalness: 0,
      side: THREE.FrontSide,
    });

    sceneRef.current = scene;
    rendererRef.current = renderer;
    ambientLightRef.current = ambientLight;
    topLightRef.current = topLight;
    sunLightRef.current = sunLight;
    rimLightRef.current = rimLight;
    baseMatRef.current = baseMat;
    hoverMatRef.current = hoverMat;
    faintMatRef.current = faintMat;
    pencilLineMatRef.current = pencilLineMat;
    terrainMatRef.current = terrainMat;

    applyTheme(THEMES[theme]);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hovered: THREE.Mesh | null = null;

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    canvas.addEventListener("mousemove", onMove);

    let originLine: THREE.Line | null = null;
    const pivotPoint = new THREE.Vector3(PIVOT.x, PIVOT.y, PIVOT.z);
    const target = pivotPoint.clone();

    if (DEBUG_ORIGIN) {
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(target.x, target.y - 500, target.z),
        new THREE.Vector3(target.x, target.y + 500, target.z),
      ]);
      originLine = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(originLine);
    }

    const pivot = new THREE.Group();
    pivot.position.copy(pivotPoint);
    scene.add(pivot);

    let obj: THREE.Object3D | null = null;

    new OBJLoader().load(
      OBJ_URL,
      (loaded) => {
        if (disposed) {
          loaded.traverse((child) => {
            if (!isMesh(child)) return;
            child.geometry.dispose();
            const material = child.material;
            if (Array.isArray(material)) {
              material.forEach((mat) => mat.dispose());
            } else {
              material.dispose();
            }
          });
          return;
        }

        loaded.traverse((child) => {
          if (!isMesh(child)) return;

          const name = String(child.name || "");
          const lowerName = name.toLowerCase();
          const numericId = Number(name.replace("non_", ""));
          const isRondo =
            name.startsWith("rondo_") ||
            (Number.isFinite(numericId) && numericId > 15) ||
            lowerName === "plane";

          child.castShadow = true;
          child.receiveShadow = false;
          child.material = isRondo ? baseMat : faintMat;

          if (lowerName !== "plane") {
            const edges = new THREE.LineSegments(
              new THREE.EdgesGeometry(child.geometry, EDGE_ANGLE),
              pencilLineMat,
            );
            edges.frustumCulled = false;
            edges.renderOrder = 1;
            child.add(edges);
            child.userData.edgeHelper = edges;
          }

          if (lowerName === "plane") {
            child.material = terrainMat;
            child.receiveShadow = true;
            child.castShadow = false;
          }
        });

        obj = loaded;
        pivot.add(obj);
        obj.position.sub(pivotPoint);
      },
      undefined,
      (error) => {
        if (!disposed) {
          console.error("Failed to load OBJ:", error);
        }
      },
    );

    const onResize = () => {
      const nextSize = getSize();
      camera.aspect = nextSize.width / nextSize.height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(nextSize.width, nextSize.height);
    };
    window.addEventListener("resize", onResize);

    let angle = 0;
    let raf = 0;
    const animate = () => {
      if (obj) {
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObject(obj, true);
        const hit = hits.find((item) => {
          const mesh = getMeshFromHit(item.object);
          return (
            typeof mesh?.name === "string" && mesh.name.startsWith("rondo_")
          );
        });
        const hitMesh = getMeshFromHit(hit?.object ?? null);

        if (hovered && hovered !== hitMesh) {
          hovered.material = baseMat;
          hovered = null;
        }
        if (hitMesh && hitMesh !== hovered) {
          hovered = hitMesh;
          hovered.material = hoverMat;
        }
      }

      angle += ORBIT.speed;
      const x = target.x + Math.cos(angle) * ORBIT.radius;
      const z = target.z + Math.sin(angle) * ORBIT.radius;
      const y = target.y + ORBIT.height;

      camera.position.set(x, y, z);
      camera.lookAt(target);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);

      if (hovered) hovered.material = baseMat;

      canvas.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);

      if (originLine) {
        originLine.geometry.dispose();
        (originLine.material as THREE.Material).dispose();
        scene.remove(originLine);
      }

      if (obj) {
        obj.traverse((child) => {
          if (!isMesh(child)) return;

          const edgeHelper = child.userData.edgeHelper as
            | THREE.LineSegments
            | undefined;
          if (edgeHelper) {
            edgeHelper.geometry.dispose();
            child.remove(edgeHelper);
          }

          child.geometry.dispose();
        });
        pivot.remove(obj);
      }

      terrainTex.dispose();
      terrainMat.dispose();
      baseMat.dispose();
      hoverMat.dispose();
      faintMat.dispose();
      pencilLineMat.dispose();

      renderer.renderLists.dispose();
      renderer.dispose();

      if (canvas.parentElement === el) {
        el.removeChild(canvas);
      }

      sceneRef.current = null;
      rendererRef.current = null;
      ambientLightRef.current = null;
      topLightRef.current = null;
      sunLightRef.current = null;
      rimLightRef.current = null;
      baseMatRef.current = null;
      hoverMatRef.current = null;
      faintMatRef.current = null;
      pencilLineMatRef.current = null;
      terrainMatRef.current = null;
    };
  }, [applyTheme]);

  useEffect(() => {
    applyTheme(THEMES[theme]);
  }, [applyTheme, theme]);

  const activeTheme = THEMES[theme];
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: activeTheme.ui.background,
        transition: "background-color 240ms ease",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: activeTheme.ui.overlay,
          opacity: activeTheme.ui.overlayOpacity,
          mixBlendMode: "screen",
          pointerEvents: "none",
          transition: "opacity 240ms ease",
        }}
      />
      <button
        type="button"
        onClick={toggleTheme}
        aria-pressed={theme === "dark"}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 3,
          padding: "10px 16px",
          borderRadius: 999,
          border: `1px solid ${activeTheme.ui.buttonBorder}`,
          background: activeTheme.ui.buttonBg,
          color: activeTheme.ui.buttonText,
          boxShadow: activeTheme.ui.buttonGlow,
          backdropFilter: "blur(10px)",
          textShadow: activeTheme.ui.buttonTextShadow,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Theme: {activeTheme.label}
      </button>
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      />
    </div>
  );
}
