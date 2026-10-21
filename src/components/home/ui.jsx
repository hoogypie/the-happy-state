import Image from "next/image";
import {
  Activity, Brain, Building2, Compass, Handshake, Heart, Presentation,
  Smile, Sparkles, Sprout, User, Users, Wind, Zap, Check, ArrowRight, Play,
} from "lucide-react";

/* ── Iconen: naam in site.js → icoon ── */
const ICONS = {
  activity: Activity, brain: Brain, building: Building2, compass: Compass,
  handshake: Handshake, heart: Heart, presentation: Presentation, smile: Smile,
  sparkles: Sparkles, sprout: Sprout, user: User, users: Users, wind: Wind, zap: Zap,
  check: Check, arrow: ArrowRight, play: Play,
};

export function Icon({ name, size = 22, strokeWidth = 1.4, className }) {
  const C = ICONS[name] || Sparkles;
  return <C size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}

/* ── Foto of nette tijdelijke vervanging ── */
export function Photo({ src, alt = "", sizes = "100vw", preload = false, className = "", label = "Foto volgt" }) {
  return (
    <div className={`photo ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} style={{ objectFit: "cover" }} />
      ) : (
        <div className="photo-ph" role="img" aria-label={alt || label}>
          <CloverLogo size={34} variant="outline" opacity={0.35} />
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}

/* ── Knop (gewone <a>, zie CLAUDE-notities: geen router.push) ── */
export function Btn({ knop, stijl = "primair", className = "" }) {
  if (!knop || !knop.href) return null;
  return (
    <a
      href={knop.href}
      className={`btn btn-${knop.stijl || stijl} ${className}`}
      data-onderwerp={knop.onderwerp || undefined}
    >
      {knop.label}
    </a>
  );
}

export function Eyebrow({ children, licht = false }) {
  return <div className={`eyebrow${licht ? " eyebrow-licht" : ""}`}>{children}</div>;
}

/* Tekst met **vet** */
export function Rich({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>
  );
}

/* ── Klaverlogo (goedgekeurde v3) ── */
const LEAF = ["M 0 0","C -3 -1 -27 -7 -24 -21","C -21 -32 -13 -47 -7 -45","C -3 -43 -1 -37 0 -32","C 1 -37 3 -43 7 -45","C 13 -47 21 -32 24 -21","C 27 -7 3 -1 0 0","Z"].join(" ");
const VEIN_MID = "M 0 -2 C 0 -12 0 -22 0 -31";
const VEIN_L = "M -1 -16 Q -12 -25 -13 -36";
const VEIN_R = "M  1 -16 Q  12 -25  13 -36";

export function CloverLogo({ size = 28, variant = "filled", opacity = 1 }) {
  const cx = 100, cy = 108;
  const rots = [135, 225, 45, 315];
  const filled = variant === "filled";
  const cream = variant === "cream";
  const leafFill = filled ? "url(#ths-g-sage)" : cream ? "rgba(244,239,230,0.92)" : "none";
  const stroke = filled || cream ? "none" : "#2E5040";
  const vein = filled ? "rgba(255,255,255,0.28)" : "rgba(46,80,64,0.25)";
  return (
    <svg width={size} height={Math.round(size * 1.34)} viewBox="0 0 200 268" fill="none" style={{ opacity, flexShrink: 0 }} aria-hidden="true">
      {filled && (
        <defs>
          <linearGradient id="ths-g-sage" x1="25%" y1="5%" x2="75%" y2="95%">
            <stop offset="0%" stopColor="#9DC4AE" />
            <stop offset="100%" stopColor="#1B3E2C" />
          </linearGradient>
        </defs>
      )}
      {rots.map((rot, i) => (
        <g key={i} transform={`translate(${cx},${cy}) rotate(${rot})`}>
          <path d={LEAF} fill={leafFill} stroke={stroke} strokeWidth={filled || cream ? 0 : 2} strokeLinejoin="round" />
          <path d={VEIN_MID} fill="none" stroke={vein} strokeWidth="0.85" strokeLinecap="round" />
          {!cream && <path d={VEIN_L} fill="none" stroke={vein} strokeWidth="0.6" strokeLinecap="round" opacity="0.75" />}
          {!cream && <path d={VEIN_R} fill="none" stroke={vein} strokeWidth="0.6" strokeLinecap="round" opacity="0.75" />}
        </g>
      ))}
      <path
        d={`M ${cx} ${cy + 4} Q ${cx + 10} ${cy + 58} ${cx - 6} ${cy + 126}`}
        fill="none"
        stroke={filled ? "#1B3E2C" : cream ? "rgba(244,239,230,0.7)" : "#2E5040"}
        strokeWidth={filled ? 2.2 : 1.8}
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
