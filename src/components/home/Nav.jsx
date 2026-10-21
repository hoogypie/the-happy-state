"use client";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { CloverLogo } from "./ui";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`} aria-label="Hoofdmenu">
        <a href="#top" className="nav-logo" onClick={close}>
          <CloverLogo size={34} />
          <span>The Happy State</span>
        </a>
        <div className="nav-links">
          {nav.links.map((l) => (
            <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </div>
        <a href={nav.cta.href} data-onderwerp={nav.cta.onderwerp} className="btn btn-primair nav-cta">
          {nav.cta.label}
        </a>
        <button
          className={`nav-burger${open ? " open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
        {nav.links.map((l) => (
          <a key={l.label} href={l.href} className="mobile-link" onClick={close} tabIndex={open ? 0 : -1}>
            {l.label}
          </a>
        ))}
        <a
          href={nav.cta.href}
          data-onderwerp={nav.cta.onderwerp}
          className="btn btn-primair"
          onClick={close}
          tabIndex={open ? 0 : -1}
        >
          {nav.cta.label}
        </a>
      </div>
    </>
  );
}
