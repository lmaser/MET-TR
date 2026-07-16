(function () {
  "use strict";

  function finiteOr(value, fallback = 0) {
    return Number.isFinite(value) ? value : fallback;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function clampFinite(value, min, max, fallback = min) {
    return clamp(finiteOr(value, fallback), min, max);
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function smoothstep(edge0, edge1, value) {
    const t = clamp((value - edge0) / Math.max(0.000001, edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  function softLimit(value, ceiling = 1, knee = null) {
    const positive = Math.max(0, finiteOr(value, 0));
    const safeCeiling = Math.max(1.000001, finiteOr(ceiling, 1));
    const safeKnee = Math.max(0.000001, finiteOr(knee, safeCeiling - 1));
    if (positive <= 1) return positive;
    return 1 + (safeCeiling - 1) * (1 - Math.exp(-(positive - 1) / safeKnee));
  }

  function visibilityLift(peak, min = 0.72, max = 1.84, knee = 0.28) {
    const safePeak = Math.max(0.000001, finiteOr(peak, 0));
    return clamp(min + knee / Math.max(0.25, safePeak), min, max);
  }

  function percentile(values, p) {
    const clean = Array.from(values || [])
      .filter(Number.isFinite)
      .sort((a, b) => a - b);
    if (!clean.length) return 0;
    const index = clamp((clean.length - 1) * clampFinite(p, 0, 1, 0.5), 0, clean.length - 1);
    const lo = Math.floor(index);
    const hi = Math.ceil(index);
    if (lo === hi) return clean[lo];
    return lerp(clean[lo], clean[hi], index - lo);
  }

  function dpr(max = 2) {
    return clampFinite(window.devicePixelRatio || 1, 1, max, 1);
  }

  function rect(x, y, w, h) {
    return { x, y, w, h };
  }

  function insetRect(source, inset) {
    const safe = Math.max(0, finiteOr(inset, 0));
    return {
      x: source.x + safe,
      y: source.y + safe,
      w: Math.max(0, source.w - safe * 2),
      h: Math.max(0, source.h - safe * 2)
    };
  }

  window.METTR_RENDER_CORE = {
    version: "0.1.0",
    math: {
      finiteOr,
      clamp,
      clampFinite,
      lerp,
      smoothstep,
      softLimit,
      visibilityLift,
      percentile
    },
    canvas: {
      dpr
    },
    geometry: {
      rect,
      insetRect
    }
  };
})();
