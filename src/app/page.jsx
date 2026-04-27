"use client";
import { useState, useEffect, useRef } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
:root{
  --cream:#F4EFE6;--linen:#EDE7D9;--sand:#C9B99A;
  --sage-light:#8AAF96;--sage:#4D7A5E;--sage-deep:#2E5040;
  --terra:#B8654A;--charcoal:#1E2420;--white:#FDFAF5;
  --ff-d:'Cormorant Garamond',serif;--ff-b:'Jost',sans-serif;
}
body{background:var(--cream);font-family:var(--ff-b);color:var(--charcoal);overflow-x:hidden}

/* ── Fade-in animations ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.reveal{opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .8s ease}
.reveal.visible{opacity:1;transform:translateY(0)}

/* ══════════════════════════
   NAV
══════════════════════════ */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 56px;height:72px;
  background:rgba(244,239,230,0.92);backdrop-filter:blur(12px);
  border-bottom:1px solid transparent;transition:border-color .3s;
}
.nav.scrolled{border-color:rgba(0,0,0,.06)}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none}
.nav-logo-text{font-family:var(--ff-d);font-size:19px;font-weight:500;color:var(--sage-deep);letter-spacing:.04em}
.nav-links{display:flex;gap:36px}
.nav-link{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--charcoal);opacity:.6;cursor:pointer;transition:opacity .2s;background:none;border:none;font-family:var(--ff-b)}
.nav-link:hover{opacity:1}
.nav-cta{background:var(--sage-deep);color:var(--cream);font-family:var(--ff-b);font-size:11px;letter-spacing:.12em;text-transform:uppercase;padding:11px 26px;border-radius:3px;border:none;cursor:pointer;transition:background .2s}
.nav-cta:hover{background:#243D30}
@media(max-width:768px){.nav-links{display:none}.nav{padding:0 24px}}

/* ══════════════════════════
   HERO
══════════════════════════ */
.hero{
  min-height:100vh;padding-top:72px;
  display:grid;grid-template-columns:1fr 1fr;
  background:var(--cream);
}
@media(max-width:900px){.hero{grid-template-columns:1fr}}
.hero-left{
  display:flex;flex-direction:column;justify-content:center;
  padding:80px 56px 80px 56px;
}
.hero-tag{
  display:inline-flex;align-items:center;gap:10px;
  font-size:10px;letter-spacing:.18em;text-transform:uppercase;
  color:var(--sage);margin-bottom:32px;
  animation:fadeUp .9s ease both;animation-delay:.1s;
}
.hero-tag-line{width:28px;height:1px;background:var(--sage)}
.hero-h1{
  font-family:var(--ff-d);font-size:clamp(52px,5.5vw,82px);font-weight:300;
  color:var(--sage-deep);line-height:1.05;margin-bottom:28px;
  animation:fadeUp .9s ease both;animation-delay:.25s;
}
.hero-h1 em{font-style:italic;color:var(--terra)}
.hero-h1 strong{font-weight:500}
.hero-sub{
  font-size:15px;font-weight:300;line-height:1.85;color:var(--charcoal);
  opacity:.65;max-width:400px;margin-bottom:48px;
  animation:fadeUp .9s ease both;animation-delay:.4s;
}
.hero-actions{
  display:flex;gap:14px;align-items:center;flex-wrap:wrap;
  animation:fadeUp .9s ease both;animation-delay:.55s;
}
.btn-primary{
  background:var(--sage-deep);color:var(--cream);border:none;
  padding:15px 36px;border-radius:3px;font-family:var(--ff-b);
  font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  cursor:pointer;transition:background .2s;font-weight:500;
}
.btn-primary:hover{background:#243D30}
.btn-ghost{
  background:transparent;border:1.5px solid var(--sand);color:var(--charcoal);
  padding:13px 30px;border-radius:3px;font-family:var(--ff-b);
  font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  cursor:pointer;transition:border-color .2s;opacity:.7;
}
.btn-ghost:hover{border-color:var(--sage);opacity:1}

.hero-right{
  position:relative;overflow:hidden;
  animation:fadeIn 1.2s ease both;animation-delay:.2s;
}
@media(max-width:900px){.hero-right{height:60vw;min-height:360px}}
.hero-img{
  width:100%;height:100%;object-fit:cover;
  filter:brightness(.92) saturate(.9);
}
.hero-overlay{
  position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(46,80,64,.15) 0%,transparent 60%);
}
.hero-float-card{
  position:absolute;bottom:40px;left:-20px;
  background:var(--cream);border-radius:4px;
  padding:18px 22px;box-shadow:0 8px 32px rgba(0,0,0,.1);
  animation:fadeUp 1s ease both;animation-delay:.8s;
}
.hfc-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--sage);margin-bottom:5px}
.hfc-value{font-family:var(--ff-d);font-size:17px;color:var(--sage-deep)}
.hero-clover-mark{
  position:absolute;top:32px;right:32px;opacity:.15;
}

