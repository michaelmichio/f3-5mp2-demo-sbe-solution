"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// const buildingStates: ViewState[] = useMemo(
//   () => [
//     {
//       id: "entrance",
//       name: "Entrance",
//       description: "Ground floor entrance",
//       yaw: 1.57,
//       pitch: -0.12,
//       distance: 160,
//       lookAt: { x: 0, y: 25, z: 0 },
//       fov: 58,
//       exposure: 1.05,
//       lambda: 6,
//     },
//     {
//       id: "right",
//       name: "Right Wing",
//       description: "Second floor right side",
//       yaw: 3.14,
//       pitch: -0.14,
//       distance: 150,
//       lookAt: { x: 0, y: 35, z: 0 },
//       fov: 58,
//       exposure: 1.05,
//       lambda: 6,
//     },
//     {
//       id: "back",
//       name: "Back View",
//       description: "Mid-level rear facade",
//       yaw: 4.71,
//       pitch: -0.16,
//       distance: 170,
//       lookAt: { x: 0, y: 50, z: 0 },
//       fov: 60,
//       exposure: 1.05,
//       lambda: 6,
//     },
//     {
//       id: "left",
//       name: "Left Wing",
//       description: "Upper floor left side",
//       yaw: 6.28,
//       pitch: -0.18,
//       distance: 175,
//       lookAt: { x: 0, y: 65, z: 0 },
//       fov: 62,
//       exposure: 1.05,
//       lambda: 6,
//     },
//     {
//       id: "roof",
//       name: "Rooftop",
//       description: "Top floor overview",
//       yaw: 7.85,
//       pitch: -0.28,
//       distance: 210,
//       lookAt: { x: 0, y: 90, z: 0 },
//       fov: 65,
//       exposure: 1.05,
//       lambda: 5,
//     },
//   ],
//   [],
// );

type DebugForm = {
  yawDeg: number;
  pitchDeg: number;
  distance: number;
  lookAtX: number;
  lookAtY: number;
  lookAtZ: number;
  fov: number;
  exposure: number;
  lambda: number;
  reveal: number;
};

type ViewState = {
  id: string;
  name: string;
  description?: string;

  // Camera pose (orbit style)
  yaw: number; // radians (around target)
  pitch: number; // radians (up/down tilt). negative = from above
  distance: number; // radius

  // Target camera looks at
  lookAt: { x: number; y: number; z: number };

  // Optics (optional)
  fov?: number; // default 60
  exposure?: number; // optional per-view toneMappingExposure

  // Transition tuning (optional)
  lambda?: number; // damp speed
};

type Hotspot = {
  id: string;
  label: string;
  view: Partial<ViewState> &
    Pick<ViewState, "yaw" | "pitch" | "distance" | "lookAt">;
};

const dampAngle = (
  current: number,
  target: number,
  lambda: number,
  dt: number,
) => {
  // shortest path around circle
  const delta =
    THREE.MathUtils.euclideanModulo(target - current + Math.PI, Math.PI * 2) -
    Math.PI;
  return current + delta * (1 - Math.exp(-lambda * dt));
};

