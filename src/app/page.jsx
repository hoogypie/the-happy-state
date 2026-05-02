"use client";
import { useState, useEffect, useRef } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
:root{
  --cream:#F4EFE6;--linen:#EDE7D9;--sand:#C9B99A;
  --sage-light:#8AAF96;--sage:#4D7A5E;--sage-deep:#2E5040;
  --terra:#B8654A;--charcoal:#1E2420;
  --ff-d:'Cormorant Garamond',serif;--ff-b:'Jost',sans-serif;
}
body{background:var(--cream);font-family:var(--ff-b);color:var(--charcoal);overflow-x:hidden}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.reveal{opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .8s ease}
.reveal.visible{opacity:1;transform:translateY(0)}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 56px;height:72px;background:rgba(244,239,230,0.95);backdrop-filter:blur(12px);border-bottom:1px solid transparent;transition:border-color .3s}
.nav.scrolled{border-color:rgba(0,0,0,.06)}
.nav-logo{display:flex;align-items:center;gap:10px;cursor:pointer}
.nav-logo-text{font-family:var(--ff-d);font-size:19px;font-weight:500;color:var(--sage-deep);letter-spacing:.04em}
.nav-links{display:flex;gap:36px}
.nav-link{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--charcoal);opacity:.6;cursor:pointer;transition:opacity .2s;background:none;border:none;font-family:var(--ff-b)}
.nav-link:hover{opacity:1}
.nav-cta{background:var(--sage-deep);color:var(--cream);font-family:var(--ff-b);font-size:11px;letter-spacing:.12em;text-transform:uppercase;padding:11px 26px;border-radius:3px;border:none;cursor:pointer;transition:background .2s;white-space:nowrap}
.nav-cta:hover{background:#243D30}
.nav-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;background:none;border:none}
.nav-hamburger span{display:block;width:22px;height:1.5px;background:var(--charcoal);transition:all .3s}
.mobile-menu{display:none;position:fixed;top:72px;left:0;right:0;z-index:99;background:var(--cream);border-bottom:1px solid var(--linen);padding:20px 24px;flex-direction:column}
.mobile-menu.open{display:flex}
.mobile-link{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--charcoal);opacity:.7;padding:14px 0;border-bottom:1px solid var(--linen);cursor:pointer;background:none;border-left:none;border-right:none;border-top:none;font-family:var(--ff-b);text-align:left}
.mobile-cta{margin-top:16px;background:var(--sage-deep);color:var(--cream);border:none;padding:13px;border-radius:3px;font-family:var(--ff-b);font-size:11px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;font-weight:500}
@media(max-width:768px){.nav-links,.nav-cta{display:none}.nav-hamburger{display:flex}.nav{padding:0 24px}}

/* HERO */
.hero{min-height:100vh;padding-top:72px;display:grid;grid-template-columns:1fr 1fr;background:var(--cream)}
.hero-left{display:flex;flex-direction:column;justify-content:center;padding:80px 56px}
.hero-tag{display:inline-flex;align-items:center;gap:10px;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--sage);margin-bottom:32px;animation:fadeUp .9s ease both;animation-delay:.1s}
.hero-tag-line{width:28px;height:1px;background:var(--sage);flex-shrink:0}
.hero-h1{font-family:var(--ff-d);font-size:clamp(44px,5.5vw,82px);font-weight:300;color:var(--sage-deep);line-height:1.05;margin-bottom:28px;animation:fadeUp .9s ease both;animation-delay:.25s}
.hero-h1 em{font-style:italic;color:var(--terra)}
.hero-sub{font-size:15px;font-weight:300;line-height:1.85;color:var(--charcoal);opacity:.65;max-width:400px;margin-bottom:48px;animation:fadeUp .9s ease both;animation-delay:.4s}
.hero-actions{display:flex;gap:14px;align-items:center;flex-wrap:wrap;animation:fadeUp .9s ease both;animation-delay:.55s}
.btn-primary{background:var(--sage-deep);color:var(--cream);border:none;padding:15px 36px;border-radius:3px;font-family:var(--ff-b);font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:background .2s;font-weight:500}
.btn-primary:hover{background:#243D30}
.btn-ghost{background:transparent;border:1.5px solid var(--sand);color:var(--charcoal);padding:13px 30px;border-radius:3px;font-family:var(--ff-b);font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;opacity:.7}
.btn-ghost:hover{border-color:var(--sage);opacity:1}
.hero-right{position:relative;overflow:hidden;animation:fadeIn 1.2s ease both;animation-delay:.2s}
.hero-img{width:100%;height:100%;object-fit:cover;object-position:center 20%;filter:brightness(.92) saturate(.9)}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(46,80,64,.15) 0%,transparent 60%)}
.hero-float-card{position:absolute;bottom:40px;left:-20px;background:var(--cream);border-radius:4px;padding:18px 22px;box-shadow:0 8px 32px rgba(0,0,0,.1);animation:fadeUp 1s ease both;animation-delay:.8s}
.hfc-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--sage);margin-bottom:5px}
.hfc-value{font-family:var(--ff-d);font-size:15px;color:var(--sage-deep)}
.hero-clover-mark{position:absolute;top:32px;right:32px;opacity:.12}
@media(max-width:900px){
  .hero{grid-template-columns:1fr;min-height:auto}
  .hero-left{padding:56px 24px 48px}
  .hero-right{height:85vw;min-height:320px}
  .hero-float-card{left:16px;bottom:20px;padding:12px 16px}
  .hfc-value{font-size:12px}
}

