// Preset « neutre » (interludes, chapitres dont la scène 3D n'est pas encore construite),
// en 3D comme en 2D : une poussière lente, presque rien. Sert aussi de repli si un preset manque.
(function () {
  SIG.Gfx.register3d('neutre', {
    create(ctx) {
      const { THREE, scene } = ctx;
      const n = 1200;
      const r = SIG.util.rng(7);
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n * 3; i++) pos[i] = (r() - 0.5) * 30;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color: 0xffb347, size: 0.06, transparent: true, opacity: 0.35, depthWrite: false });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      return {
        setParams() {},
        update(dt) { pts.rotation.y += dt * 0.01; pts.rotation.x += dt * 0.004; },
        dispose() {},
      };
    },
  });

  SIG.Gfx.register2d('neutre', {
    create(ctx) {
      const { canvas, g } = ctx;
      const r = SIG.util.rng(7);
      const dots = Array.from({ length: 140 }, () => ({ x: r(), y: r(), s: r() }));
      return {
        setParams() {},
        update(dt, t) {
          const w = canvas.width;
          const h = canvas.height;
          g.fillStyle = '#040300';
          g.fillRect(0, 0, w, h);
          g.fillStyle = '#ffb347';
          for (const d of dots) {
            g.globalAlpha = 0.15 + 0.2 * Math.sin(t * 0.5 + d.s * 6);
            g.fillRect(((d.x + t * 0.002 * d.s) % 1) * w, d.y * h, 1.5, 1.5);
          }
          g.globalAlpha = 1;
        },
        dispose() {},
      };
    },
  });
})();