/* ══════════════════════════
   MARQUEE
══════════════════════════ */
.marquee-wrap{
  background:var(--sage-deep);overflow:hidden;
  padding:16px 0;border-top:1px solid rgba(255,255,255,.05);
}
.marquee-track{
  display:flex;gap:0;white-space:nowrap;
  animation:scroll 28s linear infinite;
}
.marquee-item{
  font-family:var(--ff-d);font-size:18px;font-style:italic;font-weight:300;
  color:rgba(255,255,255,.5);padding:0 32px;
}
.marquee-dot{color:var(--terra);font-style:normal;margin:0 4px}

/* ══════════════════════════
   SECTION SHARED
══════════════════════════ */
.section{padding:120px 56px}
@media(max-width:768px){.section{padding:80px 24px}}
.s-eyebrow{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--sage);margin-bottom:14px;display:flex;align-items:center;gap:10px}
.s-eyebrow::before{content:'';width:22px;height:1px;background:var(--sage)}
.s-title{font-family:var(--ff-d);font-size:clamp(34px,4vw,56px);font-weight:300;color:var(--sage-deep);line-height:1.1;margin-bottom:16px}
.s-title em{font-style:italic;color:var(--terra)}
.s-body{font-size:14px;font-weight:300;line-height:1.85;color:var(--charcoal);opacity:.65;max-width:520px}

/* ══════════════════════════
   KLAVERBENADERING
══════════════════════════ */
.klaver-section{background:var(--linen)}
.klaver-inner{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
@media(max-width:900px){.klaver-inner{grid-template-columns:1fr;gap:48px}}
.klaver-left{}
.klaver-grid{
  display:grid;grid-template-columns:1fr 1fr;gap:1px;
  background:var(--sand);border:1px solid var(--sand);border-radius:12px;overflow:hidden;
}
.klaver-cell{
  background:var(--linen);padding:32px;position:relative;
  transition:background .3s;
}
.klaver-cell:hover{background:var(--cream)}
.kc-num{
  font-family:var(--ff-d);font-size:11px;letter-spacing:.1em;
  text-transform:uppercase;color:var(--sand);margin-bottom:14px;
}
.kc-icon{margin-bottom:14px}
.kc-title{font-family:var(--ff-d);font-size:24px;font-weight:400;color:var(--sage-deep);margin-bottom:8px}
.kc-body{font-size:12px;font-weight:300;line-height:1.7;color:var(--charcoal);opacity:.65}
.klaver-center{display:flex;justify-content:center;align-items:center}
.klaver-big-logo{opacity:.07}

/* ══════════════════════════
   SERVICES
══════════════════════════ */
.services-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:56px}
@media(max-width:1100px){.services-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.services-grid{grid-template-columns:1fr}}
.svc-card{border-radius:10px;overflow:hidden;cursor:pointer;position:relative;transition:transform .3s}
.svc-card:hover{transform:translateY(-4px)}
.svc-img-wrap{height:260px;overflow:hidden;position:relative}
.svc-img{width:100%;height:100%;object-fit:cover;transition:transform .5s;filter:brightness(.85) saturate(.85)}
.svc-card:hover .svc-img{transform:scale(1.04)}
.svc-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(46,80,64,.75) 0%,transparent 55%)}
.svc-content{position:absolute;bottom:0;left:0;right:0;padding:24px 20px}
.svc-tag{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:6px}
.svc-name{font-family:var(--ff-d);font-size:22px;font-weight:400;color:white;line-height:1.2;margin-bottom:4px}
.svc-meta{font-size:11px;color:rgba(255,255,255,.55);font-weight:300}
.svc-arrow{
  position:absolute;top:16px;right:16px;
  width:32px;height:32px;border-radius:50%;
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
  display:flex;align-items:center;justify-content:center;
  font-size:13px;color:white;opacity:0;transition:opacity .3s;
}
.svc-card:hover .svc-arrow{opacity:1}

