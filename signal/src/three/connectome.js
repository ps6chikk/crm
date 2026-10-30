// TON CONNECTOME : la partie du joueur rendue en 3D, comme la mouche cartographiée.
// Scènes visitées = nœuds (une couleur par chapitre), choix = synapses (le chemin parcouru),
// fins découvertes = nœuds qui brillent sur un anneau extérieur. Se fait tourner au doigt.
(function () {
  const CH_COL = { ch1: 0x8be9fd, ch2: 0xbd93f9, ch3: 0xffb347, ch4: 0xf8f0dc, ch5: 0x50fa7b, int1: 0xf0c674, int2: 0x50fa7b, int3: 0x8be9fd, fins: 0xffd27a };
  const CH_Y = { ch1: -3, int1: -1.9, ch2: -1.5, ch3: 0, int2: 0.9, ch4: 1.5, int3: 2.2, ch5: 3, fins: 3.8 };

  // Disposition : une hélice par chapitre, chaque scène à sa place dans l'ordre de visite.
  function layout(params) {
    const scenes = SIG.data.scenes;
    const path = (params.path || []).filter((id) => scenes[id]);
    const order = [];
    const seen = new Set();
    for (const id of path) if (!seen.has(id)) { seen.add(id); order.push(id); }
    const byCh = {};
    for (const id of order) (byCh[scenes[id].ch] = byCh[scenes[id].ch] || []).push(id);
    const pos = {};
    for (const [ch, ids] of Object.entries(byCh)) {
      ids.forEach((id, i) => {
        const a = (i / Math.max(1, ids.length)) * Math.PI * 2 * 1.6 + (CH_Y[ch] || 0);
        const r = 2.2 + Math.sin(i * 0.7) * 0.5;
        pos[id] = [Math.cos(a) * r, (CH_Y[ch] || 0) + Math.sin(i * 1.3) * 0.35, Math.sin(a) * r];
      });
    }
    const visits = {};
    for (const id of path) visits[id] = (visits[id] || 0) + 1;
    return { order, pos, path, visits };
  }

  SIG.Gfx.register3d('connectome', {
    create(ctx) {
      const { THREE, scene, camera } = ctx;
      const root = new THREE.Group();
      scene.add(root);
      const tex = (() => {
        const c = document.createElement('canvas'); c.width = c.height = 64;
        const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(255,255,255,0.45)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
      })();
      let built = false;

      function build(params) {
        while (root.children.length) {
          const o = root.children.pop();
          if (o.geometry) o.geometry.dispose();
          if (o.material) o.material.dispose();
        }
        const L = layout(params);
        const scenes = SIG.data.scenes;
        // Nœuds.
        const n = L.order.length;
        const p = new Float32Array(n * 3);
        const c = new Float32Array(n * 3);
        L.order.forEach((id, i) => {
          const q = L.pos[id]; p.set(q, i * 3);
          const col = new THREE.Color(scenes[id].kind === 'fin' ? CH_COL.fins : CH_COL[scenes[id].ch] || 0xffffff);
          c.set([col.r, col.g, col.b], i * 3);
        });
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(p, 3));
        g.setAttribute('color', new THREE.BufferAttribute(c, 3));
        root.add(new THREE.Points(g, new THREE.PointsMaterial({ size: 0.16, vertexColors: true, map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })));
        // Synapses : le chemin suivi, scène après scène.
        const seg = [];
        for (let i = 1; i < L.path.length; i++) {
          const a = L.pos[L.path[i - 1]]; const b = L.pos[L.path[i]];
          if (a && b && a !== b) seg.push(...a, ...b);
        }
        const lg = new THREE.BufferGeometry();
        lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(seg), 3));
        root.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0xffb347, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false })));
        // Les lieux revisités (zones libres, journées) sont plus gros.
        for (const id of L.order) {
          if ((L.visits[id] || 0) < 3) continue;
          const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: CH_COL[scenes[id].ch] || 0xffffff, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }));
          s.position.set(...L.pos[id]);
          s.scale.setScalar(0.3 + Math.min(1.2, L.visits[id] * 0.05));
          root.add(s);
        }
        // Les fins : un anneau extérieur ; découvertes = allumées.
        const fins = Object.values(scenes).filter((s) => s.kind === 'fin');
        const found = params.endings || [];
        fins.forEach((f, i) => {
          const a = (i / fins.length) * Math.PI * 2;
          const got = found.includes(f.fin.id);
          const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: got ? (f.fin.type === 'early' ? 0xff5555 : 0xffd27a) : 0x333333, transparent: true, opacity: got ? 1 : 0.4, blending: THREE.AdditiveBlending, depthWrite: false }));
          s.position.set(Math.cos(a) * 4.6, 4.4, Math.sin(a) * 4.6);
          s.scale.setScalar(got ? 0.7 : 0.35);
          root.add(s);
        });
        built = true;
      }

      let rot = 0;
      return {
        setParams(params) { build(params); },
        update(dt, t, io) {
          if (!built) return;
          rot += dt * 0.12 + (io && io.drag ? io.drag.x * 0.006 : 0);
          root.rotation.y = rot;
          root.rotation.x = Math.sin(t * 0.1) * 0.15 + (io && io.drag ? io.drag.y * 0.002 : 0);
          camera.position.set(0, 1.2, 11);
          camera.lookAt(0, 0.6, 0);
        },
        dispose() { tex.dispose(); },
      };
    },
  });

  SIG.Gfx.register2d('connectome', {
    create(ctx) {
      const { canvas, g } = ctx;
      let L = null; let P = {};
      let rot = 0;
      return {
        setParams(params) { L = layout(params); P = params; },
        update(dt, t, io) {
          rot += dt * 0.12 + (io && io.drag ? io.drag.x * 0.006 : 0);
          const w = canvas.width; const h = canvas.height;
          g.fillStyle = '#040300'; g.fillRect(0, 0, w, h);
          if (!L) return;
          const sc = Math.min(w, h) / 11;
          const proj = (q) => {
            const x = q[0] * Math.cos(rot) - q[2] * Math.sin(rot);
            return [w / 2 + x * sc, h * 0.5 - q[1] * sc];
          };
          g.strokeStyle = 'rgba(255,179,71,0.18)'; g.lineWidth = 1;
          g.beginPath();
          for (let i = 1; i < L.path.length; i++) {
            const a = L.pos[L.path[i - 1]]; const b = L.pos[L.path[i]];
            if (!a || !b) continue;
            const pa = proj(a); const pb = proj(b);
            g.moveTo(pa[0], pa[1]); g.lineTo(pb[0], pb[1]);
          }
          g.stroke();
          for (const id of L.order) {
            const sc2 = SIG.data.scenes[id];
            const q = proj(L.pos[id]);
            g.fillStyle = '#' + (sc2.kind === 'fin' ? CH_COL.fins : CH_COL[sc2.ch] || 0xffffff).toString(16).padStart(6, '0');
            g.beginPath(); g.arc(q[0], q[1], sc2.kind === 'fin' ? 5 : 2.2, 0, Math.PI * 2); g.fill();
          }
          const fins = Object.values(SIG.data.scenes).filter((s) => s.kind === 'fin');
          fins.forEach((f, i) => {
            const got = (P.endings || []).includes(f.fin.id);
            g.fillStyle = got ? (f.fin.type === 'early' ? '#ff5555' : '#ffd27a') : '#333';
            g.beginPath(); g.arc(w / 2 + Math.cos((i / fins.length) * Math.PI * 2 + rot) * sc * 4.4, h * 0.12, got ? 6 : 3, 0, Math.PI * 2); g.fill();
          });
        },
        dispose() {},
      };
    },
  });
})();
