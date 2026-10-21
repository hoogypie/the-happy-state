"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "./ui";

/* Carousel met sfeerfoto's + optionele video ("Bekijk de sfeer") */
export default function HeroMedia({ fotos = [], video, videoLabel }) {
  const [i, setI] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (fotos.length < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % fotos.length), 6000);
    return () => clearInterval(t);
  }, [fotos.length]);

  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e) => e.key === "Escape" && setVideoOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [videoOpen]);

  const yt = video && video.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);

  return (
    <>
      <div className="hero-bg" aria-hidden="true">
        {fotos.map((src, n) => (
          <div key={src} className={`hero-slide${n === i ? " active" : ""}`}>
            <Image src={src} alt="" fill sizes="100vw" preload={n === 0} style={{ objectFit: "cover" }} />
          </div>
        ))}
      </div>

      {fotos.length > 1 && (
        <div className="hero-dots">
          {fotos.map((src, n) => (
            <button
              key={src}
              className={n === i ? "active" : ""}
              onClick={() => setI(n)}
              aria-label={`Foto ${n + 1} tonen`}
            />
          ))}
        </div>
      )}

      {video && (
        <button className="hero-video-btn" onClick={() => setVideoOpen(true)}>
          <span className="hero-video-circle"><Icon name="play" size={20} /></span>
          <span className="hero-video-label">{videoLabel}</span>
        </button>
      )}

      {videoOpen && (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label={videoLabel} onClick={() => setVideoOpen(false)}>
          <div className="video-frame" onClick={(e) => e.stopPropagation()}>
            {yt ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`}
                title={videoLabel}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            ) : (
              <video src={video} controls autoPlay playsInline />
            )}
            <button className="video-close" onClick={() => setVideoOpen(false)} aria-label="Video sluiten">×</button>
          </div>
        </div>
      )}
    </>
  );
}
