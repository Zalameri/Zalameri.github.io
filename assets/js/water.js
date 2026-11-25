/* Living water: animated contour lines (like ripples on a pond seen from
   above). The cursor presses a dimple into the surface; a click or tap drops
   a ripple. Marching squares on a coarse grid keeps it cheap. */
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function Water(canvas, opts) {
    if (!canvas) return;
    const host = canvas.parentElement, ctx = canvas.getContext("2d");
    const CELL = opts.cell || 16, LEVELS = opts.levels || 11;
    let W, H, cols, rows, field, t = Math.random() * 100, run = false, raf = 0;
    const mouse = { x: -9999, y: -9999, s: 0 };
    const drops = [];
    let colors = [];

    function readColors() {
      const cs = getComputedStyle(host);
      const a = cs.getPropertyValue(opts.c1 || "--aqua").trim(), b = cs.getPropertyValue(opts.c2 || "--leaf").trim();
      colors = [a, b];
    }
    function size() {
      const r = host.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / CELL) + 1; rows = Math.ceil(H / CELL) + 1;
      field = new Float32Array(cols * rows);
    }
    function value(x, y) {
      const nx = x / W, ny = y / H;
      let v = Math.sin(nx * 3.1 + t * .35) * .9 + Math.cos(ny * 3.7 - t * .28) * .8
            + Math.sin((nx + ny) * 5.3 + t * .22) * .55 + Math.cos((nx - ny * .6) * 7.4 - t * .41) * .32
            + Math.sin(Math.hypot(nx - .7, ny - .35) * 9 - t * .6) * .35;
      if (mouse.s > 0) { const d = (x - mouse.x) ** 2 + (y - mouse.y) ** 2; v += 1.9 * mouse.s * Math.exp(-d / 9000); }
      for (const dr of drops) {
        const d = Math.hypot(x - dr.x, y - dr.y) - dr.r;
        v += Math.exp(-(d * d) / 900) * dr.a * Math.cos(d / 12);
      }
      return v;
    }
    function frame() {
      raf = 0; if (!run) return;
      t += .012;
      mouse.s += ((mouse.x > -999 ? 1 : 0) - mouse.s) * .06;
      for (let i = drops.length - 1; i >= 0; i--) { const d = drops[i]; d.r += 3.2; d.a *= .985; if (d.a < .03) drops.splice(i, 1); }
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) field[j * cols + i] = value(i * CELL, j * CELL);
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1.1;
      for (let l = 0; l < LEVELS; l++) {
        const iso = -2.6 + (5.2 * (l + .5)) / LEVELS;
        ctx.strokeStyle = colors[l % 2];
        ctx.globalAlpha = (opts.alpha || .28) * (0.45 + 0.55 * Math.sin((l / LEVELS) * Math.PI));
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
          const a = field[j * cols + i], b = field[j * cols + i + 1], c = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
          const k = (a > iso) | ((b > iso) << 1) | ((c > iso) << 2) | ((d > iso) << 3);
          if (k === 0 || k === 15) continue;
          const x = i * CELL, y = j * CELL;
          const top = [x + CELL * (iso - a) / (b - a), y], right = [x + CELL, y + CELL * (iso - b) / (c - b)];
          const bot = [x + CELL * (iso - d) / (c - d), y + CELL], left = [x, y + CELL * (iso - a) / (d - a)];
          const seg = (p, q) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
          switch (k) {
            case 1: case 14: seg(left, top); break;
            case 2: case 13: seg(top, right); break;
            case 3: case 12: seg(left, right); break;
            case 4: case 11: seg(right, bot); break;
            case 6: case 9: seg(top, bot); break;
            case 7: case 8: seg(left, bot); break;
            case 5: seg(left, top); seg(right, bot); break;
            case 10: seg(top, right); seg(left, bot); break;
          }
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(frame);
    }
    function wake() { if (run && !raf) raf = requestAnimationFrame(frame); }
    host.addEventListener("pointermove", (e) => { const r = host.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    host.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
    host.addEventListener("pointerdown", (e) => { const r = host.getBoundingClientRect(); drops.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 0, a: 1.6 }); wake(); });
    new IntersectionObserver(([e]) => { run = e.isIntersecting; wake(); }).observe(host);
    let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { size(); wake(); }, 150); });
    addEventListener("themechange", () => setTimeout(() => { readColors(); if (reduce) { run = true; wake(); } }, 30));
    readColors(); size(); run = true; wake();
  }
  Water(document.getElementById("water"), { alpha: .32 });
  Water(document.getElementById("water2"), { alpha: .38, cell: 18, levels: 9 });
})();