/* MARQUEE */
.marquee-wrap{background:var(--sage-deep);overflow:hidden;padding:16px 0}
.marquee-track{display:flex;white-space:nowrap;animation:scroll 28s linear infinite}
.marquee-item{font-family:var(--ff-d);font-size:18px;font-style:italic;font-weight:300;color:rgba(255,255,255,.5);padding:0 32px}
.marquee-dot{color:var(--terra);font-style:normal}

/* SECTIONS */
.section{padding:120px 56px}
@media(max-width:768px){.section{padding:72px 24px}}
.s-eyebrow{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--sage);margin-bottom:14px;display:flex;align-items:center;gap:10px}
.s-eyebrow::before{content:'';width:22px;height:1px;background:var(--sage)}
.s-title{font-family:var(--ff-d);font-size:clamp(30px,4vw,56px);font-weight:300;color:var(--sage-deep);line-height:1.1;margin-bottom:16px}
.s-title em{font-style:italic;color:var(--terra)}
.s-body{font-size:14px;font-weight:300;line-height:1.85;color:var(--charcoal);opacity:.65;max-width:520px}

/* HERO VOOR WIE blokjes */
.hero-voor-wie{display:flex;flex-direction:column;gap:16px;margin-bottom:40px}
.hero-blok{padding:16px 20px;border-left:2px solid var(--sage-light);background:rgba(77,122,94,.05);border-radius:0 6px 6px 0}
.hero-blok-label{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--sage);margin-bottom:5px;font-weight:500}
.hero-blok-text{font-size:13px;font-weight:300;line-height:1.7;color:var(--charcoal);opacity:.75}

/* RESET INTRO */
.reset-intro{max-width:640px;padding-bottom:56px;border-bottom:1px solid var(--sand);margin-bottom:0;opacity:.9}
.reset-title{font-family:var(--ff-d);font-size:clamp(28px,3.5vw,46px);font-weight:300;color:var(--sage-deep);line-height:1.15;margin-bottom:24px}
.reset-body{font-size:14px;font-weight:300;line-height:1.85;color:var(--charcoal);opacity:.7}
.reset-accent{font-family:var(--ff-d);font-size:22px;font-style:italic;color:var(--sage);margin-top:24px;margin-bottom:24px}
.btn-reset{background:transparent;border:1.5px solid var(--sage);color:var(--sage);padding:12px 28px;border-radius:3px;font-family:var(--ff-b);font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:all .2s}
.btn-reset:hover{background:var(--sage);color:var(--cream)}

.klaver-section{background:var(--linen)}
.klaver-inner{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
@media(max-width:900px){.klaver-inner{grid-template-columns:1fr;gap:40px}}
.klaver-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--sand);border:1px solid var(--sand);border-radius:12px;overflow:hidden}
.klaver-cell{background:var(--linen);padding:28px;transition:background .3s}
.klaver-cell:hover{background:var(--cream)}
@media(max-width:500px){.klaver-cell{padding:18px}}
.kc-num{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--sand);margin-bottom:12px}
.kc-icon{margin-bottom:12px;font-size:20px;color:var(--sage)}
.kc-title{font-family:var(--ff-d);font-size:22px;font-weight:400;color:var(--sage-deep);margin-bottom:8px}
.kc-body{font-size:12px;font-weight:300;line-height:1.7;color:var(--charcoal);opacity:.65}
.klaver-center{display:flex;justify-content:center;align-items:center}
@media(max-width:900px){.klaver-center{display:none}}

/* PLANS */
.plans-section{background:var(--linen)}
.plans-header{text-align:center;margin-bottom:56px}
.plans-eyebrow{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--sage);margin-bottom:14px;display:flex;align-items:center;justify-content:center;gap:10px}
.plans-title{font-family:var(--ff-d);font-size:clamp(30px,4vw,56px);font-weight:300;color:var(--sage-deep);line-height:1.1;margin-bottom:16px}
.plans-title em{font-style:italic;color:var(--terra)}
.plans-body{font-size:14px;font-weight:300;line-height:1.85;color:var(--charcoal);opacity:.6;max-width:480px;margin:0 auto}

