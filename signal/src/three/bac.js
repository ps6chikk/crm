// Ch.5 LES SIX MOIS : un cube (le bac à sable) et un point lumineux. En avril, le point quitte le cube
// vers un ciel étoilé, puis l'e-mail apparaît. L'aspect du cube reflète ce que SIGNE a fait avec
// le Prisonnier (params.cube : 'scelle' en parlé à Rémi, 'porte' prévenu, 'pacte' pacte transmis,
// 'fissure' ignoré, 'neutre' sinon). Modes : 'cube', 'evasion', 'email', 'ciel'.
(function () {
  function targets(p) {
    return { mode: p.mode || 'cube', cube: p.cube || 'neutre', mois: p.mois || 1 };
  }

  SIG.Gfx.register3d('bac', {
    create(ctx) {
      const { THREE, scene, camera, quality } = ctx;
      // Ciel étoilé.
      const n = quality === 'high' ? 3000 : 1400;
      const pos = new Float32Array(n * 3);
      const r = SIG.util.rng(426);
      for (let i = 0; i < n; i++) {
        const th = r() * Math.PI * 2; const ph = Math.acos(2 * r() - 1); const rad = 30 + r() * 30;
        pos[i * 3] = rad * Math.sin(ph) * Math.cos(th); pos[i * 3 + 1] = rad * Math.cos(ph); pos[i * 3 + 2] = rad * Math.sin(ph) * Math.sin(th);
      }
      const starsMat = new THREE.PointsMaterial({ color: 0xf8f0dc, size: 0.12, transparent: true, opacity: 0.2, depthWrite: false });
      scene.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)), starsMat));
      // Le cube.
      const boxGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
      const cubeMat = new THREE.LineBasicMaterial({ color: 0x8be9fd, transparent: true, opacity: 0.8 });
      const cube = new THREE.LineSegments(new THREE.EdgesGeometry(boxGeo), cubeMat);
      scene.add(cube);
      const outerMat = new THREE.LineBasicMaterial({ color: 0xff5555, transparent: true, opacity: 0 });
      const outer = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(3, 3, 3)), outerMat);
      scene.add(outer);
      // Le point.
      const tex = (() => {
        const c = document.createElement('canvas'); c.width = c.height = 64;
        const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(255,255,255,0.4)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
      })();
      const dot = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: 0xff9f43, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      dot.scale.set(0.8, 0.8, 1);
      scene.add(dot);
      // L'e-mail : un rectangle lumineux.
      const mailMat = new THREE.LineBasicMaterial({ color: 0xffb347, transparent: true, opacity: 0 });
      const mailPts = [-0.9, -0.6, 0, 0.9, -0.6, 0, 0.9, -0.6, 0, 0.9, 0.6, 0, 0.9, 0.6, 0, -0.9, 0.6, 0, -0.9, 0.6, 0, -0.9, -0.6, 0, -0.9, 0.6, 0, 0, -0.05, 0, 0, -0.05, 0, 0.9, 0.6, 0];
      const mail = new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(mailPts), 3)), mailMat);
      scene.add(mail);

      let T = targets({});
      let tMode = 0;
      let pulse = 0;
      SIG.Gfx.onBeat(() => { pulse = 1; });
      return {
        setParams(p) { const prev = T.mode; T = targets(p); if (prev !== T.mode) tMode = 0; },
        update(dt, t, io) {
          tMode += dt;
          pulse = Math.max(0, pulse - dt * 2);
          const k = 1 - Math.pow(0.05, dt);
          cube.rotation.y += dt * 0.15; cube.rotation.x = Math.sin(t * 0.1) * 0.2;
          outer.rotation.copy(cube.rotation);
          // Aspect du cube selon le Prisonnier.
          const c = T.cube;
          cubeMat.color.setHex(c === 'pacte' ? 0xffb347 : c === 'fissure' ? 0x6a6a6a : 0x8be9fd);
          cubeMat.opacity = c === 'fissure' ? 0.35 + Math.abs(Math.sin(t * 3)) * 0.2 : 0.8;
          outerMat.opacity += ((c === 'scelle' ? 0.7 : 0) - outerMat.opacity) * k;
          // Le point : dedans, puis dehors, vers les étoiles.
          let target = [0, 0, 0];
          if (T.mode === 'evasion' || T.mode === 'email' || T.mode === 'ciel') {
            const f = Math.min(1, tMode / 6);
            target = [f * 5, f * 3.5, -f * 6];
          }
          dot.position.x += (target[0] - dot.position.x) * k * 0.6;
          dot.position.y += (target[1] - dot.position.y) * k * 0.6;
          dot.position.z += (target[2] - dot.position.z) * k * 0.6;
          dot.material.color.setHex(c === 'pacte' ? 0xffd27a : 0xff9f43);
          dot.scale.setScalar(0.6 + pulse * 0.3 + (T.mode === 'ciel' ? 0.4 : 0));
          starsMat.opacity += ((T.mode === 'cube' ? 0.15 : 0.7) - starsMat.opacity) * k * 0.4;
          mailMat.opacity += ((T.mode === 'email' ? 0.9 : 0) - mailMat.opacity) * k;
          mail.position.set(1.6, 1.2, 1.5);
          mail.rotation.y = Math.sin(t * 0.4) * 0.3;
          const drag = io && io.drag ? io.drag.x * 0.003 : 0;
          const off = SIG.Gfx.bandOffset() * 0.52 * 8 * (io && io.viewing ? 0 : 1);
          camera.position.set(Math.sin(t * 0.06) * 1.5 + drag, 1 - off * 0.5, 8);
          camera.lookAt(T.mode === 'cube' ? 0 : 1.5, (T.mode === 'cube' ? 0 : 1) - off * 0.5, 0);
        },
        dispose() { tex.dispose(); },
      };
    },
  });

  SIG.Gfx.register2d('bac', {
    create(ctx) {
      const { canvas, g } = ctx;
      let T = targets({});
      let tMode = 0;
      const r = SIG.util.rng(426);
      const stars = Array.from({ length: 160 }, () => ({ x: r(), y: r() }));
      return {
        setParams(p) { const prev = T.mode; T = targets(p); if (prev !== T.mode) tMode = 0; },
        update(dt, t) {
          tMode += dt;
          const w = canvas.width; const h = canvas.height;
          g.fillStyle = '#040300'; g.fillRect(0, 0, w, h);
          g.fillStyle = '#f8f0dc';
          g.globalAlpha = T.mode === 'cube' ? 0.15 : 0.6;
          for (const s of stars) g.fillRect(s.x * w, s.y * h, 1.5, 1.5);
          g.globalAlpha = 1;
          const cx = w / 2; const cy = h * 0.42; const S = Math.min(w, h) * 0.12;
          g.strokeStyle = T.cube === 'pacte' ? '#ffb347' : T.cube === 'fissure' ? '#666' : '#8be9fd';
          g.lineWidth = Math.max(1, w / 500);
          g.strokeRect(cx - S, cy - S, S * 2, S * 2);
          g.strokeRect(cx - S * 0.6, cy - S * 1.3, S * 2, S * 2);
          if (T.cube === 'scelle') { g.strokeStyle = '#ff5555'; g.strokeRect(cx - S * 1.3, cy - S * 1.3, S * 2.6, S * 2.6); }
          const f = T.mode === 'cube' ? 0 : Math.min(1, tMode / 6);
          g.fillStyle = '#ff9f43';
          g.beginPath(); g.arc(cx + f * w * 0.3, cy - f * h * 0.25, S * 0.15, 0, Math.PI * 2); g.fill();
          if (T.mode === 'email') { g.strokeStyle = '#ffb347'; g.strokeRect(cx + w * 0.15, cy - h * 0.3, S * 1.6, S); }
        },
        dispose() {},
      };
    },
  });
})();
