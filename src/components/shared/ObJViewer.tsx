"use client";

import { useEffect, useRef } from "react";
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
const FOG = { color: 0xffffff, near: 0, far: 120 };

const isMesh = (obj: THREE.Object3D): obj is THREE.Mesh =>
  (obj as THREE.Mesh).isMesh === true;

const getMeshFromHit = (obj: THREE.Object3D | null): THREE.Mesh | null => {
  if (!obj) return null;
  if (isMesh(obj)) return obj;
  const parent = obj.parent;
  return parent && isMesh(parent) ? parent : null;
};

export default function ObjViewer() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let disposed = false;

    const getSize = () => ({
      width: el.clientWidth || window.innerWidth,
      height: el.clientHeight || window.innerHeight,
    });

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(FOG.color, FOG.near, FOG.far);
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
    renderer.setClearColor(0xffffff, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
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
            typeof mesh?.name === "string" && mesh.name !== "Plane"
            // (mesh.name.startsWith("rondo_") || mesh.name.startsWith("non_"))
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
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "transparent",
      }}
    />
  );
}