const BuildingViewer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState(0);

  // ✅ Replace BuildingState → ViewState (lebih lengkap)
  const buildingStates: ViewState[] = useMemo(
    () => [
      {
        id: "0",
        name: "Entrance 0",
        description: "Ground floor entrance",
        yaw: 0,
        pitch: 0,
        distance: 700,
        lookAt: { x: 0, y: 50, z: 0 },
        fov: 58,
        exposure: 1.05,
        lambda: 6,
      },
      {
        id: "5",
        name: "R5",
        description: "Ground floor entrance",
        yaw: 3.14,
        pitch: -0.14,
        distance: 150,
        lookAt: { x: 0, y: 35, z: 0 },
        fov: 58,
        exposure: 1.05,
        lambda: 6,
      },
    ],
    [],
  );

  // Hotspots bisa override sebagian parameter (misalnya radius/lookAtY)
  const hotspots: Hotspot[] = useMemo(
    () => [
      {
        id: "1",
        label: "Entrance",
        view: {
          yaw: 1.57,
          pitch: -0.12,
          distance: 160,
          lookAt: { x: 0, y: 25, z: 0 },
        },
      },
      {
        id: "2",
        label: "Side",
        view: {
          yaw: 3.14,
          pitch: -0.12,
          distance: 150,
          lookAt: { x: 0, y: 30, z: 0 },
        },
      },
      {
        id: "3",
        label: "Roof",
        view: {
          yaw: 4.71,
          pitch: -0.25,
          distance: 190,
          lookAt: { x: 0, y: 60, z: 0 },
        },
      },
    ],
    [],
  );

  // --- Three.js refs
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const buildingGroupRef = useRef<THREE.Group | null>(null);
  const rafRef = useRef<number | null>(null);
  const clockRef = useRef(new THREE.Clock());

  const revealRef = useRef(0); // 0..1 current
  const targetRevealRef = useRef(0); // 0..1 target

  const boundsYRef = useRef({ minY: 0, maxY: 1 }); // untuk normalisasi scanline
  const timeRef = useRef(0);

  const sectionRef = useRef(0);
  const isScrollingRef = useRef(false);

  // Current camera params
  const curYawRef = useRef(buildingStates[0].yaw);
  const curPitchRef = useRef(buildingStates[0].pitch);
  const curDistRef = useRef(buildingStates[0].distance);
  const curFovRef = useRef(buildingStates[0].fov ?? 60);
  const curLookAtRef = useRef(
    new THREE.Vector3(
      buildingStates[0].lookAt.x,
      buildingStates[0].lookAt.y,
      buildingStates[0].lookAt.z,
    ),
  );

  // Target camera params
  const targetYawRef = useRef(buildingStates[0].yaw);
  const targetPitchRef = useRef(buildingStates[0].pitch);
  const targetDistRef = useRef(buildingStates[0].distance);
  const targetFovRef = useRef(buildingStates[0].fov ?? 60);
  const targetLookAtRef = useRef(
    new THREE.Vector3(
      buildingStates[0].lookAt.x,
      buildingStates[0].lookAt.y,
      buildingStates[0].lookAt.z,
    ),
  );

  const targetLambdaRef = useRef(buildingStates[0].lambda ?? 6);
  const targetExposureRef = useRef(buildingStates[0].exposure ?? 1.05);

  const [debugOpen, setDebugOpen] = useState(false);

  const controlsRef = useRef<OrbitControls | null>(null);
  const debugEnabledRef = useRef(false);

  const toDeg = (rad: number) => (rad * 180) / Math.PI;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const [dbg, setDbg] = useState<DebugForm>(() => ({
    yawDeg: toDeg(targetYawRef.current),
    pitchDeg: toDeg(targetPitchRef.current),
    distance: targetDistRef.current,
    lookAtX: targetLookAtRef.current.x,
    lookAtY: targetLookAtRef.current.y,
    lookAtZ: targetLookAtRef.current.z,
    fov: targetFovRef.current,
    exposure: targetExposureRef.current,
    lambda: targetLambdaRef.current,
    reveal: revealRef.current,
  }));

  const syncDebugFromCurrent = () => {
    const cam = cameraRef.current;
    if (!cam) return;

    const controls = controlsRef.current;
    const debugActive = debugEnabledRef.current;

    // Kalau debug aktif dan OrbitControls ada → ambil dari posisi kamera + target controls
    if (debugActive && controls) {
      const target = controls.target.clone();
      const pos = cam.position.clone();

      // v = camera - target
      const v = pos.sub(target);
      const dist = v.length();

      // yaw = angle around Y axis
      const yaw = Math.atan2(v.x, v.z);

      // pitch = vertical angle
      const pitch = Math.asin(
        THREE.MathUtils.clamp(v.y / Math.max(dist, 1e-6), -1, 1),
      );

      setDbg({
        yawDeg: toDeg(yaw),
        pitchDeg: toDeg(pitch),
        distance: dist,
        lookAtX: target.x,
        lookAtY: target.y,
        lookAtZ: target.z,
        fov: cam.fov,
        exposure: rendererRef.current?.toneMappingExposure ?? dbg.exposure,
        lambda: targetLambdaRef.current,
        reveal: revealRef.current,
      });

      return;
    }

    // Kalau debug tidak aktif → ambil dari ref smoothing (seperti sebelumnya)
    setDbg({
      yawDeg: toDeg(curYawRef.current),
      pitchDeg: toDeg(curPitchRef.current),
      distance: curDistRef.current,
      lookAtX: curLookAtRef.current.x,
      lookAtY: curLookAtRef.current.y,
      lookAtZ: curLookAtRef.current.z,
      fov: curFovRef.current,
      exposure: rendererRef.current?.toneMappingExposure ?? dbg.exposure,
      lambda: targetLambdaRef.current,
      reveal: revealRef.current,
    });
  };

  const applyDebugToView = () => {
    const view = {
      yaw: toRad(dbg.yawDeg),
      pitch: toRad(dbg.pitchDeg),
      distance: dbg.distance,
      lookAt: { x: dbg.lookAtX, y: dbg.lookAtY, z: dbg.lookAtZ },
      fov: dbg.fov,
      exposure: dbg.exposure,
      lambda: dbg.lambda,
    };

    applyView(view); // pakai fungsi applyView kamu yang sudah ada
  };

  const copyDebugJSON = async () => {
    const json = JSON.stringify(
      {
        yaw: toRad(dbg.yawDeg),
        pitch: toRad(dbg.pitchDeg),
        distance: dbg.distance,
        lookAt: { x: dbg.lookAtX, y: dbg.lookAtY, z: dbg.lookAtZ },
        fov: dbg.fov,
        exposure: dbg.exposure,
        lambda: dbg.lambda,
      },
      null,
      2,
    );

    try {
      await navigator.clipboard.writeText(json);
    } catch {
      // fallback
      console.log("COPY THIS JSON:\n", json);
    }
  };

  const applyView = (
    view: Partial<ViewState> &
      Pick<ViewState, "yaw" | "pitch" | "distance" | "lookAt">,
  ) => {
    targetYawRef.current = view.yaw;
    targetPitchRef.current = view.pitch;
    targetDistRef.current = view.distance;

    targetLookAtRef.current.set(view.lookAt.x, view.lookAt.y, view.lookAt.z);

    if (typeof view.fov === "number") targetFovRef.current = view.fov;
    if (typeof view.lambda === "number") targetLambdaRef.current = view.lambda;
    if (typeof view.exposure === "number")
      targetExposureRef.current = view.exposure;

    const r = rendererRef.current;
    if (r) r.toneMappingExposure = targetExposureRef.current;
  };

  const navigateToSection = (index: number) => {
    const clamped = Math.max(0, Math.min(buildingStates.length - 1, index));
    setCurrentSection(clamped);
    sectionRef.current = clamped;
    applyView(buildingStates[clamped]);
  };

  const goToHotspot = (hs: Hotspot) => {
    applyView(hs.view);
  };

  // const makeOverlayModels = (original: THREE.Object3D) => {
  //   const textured = original.clone(true);
  //   const wire = original.clone(true);

  //   // --- Textured clone: kita set transparent agar bisa fade-in
  //   textured.traverse((obj) => {
  //     if ((obj as THREE.Mesh).isMesh) {
  //       const mesh = obj as THREE.Mesh;
  //       const mats = Array.isArray(mesh.material)
  //         ? mesh.material
  //         : [mesh.material];

  //       mats.forEach((m: any) => {
  //         if (!m) return;
  //         // clone material biar aman
  //         const mm = m.clone();
  //         mm.transparent = true;
  //         mm.opacity = 0; // start hidden
  //         mm.depthWrite = true;
  //         mesh.material = Array.isArray(mesh.material)
  //           ? mats.map((x: any) => (x ? x.clone() : x))
  //           : mm;
  //       });
  //     }
  //   });

  //   // --- Wireframe clone
  //   wire.traverse((obj) => {
  //     if ((obj as THREE.Mesh).isMesh) {
  //       const mesh = obj as THREE.Mesh;

  //       // geometry sama
  //       const wfMat = new THREE.MeshBasicMaterial({
  //         color: 0x00ffff,
  //         wireframe: true,
  //         transparent: true,
  //         opacity: 1,
  //         depthWrite: false,
  //       });

  //       mesh.material = wfMat;
  //       mesh.renderOrder = 2; // draw on top
  //     }
  //   });

  //   return { textured, wire };
  // };

  const makeOverlayModels = (original: THREE.Object3D) => {
    const textured = original.clone(true);
    const wire = original.clone(true);

    // Textured clone: clone materials + scanline reveal
    textured.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const mats = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];

        const cloned = mats.map((m: any) => {
          if (!m) return m;
          const mm = m.clone();
          mm.opacity = 0; // start hidden
          mm.transparent = true;

          applyScanlineReveal(mm, boundsYRef);
          return mm;
        });

        mesh.material = Array.isArray(mesh.material) ? cloned : cloned[0];
      }
    });

    // Wireframe clone
    wire.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.material = new THREE.MeshBasicMaterial({
          color: 0x00ffff,
          wireframe: true,
          transparent: true,
          opacity: 1,
          depthWrite: false,
        });
        mesh.renderOrder = 2;
      }
    });

    return { textured, wire };
  };

  const applyScanlineReveal = (
    mat: THREE.Material,
    boundsYRef: React.MutableRefObject<{ minY: number; maxY: number }>,
  ) => {
    const m = mat as any;

    // hanya material yang punya shader pipeline standar
    if (!m || typeof m.onBeforeCompile !== "function") return mat;

    m.transparent = true;
    m.depthWrite = false; // biar fade lebih clean
    m.needsUpdate = true;

    m.onBeforeCompile = (shader: any) => {
      shader.uniforms.uProgress = { value: 0 }; // 0..1
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uMinY = { value: 0 };
      shader.uniforms.uMaxY = { value: 1 };

      // lebar & feather scanline (tweak)
      shader.uniforms.uBand = { value: 0.03 }; // tebal garis scan
      shader.uniforms.uFeather = { value: 0.06 }; // softness reveal edge
      shader.uniforms.uGlow = { value: 1.25 }; // intensitas glow

      // simpan shader buat di-update per frame
      m.userData.shader = shader;

      // inject varying world position
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
         varying vec3 vWorldPos;`,
        )
        .replace(
          "#include <worldpos_vertex>",
          `#include <worldpos_vertex>
         vWorldPos = worldPosition.xyz;`,
        );

      // inject reveal logic
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>
         varying vec3 vWorldPos;
         uniform float uProgress;
         uniform float uTime;
         uniform float uMinY;
         uniform float uMaxY;
         uniform float uBand;
         uniform float uFeather;
         uniform float uGlow;`,
        )
        .replace(
          "#include <output_fragment>",
          `
          // normalize height 0..1 along Y
          float denom = max(uMaxY - uMinY, 0.0001);
          float h = clamp((vWorldPos.y - uMinY) / denom, 0.0, 1.0);

          // reveal mask (0 below scan, 1 above scan)
          float reveal = smoothstep(uProgress - uFeather, uProgress, h);

          // scanline band around uProgress
          float bandA = smoothstep(uProgress - uBand, uProgress, h);
          float bandB = 1.0 - smoothstep(uProgress, uProgress + uBand, h);
          float band = bandA * bandB;

          // flicker (subtle)
          float flick = 0.75 + 0.25 * sin(uTime * 12.0);

          // apply reveal to alpha
          gl_FragColor.a *= reveal;

          // add glow on the band (boost rgb)
          gl_FragColor.rgb += band * uGlow * flick;

          #include <output_fragment>
        `,
        );
    };

    return mat;
  };

  // Init Three.js once
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x0a0a1a);
    scene.background = null;
    // scene.fog = new THREE.Fog(0x0a0a1a, 300, 500);
    scene.fog = null;
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      buildingStates[0].fov ?? 60,
      container.clientWidth / container.clientHeight,
      0.1,
      2000,
    );
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // ✅ transparan
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = buildingStates[0].exposure ?? 1.05;

    renderer.setClearAlpha(0);

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dir1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dir1.position.set(50, 100, 50);
    dir1.castShadow = true;
    dir1.shadow.mapSize.width = 2048;
    dir1.shadow.mapSize.height = 2048;
    scene.add(dir1);

    const dir2 = new THREE.DirectionalLight(0xffffff, 0.8);
    dir2.position.set(-50, 50, -50);
    scene.add(dir2);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.0);
    frontLight.position.set(0, 50, 100);
    scene.add(frontLight);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.6));

    // HDR Environment
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();

    new HDRLoader()
      .setPath("/assets/hdr/")
      .load("studio_small_09_1k.hdr", (hdr) => {
        const envMap = pmrem.fromEquirectangular(hdr).texture;
        scene.environment = envMap;

        hdr.dispose();
        pmrem.dispose();

        // reduce lights after env applied
        ambientLight.intensity = 0.25;
        dir1.intensity = 1.0;
        dir2.intensity = 0.35;
        frontLight.intensity = 0.15;
      });

    // Grid
    // scene.add(new THREE.GridHelper(400, 40, 0x333333, 0x1a1a1a));

    // Building group
    const buildingGroup = new THREE.Group();
    buildingGroupRef.current = buildingGroup;
    scene.add(buildingGroup);

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      "/assets/model/hi_rise_apartment_building.glb",
      (gltf) => {
        const model = gltf.scene;

        // Auto-scale by height
        const box0 = new THREE.Box3().setFromObject(model);
        const size0 = box0.getSize(new THREE.Vector3());
        const desiredHeight = 220;
        const safeHeight = Math.max(size0.y, 0.0001);
        const s = desiredHeight / safeHeight;
        model.scale.setScalar(s);

        // Recompute after scaling
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

        // Center XZ
        model.position.x -= center.x;
        model.position.z -= center.z;
        // Ground to y=0
        model.position.y -= box.min.y;

        const finalBox = new THREE.Box3().setFromObject(model);
        boundsYRef.current = { minY: finalBox.min.y, maxY: finalBox.max.y };

        model.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            // env reflection intensity
            const mat = mesh.material as
              | THREE.MeshStandardMaterial
              | THREE.MeshStandardMaterial[];
            const apply = (m?: THREE.MeshStandardMaterial) => {
              if (!m) return;
              (m as any).envMapIntensity = 1.0;
              m.needsUpdate = true;
            };
            if (Array.isArray(mat)) mat.forEach((m) => apply(m));
            else apply(mat);
          }
        });

        const { textured, wire } = makeOverlayModels(model);

        // buildingGroup.add(model);

        // tambahkan keduanya ke group
        buildingGroup.add(wire);
        buildingGroup.add(textured);

        // reveal dimulai dari wireframe
        revealRef.current = 0;
        targetRevealRef.current = 1; // auto transition to full texture

        setLoading(false);
        setError(null);

        // apply initial view (in case you want)
        applyView(buildingStates[0]);
      },
      undefined,
      (err) => {
        console.error("Error loading model:", err);
        setError("Failed to load 3D model");
        setLoading(false);
      },
    );

    // Resize
    const handleResize = () => {
      const c = containerRef.current;
      const cam = cameraRef.current;
      const r = rendererRef.current;
      if (!c || !cam || !r) return;

      cam.aspect = c.clientWidth / c.clientHeight;
      cam.updateProjectionMatrix();
      r.setSize(c.clientWidth, c.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Wheel
    const onWheel = (e: WheelEvent) => {
      if (debugEnabledRef.current) return; // biar wheel untuk zoom OrbitControls

      e.preventDefault();
      if (isScrollingRef.current) return;

      const current = sectionRef.current;
      const max = buildingStates.length - 1;

      let next = current;
      if (e.deltaY > 0) next = Math.min(max, current + 1);
      if (e.deltaY < 0) next = Math.max(0, current - 1);

      if (next !== current) {
        isScrollingRef.current = true;
        navigateToSection(next);

        window.setTimeout(() => {
          isScrollingRef.current = false;
        }, 350);
      }
    };
    container.addEventListener("wheel", onWheel, { passive: false });

    // Init view refs
    sectionRef.current = 0;
    applyView(buildingStates[0]);

    // Animation loop
    const tmpPos = new THREE.Vector3();

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      const dt = Math.min(0.05, clockRef.current.getDelta());
      const cam = cameraRef.current!;
      const r = rendererRef.current!;
      const sc = sceneRef.current!;

      const lambda = targetLambdaRef.current ?? 6;

      const debugActive = debugEnabledRef.current;

      if (debugActive && controlsRef.current) {
        controlsRef.current.update();

        // render saja
        r.render(sc, cam);
        return;
      }

      // reveal progress damp
      // update time
      timeRef.current += dt;

      // damp reveal progress
      revealRef.current = THREE.MathUtils.damp(
        revealRef.current,
        targetRevealRef.current,
        6, // speed
        dt,
      );

      const p = THREE.MathUtils.clamp(revealRef.current, 0, 1);

      // apply to all materials in textured clone + fade wireframe
      const group = buildingGroupRef.current;
      if (group) {
        group.traverse((obj) => {
          if (!(obj as THREE.Mesh).isMesh) return;
          const mesh = obj as THREE.Mesh;

          // wireframe
          const matAny: any = mesh.material;
          if (matAny?.wireframe === true) {
            matAny.opacity = 1 - p;
            return;
          }

          // textured materials (array or single)
          const mats = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          mats.forEach((m: any) => {
            if (!m) return;

            // base fade (optional)
            m.opacity = p;
            m.transparent = true;

            // update shader uniforms (scanline)
            const shader = m.userData?.shader;
            if (shader) {
              shader.uniforms.uProgress.value = p;
              shader.uniforms.uTime.value = timeRef.current;
              shader.uniforms.uMinY.value = boundsYRef.current.minY;
              shader.uniforms.uMaxY.value = boundsYRef.current.maxY;
            }
          });
        });
      }

      // smooth params
      curYawRef.current = dampAngle(
        curYawRef.current,
        targetYawRef.current,
        lambda,
        dt,
      );
      curPitchRef.current = THREE.MathUtils.damp(
        curPitchRef.current,
        targetPitchRef.current,
        lambda,
        dt,
      );
      curDistRef.current = THREE.MathUtils.damp(
        curDistRef.current,
        targetDistRef.current,
        lambda,
        dt,
      );

      // smooth lookAt
      curLookAtRef.current.x = THREE.MathUtils.damp(
        curLookAtRef.current.x,
        targetLookAtRef.current.x,
        lambda,
        dt,
      );
      curLookAtRef.current.y = THREE.MathUtils.damp(
        curLookAtRef.current.y,
        targetLookAtRef.current.y,
        lambda,
        dt,
      );
      curLookAtRef.current.z = THREE.MathUtils.damp(
        curLookAtRef.current.z,
        targetLookAtRef.current.z,
        lambda,
        dt,
      );

      // smooth fov
      curFovRef.current = THREE.MathUtils.damp(
        curFovRef.current,
        targetFovRef.current,
        lambda,
        dt,
      );
      cam.fov = curFovRef.current;
      cam.updateProjectionMatrix();

      // compute orbit position from yaw/pitch/distance around lookAt
      const yaw = curYawRef.current;
      const pitch = curPitchRef.current;
      const dist = curDistRef.current;

      const cx =
        curLookAtRef.current.x + Math.sin(yaw) * Math.cos(pitch) * dist;
      const cy = curLookAtRef.current.y + Math.sin(pitch) * dist;
      const cz =
        curLookAtRef.current.z + Math.cos(yaw) * Math.cos(pitch) * dist;

      tmpPos.set(cx, cy, cz);

      cam.position.x = THREE.MathUtils.damp(
        cam.position.x,
        tmpPos.x,
        lambda,
        dt,
      );
      cam.position.y = THREE.MathUtils.damp(
        cam.position.y,
        tmpPos.y,
        lambda,
        dt,
      );
      cam.position.z = THREE.MathUtils.damp(
        cam.position.z,
        tmpPos.z,
        lambda,
        dt,
      );

      cam.lookAt(curLookAtRef.current);

      r.render(sc, cam);
    };

    // initial camera position
    camera.position.set(0, 30, 150);
    camera.lookAt(0, 20, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    // Debug feel:
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.enableRotate = true;

    // Batasi kalau mau (optional)
    controls.minDistance = 20;
    controls.maxDistance = 800;

    controlsRef.current = controls;

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("wheel", onWheel);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (
          containerRef.current &&
          rendererRef.current.domElement.parentNode === containerRef.current
        ) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }

      rendererRef.current = null;
      cameraRef.current = null;
      sceneRef.current = null;
      buildingGroupRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildingStates]);

  // Keep sectionRef synced
  useEffect(() => {
    sectionRef.current = currentSection;
  }, [currentSection]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "d") setDebugOpen((v) => !v);
      if (e.key.toLowerCase() === "r") syncDebugFromCurrent();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    debugEnabledRef.current = debugOpen; // debugOpen kamu
    if (controlsRef.current) controlsRef.current.enabled = debugOpen;

    const controls = controlsRef.current;
    const cam = cameraRef.current;
    if (!controls || !cam) return;

    controls.enabled = debugOpen;

    if (debugOpen) {
      // saat masuk debug, target OrbitControls = lookAt saat ini
      controls.target.copy(curLookAtRef.current);
      controls.update();
    } else {
      // saat keluar debug, ambil pose kamera manual sebagai target view supaya tidak "snap balik"
      // ini bikin transisi balik ke scripted mode lebih smooth
      const pos = cam.position.clone();
      const target = controls.target.clone();

      // hitung yaw/pitch/dist dari posisi kamera dan target
      const v = pos.sub(target);
      const dist = v.length();
      const yaw = Math.atan2(v.x, v.z);
      const pitch = Math.asin(
        THREE.MathUtils.clamp(v.y / Math.max(dist, 1e-6), -1, 1),
      );

      applyView({
        yaw,
        pitch,
        distance: dist,
        lookAt: { x: target.x, y: target.y, z: target.z },
        fov: cam.fov,
        exposure: rendererRef.current?.toneMappingExposure ?? 1.05,
        lambda: 6,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debugOpen]);

  // useEffect(() => {
  //   if (!debugOpen) return;

  //   let raf = 0;
  //   const loop = () => {
  //     raf = requestAnimationFrame(loop);
  //     // update tapi jangan terlalu sering setState kalau kamu merasa berat
  //     // bisa kamu throttle nanti
  //     syncDebugFromCurrent();
  //   };
  //   loop();

  //   return () => cancelAnimationFrame(raf);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debugOpen]);

  return (
    // bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950
    <div className="w-full h-screen relative overflow-hidden bg-white">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-50">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-white text-xl font-light">Loading 3D Model...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-50">
          <div className="text-center text-red-400">
            <p className="text-2xl mb-3">⚠️ Error Loading Model</p>
            <p className="text-base opacity-80">{error}</p>
          </div>
        </div>
      )}

      <div ref={containerRef} className="w-full h-full" />

      {/* Section Navigation */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 space-y-3">
        {buildingStates.map((state, index) => (
          <button
            key={state.id}
            onClick={() => navigateToSection(index)}
            className={`group flex items-center transition-all duration-300 ${
              currentSection === index
                ? "translate-x-0"
                : "-translate-x-20 hover:translate-x-0"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index
                  ? "bg-blue-500 scale-125 shadow-lg shadow-blue-500/50"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
            <div
              className={`ml-4 transition-all duration-300 ${currentSection === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            >
              <div className="bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                <p className="text-white font-semibold text-sm">{state.name}</p>
                <p className="text-white/60 text-xs">{state.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Current Section Info */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-slate-900/80 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 shadow-2xl">
          <div className="text-center">
            <p className="text-blue-400 text-sm font-semibold mb-1">
              {currentSection + 1} / {buildingStates.length}
            </p>
            <h2 className="text-white text-2xl font-bold">
              {buildingStates[currentSection].name}
            </h2>
            <p className="text-white/70 text-sm mt-1">
              {buildingStates[currentSection].description}
            </p>
          </div>
        </div>
      </div>

      {/* Hotspot numbers */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 space-y-2">
        {hotspots.map((hs) => (
          <button
            key={hs.id}
            onClick={() => goToHotspot(hs)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
            title={hs.label}
          >
            {hs.id}
          </button>
        ))}
      </div>

      {/* Controls Info */}
      <div className="absolute bottom-8 right-8 z-10">
        <div className="bg-slate-900/80 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10">
          <p className="text-white/90 text-sm mb-2 font-semibold">Controls</p>
          <div className="space-y-1 text-xs text-white/70">
            <p>🖱️ Scroll to change view</p>
            <p>🎯 Click dots / numbers</p>
          </div>
        </div>
      </div>

      {/* Debug Camera Overlay */}
      <div className="absolute top-6 right-6 z-30">
        <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden w-85">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <p className="text-white font-semibold text-sm">Camera Debug</p>
            <div className="flex gap-2">
              <button
                onClick={() => setDebugOpen((v) => !v)}
                className="px-2 py-1 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/15 rounded"
              >
                {debugOpen ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {debugOpen && (
            <div className="p-4 space-y-3 text-white/90">
              {/* helpers */}
              <div className="flex gap-2">
                <button
                  onClick={syncDebugFromCurrent}
                  className="flex-1 px-3 py-2 text-xs bg-white/10 hover:bg-white/15 rounded-lg border border-white/10"
                  title="Ambil nilai dari kamera yang sedang terlihat (current)"
                >
                  Read current
                </button>
                <button
                  onClick={applyDebugToView}
                  className="flex-1 px-3 py-2 text-xs bg-blue-500/30 hover:bg-blue-500/40 rounded-lg border border-blue-400/30"
                  title="Terapkan nilai input ke target kamera"
                >
                  Apply
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={copyDebugJSON}
                  className="flex-1 px-3 py-2 text-xs bg-white/10 hover:bg-white/15 rounded-lg border border-white/10"
                  title="Copy JSON view state"
                >
                  Copy JSON
                </button>

                <button
                  onClick={() => {
                    // optional: simpan ke section yang lagi aktif (gampang bikin buildingStates)
                    const next = {
                      id: `custom-${Date.now()}`,
                      name: `Custom ${currentSection + 1}`,
                      yaw: toRad(dbg.yawDeg),
                      pitch: toRad(dbg.pitchDeg),
                      distance: dbg.distance,
                      lookAt: {
                        x: dbg.lookAtX,
                        y: dbg.lookAtY,
                        z: dbg.lookAtZ,
                      },
                      fov: dbg.fov,
                      exposure: dbg.exposure,
                      lambda: dbg.lambda,
                    };
                    console.log("SAVE THIS VIEW:", next);
                  }}
                  className="flex-1 px-3 py-2 text-xs bg-white/10 hover:bg-white/15 rounded-lg border border-white/10"
                  title="Log view state ke console (untuk kamu copy ke buildingStates)"
                >
                  Log view
                </button>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-2 gap-2">
                <label className="text-xs text-white/70">
                  Yaw (deg)
                  <input
                    type="number"
                    value={dbg.yawDeg}
                    onChange={(e) =>
                      setDbg((s) => ({ ...s, yawDeg: Number(e.target.value) }))
                    }
                    className="mt-1 w-full px-2 py-1 rounded bg-black/30 border border-white/10 text-white text-xs"
                  />
                </label>

                <label className="text-xs text-white/70">
                  Pitch (deg)
                  <input
                    type="number"
                    value={dbg.pitchDeg}
                    onChange={(e) =>
                      setDbg((s) => ({
                        ...s,
                        pitchDeg: Number(e.target.value),
                      }))
                    }
                    className="mt-1 w-full px-2 py-1 rounded bg-black/30 border border-white/10 text-white text-xs"
                  />
                </label>

                <label className="text-xs text-white/70 col-span-2">
                  Distance
                  <input
                    type="number"
                    value={dbg.distance}
                    onChange={(e) =>
                      setDbg((s) => ({
                        ...s,
                        distance: Number(e.target.value),
                      }))
                    }
                    className="mt-1 w-full px-2 py-1 rounded bg-black/30 border border-white/10 text-white text-xs"
                  />
                </label>

                <label className="text-xs text-white/70">
                  LookAt X
                  <input
                    type="number"
                    value={dbg.lookAtX}
                    onChange={(e) =>
                      setDbg((s) => ({ ...s, lookAtX: Number(e.target.value) }))
                    }
                    className="mt-1 w-full px-2 py-1 rounded bg-black/30 border border-white/10 text-white text-xs"
                  />
                </label>

                <label className="text-xs text-white/70">
                  LookAt Y
                  <input
                    type="number"
                    value={dbg.lookAtY}
                    onChange={(e) =>
                      setDbg((s) => ({ ...s, lookAtY: Number(e.target.value) }))
                    }
                    className="mt-1 w-full px-2 py-1 rounded bg-black/30 border border-white/10 text-white text-xs"
                  />
                </label>

                <label className="text-xs text-white/70">
                  LookAt Z
                  <input
                    type="number"
                    value={dbg.lookAtZ}
                    onChange={(e) =>
                      setDbg((s) => ({ ...s, lookAtZ: Number(e.target.value) }))
                    }
                    className="mt-1 w-full px-2 py-1 rounded bg-black/30 border border-white/10 text-white text-xs"
                  />
                </label>

                <label className="text-xs text-white/70">
                  FOV
                  <input
                    type="number"
                    value={dbg.fov}
                    onChange={(e) =>
                      setDbg((s) => ({ ...s, fov: Number(e.target.value) }))
                    }
                    className="mt-1 w-full px-2 py-1 rounded bg-black/30 border border-white/10 text-white text-xs"
                  />
                </label>

                <label className="text-xs text-white/70">
                  Exposure
                  <input
                    type="number"
                    step="0.01"
                    value={dbg.exposure}
                    onChange={(e) =>
                      setDbg((s) => ({
                        ...s,
                        exposure: Number(e.target.value),
                      }))
                    }
                    className="mt-1 w-full px-2 py-1 rounded bg-black/30 border border-white/10 text-white text-xs"
                  />
                </label>

                <label className="text-xs text-white/70">
                  Lambda
                  <input
                    type="number"
                    step="0.5"
                    value={dbg.lambda}
                    onChange={(e) =>
                      setDbg((s) => ({ ...s, lambda: Number(e.target.value) }))
                    }
                    className="mt-1 w-full px-2 py-1 rounded bg-black/30 border border-white/10 text-white text-xs"
                  />
                </label>

                <label className="text-xs text-white/70 col-span-2">
                  Reveal ({dbg.reveal?.toFixed?.(2) ?? "—"})
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={(dbg as any).reveal ?? targetRevealRef.current}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setDbg((s: any) => ({ ...s, reveal: v }));
                      // langsung responsif:
                      targetRevealRef.current = v;
                      // optional: kalau kamu mau "snap" saat geser:
                      // revealRef.current = v;
                    }}
                    className="mt-2 w-full"
                  />
                </label>

                <button
                  onClick={() =>
                    setDbg((s) => ({
                      ...s,
                      yawDeg: 90,
                      pitchDeg: -10,
                      distance: 160,
                      lookAtX: 0,
                      lookAtY: 30,
                      lookAtZ: 0,
                      fov: 60,
                      exposure: 1.05,
                      lambda: 6,
                    }))
                  }
                  className="col-span-2 px-3 py-2 text-xs bg-white/10 hover:bg-white/15 rounded-lg border border-white/10"
                >
                  Reset defaults
                </button>
              </div>

              <p className="text-[11px] text-white/50 leading-snug">
                Tips: klik <b>Read current</b> setelah kamu scroll/klik view
                yang enak, lalu <b>Copy JSON</b> untuk tempel ke
                buildingStates/hotspots.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-700 ease-out"
          style={{
            width: `${((currentSection + 1) / buildingStates.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default BuildingViewer;
