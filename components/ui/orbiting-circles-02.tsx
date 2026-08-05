"use client";

import * as React from "react";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";

/**
 * OrbitingCircles — concentric rings of icons turning around a particle globe.
 *
 * The rings are anchored to the bottom edge and pushed down by half their own
 * height, so only the upper arc is on screen; the container clips the rest.
 * That is what lets a 1060px ring sit inside a 440px band without the page
 * gaining a scrollbar.
 *
 * Each icon rides a full-height arm rotating about the ring's centre, and
 * counter-rotates inside it at the same duration in the opposite direction, so
 * the chip travels the circle while staying upright.
 *
 * Colours live in scoped CSS variables so the component themes itself in light
 * and dark without needing entries in your Tailwind config.
 */

export type OrbitIcon = {
  /** URL of the icon. Ignored when `node` is supplied. */
  src?: string;
  /** Inline icon element — use this to avoid a network request. */
  node?: React.ReactNode;
  /** Accessible name. Icons are decorative unless this is set. */
  alt: string;
  /** Starting position on the ring, in degrees clockwise from twelve o'clock. */
  angle: number;
};

export type Orbit = {
  /**
   * Tailwind width/height classes for the ring. Supply a square pair — the
   * ring is a circle, so a mismatch renders an ellipse.
   */
  size: string;
  /** Seconds for one full revolution. */
  duration: number;
  icons: OrbitIcon[];
};

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rings, innermost first. Direction alternates, starting clockwise. */
  orbits?: Orbit[];
  /** Centre piece. Defaults to the particle globe. */
  center?: React.ReactNode;
  /**
   * Mirrors every icon to the opposite side of its ring, doubling the count.
   * Set false when you want exactly the icons you passed.
   */
  mirrored?: boolean;
}

/**
 * Icons are served from the shadcnspace CDN, matching the published component.
 * They are a network dependency: pass `orbits` with `node` icons instead when
 * the surface has to render offline or inside a locked-down CSP.
 */
const DEFAULT_ORBITS: Orbit[] = [
  {
    // 27.5rem / 45rem — Tailwind v4's spacing scale states these as w-110 and
    // w-180. This project is on Tailwind v3, whose scale stops well short of
    // that, so the same values are written as arbitrary lengths.
    size: "w-[27.5rem] h-[27.5rem] md:w-[45rem] md:h-[45rem]",
    duration: 18,
    icons: [
      { src: "https://images.shadcnspace.com/assets/svgs/supabase.svg", alt: "Supabase", angle: -60 },
      { src: "https://images.shadcnspace.com/assets/svgs/gemini.svg", alt: "Gemini", angle: 0 },
      { src: "https://images.shadcnspace.com/assets/svgs/make.svg", alt: "Make", angle: 60 },
    ],
  },
  {
    size: "w-[37.5rem] h-[37.5rem] md:w-[55rem] md:h-[55rem]",
    duration: 24,
    icons: [
      { src: "https://images.shadcnspace.com/assets/svgs/figma.svg", alt: "Figma", angle: 0 },
      { src: "https://images.shadcnspace.com/assets/svgs/slack.svg", alt: "Slack", angle: -90 },
    ],
  },
  {
    size: "w-[45rem] h-[45rem] md:w-[66.25rem] md:h-[66.25rem]",
    duration: 30,
    icons: [
      { src: "https://images.shadcnspace.com/assets/svgs/clude.svg", alt: "Claude", angle: -60 },
      { src: "https://images.shadcnspace.com/assets/svgs/react.svg", alt: "React", angle: 0 },
      { src: "https://images.shadcnspace.com/assets/svgs/python.svg", alt: "Python", angle: 60 },
    ],
  },
];

/* -------------------------------------------------------------------------- */