/* ══════════════════════════
   PHOTO INTERLUDE
══════════════════════════ */
.interlude{
  padding:0 56px;margin-bottom:0;
  display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px;height:480px;
}
@media(max-width:900px){.interlude{grid-template-columns:1fr 1fr;height:320px;padding:0 24px}}
.int-img{overflow:hidden;border-radius:10px}
.int-img img{width:100%;height:100%;object-fit:cover;filter:brightness(.9) saturate(.85);transition:transform .6s}
.int-img:hover img{transform:scale(1.03)}

/* ══════════════════════════
   TEAM
══════════════════════════ */
.team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px}
@media(max-width:900px){.team-grid{grid-template-columns:1fr}}
.team-card{border-radius:10px;overflow:hidden;background:var(--linen)}
.team-img-wrap{height:340px;overflow:hidden;position:relative}
.team-img{width:100%;height:100%;object-fit:cover;object-position:top;filter:brightness(.9) saturate(.8);transition:transform .5s}
.team-card:hover .team-img{transform:scale(1.03)}
.team-info{padding:24px 26px 28px}
.team-name{font-family:var(--ff-d);font-size:26px;font-weight:400;color:var(--sage-deep);margin-bottom:6px}
.team-role{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--sage);margin-bottom:12px}
.team-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.team-tag{font-size:9px;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;background:rgba(77,122,94,.1);color:var(--sage);border-radius:2px}
.team-bio{font-size:12px;font-weight:300;line-height:1.7;color:var(--charcoal);opacity:.65}

/* ══════════════════════════
   ABONNEMENT TEASER
══════════════════════════ */
.plans-section{background:var(--sage-deep)}
.plans-header{text-align:center;margin-bottom:56px}
.plans-header .s-eyebrow{justify-content:center}
.plans-header .s-eyebrow::before{display:none}
.plans-header .s-title{color:var(--cream)}
.plans-header .s-title em{color:var(--sand)}
.plans-header .s-body{color:rgba(255,255,255,.5);margin:0 auto}
.plans-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media(max-width:900px){.plans-grid{grid-template-columns:1fr;max-width:400px;margin:0 auto}}
.plan-card{
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
  border-radius:10px;padding:32px 28px;transition:background .3s;
}
.plan-card:hover{background:rgba(255,255,255,.08)}
.plan-card.featured{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.2)}
.plan-badge{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--sage-light);background:rgba(138,175,150,.15);padding:3px 10px;border-radius:10px;display:inline-block;margin-bottom:14px}
.plan-name{font-family:var(--ff-d);font-size:26px;font-weight:300;color:var(--cream);margin-bottom:8px}
.plan-price{font-family:var(--ff-d);font-size:36px;color:var(--sand);margin-bottom:4px}
.plan-price span{font-size:14px;font-weight:300;color:rgba(255,255,255,.35)}
.plan-divider{height:1px;background:rgba(255,255,255,.08);margin:20px 0}
.plan-features{list-style:none}
.plan-feature{font-size:12px;font-weight:300;color:rgba(255,255,255,.6);padding:5px 0;display:flex;align-items:center;gap:9px;border-bottom:1px solid rgba(255,255,255,.04)}
.plan-feature:last-child{border:none}
.pf-check{color:var(--sage-light);flex-shrink:0}
.pf-dash{color:rgba(255,255,255,.2);flex-shrink:0}
.plans-cta{text-align:center;margin-top:48px}
.btn-cream{background:var(--cream);color:var(--sage-deep);border:none;padding:15px 40px;border-radius:3px;font-family:var(--ff-b);font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;font-weight:500;transition:background .2s}
.btn-cream:hover{background:var(--linen)}

