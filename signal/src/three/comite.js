// Ch.4 PROTOCOLE : la salle du comité en 3D minimale. Six sièges = six nœuds lumineux dont
// l'intensité suit l'opinion de chaque membre (params.ops, 0 → 100) ; SIGNE est un point au centre.
// Mode « vote » : les nœuds s'allument (pour) ou s'éteignent (contre) un par un.
(function () {
  const MEMBERS = ['orin', 'kessler', 'varga', 'marchetti', 'sato', 'benali'];

  function targets(p) {
    const ops = MEMBERS.map((m) => {
      const v = p['op_' + m];
      return typeof v === 'number' ? Math.max(0, Math.min(100, v)) : 50;
    });
    return { ops, mode: p.mode || 'audience', focus: p.focus || null, seuil: p.seuil || 55 };
  }

  function seat(i, r) {
    const a = Math.PI * (0.15 + (i / 5) * 0.7);
    return [Math.cos(a) * r, 0.6, -Math.sin(a) * r * 0.75];
  }

  SIG.Gfx.register3d('comite', {
    create(ctx) {
      const { THREE, scene, camera } = ctx;
      const tex = (() => {
        const c = document.createElement('canvas'); c.width = c.height = 64;
        const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,0.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
      })();
      // Table en arc : une ligne courbe.
      const arc = [];
      for (let k = 0; k <= 40; k++) { const a = Math.PI * (0.1 + (k / 40) * 0.8); arc.push(Math.cos(a) * 4.2, 0, -Math.sin(a) * 3.15); }
      const table = new THREE.Line(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(arc), 3)), new THREE.LineBasicMaterial({ color: 0x5a4a2a }));
      scene.add(table);
      const nodes = MEMBERS.map((m, i) => {
        const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: 0xffb347, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
        const p = seat(i, 3.6);
        s.position.set(p[0], p[1], p[2]);
        scene.add(s);
        const ring = new THREE.Mesh(new THREE.RingGeometry(0.28, 0.31, 32), new THREE.MeshBasicMaterial({ color: 0xffb347, transparent: true, opacity: 0.4, side: THREE.DoubleSide }));
        ring.position.set(p[0], 0.02, p[2]); ring.rotation.x = -Math.PI / 2;
        scene.add(ring);
        return { s, ring, cur: 0.5, lit: null };
      });
      const signe = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: 0xbd93f9, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      signe.position.set(0, 0.5, 0.6);
      scene.add(signe);
      // Poussière discrète.
      const n = 600; const pos = new Float32Array(n * 3); const r = SIG.util.rng(18);
      for (let i = 0; i < n * 3; i++) pos[i] = (r() - 0.5) * 14;
      scene.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)), new THREE.PointsMaterial({ color: 0x8be9fd, size: 0.03, transparent: true, opacity: 0.3 })));

      let T = targets({});
      let voteT = 0;
      let pulse = 0;
      SIG.Gfx.onBeat(() => { pulse = 1; });
      return {
        setParams(p) { const prev = T.mode; T = targets(p); if (T.mode === 'vote' && prev !== 'vote') voteT = 0; },
        update(dt, t, io) {
          const k = 1 - Math.pow(0.05, dt);
          pulse = Math.max(0, pulse - dt * 2);
          voteT += dt;
          nodes.forEach((nd, i) => {
            const v = T.ops[i] / 100;
            nd.cur += (v - nd.cur) * k;
            let bright = 0.25 + nd.cur * 0.9;
            let color = new THREE.Color().setHSL(0.08 + nd.cur * 0.05, 0.9, 0.45 + nd.cur * 0.2);
            if (T.mode === 'vote') {
              // Révélation un par un, toutes les 1,4 s.
              if (voteT > 1 + i * 1.4) {
                const pour = T.ops[i] >= T.seuil;
                bright = pour ? 1.3 : 0.08;
                color = pour ? new THREE.Color(0x50fa7b) : new THREE.Color(0x553333);
              } else bright = 0.35;
            }
            nd.s.material.color.copy(color);
            nd.s.material.opacity = Math.min(1, bright);
            nd.s.scale.setScalar(0.6 + bright * 0.7 + (T.focus === MEMBERS[i] ? 0.4 + Math.sin(t * 3) * 0.1 : 0));
            nd.ring.material.color.copy(color);
            nd.ring.material.opacity = 0.2 + bright * 0.3;
          });
          signe.scale.setScalar(0.7 + pulse * 0.35);
          const drag = io && io.drag ? io.drag.x * 0.003 : 0;
          const off = SIG.Gfx.bandOffset() * 0.52 * 7 * (io && io.viewing ? 0 : 1);
          camera.position.set(Math.sin(t * 0.05) * 0.6 + drag, 2.4 - off * 0.4, 5.4);
          camera.lookAt(0, 0.4 - off * 0.6, -1.2);
        },
        dispose() { tex.dispose(); },
      };
    },
  });

  SIG.Gfx.register2d('comite', {
    create(ctx) {
      const { canvas, g } = ctx;
      let T = targets({});
      let voteT = 0;
      return {
        setParams(p) { const prev = T.mode; T = targets(p); if (T.mode === 'vote' && prev !== 'vote') voteT = 0; },
        update(dt) {
          voteT += dt;
          const w = canvas.width; const h = canvas.height;
          g.fillStyle = '#040300'; g.fillRect(0, 0, w, h);
          const cx = w / 2; const cy = h * 0.42;
          const R = Math.min(w, h) * 0.32;
          g.strokeStyle = '#5a4a2a'; g.lineWidth = Math.max(1, w / 500);
          g.beginPath(); g.arc(cx, cy + R * 0.2, R, Math.PI * 1.1, Math.PI * 1.9); g.stroke();
          T.ops.forEach((v, i) => {
            const a = Math.PI * (1.15 + (i / 5) * 0.7);
            const x = cx + Math.cos(a) * R; const y = cy + R * 0.2 + Math.sin(a) * R;
            let col = `rgba(255,179,71,${0.25 + v / 120})`;
            if (T.mode === 'vote' && voteT > 1 + i * 1.4) col = v >= T.seuil ? '#50fa7b' : '#442222';
            g.fillStyle = col;
            g.beginPath(); g.arc(x, y, R * (0.06 + v / 1500), 0, Math.PI * 2); g.fill();
          });
          g.fillStyle = '#bd93f9';
          g.beginPath(); g.arc(cx, cy + R * 0.45, R * 0.05, 0, Math.PI * 2); g.fill();
        },
        dispose() {},
      };
    },
  });
})();
