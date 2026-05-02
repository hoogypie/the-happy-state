"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const PLANS = [
  {
    name: "Core", slug: "core",
    tagline: "Ritme & Consistentie",
    desc: "Voor wie een stevig fundament wil bouwen.",
    features: ["Toegang tot sessies 2× per week", "Community Events"],
    prices: { m1: 119, m3: 109, m6: 99 },
  },
  {
    name: "Flow", slug: "flow", featured: true,
    tagline: "Verdieping & Integratie",
    desc: "Voor wie meer ruimte wil creëren en dieper wil groeien.",
    features: ["Toegang tot sessies 3× per week", "Morning Intentions", "Community Events"],
    prices: { m1: 149, m3: 139, m6: 129 },
  },
  {
    name: "State", slug: "state",
    tagline: "Transformatie & Persoonlijke Aandacht",
    desc: "Voor wie volledig wil gaan en kiest voor blijvende verandering.",
    features: ["Onbeperkte toegang", "Morning Intentions", "Community Events", "Personal Coaching 1×/mnd", "Reading 1×/mnd"],
    prices: { m1: 229, m3: 209, m6: 189 },
  },
];

const DURATIONS = [
  { key: "m1", label: "1 Maand" },
  { key: "m3", label: "3 Maanden" },
  { key: "m6", label: "6 Maanden" },
];

export default function MembershipPage() {
  const [dur, setDur] = useState("m1");
  const [loading, setLoading] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) window.location.href = "/login";
      else setUser(user);
    });
  }, []);

  async function handleCheckout(plan: string) {
    if (!user) return;
    setLoading(plan);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, duration: dur, userId: user.id, email: user.email }),
      });
      const data = await res.json();
      if (data.checkoutUrl) window.location.href = data.checkoutUrl;
      else alert("Er ging iets mis. Probeer opnieuw.");
    } catch {
      alert("Er ging iets mis. Probeer opnieuw.");
    }
    setLoading(null);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#EDE7D9", fontFamily: "'Jost',sans-serif", padding: "80px 24px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
      `}</style>

      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <a href="/dashboard" style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "#4D7A5E", textDecoration: "none", display: "inline-block", marginBottom: 24 }}>← Terug naar dashboard</a>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, fontWeight: 300, color: "#2E5040", marginBottom: 12 }}>Kies jouw lidmaatschap</h1>
          <p style={{ fontSize: 14, fontWeight: 300, color: "#1E2420", opacity: .6 }}>Maandelijks opzegbaar · Prijzen inclusief BTW</p>
        </div>

        {/* Duration toggle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div style={{ background: "rgba(0,0,0,.06)", borderRadius: 30, padding: 4, display: "flex", gap: 2 }}>
            {DURATIONS.map(d => (
              <button key={d.key} onClick={() => setDur(d.key)}
                style={{ padding: "8px 20px", borderRadius: 24, border: "none", background: dur === d.key ? "#2E5040" : "transparent", color: dur === d.key ? "#F4EFE6" : "#1E2420", fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: ".08em", cursor: "pointer", opacity: dur === d.key ? 1 : .5, transition: "all .2s" }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {PLANS.map(p => (
            <div key={p.slug} style={{ background: "#2E5040", borderRadius: 12, padding: "32px 28px", border: p.featured ? "2px solid rgba(255,255,255,.3)" : "1px solid rgba(255,255,255,.08)", position: "relative" }}>
              {p.featured && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#8AAF96", color: "#1B3E2C", fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 10, fontWeight: 500, whiteSpace: "nowrap" }}>
                  Meest gekozen
                </div>
              )}
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, color: "#F4EFE6", letterSpacing: ".04em", textTransform: "uppercase", marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: "#8AAF96", marginBottom: 8 }}>{p.tagline}</div>
              <div style={{ fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,.5)", marginBottom: 20, lineHeight: 1.6 }}>{p.desc}</div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 16, marginBottom: 20 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", fontSize: 12, fontWeight: 300 }}>
                    <span style={{ color: "#8AAF96" }}>✓</span>
                    <span style={{ color: "rgba(255,255,255,.6)" }}>{f}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, color: "#F4EFE6", lineHeight: 1 }}>€{p.prices[dur as keyof typeof p.prices]}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 4 }}>{dur === "m1" ? "eenmalig" : "per maand"}</div>
              </div>

              <button onClick={() => handleCheckout(p.slug)} disabled={loading === p.slug}
                style={{ width: "100%", background: loading === p.slug ? "rgba(255,255,255,.2)" : "#F4EFE6", color: "#2E5040", border: "none", padding: 14, borderRadius: 6, fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", fontWeight: 500, transition: "background .2s" }}>
                {loading === p.slug ? "Bezig..." : "Starten →"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