export function OrbitingCircles({
  orbits = DEFAULT_ORBITS,
  center,
  mirrored = true,
  className = "",
  ...rest
}: OrbitingCirclesProps) {
  return (
    <div
      className={`orb-root relative flex h-[27.5rem] w-full justify-center overflow-hidden bg-[color:var(--orb-bg)] md:h-[40rem] ${className}`}
      {...rest}
    >
      <style>{css}</style>

      {/* Centre particle globe. */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 aspect-square w-[18.75rem] -translate-x-1/2 translate-y-1/2 text-[color:var(--orb-particle)] md:w-[36.25rem]">
        {center ?? <ParticleSphereAnimation />}
      </div>

      {/* Orbiting rings. */}
      {orbits.map((orbit, index) => {
        const clockwise = index % 2 === 0;
        const orbitAnim = clockwise ? "orb-cw" : "orb-ccw";
        const counterAnim = clockwise ? "orb-counter-cw" : "orb-counter-ccw";

        // The mirrored half is the same logo a second time, so it is marked
        // decorative — otherwise a screen reader reads the whole ring twice.
        const icons: OrbitIcon[] = mirrored
          ? [
              ...orbit.icons,
              ...orbit.icons.map((icon) => ({ ...icon, angle: icon.angle + 180, alt: "" })),
            ]
          : orbit.icons;

        return (
          <div
            key={index}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-[color:var(--orb-border)] ${orbit.size}`}
          >
            {icons.map((icon, iconIndex) => (
              <div
                key={iconIndex}
                className="orb-arm absolute left-1/2 top-0 -ml-8 flex h-1/2 w-16 origin-bottom flex-col items-center justify-start"
                style={
                  {
                    "--start-angle": `${icon.angle}deg`,
                    // Also the resting position: a CSS animation outranks an
                    // inline transform, so this only takes effect once the
                    // reduced-motion rule below switches the animation off.
                    transform: `rotate(${icon.angle}deg)`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="orb-chip relative z-10 -mt-6 rounded-full border border-[color:var(--orb-border)] bg-[color:var(--orb-surface)] p-3 sm:-mt-7 sm:p-4 md:-mt-8"
                  style={
                    {
                      "--counter-offset": `${-icon.angle}deg`,
                      transform: `rotate(${-icon.angle}deg)`,
                      animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                >
                  {icon.node ? (
                    // An inline icon carries no name of its own, so `alt` is
                    // applied here — same contract as the <img> branch, where
                    // an empty string means decorative.
                    <span
                      className="flex items-center justify-center"
                      role={icon.alt ? "img" : undefined}
                      aria-label={icon.alt || undefined}
                      aria-hidden={icon.alt ? undefined : true}
                    >
                      {icon.node}
                    </span>
                  ) : (
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      width={32}
                      height={32}
                      decoding="async"
                      className="h-6 w-6 md:h-8 md:w-8"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default OrbitingCircles;

/* -------------------------------------------------------------------------- */
/* Scoped theme + motion. Dark mode responds to `prefers-color-scheme` and to  */
/* a `.dark` class on any ancestor, so it works with next-themes and friends.  */
/* -------------------------------------------------------------------------- */

const css = `
.orb-root {
  --orb-bg: #F8FAFC;
  --orb-border: #DFE6EF;
  --orb-surface: #FFFFFF;
  --orb-particle: #1E3A5F;
}

@media (prefers-color-scheme: dark) {
  .orb-root:not(.light .orb-root) {
    --orb-bg: #0B1220;
    --orb-border: #222E45;
    --orb-surface: #131C2E;
    --orb-particle: #93B4E8;
  }
}

.dark .orb-root {
  --orb-bg: #0B1220;
  --orb-border: #222E45;
  --orb-surface: #131C2E;
  --orb-particle: #93B4E8;
}

@keyframes orb-cw {
  from { transform: rotate(var(--start-angle)); }
  to   { transform: rotate(calc(var(--start-angle) + 360deg)); }
}
@keyframes orb-ccw {
  from { transform: rotate(var(--start-angle)); }
  to   { transform: rotate(calc(var(--start-angle) - 360deg)); }
}
@keyframes orb-counter-cw {
  from { transform: rotate(var(--counter-offset, 0deg)); }
  to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)); }
}
@keyframes orb-counter-ccw {
  from { transform: rotate(var(--counter-offset, 0deg)); }
  to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)); }
}

/* Every arm and chip falls back to the inline transform, so the rings keep */
/* their arrangement instead of collapsing to twelve o'clock.               */
@media (prefers-reduced-motion: reduce) {
  .orb-root .orb-arm,
  .orb-root .orb-chip {
    animation: none !important;
  }
}
`;
