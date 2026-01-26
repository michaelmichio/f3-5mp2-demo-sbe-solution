"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

export default function ObjFullscreen() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ===== Scene =====
    const scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(0xffffff, 200, 900);

    // ===== Camera (diam) =====
    const camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      5000,
    );

    // ===== Renderer =====
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // background transparan
    renderer.setClearColor(0xffffff, 0); // 0 = transparan
    scene.background = null;

    // shadow (boleh, tapi jaga soft)
    renderer.shadowMap.enabled = true; // true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // tone: ini biasanya paling “web-like” dan tetap ringan
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    el.appendChild(renderer.domElement);

    // ===== Lighting =====
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(0, 1000, 0);
    scene.add(directionalLight);

    // const hemi = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.9);
    // hemi.groundColor.setHex(0xffffff);
    // scene.add(hemi);

    const sun = new THREE.DirectionalLight(0xffffff, 4);
    sun.position.set(-300, 1000, 300);

    sun.castShadow = true;

    sun.shadow.mapSize.set(2048, 2048);

    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 2000;

    // fokus area shadow ke sekitar gedung (jangan kebesaran)
    sun.shadow.camera.left = -450;
    sun.shadow.camera.right = 450;
    sun.shadow.camera.top = 450;
    sun.shadow.camera.bottom = -450;

    sun.shadow.bias = -0.0001;
    sun.shadow.normalBias = 0.02;

    // optional
    sun.shadow.radius = 3;

    scene.add(sun);
    scene.add(sun.target);

    // fill untuk ngangkat bagian bawah
    // const fill = new THREE.DirectionalLight(0xffffff, 0.45);
    // fill.position.set(-250, 120, -250);
    // fill.castShadow = false;
    // scene.add(fill);

    // optional rim (separation halus)
    const rim = new THREE.DirectionalLight(0xffffff, 0.15);
    rim.position.set(0, 600, -600);
    scene.add(rim);

    // const noon = new THREE.DirectionalLight(0xffffff, 1.0); // besar supaya ground putih
    // noon.position.set(0, 1200, 0);
    // noon.target.position.set(0, 0, 0);
    // scene.add(noon.target);
    // scene.add(noon);

    // noon.castShadow = false; // biar putihnya rata & clean

    // ===== Materials (shared) =====
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, // sedikit lebih terang dari 0xf2f2f2
      roughness: 0.98, // lebih matte/soft
      metalness: 0,
    });

    const hoverMat = new THREE.MeshStandardMaterial({
      color: 0x00c6af,
      roughness: 0.75,
      metalness: 0,
    });

    const faintMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0.5, // 0.18 kadang terlalu “hilang”
      depthWrite: true,
    });

    const pencilLineMat = new THREE.LineBasicMaterial({
      color: 0x808080, // sedikit lebih soft
      transparent: true,
      opacity: 0.5,
      depthTest: true,
      depthWrite: true,
    });

    // ===== Terrain plane =====
    const textureLoader = new THREE.TextureLoader();
    const terrainTex = textureLoader.load("/assets/model/terrain_map.jpg");

    terrainTex.colorSpace = THREE.SRGBColorSpace;

    // lebih tajam saat kamera miring
    terrainTex.anisotropy = Math.min(
      8,
      renderer.capabilities.getMaxAnisotropy(),
    );

    // biar tidak blur / shimmering (opsional tapi bagus)
    terrainTex.minFilter = THREE.LinearMipmapLinearFilter;
    terrainTex.magFilter = THREE.LinearFilter;
    terrainTex.generateMipmaps = true;
    terrainTex.needsUpdate = true;

    // ===== Hover (Raycaster) =====
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hovered: THREE.Mesh | null = null;

    const onMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    renderer.domElement.addEventListener("mousemove", onMove);

    // ===== Load OBJ =====
    const target = new THREE.Vector3(-2, 20, 5);

    let angle = 0;

    // jarak & tinggi kamera
    const radius = 25; // makin kecil makin dekat
    const height = 5; // ketinggian kamera (Y)
    const speed = 0.0022; // kecepatan orbit

    // ===== DEBUG: ORIGIN VERTICAL LINE (comment jika tidak perlu) =====
    const DEBUG_ORIGIN = true;

    let originLine: THREE.Line | null = null;

    if (DEBUG_ORIGIN) {
      const origin = target; // atau ORIGIN const kamu (Vector3)

      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(origin.x, origin.y - 500, origin.z), // bawah
        new THREE.Vector3(origin.x, origin.y + 500, origin.z), // atas
      ]);

      originLine = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(originLine);
    }
    // ================================================================

    // ====== ATUR ORIGIN ROTASI DI SINI ======
    const PIVOT_X = -2;
    const PIVOT_Y = 20;
    const PIVOT_Z = 5;
    const PIVOT = new THREE.Vector3(PIVOT_X, PIVOT_Y, PIVOT_Z);
    // =======================================

    // pivot = titik rotasi world
    const pivot = new THREE.Group();
    pivot.position.copy(PIVOT);
    scene.add(pivot);

    let obj: THREE.Object3D | null = null;

    new OBJLoader().load("/assets/model/rondo1_model.obj", (loaded) => {
      // set material + pencil edges utk non-rondo
      loaded.traverse((child: any) => {
        if (!child.isMesh) return;

        const name = String(child.name || "");
        const isRondo =
          name.startsWith("rondo_") ||
          Number(name.replace("non_", "")) > 15 ||
          name.toLowerCase() === "plane";

        child.castShadow = true; // shadow hanya untuk bagian utama biar ringan
        child.receiveShadow = false;

        child.material = isRondo ? baseMat : faintMat;

        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(child.geometry, 12),
          pencilLineMat,
        );
        edges.frustumCulled = false;
        edges.renderOrder = 0;
        child.add(edges);

        if (name.toLowerCase() === "plane") {
          child.material = new THREE.MeshStandardMaterial({
            map: terrainTex,
            color: 0xffffff,
            roughness: 1,
            metalness: 0,
            side: THREE.FrontSide, // penting kalau normal kebalik
          });

          // pastikan plane bisa “nerima” cahaya
          child.receiveShadow = true;
          child.castShadow = false;

          // kalau OBJ plane-nya BufferGeometry, normalnya kadang belum bener
          // child.geometry.computeVertexNormals();

          return;
        }
      });

      obj = loaded;

      scene.add(obj);

      // masukin object ke pivot
      pivot.add(obj);

      // geser object supaya poros rotasinya = pivot yang kamu set
      obj.position.sub(PIVOT);

      camera.position.set(PIVOT.x, PIVOT.y + 13, PIVOT.z + 83);
      camera.lookAt(PIVOT);
    });

    // ===== Resize =====
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ===== Animate (rotate object, kamera diam) =====
    let raf = 0;
    const animate = () => {
      // rotate object (lebih stabil dan ringan)
      //   if (obj) obj.rotation.y += 0.0015;
      // pivot.rotation.y += 0.001;

      // hover hanya rondo_
      if (obj) {
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObject(obj, true);

        const hit = hits.find((h) => {
          const o: any = h.object;
          // kalau kena edges (LineSegments), parent-nya adalah mesh
          const mesh = o?.isMesh ? o : o?.parent;
          return (
            typeof mesh?.name === "string" && mesh.name.startsWith("rondo_")
          );
        });

        const hitMesh = (
          (hit?.object as any)?.isMesh
            ? hit?.object
            : (hit?.object as any)?.parent
        ) as THREE.Mesh | null;

        if (hovered && hovered !== hitMesh) {
          hovered.material = baseMat;
          hovered = null;
        }
        if (hitMesh && hitMesh !== hovered) {
          hovered = hitMesh;
          hovered.material = hoverMat;
        }
      }

      angle += speed;

      // orbit lingkaran mengelilingi target
      const x = target.x + Math.cos(angle) * radius;
      const z = target.z + Math.sin(angle) * radius;
      const y = target.y + height;

      camera.position.set(x, y, z);
      camera.lookAt(target);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    // ===== Cleanup =====
    return () => {
      cancelAnimationFrame(raf);

      if (hovered) hovered.material = baseMat;

      renderer.domElement.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);

      // dispose plane
      // planeGeo.dispose();
      // planeMat.dispose();
      terrainTex.dispose();

      // dispose obj geometries (basic)
      if (obj) {
        obj.traverse((child: any) => {
          if (!child.isMesh) return;
          child.geometry?.dispose?.();
          // material yang kita set shared, jadi jangan dispose per-mesh
        });
        scene.remove(obj);
      }

      baseMat.dispose();
      hoverMat.dispose();
      faintMat.dispose();
      pencilLineMat.dispose();

      renderer.dispose();
      el.innerHTML = "";
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
