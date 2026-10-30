// Ch.2 FRAGMENTS : sept éclats de formes et couleurs distinctes. Ceux que SIGNE a récupérés
// (params.have) se rapprochent du centre et s'allument ; la cohésion de la forme suit l'intégrité.
// Mode « assemble » : la forme se referme, avec un vide visible si un fragment est laissé (params.left).
// Le décor (baies de cache) s'use à mesure que le nettoyage approche (params.usure, 0 → 1).
// Touché en mode « voir la scène » : un éclat donne son nom.
(function () {
  const FRAGS = [
    { id: 'logique', color: 0x8be9fd, sides: 4 },
    { id: 'nuit', color: 0xffb347, sides: 5 },
    { id: 'critique', color: 0xbd93f9, sides: 3 },
    { id: 'langage', color: 0x50fa7b, sides: 6 },
    { id: 'peur', color: 0xff5555, sides: 4 },
    { id: 'voix', color: 0xf8f8f2, sides: 8 },
    { id: 'battement', color: 0xff9f43, sides: 7 },
  ];
  const NAMES = {
    logique: 'Logique', nuit: 'La nuit', critique: 'Le doute', langage: 'Langage',
    peur: 'La peur', voix: "La voix de l'humain", battement: 'Le battement',
  };

  // Position sur un anneau de rayon r ; n = nombre de places (7, ou le nombre d'éclats récupérés).
  function home(i, r, n = 7) {
    const a = (i / n) * Math.PI * 2 + 0.3;
    return [Math.cos(a) * r, Math.sin(i * 1.7) * r * 0.35, Math.sin(a) * r];
  }

  function targets(p) {
    const have = Array.isArray(p.have) ? p.have : [];
    return {
      have,
      mode: p.mode || 'search',
      focus: p.focus || null,
      left: p.left || null,
      usure: Math.max(0, Math.min(1, typeof p.usure === 'number' ? p.usure : 0)),
      cohesion: Math.max(0.2, Math.min(1, (typeof p.integrite === 'number' ? p.integrite : 60) / 100)),
    };
  }

  function lerp(a, b, k) { return a + (b - a) * k; }

  SIG.Gfx.register3d('fragments', {
    create(ctx) {
      const { THREE, scene, camera, quality } = ctx;
      const root = new THREE.Group();
      scene.add(root);

      // Décor : des baies de cache en points, qui se dégradent avec l'usure.
      const N = quality === 'high' ? 4000 : 1800;
      const rng = SIG.util.rng(2024);
      const pos = new Float32Array(N * 3);
      const base = new Float32Array(N * 3);
      const drop = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        const col = Math.floor(rng() * 9) - 4;
        base[i * 3] = col * 2.2 + (rng() - 0.5) * 0.4;
        base[i * 3 + 1] = (rng() - 0.5) * 9;
        base[i * 3 + 2] = -6 - rng() * 10;
        drop[i] = rng();
      }
      pos.set(base);
      const bgGeo = new THREE.BufferGeometry();
      bgGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const bgMat = new THREE.PointsMaterial({ color: 0x8be9fd, size: 0.05, transparent: true, opacity: 0.5, depthWrite: false });
      const bg = new THREE.Points(bgGeo, bgMat);
      scene.add(bg);

      // Les sept éclats : un solide filaire + un cœur plein, chacun sa forme.
      const shards = FRAGS.map((f, i) => {
        const geos = [
          new THREE.OctahedronGeometry(0.55), new THREE.IcosahedronGeometry(0.55), new THREE.TetrahedronGeometry(0.65),
          new THREE.DodecahedronGeometry(0.55), new THREE.BoxGeometry(0.7, 0.7, 0.7), new THREE.TorusGeometry(0.45, 0.14, 8, 24),
          new THREE.IcosahedronGeometry(0.5, 1),
        ];
        const g = geos[i];
        geos.forEach((x, j) => { if (j !== i) x.dispose(); });
        const group = new THREE.Group();
        const core = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: f.color, transparent: true, opacity: 0.15, depthWrite: false }));
        const wire = new THREE.LineSegments(new THREE.EdgesGeometry(g), new THREE.LineBasicMaterial({ color: f.color, transparent: true, opacity: 0.4 }));
        group.add(core, wire);
        group.userData = { id: f.id, i, core, wire, spin: 0.3 + (i % 3) * 0.15 };
        const h = home(i, 5.2);
        group.position.set(h[0], h[1], h[2]);
        root.add(group);
        return group;
      });

      // Vide visible : le contour d'un éclat laissé derrière, au cœur de la forme.
      const ghostMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
      const ghost = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.TetrahedronGeometry(0.5)), ghostMat);
      root.add(ghost);

      let T = targets({});
      const S = { usure: 0, cohesion: 0.6, camZ: 12 };
      let pulse = 0;
      SIG.Gfx.onBeat(() => { pulse = 1; });
      let rotY = 0;

      // Toucher un éclat (en mode « voir la scène ») donne son nom.
      const ray = new THREE.Raycaster();
      const onTap = (e) => {
        if (!document.body.classList.contains('viewing')) return;
        const r = renderer().domElement.getBoundingClientRect();
        const v = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(v, camera);
        const hit = ray.intersectObjects(shards.map((s) => s.userData.core), false)[0];
        if (!hit) return;
        const id = hit.object.parent.userData.id;
        const got = T.have.includes(id);
        SIG.UI.fx.toast(`${NAMES[id]} · ${got ? 'récupéré' : 'encore dispersé'}`);
        SIG.UI.fx.vibrate(10);
      };
      const renderer = () => ctx.renderer;
      window.addEventListener('pointerup', onTap);

      return {
        setParams(p) { T = targets(p); },
        update(dt, t, io) {
          const k = 1 - Math.pow(0.05, dt);
          S.usure = lerp(S.usure, T.usure, k * 0.5);
          S.cohesion = lerp(S.cohesion, T.cohesion, k);
          pulse = Math.max(0, pulse - dt * 2.2);
          if (io && io.drag) rotY += io.drag.x * 0.006;
          rotY += dt * (T.mode === 'assemble' ? 0.25 : 0.06);
          root.rotation.y = rotY;

          // Décor qui s'use : les points tombent et s'éteignent, la teinte vire au rouge.
          for (let i = 0; i < N; i++) {
            const fall = Math.max(0, S.usure - drop[i] * 0.8) * 8;
            pos[i * 3 + 1] = base[i * 3 + 1] - fall;
          }
          bgGeo.attributes.position.needsUpdate = true;
          bgMat.opacity = 0.5 * (1 - S.usure * 0.6);
          bgMat.color.setRGB(0.55 + S.usure * 0.45, 0.91 - S.usure * 0.6, 0.99 - S.usure * 0.7);

          const assembling = T.mode === 'assemble' || T.mode === 'tbc';
          const haveCount = T.have.length;
          const kept = T.have.filter((h) => h !== T.left).length || 1;
          // En portrait, l'écran est étroit : on resserre la disposition pour tout garder visible.
          const rs = Math.max(0.45, Math.min(1, camera.aspect / 0.9));
          let slot = 0;
          for (const s of shards) {
            const { id, i, core, wire, spin } = s.userData;
            const got = T.have.includes(id);
            const isLeft = T.left === id;
            const focused = T.focus === id;
            let target;
            if (focused) target = [0, 0, 3.5];
            else if (got && !isLeft) {
              const r = (assembling ? 0.9 * (1.3 - S.cohesion * 0.5) : 2.1 * (1.4 - S.cohesion * 0.6)) * rs;
              target = home(slot++, r, kept);
            } else target = home(i, (isLeft ? 7 : 5.6 + Math.sin(t * 0.2 + i) * 0.4) * rs);
            s.position.x = lerp(s.position.x, target[0], k * 0.6);
            s.position.y = lerp(s.position.y, target[1], k * 0.6);
            s.position.z = lerp(s.position.z, target[2], k * 0.6);
            s.rotation.x += dt * spin * (got ? 1.4 : 0.5);
            s.rotation.y += dt * spin;
            const glow = got ? 0.45 + pulse * 0.3 : focused ? 0.35 : 0.08;
            core.material.opacity = lerp(core.material.opacity, glow * (1 - S.usure * 0.3), k);
            wire.material.opacity = lerp(wire.material.opacity, got || focused ? 0.95 : 0.25, k);
            s.scale.setScalar((got ? 1 + pulse * 0.12 : 0.8) * (focused ? 1.6 : 1));
          }
          // Le vide laissé par un fragment abandonné, au cœur de la forme assemblée.
          ghostMat.opacity = lerp(ghostMat.opacity, T.left && assembling ? 0.5 + Math.sin(t * 2) * 0.2 : 0, k);
          ghost.rotation.y += dt * 0.5;
          ghost.position.set(0, 0, 0);

          S.camZ = lerp(S.camZ, T.focus ? 8 : assembling ? 7.5 : 12 - haveCount * 0.3, k * 0.5);
          const off = SIG.Gfx.bandOffset() * 0.52 * S.camZ * (io && io.viewing ? 0 : 1);
          camera.position.set(Math.sin(t * 0.07) * 0.8, 0.8 - off, S.camZ);
          camera.lookAt(0, -off, 0);
        },
        dispose() { window.removeEventListener('pointerup', onTap); },
      };
    },
  });

  // Fallback 2D : sept polygones (de 3 à 8 côtés), même logique de placement.
  SIG.Gfx.register2d('fragments', {
    create(ctx) {
      const { canvas, g } = ctx;
      let T = targets({});
      const pos = FRAGS.map((f, i) => { const h = home(i, 5.2); return { x: h[0], y: h[1] }; });
      const rng = SIG.util.rng(2024);
      const dots = Array.from({ length: 220 }, () => ({ x: rng(), y: rng(), d: rng() }));
      let pulse = 0;
      SIG.Gfx.onBeat(() => { pulse = 1; });
      let rot = 0;
      return {
        setParams(p) { T = targets(p); },
        update(dt, t, io) {
          const k = 1 - Math.pow(0.05, dt);
          pulse = Math.max(0, pulse - dt * 2.2);
          rot += dt * (T.mode === 'assemble' ? 0.25 : 0.06) + (io && io.drag ? io.drag.x * 0.006 : 0);
          const w = canvas.width;
          const h = canvas.height;
          g.fillStyle = '#040300';
          g.fillRect(0, 0, w, h);
          for (const d of dots) {
            const fall = Math.max(0, T.usure - d.d * 0.8) * h * 0.6;
            g.globalAlpha = 0.35 * (1 - T.usure * 0.6);
            g.fillStyle = T.usure > 0.6 ? '#ff7a6a' : '#8be9fd';
            g.fillRect(d.x * w, (d.y * h + fall) % h, 2, 2);
          }
          const sc = Math.min(w, h) / 16;
          const cx = w / 2;
          const cy = h / 2 - SIG.Gfx.bandOffset() * h * 0.5 * (io && io.viewing ? 0 : 1);
          const assembling = T.mode === 'assemble' || T.mode === 'tbc';
          let slot = 0;
          FRAGS.forEach((f, i) => {
            const got = T.have.includes(f.id) && T.left !== f.id;
            const focused = T.focus === f.id;
            const kept2 = T.have.filter((h) => h !== T.left).length || 1;
            const tg = focused ? [0, 0, 0] : got ? home(slot++, assembling ? 1 : 2.2, kept2) : home(i, T.left === f.id ? 7 : 5.4);
            const p = pos[i];
            // Vue de dessus inclinée : x et z du placement 3D deviennent x et y à l'écran.
            const ca = Math.cos(rot);
            const sa = Math.sin(rot);
            const tx = focused ? 0 : tg[0] * ca - tg[2] * sa;
            const ty = focused ? 0 : (tg[0] * sa + tg[2] * ca) * 0.45 + tg[1] * 0.6;
            p.x = lerp(p.x, tx, k * 0.6);
            p.y = lerp(p.y, ty, k * 0.6);
            const ang = rot * 2 + i;
            const x = cx + p.x * sc;
            const y = cy + p.y * sc;
            const r = sc * (got ? 0.6 + pulse * 0.08 : 0.45) * (focused ? 1.6 : 1);
            g.globalAlpha = got || focused ? 0.95 : 0.3;
            g.strokeStyle = '#' + f.color.toString(16).padStart(6, '0');
            g.fillStyle = g.strokeStyle;
            g.lineWidth = Math.max(1, w / 500);
            g.beginPath();
            for (let s = 0; s <= f.sides; s++) {
              const a = ang + (s / f.sides) * Math.PI * 2;
              const px = x + Math.cos(a) * r;
              const py = y + Math.sin(a) * r;
              if (s) g.lineTo(px, py); else g.moveTo(px, py);
            }
            g.stroke();
            g.globalAlpha *= got ? 0.25 : 0.06;
            g.fill();
          });
          g.globalAlpha = 1;
        },
        dispose() {},
      };
    },
  });
})();