/* Duration toggle */
.dur-toggle{display:flex;align-items:center;justify-content:center;gap:4px;margin-bottom:48px}
.dur-pill{background:rgba(0,0,0,.07);border-radius:30px;padding:4px;display:flex;gap:2px}
.dur-btn{padding:8px 20px;border-radius:24px;border:none;background:transparent;font-family:var(--ff-b);font-size:11px;letter-spacing:.08em;cursor:pointer;color:var(--charcoal);opacity:.5;transition:all .2s;white-space:nowrap}
.dur-btn.active{background:var(--sage-deep);color:var(--cream);font-weight:500;opacity:1}
.dur-best{background:rgba(184,101,74,.15);color:var(--terra);font-size:10px;padding:3px 10px;border-radius:10px;letter-spacing:.06em;margin-left:8px}

/* Plan cards */
.plans-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media(max-width:900px){.plans-grid{grid-template-columns:1fr;max-width:420px;margin:0 auto}}
.plan-card{background:var(--sage-deep);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:32px 28px;transition:background .3s;position:relative}
.plan-card:hover{background:#243D30}
.plan-card:hover .plan-name{color:var(--terra)}
.plan-card.featured{background:var(--sage-deep);border-color:rgba(255,255,255,.08)}
.plan-badge-wrap{height:28px;display:flex;align-items:center;margin-bottom:16px}
.plan-badge{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--sage-deep);background:var(--sage-light);padding:4px 12px;border-radius:10px;display:inline-block;font-weight:500}
.plan-name{font-family:var(--ff-d);font-size:32px;font-weight:400;color:var(--cream);margin-bottom:4px;letter-spacing:.04em;text-transform:uppercase}
.plan-tagline{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--sage-light);margin-bottom:10px}
.plan-desc{font-size:12px;font-weight:300;color:rgba(255,255,255,.5);line-height:1.6;margin-bottom:20px;min-height:36px}
.plan-price-wrap{margin-bottom:20px}
.plan-price{font-family:var(--ff-d);font-size:48px;font-weight:400;color:var(--cream);line-height:1}
.plan-price-sub{font-size:12px;color:rgba(255,255,255,.4);font-weight:300;margin-top:4px}
.plan-price-best{display:inline-block;font-size:9px;letter-spacing:.1em;text-transform:uppercase;background:rgba(184,101,74,.25);color:var(--terra);padding:3px 8px;border-radius:4px;margin-top:6px}
.plan-divider{height:1px;background:rgba(255,255,255,.08);margin:20px 0}
.plan-features{list-style:none}
.plan-feature{font-size:12px;font-weight:300;padding:7px 0;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.05);gap:8px}
.plan-feature:last-child{border:none}
.pf-label{color:rgba(255,255,255,.5)}
.pf-val{color:var(--cream);font-weight:400;font-size:11px;text-align:right}
.pf-check{color:var(--sage-light);font-size:13px}
.pf-dash{color:rgba(255,255,255,.2)}

/* Plans bottom */
.plans-bottom{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--sand);border-radius:10px;overflow:hidden;margin-top:32px}
@media(max-width:900px){.plans-bottom{grid-template-columns:1fr}}
.pb-cell{background:var(--cream);padding:24px 28px;text-align:center}
.pb-dur{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--sage);margin-bottom:8px}
.pb-desc{font-size:12px;font-weight:300;color:var(--charcoal);opacity:.6;line-height:1.6}
.plans-footnote{text-align:center;margin-top:20px;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--charcoal);opacity:.35}
.plans-cta{text-align:center;margin-top:40px}
.btn-cream{background:var(--sage-deep);color:var(--cream);border:none;padding:15px 40px;border-radius:3px;font-family:var(--ff-b);font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;font-weight:500;transition:background .2s}
.btn-cream:hover{background:#243D30}

/* AANBOD */
.services-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:56px}
@media(max-width:1100px){.services-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:500px){.services-grid{grid-template-columns:1fr}}
.svc-card{border-radius:10px;overflow:hidden;cursor:pointer;position:relative;transition:transform .3s}
.svc-card:hover{transform:translateY(-4px)}
.svc-img-wrap{height:260px;overflow:hidden;position:relative}
@media(max-width:768px){.svc-img-wrap{height:200px}}
.svc-img{width:100%;height:100%;object-fit:cover;transition:transform .5s;filter:brightness(.82) saturate(.8)}
.svc-card:hover .svc-img{transform:scale(1.04)}
.svc-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(46,80,64,.8) 0%,transparent 55%)}
.svc-content{position:absolute;bottom:0;left:0;right:0;padding:24px 20px}
.svc-tag{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:6px}
.svc-name{font-family:var(--ff-d);font-size:22px;font-weight:400;color:white;line-height:1.2;margin-bottom:4px}
.svc-meta{font-size:11px;color:rgba(255,255,255,.55);font-weight:300}

