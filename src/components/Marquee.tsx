import type { ReactNode } from "react";

export function Marquee({ children }: { children: ReactNode[] }) {
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex shrink-0 animate-marquee items-center gap-4 pr-4 group-hover:[animation-play-state:paused]">
        {children}
      </div>
      <div
        className="flex shrink-0 animate-marquee items-center gap-4 pr-4 group-hover:[animation-play-state:paused]"
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
