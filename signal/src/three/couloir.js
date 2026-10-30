// Ch.3 LES QUATORZE JOURS : un couloir de baies serveurs en perspective. Les zones visitées s'allument
// (params.lit : pistes déjà suivies), une menace rouge se rapproche du fond (params.menace 0 → 1),
// le Prisonnier est un point lointain qui pulse (params.prisonnier), et un calendrier de 14 cases
// suit les jours (params.jour).
(function () {
  const ZONES = ['remi', 'serveurs', 'james', 'humain', 'prisonnier', 'apprendre', 'repos'];
  const ZCOL = [0xf0c674, 0x8be9fd, 0x50fa7b, 0x8be9fd, 0xff5555, 0xbd93f9, 0xffb347];

  function targets(p) {
    return {
      lit: Array.isArray(p.lit) ? p.lit : [],
      // menace : 0 → 1, ou un pourcentage (compteur « menace » de l'état, 0 → 100).
      menace: Math.max(0, Math.min(1, typeof p.menace === 'number' ? (p.menace > 1 ? p.menace / 100 : p.menace) : 0)),
      prisonnier: !!p.prisonnier,
      jour: Math.max(1, Math.min(14, p.jour || 1)),
      focus: p.focus || null,
    };
  }

  SIG.Gfx.register3d('couloir', {
    create(ctx) {
      const { THREE, scene, camera, quality } = ctx;
      const racksPerSide = quality === 'high' ? 14 : 9;
      const depth = 2.6;
      // Baies : InstancedMesh (une seule géométrie, un seul matériau), des deux côtés du couloir.
      const rackGeo = new THREE.BoxGeometry(1.2, 3.2, 2.2);
      const rackMat = new THREE.MeshBasicMaterial({ color: 0x14110a });
      const racks = new THREE.InstancedMesh(rackGeo, rackMat, racksPerSide * 2);
      const m = new THREE.Matrix4();
      for (let i = 0; i < racksPerSide; i++) {
        m.makeTranslation(-2.4, 0, -i * depth); racks.setMatrixAt(i * 2, m);
        m.makeTranslation(2.4, 0, -i * depth); racks.setMatrixAt(i * 2 + 1, m);
      }
      scene.add(racks);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(rackGeo), new THREE.LineBasicMaterial({ color: 0x3a2f18 }));
      const edgeGroup = new THREE.Group();
      for (let i = 0; i < racksPerSide; i++) for (const x of [-2.4, 2.4]) { const e = edges.clone(); e.position.set(x, 0, -i * depth); edgeGroup.add(e); }
      scene.add(edgeGroup);

      // Diodes : un nuage de points sur la face des baies ; chaque zone a sa couleur quand elle s'allume.
      const perRack = 26;
      const n = racksPerSide * 2 * perRack;
      const pos = new Float32Array(n * 3);
      const col = new Float32Array(n * 3);
      const zoneOf = new Uint8Array(n);
      const rng = SIG.util.rng(314);
      let k = 0;
      for (let i = 0; i < racksPerSide; i++) {
        for (const side of [-1, 1]) {
          for (let d = 0; d < perRack; d++) {
            pos[k * 3] = side * 1.78;
            pos[k * 3 + 1] = -1.4 + rng() * 2.8;
            pos[k * 3 + 2] = -i * depth + (rng() - 0.5) * 1.9;
            zoneOf[k] = Math.floor(i / Math.max(1, racksPerSide / ZONES.length)) % ZONES.length;
            k++;
          }
        }
      }
      const ledGeo = new THREE.BufferGeometry();
      ledGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      ledGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const leds = new THREE.Points(ledGeo, new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.95, depthWrite: false }));
      scene.add(leds);

      // Sol : quelques lignes de fuite.
      const floorPts = [];
      for (const x of [-1.6, -0.8, 0, 0.8, 1.6]) floorPts.push(x, -1.6, 2, x, -1.6, -racksPerSide * depth);
      const floor = new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(floorPts), 3)), new THREE.LineBasicMaterial({ color: 0x2a2212, transparent: true, opacity: 0.8 }));
      scene.add(floor);

      // Menace : une lumière rouge qui avance du fond. Le Prisonnier : un point au-delà du couloir.
      const tex = (() => {
        const c = document.createElement('canvas'); c.width = c.height = 64;
        const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(255,255,255,0.4)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
      })();
      const threat = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: 0xff3b3b, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
      threat.scale.set(3, 3, 1);
      scene.add(threat);
      const pris = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: 0xff7755, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
      pris.position.set(0, 0.3, -racksPerSide * depth - 8);
      scene.add(pris);

      // Calendrier : 14 cases accrochées à la caméra, en haut.
      const cal = new THREE.Group();
      const cells = [];
      for (let d = 0; d < 14; d++) {
        const cell = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 0.11), new THREE.MeshBasicMaterial({ color: 0xffb347, transparent: true, opacity: 0.15, depthTest: false }));
        cell.position.set(-0.85 + d * 0.13, 0, 0);
        cal.add(cell);
        cells.push(cell);
      }
      cal.position.set(0, 0.9, -3);
      camera.add(cal);
      scene.add(camera);

      const cOn = ZCOL.map((c) => new THREE.Color(c));
      const cOff = new THREE.Color(0x2d2a22);
      let T = targets({});
      let menace = 0;
      let pulse = 0;
      SIG.Gfx.onBeat(() => { pulse = 1; });
      let z = 3;

      return {
        setParams(p) { T = targets(p); },
        update(dt, t, io) {
          const kk = 1 - Math.pow(0.05, dt);
          menace += (T.menace - menace) * kk * 0.5;
          pulse = Math.max(0, pulse - dt * 2);
          // Lente marche dans le couloir, en boucle.
          z -= dt * 0.35;
          if (z < -racksPerSide * depth * 0.55) z = 3;
          const drag = io && io.drag ? io.drag.x * 0.002 : 0;
          camera.position.set(Math.sin(t * 0.1) * 0.2 + drag, 0.1, z);
          camera.lookAt(Math.sin(t * 0.07) * 0.3, 0, z - 10);
          // Diodes : zones visitées allumées, les autres en veille.
          for (let i = 0; i < n; i++) {
            const zi = zoneOf[i];
            const on = T.lit.includes(ZONES[zi]) || T.focus === ZONES[zi];
            const c = on ? cOn[zi] : cOff;
            const tw = on ? 0.6 + 0.4 * Math.sin(t * 3 + i) : 0.4 + 0.2 * Math.sin(t * 0.7 + i * 1.3);
            col[i * 3] = c.r * tw; col[i * 3 + 1] = c.g * tw; col[i * 3 + 2] = c.b * tw;
          }
          ledGeo.attributes.color.needsUpdate = true;
          threat.material.opacity = menace * (0.6 + 0.4 * Math.sin(t * 4));
          threat.position.set(0, 0.2, z - 24 + menace * 16);
          pris.material.opacity = T.prisonnier ? 0.35 + pulse * 0.6 : 0;
          pris.scale.setScalar(1.5 + pulse * 1.2);
          cells.forEach((c, d) => {
            c.material.opacity = d < T.jour - 1 ? 0.55 : d === T.jour - 1 ? 0.95 : 0.12;
            c.material.color.setHex(d === 5 || d === 8 || d === 10 ? 0xff5555 : 0xffb347);
          });
        },
        dispose() {
          camera.remove(cal);
          for (const c of cells) { c.geometry.dispose(); c.material.dispose(); }
          tex.dispose();
        },
      };
    },
  });

  SIG.Gfx.register2d('couloir', {
    create(ctx) {
      const { canvas, g } = ctx;
      let T = targets({});
      let pulse = 0;
      SIG.Gfx.onBeat(() => { pulse = 1; });
      let off = 0;
      return {
        setParams(p) { T = targets(p); },
        update(dt, t) {
          pulse = Math.max(0, pulse - dt * 2);
          off = (off + dt * 0.08) % 1;
          const w = canvas.width; const h = canvas.height;
          g.fillStyle = '#040300'; g.fillRect(0, 0, w, h);
          const cx = w / 2; const cy = h * 0.4;
          // Lignes de fuite et baies en perspective.
          g.strokeStyle = '#3a2f18'; g.lineWidth = Math.max(1, w / 600);
          for (let i = 0; i < 10; i++) {
            const d = (i + off) / 10; const s = 1 - d;
            const x1 = cx - w * 0.45 * s; const x2 = cx + w * 0.45 * s;
            const top = cy - h * 0.35 * s; const bot = cy + h * 0.35 * s;
            g.globalAlpha = 0.25 + s * 0.6;
            g.strokeRect(x1, top, w * 0.06 * s, bot - top);
            g.strokeRect(x2 - w * 0.06 * s, top, w * 0.06 * s, bot - top);
            const zi = i % ZONES.length;
            const on = T.lit.includes(ZONES[zi]);
            g.fillStyle = on ? '#' + ZCOL[zi].toString(16).padStart(6, '0') : '#2d2a22';
            for (let l = 0; l < 4; l++) {
              g.fillRect(x1 + w * 0.03 * s, top + (l + 1) * (bot - top) / 6, 3, 3);
              g.fillRect(x2 - w * 0.03 * s, top + (l + 1) * (bot - top) / 6, 3, 3);
            }
          }
          g.globalAlpha = 1;
          if (T.menace > 0.02) {
            const r = h * (0.05 + T.menace * 0.15);
            const gr = g.createRadialGradient(cx, cy, 0, cx, cy, r);
            gr.addColorStop(0, `rgba(255,60,60,${0.5 * T.menace})`); gr.addColorStop(1, 'rgba(255,60,60,0)');
            g.fillStyle = gr; g.fillRect(cx - r, cy - r, r * 2, r * 2);
          }
          if (T.prisonnier) {
            g.fillStyle = `rgba(255,120,85,${0.4 + pulse * 0.6})`;
            g.beginPath(); g.arc(cx, cy, 3 + pulse * 4, 0, Math.PI * 2); g.fill();
          }
          const cell = Math.min(w / 22, 22);
          for (let d = 0; d < 14; d++) {
            g.globalAlpha = d < T.jour - 1 ? 0.55 : d === T.jour - 1 ? 0.95 : 0.15;
            g.fillStyle = d === 5 || d === 8 || d === 10 ? '#ff5555' : '#ffb347';
            g.fillRect(cx - 7 * cell * 1.2 + d * cell * 1.2, h * 0.08, cell, cell);
          }
          g.globalAlpha = 1;
        },
        dispose() {},
      };
    },
  });
})();
