"use client";

import * as React from "react";

/**
 * ParticleSphereAnimation — the rotating particle globe that sits at the centre
 * of OrbitingCircles.
 *
 * Canvas rather than DOM: a few hundred rotating points as elements would mean
 * a few hundred style recalcs per frame. One canvas draws them in a single pass
 * and stays smooth on a phone.
 *
 * Self-contained: no animation library, no external assets. The particle colour
 * is inherited from the element's computed `color`, so the globe themes itself
 * wherever it is dropped — pass `color` only to override that.
 */

export interface ParticleSphereAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of points on the sphere. */
  count?: number;
  /** Full rotations per minute. */
  rpm?: number;
  /** Tilt of the rotation axis away from the viewer, in degrees. */
  tilt?: number;
  /** Any CSS colour. Defaults to the inherited `color`. */
  color?: string;
  /**
   * Accessible name. Omitted by default: the globe is decoration beside the
   * orbiting icons, so it is hidden from assistive tech unless named.
   */
  label?: string;
}

type Point = { x: number; y: number; z: number };

/**
 * Fibonacci lattice — points spaced evenly over the sphere. A naive
 * random/lat-long distribution clumps at the poles, which reads as a defect
 * rather than as a globe.
 */
function buildSphere(count: number): Point[] {
  const points: Point[] = new Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points[i] = { x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius };
  }

  return points;
}

export function ParticleSphereAnimation({
  count = 620,
  rpm = 3,
  tilt = 16,
  color,
  label,
  className = "",
  style,
  ...rest
}: ParticleSphereAnimationProps) {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Read in the animation loop, so a prop change does not have to tear the
  // loop down and rebuild it.
  const settings = React.useRef({ count, rpm, tilt, color });
  settings.current = { count, rpm, tilt, color };

  React.useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let points = buildSphere(settings.current.count);
    let builtFor = settings.current.count;

    // Resolved once per theme/size change rather than per frame: reading a
    // computed style is a synchronous style resolution, and 60 of those a
    // second is exactly the kind of cost this component exists to avoid.
    let resolvedColor = "#0F172A";
    const resolveColor = () => {
      resolvedColor = settings.current.color ?? getComputedStyle(canvas).color;
    };

    let width = 0;
    let height = 0;
    // Kept outside the loop so resize and theme changes can repaint the frame
    // that is currently on screen, including when the loop is not running.
    let lastAngle = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      resolveColor();
    };

    const draw = (angle: number) => {
      if (builtFor !== settings.current.count) {
        points = buildSphere(settings.current.count);
        builtFor = settings.current.count;
      }

      const cx = width / 2;
      const cy = height / 2;
      // Leave a margin so the outermost points are not clipped by the canvas.
      const radius = Math.min(width, height) * 0.46;
      const scale = radius / 220;

      const sinY = Math.sin(angle);
      const cosY = Math.cos(angle);
      const tiltRad = (settings.current.tilt * Math.PI) / 180;
      const sinT = Math.sin(tiltRad);
      const cosT = Math.cos(tiltRad);

      context.clearRect(0, 0, width, height);
      context.fillStyle = resolvedColor;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Spin about the vertical axis, then tip the axis toward the viewer.
        const xr = p.x * cosY - p.z * sinY;
        const zr = p.x * sinY + p.z * cosY;
        const yt = p.y * cosT - zr * sinT;
        const zt = p.y * sinT + zr * cosT;

        // 0 at the far side, 1 at the near side — drives both size and opacity
        // so the sphere reads as a volume instead of a flat disc.
        const depth = (zt + 1) / 2;

        context.globalAlpha = 0.1 + depth * depth * 0.75;
        const dotRadius = (0.7 + depth * 1.5) * scale;

        context.beginPath();
        context.arc(cx + xr * radius, cy + yt * radius, dotRadius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
    };

    resize();

    const observer = new ResizeObserver(() => {
      resize();
      draw(lastAngle);
    });
    observer.observe(host);

    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onSchemeChange = () => {
      resolveColor();
      draw(lastAngle);
    };
    scheme.addEventListener("change", onSchemeChange);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const revolutions = ((now - start) / 60000) * settings.current.rpm;
      lastAngle = revolutions * Math.PI * 2;
      draw(lastAngle);
      frame = requestAnimationFrame(tick);
    };

    const run = () => {
      cancelAnimationFrame(frame);
      if (reduced.matches) {
        // Reduced motion still gets the globe — it just holds still.
        lastAngle = 0;
        draw(lastAngle);
        return;
      }
      start = 0;
      frame = requestAnimationFrame(tick);
    };

    run();
    reduced.addEventListener("change", run);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      scheme.removeEventListener("change", onSchemeChange);
      reduced.removeEventListener("change", run);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={`orb-sphere relative h-full w-full ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={style}
      {...rest}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export default ParticleSphereAnimation;