/* ══════════════════════════
   AVOND BANNER
══════════════════════════ */
.avond-banner{
  margin:0 56px;border-radius:14px;overflow:hidden;
  position:relative;height:400px;
}
@media(max-width:768px){.avond-banner{margin:0 24px;height:300px}}
.avond-img{width:100%;height:100%;object-fit:cover;filter:brightness(.5) saturate(.7)}
.avond-content{
  position:absolute;inset:0;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;padding:40px;
}
.avond-eyebrow{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:16px}
.avond-title{font-family:var(--ff-d);font-size:clamp(36px,5vw,64px);font-weight:300;color:white;line-height:1.1;margin-bottom:20px}
.avond-title em{font-style:italic;color:var(--sand)}
.avond-sub{font-size:13px;font-weight:300;color:rgba(255,255,255,.6);max-width:480px;line-height:1.7;margin-bottom:32px}
.btn-outline-white{background:transparent;border:1.5px solid rgba(255,255,255,.4);color:white;padding:13px 32px;border-radius:3px;font-family:var(--ff-b);font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:border-color .2s;font-weight:400}
.btn-outline-white:hover{border-color:white}

/* ══════════════════════════
   FOOTER
══════════════════════════ */
.footer{background:var(--charcoal);padding:64px 56px 40px}
@media(max-width:768px){.footer{padding:48px 24px 32px}}
.footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:56px}
@media(max-width:900px){.footer-top{grid-template-columns:1fr 1fr}}
@media(max-width:500px){.footer-top{grid-template-columns:1fr}}
.footer-brand{}
.footer-logo{display:flex;align-items:center;gap:10px;margin-bottom:16px}
.footer-logo-text{font-family:var(--ff-d);font-size:18px;color:rgba(255,255,255,.8);letter-spacing:.04em}
.footer-tagline{font-size:12px;font-weight:300;color:rgba(255,255,255,.35);line-height:1.7;max-width:240px;margin-bottom:24px}
.footer-social{display:flex;gap:12px}
.social-btn{width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:11px;color:rgba(255,255,255,.45);cursor:pointer;transition:border-color .2s,color .2s}
.social-btn:hover{border-color:rgba(255,255,255,.4);color:rgba(255,255,255,.8)}
.footer-col-title{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:18px}
.footer-links{list-style:none}
.footer-link{font-size:12px;font-weight:300;color:rgba(255,255,255,.45);padding:5px 0;cursor:pointer;transition:color .2s;display:block}
.footer-link:hover{color:rgba(255,255,255,.8)}
.footer-bottom{border-top:1px solid rgba(255,255,255,.06);padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
.footer-copy{font-size:11px;color:rgba(255,255,255,.25)}
.footer-legal{display:flex;gap:24px}
.footer-legal a{font-size:11px;color:rgba(255,255,255,.25);cursor:pointer;transition:color .2s}
.footer-legal a:hover{color:rgba(255,255,255,.5)}
`;

/* ─── CLOVER SVG LOGO ─── */
function CloverLogo({ size = 28, color = "var(--sage-deep)", opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 44" fill="none" style={{ opacity }}>
      {/* Top leaf */}
      <ellipse cx="20" cy="11" rx="8" ry="11" fill={color} opacity=".95"/>
      {/* Right leaf */}
      <ellipse cx="29" cy="20" rx="11" ry="8" fill={color} opacity=".9"/>
      {/* Bottom leaf */}
      <ellipse cx="20" cy="29" rx="8" ry="11" fill={color} opacity=".95"/>
      {/* Left leaf */}
      <ellipse cx="11" cy="20" rx="11" ry="8" fill={color} opacity=".9"/>
      {/* Center overlap */}
      <circle cx="20" cy="20" r="6" fill={color}/>
      {/* Stem */}
      <path d="M20 38 Q17 41 14 44" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

/* ─── DATA ─── */
const COACHES = [
  {
    name: "Daniel Vissers",
    role: "Lifecoach & Theaterdocent",
    tags: ["Positieve Psychologie", "Sport", "Theater"],
    bio: "Trainer in positieve psychologie, lifecoach en theaterdocent met een rijke achtergrond in sport. Daniel begeleidt je naar meer bewustzijn en authenticiteit.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    color: "#4D7A5E",
  },
  {
    name: "Nanda Kling",
    role: "Presentatiecoach & Actrice",
    tags: ["Theater", "Presentatiecoaching", "Artistiek"],
    bio: "Theatermaker, actrice en presentatiecoach. Nanda helpt je jouw stem te vinden — op het podium én in het dagelijkse leven.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    color: "#8AAF96",
  },
  {
    name: "Raphael Dollart",
    role: "Socioloog & Lifecoach",
    tags: ["Sociologie", "Social Work", "Kunst"],
    bio: "Socioloog, hogeschooldocent Social Work en lifecoach. Raphael verbindt wetenschap met praktijk en begeleidt je naar jouw gewenste staat van zijn.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    color: "#2E5040",
  },
];

const PLANS = [
  {
    name: "Basis",
    featured: false,
    features: [
      { l: "Ochtendsessies (ma/wo/vr)", ok: true },
      { l: "Avondsessies", ok: false },
      { l: "Cursuskorting", ok: false },
      { l: "Prioriteit boeken", ok: false },
    ],
  },
  {
    name: "Basis Plus",
    featured: true,
    features: [
      { l: "Ochtendsessies (ma/wo/vr)", ok: true },
      { l: "Alle avondsessies", ok: true },
      { l: "Cursuskorting", ok: false },
      { l: "Prioriteit boeken", ok: false },
    ],
  },
  {
    name: "Premium",
    featured: false,
    features: [
      { l: "Ochtendsessies (ma/wo/vr)", ok: true },
      { l: "Alle avondsessies", ok: true },
      { l: "Cursuskorting", ok: true },
      { l: "Prioriteit boeken", ok: true },
    ],
  },
];

const SERVICES = [
  {
    tag: "Persoonlijk",
    name: "1:1 Coaching",
    meta: "60–90 min · Op maat",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    tag: "Groep",
    name: "Groepslessen",
    meta: "Ma · Wo · Vr · Ochtend & avond",
    img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80",
  },
  {
    tag: "6-weekse cursus",
    name: "Wie ben ik?",
    meta: "Di of do · Max 12 deelnemers",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    tag: "Bedrijven",
    name: "Teambuilding",
    meta: "Dagdeel · 3–4 uur · Op locatie",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  },
];

/* ─── REVEAL HOOK ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ─── MAIN ─── */
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div>
      <style>{css}</style>

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a className="nav-logo" href="#">
          <CloverLogo size={26} />
          <span className="nav-logo-text">The Happy State</span>
        </a>
        <div className="nav-links">
          {["Over", "Diensten", "Team", "Cursussen", "Bedrijven"].map(l => (
            <button key={l} className="nav-link">{l}</button>
          ))}
        </div>
        <button className="nav-cta">Boek een sessie</button>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag">
            <span className="hero-tag-line" />
            Rotterdam · Ontwikkelstudio
          </div>
          <h1 className="hero-h1">
            Verbind<br />
            met wie je<br />
            <em>werkelijk</em> bent
          </h1>
          <p className="hero-sub">
            The Happy State is een plek voor professionals die willen groeien in bewustzijn, authenticiteit en verbinding — via coaching, groepslessen en de klaverbenadering.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Begin met een proefles</button>
            <button className="btn-ghost">Bekijk abonnementen</button>
          </div>
        </div>
        <div className="hero-right">
          <img
            className="hero-img"
            src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80"
            alt="Serene studio ruimte van The Happy State"
          />
          <div className="hero-overlay" />
          <svg className="hero-clover-mark" width="180" height="196" viewBox="0 0 40 44">
            <ellipse cx="20" cy="11" rx="8" ry="11" fill="white"/>
            <ellipse cx="29" cy="20" rx="11" ry="8" fill="white"/>
            <ellipse cx="20" cy="29" rx="8" ry="11" fill="white"/>
            <ellipse cx="11" cy="20" rx="11" ry="8" fill="white"/>
            <circle cx="20" cy="20" r="6" fill="white"/>
          </svg>
          <div className="hero-float-card">
            <div className="hfc-label">De klaverbenadering</div>
            <div className="hfc-value">Creativiteit · Speelsheid · Actief · Energie</div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "flex" }}>
              {["Creativiteit", "Speelsheid", "Actief", "Energie", "Authenticiteit", "Verbinding", "The Happy State", "Rotterdam"].map(w => (
                <span key={w} className="marquee-item">{w} <span className="marquee-dot">·</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── KLAVERBENADERING ── */}
      <section className="section klaver-section">
        <div className="klaver-inner">
          <Reveal>
            <div className="s-eyebrow">Onze werkwijze</div>
            <h2 className="s-title">De <em>klaver</em>benadering</h2>
            <p className="s-body" style={{ marginBottom: 40 }}>
              Wij ontwikkelden een eigen methode gebaseerd op wetenschappelijke inzichten en onze expertise. Vier principes die samen bijdragen aan jouw gewenste staat van zijn.
            </p>
            <div className="klaver-grid">
              {[
                { n: "01", title: "Creativiteit", icon: "✦", body: "Expressie en schepping bevorderen mentaal, emotioneel en lichamelijk welbevinden." },
                { n: "02", title: "Speelsheid", icon: "◈", body: "Lichtvoetigheid en spontaniteit leiden tot emotieregulatie en cognitieve flexibiliteit." },
                { n: "03", title: "Actief", icon: "◎", body: "Ervaringsleren — de diepste manier van leren door te beleven en te reflecteren." },
                { n: "04", title: "Energie", icon: "◇", body: "Bewustzijn en beheer van jouw energie leidt tot spiritueel en fysiek welbevinden." },
              ].map((c, i) => (
                <div key={c.n} className="klaver-cell">
                  <div className="kc-num">{c.n}</div>
                  <div className="kc-icon" style={{ fontSize: 20, color: "var(--sage)" }}>{c.icon}</div>
                  <div className="kc-title">{c.title}</div>
                  <div className="kc-body">{c.body}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="klaver-center">
              <CloverLogo size={280} color="var(--sage)" opacity={0.12} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section" style={{ paddingBottom: 60 }}>
        <Reveal>
          <div className="s-eyebrow">Aanbod</div>
          <h2 className="s-title">Wat we <em>bieden</em></h2>
          <p className="s-body">Van persoonlijke coaching tot teambuilding voor organisaties — alles via de klaverbenadering.</p>
        </Reveal>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} delay={i * 80}>
              <div className="svc-card">
                <div className="svc-img-wrap">
                  <img className="svc-img" src={s.img} alt={s.name} />
                  <div className="svc-overlay" />
                  <div className="svc-content">
                    <div className="svc-tag">{s.tag}</div>
                    <div className="svc-name">{s.name}</div>
                    <div className="svc-meta">{s.meta}</div>
                  </div>
                  <div className="svc-arrow">→</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PHOTO INTERLUDE ── */}
      <Reveal>
        <div className="interlude" style={{ marginBottom: 0 }}>
          <div className="int-img">
            <img src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=900&q=80" alt="Rustige studio" />
          </div>
          <div className="int-img">
            <img src="https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&w=600&q=80" alt="Natuurlijk licht" />
          </div>
          <div className="int-img">
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?auto=format&fit=crop&w=600&q=80" alt="Minimalistische ruimte" />
          </div>
        </div>
      </Reveal>

      {/* ── TEAM ── */}
      <section className="section">
        <Reveal>
          <div className="s-eyebrow">Het team</div>
          <h2 className="s-title">Drie <em>individuen</em>,<br />één verhaal</h2>
          <p className="s-body">Elk met hun eigen specialiteit, samen vormen zij The Happy State.</p>
        </Reveal>
        <div className="team-grid">
          {COACHES.map((c, i) => (
            <Reveal key={c.name} delay={i * 100}>
              <div className="team-card">
                <div className="team-img-wrap">
                  <img className="team-img" src={c.img} alt={c.name} />
                </div>
                <div className="team-info">
                  <div className="team-name">{c.name}</div>
                  <div className="team-role">{c.role}</div>
                  <div className="team-tags">
                    {c.tags.map(t => <span key={t} className="team-tag">{t}</span>)}
                  </div>
                  <div className="team-bio">{c.bio}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ABONNEMENTEN ── */}
      <section className="section plans-section">
        <div className="plans-header">
          <Reveal>
            <div className="s-eyebrow" style={{ justifyContent: "center" }}>Abonnementen</div>
            <h2 className="s-title" style={{ color: "var(--cream)", textAlign: "center" }}>
              Kies jouw <em>pad</em>
            </h2>
            <p className="s-body" style={{ color: "rgba(255,255,255,.45)", textAlign: "center", margin: "0 auto 56px" }}>
              Maandelijks opzegbaar. Of kies voor een jaarlijks abonnement en ontvang één maand gratis.
            </p>
          </Reveal>
        </div>
        <div className="plans-grid">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className={`plan-card${p.featured ? " featured" : ""}`}>
                {p.featured && <div className="plan-badge">Meest gekozen</div>}
                <div className="plan-name">{p.name}</div>
                <div className="plan-price">€ —<span> / mnd</span></div>
                <div className="plan-divider" />
                <ul className="plan-features">
                  {p.features.map(f => (
                    <li key={f.l} className="plan-feature">
                      {f.ok
                        ? <span className="pf-check">✓</span>
                        : <span className="pf-dash">—</span>}
                      {f.l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="plans-cta">
          <button className="btn-cream">Bekijk alle abonnementen en prijzen →</button>
        </div>
      </section>

      {/* ── AVOND BANNER ── */}
      <section className="section" style={{ paddingTop: 80 }}>
        <Reveal>
          <div className="avond-banner">
            <img
              className="avond-img"
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80"
              alt="Een avond met The Happy State"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="avond-content">
              <div className="avond-eyebrow">Speciaal evenement</div>
              <h2 className="avond-title">Een avond met<br /><em>The Happy State</em></h2>
              <p className="avond-sub">Drie artiesten, drie individuen, één verhaal. Een interactief avondvullend programma met storytelling, muziek, zang en dans.</p>
              <button className="btn-outline-white">Blijf op de hoogte →</button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <CloverLogo size={22} color="rgba(255,255,255,0.6)" />
              <span className="footer-logo-text">The Happy State</span>
            </div>
            <p className="footer-tagline">
              Jouw vaste plek om te vertragen, te verdiepen en te groeien. Rotterdam.
            </p>
            <div className="footer-social">
              {["in", "ig", "yt"].map(s => (
                <div key={s} className="social-btn">{s}</div>
              ))}
            </div>
          </div>
          {[
            { title: "Navigeer", links: ["Over ons", "De klaverbenadering", "Diensten", "Team", "Contact"] },
            { title: "Boeken", links: ["Proefles", "Groepslessen", "1:1 Coaching", "Wie ben ik?", "Abonnementen"] },
            { title: "Bedrijven", links: ["Teambuilding", "Workshops", "Trainingen", "Lezingen", "Offerte aanvragen"] },
          ].map(col => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <ul className="footer-links">
                {col.links.map(l => <li key={l}><a className="footer-link">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 The Happy State · Rotterdam. Alle rechten voorbehouden.</span>
          <div className="footer-legal">
            <a>Privacybeleid</a>
            <a>Algemene voorwaarden</a>
            <a>Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
