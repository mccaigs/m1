"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const poster = "/media/mccaigs-opener-poster.webp";

export function HeroOpenerVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion !== false || !containerRef.current) return;

    let timeout: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const mobile = window.matchMedia("(max-width: 767px)").matches;
        timeout = window.setTimeout(
          () => setLoadVideo(true),
          mobile ? 8000 : 600,
        );
      },
      { rootMargin: "160px" },
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (timeout !== undefined) window.clearTimeout(timeout);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!canPlay) return;
    void videoRef.current?.play().catch(() => undefined);
  }, [canPlay]);

  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-background/70"
      ref={containerRef}
    >
      <Image
        alt="McCaigs team working in the Edinburgh studio"
        className="rounded-xl object-cover"
        fill
        fetchPriority="high"
        priority
        sizes="(max-width: 640px) calc(100vw - 3.5rem), (max-width: 1024px) 432px, 464px"
        src={poster}
      />
      {loadVideo ? (
        <video
          aria-label="McCaigs studio opener"
          autoPlay
          className={`absolute inset-0 h-full w-full rounded-xl object-cover transition-opacity duration-500 ${
            canPlay ? "opacity-100" : "opacity-0"
          }`}
          loop
          muted
          onCanPlay={() => setCanPlay(true)}
          playsInline
          poster={poster}
          preload="none"
          ref={videoRef}
        >
          <source
            media="(max-width: 767px)"
            src="/media/mccaigs-opener-mobile.webm"
            type="video/webm"
          />
          <source src="/brand/mccaigs-opener.webm" type="video/webm" />
        </video>
      ) : null}
    </div>
  );
}
