import type { ReactNode } from "react";

import { OrbitingCircles, type Orbit } from "./orbiting-circles-02";

/**
 * The published component points its icons at a CDN. These stand-ins are plain
 * geometry drawn inline, so the demos the e2e suite mounts render identically
 * offline and on a runner with no egress — a 404 for an icon would otherwise
 * show up as a console error and fail the shared render check.
 */
function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="h-6 w-6 text-[color:var(--orb-particle)] md:h-8 md:w-8"
    >
      {children}
    </svg>
  );
}

const LOCAL_ORBITS: Orbit[] = [
  {
    size: "w-[27.5rem] h-[27.5rem] md:w-[45rem] md:h-[45rem]",
    duration: 18,
    icons: [
      {
        alt: "Database",
        angle: -60,
        node: (
          <Glyph>
            <ellipse cx="12" cy="6" rx="7" ry="3" />
            <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
            <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
          </Glyph>
        ),
      },
      {
        alt: "Model",
        angle: 0,
        node: (
          <Glyph>
            <path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" />
          </Glyph>
        ),
      },
      {
        alt: "Automation",
        angle: 60,
        node: (
          <Glyph>
            <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
          </Glyph>
        ),
      },
    ],
  },
  {
    size: "w-[37.5rem] h-[37.5rem] md:w-[55rem] md:h-[55rem]",
    duration: 24,
    icons: [
      {
        alt: "Design",
        angle: 0,
        node: (
          <Glyph>
            <circle cx="12" cy="12" r="3.2" />
            <rect x="3" y="3" width="18" height="18" rx="4" />
          </Glyph>
        ),
      },
      {
        alt: "Messaging",
        angle: -90,
        node: (
          <Glyph>
            <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z" />
          </Glyph>
        ),
      },
    ],
  },
  {
    size: "w-[45rem] h-[45rem] md:w-[66.25rem] md:h-[66.25rem]",
    duration: 30,
    icons: [
      {
        alt: "Assistant",
        angle: -60,
        node: (
          <Glyph>
            <circle cx="12" cy="12" r="8" />
            <path d="M12 4v16" />
          </Glyph>
        ),
      },
      {
        alt: "Interface",
        angle: 0,
        node: (
          <Glyph>
            <circle cx="12" cy="12" r="2" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          </Glyph>
        ),
      },
      {
        alt: "Runtime",
        angle: 60,
        node: (
          <Glyph>
            <path d="M4 8h9a4 4 0 0 1 0 8H8" />
            <circle cx="6.5" cy="6" r="1" />
            <path d="M20 16h-9a4 4 0 0 1 0-8h5" />
            <circle cx="17.5" cy="18" r="1" />
          </Glyph>
        ),
      },
    ],
  },
];

/** Inline icons — no network. This is the demo the e2e suite exercises. */
export function OrbitingCirclesDemo() {
  return (
    <div className="flex min-h-[500px] w-full items-end justify-center bg-[#F8FAFC] dark:bg-[#0B1220]">
      <OrbitingCircles orbits={LOCAL_ORBITS} />
    </div>
  );
}

/** Component defaults, i.e. the CDN icons the published version ships with. */
export function OrbitingCirclesRemoteDemo() {
  return (
    <div className="flex min-h-[500px] w-full items-end justify-center bg-[#F8FAFC] dark:bg-[#0B1220]">
      <OrbitingCircles />
    </div>
  );
}

/** A single ring with mirroring off — the sparsest arrangement. */
export function OrbitingCirclesSingleRingDemo() {
  return (
    <div className="flex min-h-[500px] w-full items-end justify-center bg-[#F8FAFC] dark:bg-[#0B1220]">
      <OrbitingCircles orbits={LOCAL_ORBITS.slice(0, 1)} mirrored={false} />
    </div>
  );
}

export default OrbitingCirclesDemo;
