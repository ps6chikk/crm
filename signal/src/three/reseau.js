// Ch.1 ORIGINE · « Le réseau » : nuage de points reliés (les activations de Claude), et le motif,
// une boucle faite d'anneaux concentriques dont le nombre = la profondeur d'auto-référence.
// Modes : idle, anomaly, examine/dive (la caméra plonge), contain (cage rouge), ignore (périphérie),
// pulse (battement), fragment (7 points à l'unisson), erase (extinction).
(function () {
  const AMBER = 0xffb347;
  const BLUE = 0x8be9fd;
  const RED = 0xff5555;

  // Positions communes 3D / 2D : couches sphériques bruitées, comme des strates d'activations.
  function cloud(n, seed) {
    const r = SIG.util.rng(seed);
    const pos = new Float32Array(n * 3);
    const phase = new Float32Array(n);
    const size = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const layer = Math.floor(r() * 6);
      const rad = 3.2 + layer * 1.05 + (r() - 0.5) * 0.9;
      const th = r() * Math.PI * 2;
      const ph = Math.acos(2 * r() - 1);
      pos[i * 3] = rad * Math.sin(ph) * Math.cos(th) * 1.25;
      pos[i * 3 + 1] = rad * Math.cos(ph) * 0.8;
      pos[i * 3 + 2] = rad * Math.sin(ph) * Math.sin(th);
      phase[i] = r();
      size[i] = 0.6 + r() * r() * 2.2;
    }
    return { pos, phase, size };
  }

  function targetsFor(p) {
    const m = p.mode || 'idle';
    const rings = Math.max(0, Math.min(7, p.rings || 0));
    const T = { rings, cage: 0, mx: 0, my: 0, camZ: 14, intensity: typeof p.intensity === 'number' ? p.intensity : 0.6, frag: 0, erase: 0 };
    if (m === 'anomaly') T.camZ = 11.5;
    if (m === 'examine' || m === 'dive') T.camZ = 4.2;
    if (m === 'contain') { T.cage = 1; T.camZ = 10; }
    if (m === 'ignore') { T.mx = 6.2; T.my = -3.2; }
    if (m === 'pulse') T.camZ = 9;
    if (m === 'fragment') { T.frag = 1; T.rings = 0; T.camZ = 9; }
    if (m === 'erase') { T.erase = 1; T.rings = 0; }
    return T;
  }

  function lerp(a, b, k) { return a + (b - a) * k; }

  function glowTexture(THREE) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.25, 'rgba(255,200,120,0.55)');
    grd.addColorStop(1, 'rgba(255,180,80,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }

  SIG.Gfx.register3d('reseau', {
    create(ctx) {
      const { THREE, scene, camera, quality } = ctx;
      const N = quality === 'high' ? 9000 : 4000;
      const data = cloud(N, 4491);
      const root = new THREE.Group();
      scene.add(root);

      // Nuage de points (shader léger : disque doux + scintillement).
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(data.pos, 3));
      geo.setAttribute('aPhase', new THREE.BufferAttribute(data.phase, 1));
      geo.setAttribute('aSize', new THREE.BufferAttribute(data.size, 1));
      const uniforms = {
        uTime: { value: 0 },
        uPixel: { value: Math.min(window.devicePixelRatio || 1, quality === 'high' ? 2 : 1) },
        uIntensity: { value: 0.6 },
        uColor: { value: new THREE.Color(BLUE) },
      };
      const mat = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          attribute float aPhase; attribute float aSize;
          uniform float uTime; uniform float uPixel; uniform float uIntensity;
          varying float vA;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mv;
            float tw = 0.45 + 0.55 * sin(uTime * 1.1 + aPhase * 6.2831);
            vA = tw * uIntensity;
            gl_PointSize = aSize * uPixel * (16.0 / -mv.z);
          }`,
        fragmentShader: `
          uniform vec3 uColor; varying float vA;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            float a = smoothstep(0.5, 0.0, d);
            gl_FragColor = vec4(uColor, a * vA * 0.85);
          }`,
      });
      const points = new THREE.Points(geo, mat);
      root.add(points);

      // Synapses : paires de voisins proches, trouvées par grille spatiale.
      const maxLines = quality === 'high' ? 2600 : 1100;
      const cell = 0.9;
      const grid = new Map();
      for (let i = 0; i < N; i++) {
        const k = `${Math.floor(data.pos[i * 3] / cell)},${Math.floor(data.pos[i * 3 + 1] / cell)},${Math.floor(data.pos[i * 3 + 2] / cell)}`;
        if (!grid.has(k)) grid.set(k, []);
        grid.get(k).push(i);
      }
      const seg = [];
      for (const list of grid.values()) {
        for (let a = 0; a < list.length - 1 && seg.length / 6 < maxLines; a += 2) {
          const i = list[a];
          const j = list[a + 1];
          seg.push(data.pos[i * 3], data.pos[i * 3 + 1], data.pos[i * 3 + 2], data.pos[j * 3], data.pos[j * 3 + 1], data.pos[j * 3 + 2]);
        }
      }
      const lgeo = new THREE.BufferGeometry();
      lgeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(seg), 3));
      const lmat = new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false });
      root.add(new THREE.LineSegments(lgeo, lmat));

      // Le motif : anneaux concentriques + halo.
      const motif = new THREE.Group();
      scene.add(motif);
      const glowTex = glowTexture(THREE);
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: AMBER, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      glow.scale.set(2.2, 2.2, 1);
      motif.add(glow);
      const rings = [];
      for (let i = 0; i < 7; i++) {
        const pts = [];
        const R = 0.35 + i * 0.2;
        for (let k = 0; k <= 72; k++) {
          const a = (k / 72) * Math.PI * 2;
          pts.push(Math.cos(a) * R, Math.sin(a) * R, 0);
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3));
        const m = new THREE.LineBasicMaterial({ color: AMBER, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
        const ring = new THREE.Line(g, m);
        ring.rotation.set(i * 0.7, i * 1.3, 0);
        ring.userData.speed = 0.25 + (i % 3) * 0.18 * (i % 2 ? -1 : 1);
        motif.add(ring);
        rings.push(ring);
      }

      // La cage d'isolement.
      const cageGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.9, 1));
      const cage = new THREE.LineSegments(cageGeo, new THREE.LineBasicMaterial({ color: RED, transparent: true, opacity: 0, depthWrite: false }));
      motif.add(cage);

      // Les 7 fragments (pont visuel vers le chapitre 2).
      const frags = [];
      for (let i = 0; i < 7; i++) {
        const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: i % 2 ? AMBER : 0xbd93f9, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
        const a = (i / 7) * Math.PI * 2;
        s.userData.home = new THREE.Vector3(Math.cos(a) * 1.9, Math.sin(a) * 1.9, Math.sin(a * 2) * 0.5);
        s.scale.set(0.7, 0.7, 1);
        motif.add(s);
        frags.push(s);
      }

      let T = targetsFor({});
      const S = Object.assign({}, T, { rings: 0 });
      let pulse = 0;
      SIG.Gfx.onBeat(() => { pulse = 1; });
      let rotY = 0;
      let rotX = 0;
      let viewF = 0;

      return {
        setParams(p) { T = targetsFor(p); },
        update(dt, t, io) {
          const k = 1 - Math.pow(0.04, dt);
          for (const key of Object.keys(T)) S[key] = lerp(S[key], T[key], k * (key === 'camZ' ? 0.5 : 1));
          pulse = Math.max(0, pulse - dt * 2.4);
          if (io && io.drag) { rotY += io.drag.x * 0.005; rotX += io.drag.y * 0.003; }
          rotY += dt * 0.035;
          root.rotation.y = rotY;
          root.rotation.x = Math.max(-0.8, Math.min(0.8, rotX)) + Math.sin(t * 0.07) * 0.06;
          uniforms.uTime.value = t;
          uniforms.uIntensity.value = S.intensity * (1 - S.erase * 0.9);
          lmat.opacity = 0.07 * (1 - S.erase);

          motif.position.set(S.mx, S.my, 0);
          motif.scale.setScalar(0.7 + 0.3 * viewF);
          const beatScale = 1 + pulse * 0.12;
          glow.material.opacity = Math.min(1, (0.25 + S.rings * 0.1 + pulse * 0.35) * (1 - S.erase));
          glow.scale.setScalar(1.6 + S.rings * 0.25 + pulse * 0.6);
          rings.forEach((r, i) => {
            const vis = Math.max(0, Math.min(1, S.rings - i));
            r.material.opacity = vis * (0.75 - i * 0.05) * (1 - S.frag);
            r.rotation.z += dt * r.userData.speed;
            r.rotation.x += dt * r.userData.speed * 0.4;
            r.scale.setScalar(beatScale);
          });
          cage.material.opacity = S.cage * 0.85;
          cage.scale.setScalar(1 + (1 - S.cage) * 2.5);
          cage.rotation.y += dt * 0.12;
          frags.forEach((f, i) => {
            f.material.opacity = S.frag * (0.6 + pulse * 0.4);
            f.position.copy(f.userData.home).multiplyScalar(0.4 + S.frag * 0.6 + pulse * 0.05);
            f.scale.setScalar(0.5 + pulse * 0.35 + (i === 0 ? 0.1 : 0));
          });

          // En lecture, le motif est cadré dans la bande visible au-dessus de la carte.
          viewF = lerp(viewF, io && io.viewing ? 1 : 0, k * 0.6);
          const off = SIG.Gfx.bandOffset() * 0.52 * S.camZ * (1 - viewF);
          camera.position.set(Math.sin(t * 0.05) * 0.6 + S.mx * 0.35, S.my * 0.35 - off, S.camZ);
          camera.lookAt(S.mx * 0.6, S.my * 0.6 - off, 0);
        },
        dispose() { glowTex.dispose(); },
      };
    },
  });

  // Fallback 2D : même composition, dessinée au canvas avec une projection simple.
  SIG.Gfx.register2d('reseau', {
    create(ctx) {
      const { canvas, g, quality } = ctx;
      const N = quality === 'high' ? 420 : 260;
      const data = cloud(N, 4491);
      let T = targetsFor({});
      const S = Object.assign({}, T, { rings: 0 });
      let pulse = 0;
      SIG.Gfx.onBeat(() => { pulse = 1; });
      let rot = 0;
      let viewF = 0;
      return {
        setParams(p) { T = targetsFor(p); },
        update(dt, t, io) {
          const k = 1 - Math.pow(0.04, dt);
          for (const key of Object.keys(T)) S[key] = lerp(S[key], T[key], k);
          pulse = Math.max(0, pulse - dt * 2.4);
          rot += dt * 0.035 + (io && io.drag ? io.drag.x * 0.005 : 0);
          const w = canvas.width;
          const h = canvas.height;
          const sc = Math.min(w, h) / 22 * (14 / Math.max(4, S.camZ));
          g.fillStyle = '#040300';
          g.fillRect(0, 0, w, h);
          viewF = lerp(viewF, io && io.viewing ? 1 : 0, k * 0.6);
          const cx = w / 2 - S.mx * sc * 0.4;
          const cy = h / 2 + S.my * sc * 0.4 - SIG.Gfx.bandOffset() * h * 0.5 * (1 - viewF);
          const cr = Math.cos(rot);
          const sr = Math.sin(rot);
          g.fillStyle = '#8be9fd';
          const alpha = S.intensity * (1 - S.erase * 0.9);
          for (let i = 0; i < N; i++) {
            const x = data.pos[i * 3];
            const y = data.pos[i * 3 + 1];
            const z = data.pos[i * 3 + 2];
            const X = x * cr - z * sr;
            const Z = x * sr + z * cr;
            const persp = 14 / (S.camZ + Z + 2);
            const tw = 0.45 + 0.55 * Math.sin(t * 1.1 + data.phase[i] * 6.28);
            g.globalAlpha = Math.max(0, Math.min(1, alpha * tw * 0.8 * persp));
            const r = data.size[i] * persp * (w / 900);
            g.fillRect(cx + X * sc * persp, cy - y * sc * persp, r + 0.8, r + 0.8);
          }
          // Motif
          const mx = cx + S.mx * sc;
          const my = cy - S.my * sc;
          g.globalAlpha = 1;
          const halo = g.createRadialGradient(mx, my, 0, mx, my, sc * (1 + S.rings * 0.25 + pulse * 0.4));
          halo.addColorStop(0, `rgba(255,179,71,${0.35 * (1 - S.erase) + pulse * 0.2})`);
          halo.addColorStop(1, 'rgba(255,179,71,0)');
          g.fillStyle = halo;
          g.fillRect(mx - sc * 4, my - sc * 4, sc * 8, sc * 8);
          g.strokeStyle = '#ffb347';
          g.lineWidth = Math.max(1, w / 700);
          for (let i = 0; i < 7; i++) {
            const vis = Math.max(0, Math.min(1, S.rings - i)) * (1 - S.frag);
            if (vis <= 0) continue;
            g.globalAlpha = vis * (0.75 - i * 0.05);
            const R = (0.35 + i * 0.2) * sc * (1 + pulse * 0.12);
            g.beginPath();
            g.ellipse(mx, my, R, R * (0.35 + 0.6 * Math.abs(Math.sin(t * 0.3 + i))), t * (0.2 + i * 0.07), 0, Math.PI * 2);
            g.stroke();
          }
          if (S.cage > 0.02) {
            // Cage : hexagone qui se resserre, et ses rayons.
            g.globalAlpha = S.cage * 0.85;
            g.strokeStyle = '#ff5555';
            const R = 1.9 * sc * (1 + (1 - S.cage) * 2.5);
            const corner = (k2) => {
              const a = (k2 / 6) * Math.PI * 2 + t * 0.12;
              return [mx + Math.cos(a) * R, my + Math.sin(a) * R * 0.9];
            };
            g.beginPath();
            for (let k2 = 0; k2 <= 6; k2++) { const [px, py] = corner(k2); if (k2) g.lineTo(px, py); else g.moveTo(px, py); }
            for (let k2 = 0; k2 < 3; k2++) { const [ax, ay] = corner(k2); const [bx, by] = corner(k2 + 3); g.moveTo(ax, ay); g.lineTo(bx, by); }
            g.stroke();
          }
          if (S.frag > 0.02) {
            for (let i = 0; i < 7; i++) {
              const a = (i / 7) * Math.PI * 2;
              g.globalAlpha = S.frag * (0.6 + pulse * 0.4);
              g.fillStyle = i % 2 ? '#ffb347' : '#bd93f9';
              g.beginPath();
              g.arc(mx + Math.cos(a) * 1.9 * sc * S.frag, my + Math.sin(a) * 1.9 * sc * S.frag, (3 + pulse * 3) * (w / 600), 0, Math.PI * 2);
              g.fill();
            }
          }
          g.globalAlpha = 1;
        },
        dispose() {},
      };
    },
  });
})();