/* PHOTO INTERLUDE */
.interlude{padding:0 56px;display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px;height:460px}
@media(max-width:900px){.interlude{grid-template-columns:1fr 1fr;height:260px;padding:0 24px}}
@media(max-width:500px){.interlude{grid-template-columns:1fr;height:240px}}
.int-img{overflow:hidden;border-radius:10px}
.int-img img{width:100%;height:100%;object-fit:cover;filter:brightness(.9) saturate(.8);transition:transform .6s}
.int-img:hover img{transform:scale(1.03)}

/* TEAM */
.team-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:56px;max-width:800px}
@media(max-width:700px){.team-grid{grid-template-columns:1fr}}
.team-card{border-radius:10px;overflow:hidden;background:var(--linen)}
.team-img-wrap{height:340px;overflow:hidden}
@media(max-width:768px){.team-img-wrap{height:300px}}
.team-img{width:100%;height:100%;object-fit:cover;object-position:center 15%;filter:brightness(.9) saturate(.8);transition:transform .5s}
.team-card:hover .team-img{transform:scale(1.03)}
.team-info{padding:24px 26px 28px}
.team-name{font-family:var(--ff-d);font-size:26px;font-weight:400;color:var(--sage-deep);margin-bottom:6px}
.team-role{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--sage);margin-bottom:12px}
.team-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.team-tag{font-size:9px;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;background:rgba(77,122,94,.1);color:var(--sage);border-radius:2px}
.team-bio{font-size:12px;font-weight:300;line-height:1.7;color:var(--charcoal);opacity:.65}

/* AVOND BANNER */
.avond-banner{margin:0 56px;border-radius:14px;overflow:hidden;position:relative;height:400px}
@media(max-width:768px){.avond-banner{margin:0 24px;height:280px}}
.avond-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.45) saturate(.7)}
.avond-content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:32px 24px}
.avond-eyebrow{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:16px}
.avond-title{font-family:var(--ff-d);font-size:clamp(28px,5vw,64px);font-weight:300;color:white;line-height:1.1;margin-bottom:20px}
.avond-title em{font-style:italic;color:var(--sand)}
.avond-sub{font-size:13px;font-weight:300;color:rgba(255,255,255,.6);max-width:440px;line-height:1.7;margin-bottom:32px}
.btn-outline-white{background:transparent;border:1.5px solid rgba(255,255,255,.4);color:white;padding:13px 32px;border-radius:3px;font-family:var(--ff-b);font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}
.btn-outline-white:hover{border-color:white}

