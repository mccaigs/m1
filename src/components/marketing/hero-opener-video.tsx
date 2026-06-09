"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const poster = "/media/mccaigs-systems-demo-poster.png";

export function HeroOpenerVideo() {
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-background/70">
      {reducedMotion === false ? (
        <video
          aria-label="McCaigs studio opener"
          autoPlay
          className="h-full w-full rounded-xl object-cover"
          loop
          muted
          playsInline
          poster={poster}
          preload="metadata"
        >
          <source src="/brand/mccaigs-opener.webm" type="video/webm" />
        </video>
      ) : (
        <Image
          alt="McCaigs studio product interface preview"
          className="rounded-xl object-cover"
          fill
          priority
          sizes="(max-width: 1024px) 320px, 384px"
          src={poster}
        />
      )}
    </div>
  );
}