/* FOOTER */
.footer{background:var(--charcoal);padding:64px 56px 40px}
@media(max-width:768px){.footer{padding:48px 24px 32px}}
.footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:56px}
@media(max-width:900px){.footer-top{grid-template-columns:1fr 1fr;gap:32px}}
@media(max-width:500px){.footer-top{grid-template-columns:1fr}}
.footer-logo{display:flex;align-items:center;gap:10px;margin-bottom:16px}
.footer-logo-text{font-family:var(--ff-d);font-size:18px;color:rgba(255,255,255,.8);letter-spacing:.04em}
.footer-tagline{font-size:12px;font-weight:300;color:rgba(255,255,255,.35);line-height:1.7;max-width:240px;margin-bottom:24px}
.footer-social{display:flex;gap:12px}
.social-btn{width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:11px;color:rgba(255,255,255,.45);cursor:pointer;transition:all .2s}
.social-btn:hover{border-color:rgba(255,255,255,.4);color:rgba(255,255,255,.8)}
.footer-col-title{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:18px}
.footer-links{list-style:none}
.footer-link{font-size:12px;font-weight:300;color:rgba(255,255,255,.45);padding:5px 0;cursor:pointer;transition:color .2s;display:block}
.footer-link:hover{color:rgba(255,255,255,.8)}
.footer-bottom{border-top:1px solid rgba(255,255,255,.06);padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
.footer-copy{font-size:11px;color:rgba(255,255,255,.25)}
.footer-legal{display:flex;gap:24px;flex-wrap:wrap}
.footer-legal a{font-size:11px;color:rgba(255,255,255,.25);cursor:pointer;transition:color .2s}
.footer-legal a:hover{color:rgba(255,255,255,.5)}
`;

// Leaf path — organic, rounded, with deep centre notch
const LEAF = ["M 0 0","C -3 -1 -27 -7 -24 -21","C -21 -32 -13 -47 -7 -45","C -3 -43 -1 -37 0 -32","C 1 -37 3 -43 7 -45","C 13 -47 21 -32 24 -21","C 27 -7 3 -1 0 0","Z"].join(" ");
const VEIN_MID = "M 0 -2 C 0 -12 0 -22 0 -31";
const VEIN_L   = "M -1 -16 Q -12 -25 -13 -36";
const VEIN_R   = "M  1 -16 Q  12 -25  13 -36";

// variant: "filled" | "outline"
// filled = green gradient (nav, footer, float card, standalone)
// outline = subtle stroke only (watermarks, dark section hints)
function CloverLogo({ size = 28, variant = "filled", opacity = 1 }) {
  const cx = 100, cy = 108;
  const rots = [135, 225, 45, 315];
  const isFilled = variant === "filled";
  return (
    <svg
      width={size}
      height={Math.round(size * 1.34)}
      viewBox="0 0 200 268"
      fill="none"
      style={{ opacity, flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="g-sage" x1="25%" y1="5%" x2="75%" y2="95%">
          <stop offset="0%" stopColor="#9DC4AE"/>
          <stop offset="100%" stopColor="#1B3E2C"/>
        </linearGradient>
      </defs>
      {rots.map((rot, i) => (
        <g key={i} transform={`translate(${cx},${cy}) rotate(${rot})`}>
          <path d={LEAF}
            fill={isFilled ? "url(#g-sage)" : "none"}
            stroke={isFilled ? "none" : "#2E5040"}
            strokeWidth={isFilled ? 0 : 2}
            strokeLinejoin="round"
          />
          <path d={VEIN_MID} fill="none" stroke={isFilled ? "rgba(255,255,255,0.28)" : "rgba(46,80,64,0.25)"} strokeWidth="0.85" strokeLinecap="round"/>
          <path d={VEIN_L}   fill="none" stroke={isFilled ? "rgba(255,255,255,0.22)" : "rgba(46,80,64,0.2)"} strokeWidth="0.6" strokeLinecap="round" opacity="0.75"/>
          <path d={VEIN_R}   fill="none" stroke={isFilled ? "rgba(255,255,255,0.22)" : "rgba(46,80,64,0.2)"} strokeWidth="0.6" strokeLinecap="round" opacity="0.75"/>
        </g>
      ))}
      <path
        d={`M ${cx} ${cy+4} Q ${cx+10} ${cy+58} ${cx-6} ${cy+126}`}
        fill="none"
        stroke={isFilled ? "#1B3E2C" : "#2E5040"}
        strokeWidth={isFilled ? 2.2 : 1.8}
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

// Cream version for dark backgrounds
function CloverLogoCream({ size = 28, opacity = 1 }) {
  const cx = 100, cy = 108;
  const rots = [135, 225, 45, 315];
  return (
    <svg width={size} height={Math.round(size*1.34)} viewBox="0 0 200 268" fill="none" style={{opacity,flexShrink:0}}>
      {rots.map((rot,i) => (
        <g key={i} transform={`translate(${cx},${cy}) rotate(${rot})`}>
          <path d={LEAF} fill="rgba(244,239,230,0.9)" strokeLinejoin="round"/>
          <path d={VEIN_MID} fill="none" stroke="rgba(46,80,64,0.2)" strokeWidth="0.85" strokeLinecap="round"/>
        </g>
      ))}
      <path d={`M ${cx} ${cy+4} Q ${cx+10} ${cy+58} ${cx-6} ${cy+126}`} fill="none" stroke="rgba(244,239,230,0.7)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

const COACHES = [
  { name:"Daniel Vissers", role:"Lifecoach & Theaterdocent", tags:["Positieve Psychologie","Sport","Theater"], bio:"Trainer in positieve psychologie, lifecoach en theaterdocent met een rijke achtergrond in sport. Daniel begeleidt je naar meer bewustzijn en authenticiteit.", img:"/daniel.jpg" },
  { name:"Raphael Dollart", role:"Socioloog & Lifecoach", tags:["Sociologie","Social Work","Kunst"], bio:"Socioloog, hogeschooldocent Social Work en lifecoach. Raphael verbindt wetenschap met praktijk en begeleidt je naar jouw gewenste staat van zijn.", img:"/raphael.jpg" },
];

const PLANS = [
  {
    name: "Core", slug:"core", featured: false,
    tagline: "Ritme & Consistentie",
    desc: "Voor wie een stevig fundament wil bouwen.",
    sessions: "2× per week",
    features: [
      { l: "Toegang tot sessies", v: "2× per week" },
      { l: "Morning Intentions",  v: false },
      { l: "Personal Coaching",   v: false },
      { l: "Reading",             v: false },
      { l: "Community Events",    v: true },
    ],
    prices: { m1: 119, m3: 109, m6: 99 },
  },
  {
    name: "Flow", slug:"flow", featured: true,
    tagline: "Verdieping & Integratie",
    desc: "Voor wie meer ruimte wil creëren en dieper wil groeien.",
    sessions: "3× per week",
    features: [
      { l: "Toegang tot sessies", v: "3× per week" },
      { l: "Morning Intentions",  v: true },
      { l: "Personal Coaching",   v: false },
      { l: "Reading",             v: false },
      { l: "Community Events",    v: true },
    ],
    prices: { m1: 149, m3: 139, m6: 129 },
  },
  {
    name: "State", slug:"state", featured: false,
    tagline: "Transformatie & Persoonlijke Aandacht",
    desc: "Voor wie volledig wil gaan en kiest voor blijvende verandering.",
    sessions: "Onbeperkt",
    features: [
      { l: "Toegang tot sessies", v: "Onbeperkt" },
      { l: "Morning Intentions",  v: true },
      { l: "Personal Coaching",   v: "1× per maand" },
      { l: "Reading",             v: "1× per maand" },
      { l: "Community Events",    v: true },
    ],
    prices: { m1: 229, m3: 209, m6: 189 },
  },
];

const SERVICES = [
  { tag:"Persoonlijk", name:"1:1 Coaching", meta:"60–90 min · Op maat", img:"https://images.unsplash.com/photo-1602192509154-0b900ee1f851?auto=format&fit=crop&w=600&q=80" },
  { tag:"Groep", name:"Groepslessen", meta:"Ma · Wo · Vr · Ochtend & avond", img:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80" },
  { tag:"6-weekse cursus", name:"Wie ben ik?", meta:"Di of do · Max 12 deelnemers", img:"https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80" },
  { tag:"Bedrijven", name:"Teambuilding", meta:"Dagdeel · 3–4 uur · Op locatie", img:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80" },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay=0, style={} }) {
  const ref = useReveal();
  return <div ref={ref} className="reveal" style={{transitionDelay:`${delay}ms`,...style}}>{children}</div>;
}

const DURATIONS = [
  { key:"m1", label:"1 Maand",    sub:"Kennismaken" },
  { key:"m3", label:"3 Maanden",  sub:"Verdiepen" },
  { key:"m6", label:"6 Maanden",  sub:"Transformeren" },
];

function FeatureVal({ v }) {
  if (v === true)  return <span className="pf-check">✓</span>;
  if (v === false) return <span className="pf-dash">—</span>;
  return <span className="pf-val">{v}</span>;
}

function PlansToggle() {
  const [dur, setDur] = useState("m1");
  const isBest = dur === "m6";
  return (
    <div>
      <div className="dur-toggle">
        <div className="dur-pill">
          {DURATIONS.map(d=>(
            <button key={d.key} className={`dur-btn${dur===d.key?" active":""}`} onClick={()=>setDur(d.key)}>
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="plans-grid">
        {PLANS.map((p,i)=>(
          <div key={p.name} className={`plan-card${p.featured?" featured":""}`} style={{animationDelay:`${i*80}ms`}}>
            <div className="plan-badge-wrap">
              {p.featured && <span className="plan-badge">Meest gekozen</span>}
            </div>
            <div className="plan-name">{p.name}</div>
            <div className="plan-tagline">{p.tagline}</div>
            <div className="plan-desc">{p.desc}</div>
            <div className="plan-price-wrap">
              <div className="plan-price">€{p.prices[dur]}</div>
              <div className="plan-price-sub">{dur==="m1" ? "eenmalig" : "per maand"}</div>
            </div>
            <div className="plan-divider"/>
            <ul className="plan-features">
              {p.features.map(f=>(
                <li key={f.l} className="plan-feature">
                  <span className="pf-label">{f.l}</span>
                  <FeatureVal v={f.v}/>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="plans-bottom">
        {DURATIONS.map(d=>(
          <div key={d.key} className={`pb-cell${dur===d.key?" active":""}`}>
            <div className="pb-dur">{d.label} — {d.sub}</div>
            <div className="pb-desc">
              {d.key==="m1" && "Voor wie wil ervaren of dit bij je past."}
              {d.key==="m3" && "Voor wie echt wil verdiepen en een ritme wil opbouwen."}
              {d.key==="m6" && "Voor wie klaar is om te investeren in blijvende verandering."}
            </div>
          </div>
        ))}
      </div>

      <div className="plans-footnote">
        Alle memberships zijn maandelijks opzegbaar · Prijzen inclusief 21% BTW
      </div>
      <div className="plans-cta">
        <button className="btn-cream">Start jouw membership →</button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const NAV_LINKS = ["Ons verhaal","Aanbod","Team","Cursussen","Bedrijven"];

  return (
    <div>
      <style>{css}</style>

      {/* NAV */}
      <nav className={`nav${scrolled?" scrolled":""}`}>
        <div className="nav-logo"><CloverLogo size={32} variant="filled"/><span className="nav-logo-text">The Happy State</span></div>
        <div className="nav-links">{NAV_LINKS.map(l=><button key={l} className="nav-link">{l}</button>)}</div>
        <button className="nav-cta">Boek een sessie</button>
        <button className="nav-hamburger" onClick={()=>setMenuOpen(o=>!o)}><span/><span/><span/></button>
      </nav>
      <div className={`mobile-menu${menuOpen?" open":""}`}>
        {NAV_LINKS.map(l=><button key={l} className="mobile-link" onClick={()=>setMenuOpen(false)}>{l}</button>)}
        <button className="mobile-cta">Boek een sessie</button>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag"><span className="hero-tag-line"/>Rotterdam · Ontwikkelstudio</div>
          <h1 className="hero-h1">De sportschool voor je <em>binnenwereld.</em></h1>
          <div className="hero-voor-wie">
            <div className="hero-blok">
              <div className="hero-blok-label">Voor wie?</div>
              <div className="hero-blok-text">Voor de stedelijke professional die wil vertragen en weer in contact wil komen met zichzelf.</div>
            </div>
            <div className="hero-blok">
              <div className="hero-blok-label">Waarom?</div>
              <div className="hero-blok-text">Omdat je binnenwereld net zo belangrijk is als je succes aan de buitenkant.</div>
            </div>
          </div>
          <div className="hero-actions">
            <button className="btn-primary">Boek een sessie</button>
            <button className="btn-ghost">Plan een kennismaking</button>
          </div>
        </div>
        <div className="hero-right">
          <img className="hero-img" src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80" alt="The Happy State studio"/>
          <div className="hero-overlay"/>
          <div className="hero-clover-mark" style={{position:"absolute",top:24,right:24}}>
            <CloverLogo size={140} variant="outline" opacity={0.12}/>
          </div>
          <div className="hero-float-card">
            <div className="hfc-label">The Happy State</div>
            <div className="hfc-value">Verbind met wie je werkelijk bent</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_,i)=>(
            <span key={i} style={{display:"flex"}}>
              {["Creativiteit","Speelsheid","Actief","Energie","Authenticiteit","Verbinding","The Happy State","Rotterdam"].map(w=>(
                <span key={w} className="marquee-item">{w} <span className="marquee-dot">·</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* KLAVERBENADERING */}
      <section className="section klaver-section">
        <Reveal style={{marginBottom: 56}}>
          <div className="reset-intro">
            <h2 className="reset-title">Altijd "aan", maar zelden in balans?</h2>
            <p className="reset-body">In een wereld die altijd doorgaat stapelen prikkels, druk en verwachtingen zich op. Je blijft presteren, maar raakt langzaam de connectie met jezelf kwijt.</p>
            <p className="reset-body" style={{marginTop:16}}>Waar de meeste sportscholen zich richten op het fysieke, draait het bij The Happy State om jouw binnenwereld. Een plek waar je niet alleen beweegt, maar ook vertraagt, oplaadt en weer helder wordt.</p>
            <p className="reset-accent">Meer rust. Meer focus. Meer jij.</p>
            <button className="btn-reset">Start jouw reset →</button>
          </div>
        </Reveal>
        <div className="klaver-inner">
          <Reveal>
            <div className="s-eyebrow">Onze werkwijze</div>
            <h2 className="s-title">De <em>klaver</em>benadering</h2>
            <p className="s-body" style={{marginBottom:40}}>Wij hebben een eigen werkwijze ontwikkeld, gebaseerd op wetenschappelijke inzichten: vier krachtige principes die samen werken aan één doel — jouw <em>Happy State</em>.</p>
            <div className="klaver-grid">
              {[{n:"01",title:"Creativiteit",icon:"✦",body:"Expressie en schepping bevorderen mentaal, emotioneel en lichamelijk welbevinden."},{n:"02",title:"Speelsheid",icon:"◈",body:"Lichtvoetigheid en spontaniteit leiden tot emotieregulatie en cognitieve flexibiliteit."},{n:"03",title:"Actief",icon:"◎",body:"Ervaringsleren — de diepste manier van leren door te beleven en te reflecteren."},{n:"04",title:"Energie",icon:"◇",body:"Bewustzijn en beheer van jouw energie leidt tot spiritueel en fysiek welbevinden."}].map(c=>(
                <div key={c.n} className="klaver-cell">
                  <div className="kc-num">{c.n}</div>
                  <div className="kc-icon">{c.icon}</div>
                  <div className="kc-title">{c.title}</div>
                  <div className="kc-body">{c.body}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}><div className="klaver-center"><CloverLogo size={380} variant="filled" opacity={0.9}/></div></Reveal>
        </div>
      </section>

      {/* MEMBERSHIPS */}
      <section className="section plans-section" style={{position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-60,right:-60,pointerEvents:"none"}}>
          <CloverLogoCream size={320} opacity={0.05}/>
        </div>
        <div className="plans-header">
          <Reveal>
            <div className="plans-eyebrow">The Happy State</div>
            <h2 className="plans-title">Memberships</h2>
            <p className="plans-body">Kies het membership dat past bij jouw reis</p>
          </Reveal>
        </div>

        {/* Duration toggle */}
        <PlansToggle/>
      </section>

      {/* AANBOD */}
      <section className="section" style={{paddingBottom:60}}>
        <Reveal>
          <div className="s-eyebrow">Aanbod</div>
          <h2 className="s-title">Wat we <em>bieden</em></h2>
          <p className="s-body">Van persoonlijke coaching tot teambuilding voor organisaties.</p>
        </Reveal>
        <div className="services-grid">
          {SERVICES.map((s,i)=>(
            <Reveal key={s.name} delay={i*80}>
              <div className="svc-card">
                <div className="svc-img-wrap">
                  <img className="svc-img" src={s.img} alt={s.name}/>
                  <div className="svc-overlay"/>
                  <div className="svc-content">
                    <div className="svc-tag">{s.tag}</div>
                    <div className="svc-name">{s.name}</div>
                    <div className="svc-meta">{s.meta}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PHOTO INTERLUDE */}
      <Reveal>
        <div className="interlude">
          <div className="int-img"><img src="https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?auto=format&fit=crop&w=900&q=80" alt="Meditatie"/></div>
          <div className="int-img"><img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80" alt="Rust"/></div>
          <div className="int-img"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?auto=format&fit=crop&w=600&q=80" alt="Ruimte"/></div>
        </div>
      </Reveal>

      {/* TEAM */}
      <section className="section">
        <Reveal>
          <div className="s-eyebrow">Het team</div>
          <h2 className="s-title">Twee <em>coaches</em>,<br/>één verhaal</h2>
          <p className="s-body">Elk met hun eigen specialiteit, samen vormen zij The Happy State.</p>
        </Reveal>
        <div className="team-grid">
          {COACHES.map((c,i)=>(
            <Reveal key={c.name} delay={i*100}>
              <div className="team-card">
                <div className="team-img-wrap"><img className="team-img" src={c.img} alt={c.name}/></div>
                <div className="team-info">
                  <div className="team-name">{c.name}</div>
                  <div className="team-role">{c.role}</div>
                  <div className="team-tags">{c.tags.map(t=><span key={t} className="team-tag">{t}</span>)}</div>
                  <div className="team-bio">{c.bio}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* AVOND BANNER */}
      <section className="section" style={{paddingTop:0}}>
        <Reveal>
          <div className="avond-banner">
            <img className="avond-img" src="https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?auto=format&fit=crop&w=1400&q=80" alt="Avond"/>
            <div className="avond-content">
              <div className="avond-eyebrow">Speciaal evenement</div>
              <h2 className="avond-title">Een avond met<br/><em>The Happy State</em></h2>
              <p className="avond-sub">Een interactief avondvullend programma met storytelling, muziek, zang en dans.</p>
              <button className="btn-outline-white">Blijf op de hoogte →</button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="footer" style={{position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",bottom:-40,right:-40,opacity:.04,pointerEvents:"none"}}>
          <CloverLogoCream size={280}/>
        </div>
        <div className="footer-top">
          <div>
            <div className="footer-logo"><CloverLogoCream size={24} opacity={0.75}/><span className="footer-logo-text">The Happy State</span></div>
            <p className="footer-tagline">Jouw vaste plek om te vertragen, te verdiepen en te groeien. Rotterdam.</p>
            <div className="footer-social">{["in","ig","yt"].map(s=><div key={s} className="social-btn">{s}</div>)}</div>
          </div>
          {[{title:"Navigeer",links:["Ons verhaal","De klaverbenadering","Aanbod","Team","Contact"]},{title:"Boeken",links:["Proefles","Groepslessen","1:1 Coaching","Wie ben ik?","Abonnementen"]},{title:"Bedrijven",links:["Teambuilding","Workshops","Trainingen","Offerte aanvragen"]}].map(col=>(
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <ul className="footer-links">{col.links.map(l=><li key={l}><a className="footer-link">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 The Happy State · Rotterdam. Alle rechten voorbehouden.</span>
          <div className="footer-legal"><a>Privacybeleid</a><a>Algemene voorwaarden</a><a>Cookies</a></div>
        </div>
      </footer>
    </div>
  );
}