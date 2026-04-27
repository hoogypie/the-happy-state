import { useState } from "react";

/* ─── DESIGN TOKENS ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream:      #F4EFE6;
    --linen:      #EDE7D9;
    --sand:       #C9B99A;
    --sage-light: #8AAF96;
    --sage:       #4D7A5E;
    --sage-deep:  #2E5040;
    --terra:      #B8654A;
    --charcoal:   #1E2420;
    --error:      #C0392B;
    --ff-display: 'Cormorant Garamond', serif;
    --ff-body:    'Jost', sans-serif;
  }

  body { background: var(--cream); font-family: var(--ff-body); color: var(--charcoal); }

  /* ── Layout ── */
  .flow-page {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 420px;
  }
  @media (max-width: 900px) {
    .flow-page { grid-template-columns: 1fr; }
    .flow-sidebar { display: none; }
  }

  /* ── Sidebar ── */
  .flow-sidebar {
    background: var(--sage-deep);
    padding: 60px 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: sticky;
    top: 0;
    height: 100vh;
  }
  .sidebar-logo {
    font-family: var(--ff-display);
    font-size: 20px;
    color: var(--cream);
    letter-spacing: .06em;
    margin-bottom: 60px;
  }
  .sidebar-steps { flex: 1; }
  .sidebar-step {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,.06);
  }
  .step-circle {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    color: rgba(255,255,255,.4);
    flex-shrink: 0;
    margin-top: 2px;
    transition: all .3s;
  }
  .step-circle.active {
    background: var(--terra);
    border-color: var(--terra);
    color: white;
  }
  .step-circle.done {
    background: var(--sage);
    border-color: var(--sage);
    color: white;
  }
  .step-info {}
  .step-name {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,.4);
    letter-spacing: .04em;
    transition: color .3s;
  }
  .step-name.active { color: var(--cream); }
  .step-name.done   { color: var(--sage-light); }
  .step-sub {
    font-size: 11px;
    color: rgba(255,255,255,.25);
    margin-top: 2px;
    font-weight: 300;
  }
  .sidebar-quote {
    font-family: var(--ff-display);
    font-size: 18px;
    font-style: italic;
    color: rgba(255,255,255,.35);
    line-height: 1.5;
    margin-top: 40px;
  }

  /* ── Main content ── */
  .flow-main {
    padding: 60px 56px;
    max-width: 640px;
  }
  @media (max-width: 900px) { .flow-main { padding: 40px 24px; max-width: 100%; } }

  .flow-eyebrow {
    font-size: 11px;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--sage);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .flow-eyebrow::before {
    content: '';
    display: block;
    width: 24px;
    height: 1px;
    background: var(--sage);
  }
  .flow-title {
    font-family: var(--ff-display);
    font-size: clamp(32px, 4vw, 46px);
    font-weight: 300;
    color: var(--sage-deep);
    line-height: 1.1;
    margin-bottom: 10px;
  }
  .flow-title em { font-style: italic; color: var(--terra); }
  .flow-subtitle {
    font-size: 14px;
    font-weight: 300;
    color: var(--charcoal);
    opacity: .65;
    line-height: 1.7;
    margin-bottom: 40px;
    max-width: 480px;
  }

  /* ── Billing toggle ── */
  .billing-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
  }
  .billing-pill {
    background: var(--linen);
    border-radius: 30px;
    padding: 4px;
    display: flex;
    gap: 2px;
  }
  .billing-btn {
    padding: 7px 20px;
    border-radius: 24px;
    border: none;
    background: transparent;
    font-family: var(--ff-body);
    font-size: 12px;
    letter-spacing: .06em;
    cursor: pointer;
    color: var(--charcoal);
    opacity: .5;
    transition: all .2s;
  }
  .billing-btn.active {
    background: var(--sage-deep);
    color: var(--cream);
    opacity: 1;
  }
  .saving-tag {
    background: rgba(77,122,94,.12);
    color: var(--sage);
    font-size: 11px;
    padding: 4px 12px;
    border-radius: 20px;
    letter-spacing: .06em;
  }

  /* ── Plan cards ── */
  .plans-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-bottom: 32px;
  }
  @media (max-width: 600px) { .plans-grid { grid-template-columns: 1fr; } }

  .plan-card {
    background: white;
    border: 1.5px solid var(--linen);
    border-radius: 10px;
    padding: 22px 18px;
    cursor: pointer;
    transition: border-color .2s, box-shadow .2s;
    position: relative;
  }
  .plan-card:hover { border-color: var(--sand); }
  .plan-card.selected {
    border-color: var(--sage);
    box-shadow: 0 0 0 3px rgba(77,122,94,.1);
  }
  .plan-card.featured { border-color: var(--sage-light); }
  .plan-badge {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--sage);
    color: var(--cream);
    font-size: 9px;
    letter-spacing: .1em;
    text-transform: uppercase;
    padding: 3px 12px;
    border-radius: 10px;
    white-space: nowrap;
  }
  .plan-name {
    font-family: var(--ff-display);
    font-size: 20px;
    color: var(--sage-deep);
    margin-bottom: 14px;
    margin-top: 6px;
  }
  .plan-price {
    font-family: var(--ff-display);
    font-size: 30px;
    color: var(--charcoal);
    margin-bottom: 2px;
  }
  .plan-price span { font-size: 14px; font-weight: 300; color: var(--sand); }
  .plan-yearly-note {
    font-size: 10px;
    color: var(--sage);
    margin-bottom: 16px;
    letter-spacing: .04em;
  }
  .plan-divider {
    height: 1px;
    background: var(--linen);
    margin-bottom: 14px;
  }
  .plan-features { list-style: none; }
  .plan-feature {
    font-size: 11px;
    color: var(--charcoal);
    opacity: .7;
    padding: 4px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 300;
  }
  .feat-check {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--sage);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    flex-shrink: 0;
  }
  .feat-dash {
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sand);
    font-size: 12px;
    flex-shrink: 0;
  }

  /* ── Form ── */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  .form-grid.full { grid-template-columns: 1fr; }
  @media (max-width: 500px) { .form-grid { grid-template-columns: 1fr; } }

  .field { display: flex; flex-direction: column; gap: 7px; }
  .field label {
    font-size: 11px;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--sage);
    font-weight: 500;
  }
  .field input {
    background: white;
    border: 1.5px solid var(--linen);
    border-radius: 6px;
    padding: 12px 14px;
    font-family: var(--ff-body);
    font-size: 14px;
    font-weight: 300;
    color: var(--charcoal);
    outline: none;
    transition: border-color .2s;
  }
  .field input:focus { border-color: var(--sage); }
  .field input.err   { border-color: var(--error); }
  .field-error { font-size: 11px; color: var(--error); margin-top: -4px; }

  .pw-rules {
    background: var(--linen);
    border-radius: 6px;
    padding: 12px 14px;
    margin-top: -8px;
    margin-bottom: 4px;
  }
  .pw-rule {
    font-size: 11px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 2px 0;
    color: var(--charcoal);
    opacity: .5;
    transition: opacity .2s, color .2s;
  }
  .pw-rule.ok { opacity: 1; color: var(--sage); }
  .pw-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }

  /* ── Order summary ── */
  .summary-box {
    background: white;
    border: 1.5px solid var(--linen);
    border-radius: 10px;
    padding: 24px;
    margin-bottom: 28px;
  }
  .summary-title {
    font-size: 11px;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--sage);
    margin-bottom: 16px;
  }
  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid var(--linen);
    font-size: 13px;
  }
  .summary-row:last-child { border-bottom: none; }
  .summary-row .label { color: var(--charcoal); opacity: .6; font-weight: 300; }
  .summary-row .value { color: var(--charcoal); font-weight: 500; }
  .summary-row.total .label { opacity: 1; font-weight: 500; font-size: 14px; }
  .summary-row.total .value {
    font-family: var(--ff-display);
    font-size: 22px;
    color: var(--sage-deep);
  }

  .payment-methods {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  .method-badge {
    background: var(--linen);
    border-radius: 6px;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 500;
    color: var(--charcoal);
    opacity: .7;
  }

  /* ── Buttons ── */
  .btn-primary {
    width: 100%;
    background: var(--sage-deep);
    color: var(--cream);
    border: none;
    padding: 15px 32px;
    border-radius: 6px;
    font-family: var(--ff-body);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: .12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background .2s, opacity .2s;
    margin-top: 8px;
  }
  .btn-primary:hover    { background: #243D30; }
  .btn-primary:disabled { opacity: .4; cursor: not-allowed; }

  .btn-back {
    background: transparent;
    border: 1.5px solid var(--linen);
    color: var(--charcoal);
    padding: 12px 24px;
    border-radius: 6px;
    font-family: var(--ff-body);
    font-size: 12px;
    letter-spacing: .08em;
    cursor: pointer;
    opacity: .6;
    transition: opacity .2s;
    margin-top: 8px;
  }
  .btn-back:hover { opacity: 1; }

  .btn-row {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  .btn-row .btn-primary { flex: 1; }

  /* ── Confirmation ── */
  .confirm-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(77,122,94,.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
  }
  .confirm-list {
    background: var(--linen);
    border-radius: 8px;
    padding: 20px 24px;
    margin: 24px 0;
    list-style: none;
  }
  .confirm-list li {
    font-size: 13px;
    font-weight: 300;
    padding: 5px 0;
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--charcoal);
    opacity: .8;
  }
  .confirm-list li::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--sage);
    flex-shrink: 0;
  }

  /* ── Mollie redirect note ── */
  .mollie-note {
    font-size: 11px;
    color: var(--charcoal);
    opacity: .45;
    margin-top: 12px;
    text-align: center;
    line-height: 1.6;
  }

  /* ── Terms ── */
  .terms-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 16px 0 0;
    font-size: 12px;
    color: var(--charcoal);
    opacity: .6;
    font-weight: 300;
    line-height: 1.5;
  }
  .terms-row input[type=checkbox] { margin-top: 2px; accent-color: var(--sage); }
  .terms-link { color: var(--sage); text-decoration: underline; cursor: pointer; }
`;

/* ─── DATA ─── */
const PLANS = [
  {
    slug: "basis",
    name: "Basis",
    featured: false,
    priceMonthly: null,
    priceYearly: null,
    features: [
      { label: "Ochtendsessies (ma/wo/vr)", included: true },
      { label: "Avondsessies", included: false },
      { label: "Nieuwe lestypes", included: false },
      { label: "Prioriteit boeken", included: false },
    ],
  },
  {
    slug: "basis-plus",
    name: "Basis Plus",
    featured: true,
    priceMonthly: null,
    priceYearly: null,
    features: [
      { label: "Ochtendsessies (ma/wo/vr)", included: true },
      { label: "Alle avondsessies", included: true },
      { label: "Nieuwe lestypes", included: false },
      { label: "Prioriteit boeken", included: false },
    ],
  },
  {
    slug: "premium",
    name: "Premium",
    featured: false,
    priceMonthly: null,
    priceYearly: null,
    features: [
      { label: "Ochtendsessies (ma/wo/vr)", included: true },
      { label: "Alle avondsessies", included: true },
      { label: "Alle nieuwe lestypes", included: true },
      { label: "Prioriteit boeken", included: true },
    ],
  },
];

const STEPS = [
  { id: 1, name: "Abonnement",    sub: "Kies je plan" },
  { id: 2, name: "Account",       sub: "Jouw gegevens" },
  { id: 3, name: "Betaling",      sub: "Afronden" },
  { id: 4, name: "Bevestiging",   sub: "Je bent erbij!" },
];

/* ─── HELPERS ─── */
function formatPrice(val, cycle) {
  if (val === null) return "€ —";
  return `€ ${val.toFixed(2).replace(".", ",")}`;
}
function yearlyNote(plan, cycle) {
  if (cycle !== "yearly") return null;
  if (plan.priceYearly === null) return "Prijs volgt — 1 maand gratis";
  const saved = (plan.priceMonthly * 12 - plan.priceYearly).toFixed(2);
  return `Bespaar €${saved} per jaar`;
}

/* ─── STEP 1: Plan selector ─── */
function StepPlan({ selected, billing, onSelect, onBilling, onNext }) {
  return (
    <>
      <div className="flow-eyebrow">Stap 1 van 3</div>
      <h1 className="flow-title">Kies je <em>abonnement</em></h1>
      <p className="flow-subtitle">
        Selecteer het plan dat bij je past. Je kunt altijd upgraden.
        Minimale looptijd is één maand.
      </p>

      <div className="billing-wrap">
        <div className="billing-pill">
          <button className={`billing-btn${billing === "monthly" ? " active" : ""}`}
            onClick={() => onBilling("monthly")}>Per maand</button>
          <button className={`billing-btn${billing === "yearly" ? " active" : ""}`}
            onClick={() => onBilling("yearly")}>Per jaar</button>
        </div>
        {billing === "yearly" && (
          <span className="saving-tag">1 maand gratis</span>
        )}
      </div>

      <div className="plans-grid">
        {PLANS.map(plan => (
          <div
            key={plan.slug}
            className={`plan-card${plan.featured ? " featured" : ""}${selected?.slug === plan.slug ? " selected" : ""}`}
            onClick={() => onSelect(plan)}
          >
            {plan.featured && <span className="plan-badge">Meest gekozen</span>}
            <div className="plan-name">{plan.name}</div>
            <div className="plan-price">
              {formatPrice(billing === "yearly" ? plan.priceYearly : plan.priceMonthly, billing)}
              <span> / {billing === "yearly" ? "jaar" : "mnd"}</span>
            </div>
            {billing === "yearly" && (
              <div className="plan-yearly-note">{yearlyNote(plan, billing)}</div>
            )}
            <div className="plan-divider" />
            <ul className="plan-features">
              {plan.features.map(f => (
                <li key={f.label} className="plan-feature">
                  {f.included
                    ? <span className="feat-check">✓</span>
                    : <span className="feat-dash">—</span>}
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button className="btn-primary" disabled={!selected} onClick={onNext}>
        Doorgaan met {selected ? selected.name : "een plan"} →
      </button>
      <p className="mollie-note">Je kunt je abonnement altijd opzeggen. Geen verborgen kosten.</p>
    </>
  );
}

/* ─── STEP 2: Account aanmaken ─── */
function StepAccount({ form, onChange, onNext, onBack }) {
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});

  const pw = form.password || "";
  const pwRules = [
    { label: "Minimaal 8 tekens", ok: pw.length >= 8 },
    { label: "Minstens één cijfer", ok: /\d/.test(pw) },
    { label: "Minstens één hoofdletter", ok: /[A-Z]/.test(pw) },
  ];
  const pwValid = pwRules.every(r => r.ok);

  function validate() {
    const e = {};
    if (!form.firstName?.trim()) e.firstName = "Verplicht";
    if (!form.lastName?.trim())  e.lastName  = "Verplicht";
    if (!form.email?.includes("@")) e.email  = "Ongeldig e-mailadres";
    if (!pwValid) e.password = "Wachtwoord voldoet niet aan de eisen";
    if (!form.terms) e.terms = "Verplicht";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (validate()) onNext();
  }

  return (
    <>
      <div className="flow-eyebrow">Stap 2 van 3</div>
      <h1 className="flow-title">Maak je <em>account</em> aan</h1>
      <p className="flow-subtitle">
        Vul je gegevens in. Na betaling kun je direct inloggen en sessies boeken.
      </p>

      <div className="form-grid">
        <div className="field">
          <label>Voornaam</label>
          <input type="text" placeholder="Daniel"
            className={errors.firstName ? "err" : ""}
            value={form.firstName || ""}
            onChange={e => onChange("firstName", e.target.value)} />
          {errors.firstName && <span className="field-error">{errors.firstName}</span>}
        </div>
        <div className="field">
          <label>Achternaam</label>
          <input type="text" placeholder="Vissers"
            className={errors.lastName ? "err" : ""}
            value={form.lastName || ""}
            onChange={e => onChange("lastName", e.target.value)} />
          {errors.lastName && <span className="field-error">{errors.lastName}</span>}
        </div>
      </div>

      <div className="form-grid full" style={{ marginBottom: 16 }}>
        <div className="field">
          <label>E-mailadres</label>
          <input type="email" placeholder="jou@email.com"
            className={errors.email ? "err" : ""}
            value={form.email || ""}
            onChange={e => onChange("email", e.target.value)} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
      </div>

      <div className="form-grid" style={{ marginBottom: 16 }}>
        <div className="field">
          <label>Telefoonnummer</label>
          <input type="tel" placeholder="+31 6 12345678"
            value={form.phone || ""}
            onChange={e => onChange("phone", e.target.value)} />
        </div>
        <div className="field">
          <label>Taal</label>
          <input as="select" placeholder="Nederlands"
            value={form.lang || "nl"}
            onChange={e => onChange("lang", e.target.value)}
            style={{ cursor: "pointer" }} />
        </div>
      </div>

      <div className="form-grid full" style={{ marginBottom: 6 }}>
        <div className="field">
          <label>Wachtwoord</label>
          <input
            type={showPw ? "text" : "password"}
            placeholder="Minimaal 8 tekens"
            className={errors.password ? "err" : ""}
            value={form.password || ""}
            onChange={e => onChange("password", e.target.value)} />
        </div>
      </div>

      {pw.length > 0 && (
        <div className="pw-rules">
          {pwRules.map(r => (
            <div key={r.label} className={`pw-rule${r.ok ? " ok" : ""}`}>
              <span className="pw-dot" />
              {r.label}
            </div>
          ))}
        </div>
      )}
      {errors.password && <span className="field-error" style={{ display: "block", marginBottom: 8 }}>{errors.password}</span>}

      <div className="terms-row">
        <input type="checkbox"
          checked={form.terms || false}
          onChange={e => onChange("terms", e.target.checked)} />
        <span>
          Ik ga akkoord met de{" "}
          <span className="terms-link">algemene voorwaarden</span>
          {" "}en het{" "}
          <span className="terms-link">privacybeleid</span>
          {" "}van The Happy State.
        </span>
      </div>
      {errors.terms && <span className="field-error" style={{ display: "block", marginTop: 4 }}>{errors.terms}</span>}

      <div className="btn-row" style={{ marginTop: 24 }}>
        <button className="btn-back" onClick={onBack}>← Terug</button>
        <button className="btn-primary" onClick={handleNext}>
          Naar betaling →
        </button>
      </div>
    </>
  );
}

/* ─── STEP 3: Betaling ─── */
function StepPayment({ plan, billing, form, onPay, onBack, loading }) {
  const price = billing === "yearly" ? plan.priceYearly : plan.priceMonthly;
  const priceLabel = price === null ? "Prijs volgt" : `€ ${price.toFixed(2).replace(".", ",")}`;

  return (
    <>
      <div className="flow-eyebrow">Stap 3 van 3</div>
      <h1 className="flow-title">Overzicht &amp; <em>betaling</em></h1>
      <p className="flow-subtitle">
        Controleer je bestelling. Je wordt doorgestuurd naar de beveiligde
        betaalpagina van Mollie.
      </p>

      <div className="summary-box">
        <div className="summary-title">Jouw bestelling</div>
        <div className="summary-row">
          <span className="label">Abonnement</span>
          <span className="value">The Happy State {plan.name}</span>
        </div>
        <div className="summary-row">
          <span className="label">Factuurcyclus</span>
          <span className="value">{billing === "yearly" ? "Jaarlijks" : "Maandelijks"}</span>
        </div>
        <div className="summary-row">
          <span className="label">Naam</span>
          <span className="value">{form.firstName} {form.lastName}</span>
        </div>
        <div className="summary-row">
          <span className="label">E-mail</span>
          <span className="value">{form.email}</span>
        </div>
        <div className="summary-row total">
          <span className="label">Totaal {billing === "yearly" ? "per jaar" : "per maand"}</span>
          <span className="value">{priceLabel}</span>
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sage)", marginBottom: 10 }}>
          Betaalmethoden
        </div>
        <div className="payment-methods">
          {["iDEAL", "Creditcard", "Bancontact", "PayPal"].map(m => (
            <span key={m} className="method-badge">{m}</span>
          ))}
        </div>
      </div>

      <div className="btn-row">
        <button className="btn-back" onClick={onBack}>← Terug</button>
        <button className="btn-primary" onClick={onPay} disabled={loading}>
          {loading ? "Bezig..." : "Betalen via Mollie →"}
        </button>
      </div>
      <p className="mollie-note">
        Beveiligd betalen via Mollie · SSL versleuteld · iDEAL automatisch incasso voor vervolgbetalingen
      </p>
    </>
  );
}

/* ─── STEP 4: Bevestiging ─── */
function StepConfirm({ plan, form, billing }) {
  return (
    <>
      <div className="confirm-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 className="flow-title">Welkom bij<br /><em>The Happy State</em></h1>
      <p className="flow-subtitle">
        Je abonnement is actief. Een bevestiging is verstuurd naar{" "}
        <strong>{form.email}</strong>.
      </p>

      <ul className="confirm-list">
        <li>Abonnement <strong>{plan.name}</strong> ({billing === "yearly" ? "jaarlijks" : "maandelijks"}) is geactiveerd</li>
        <li>Je account is aangemaakt — log in met je e-mailadres</li>
        <li>Boek je eerste sessie via je dashboard</li>
        <li>Sessies: maandag, woensdag en vrijdag · ochtend &amp; avond</li>
      </ul>

      <button className="btn-primary" onClick={() => alert("→ Doorsturen naar dashboard (implementeer routing)")}>
        Naar mijn dashboard →
      </button>
    </>
  );
}

/* ─── MAIN FLOW ─── */
export default function SubscriptionFlow() {
  const [step, setStep]       = useState(1);
  const [plan, setPlan]       = useState(null);
  const [billing, setBilling] = useState("monthly");
  const [form, setForm]       = useState({});
  const [loading, setLoading] = useState(false);

  function updateForm(key, val) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  async function handlePay() {
    setLoading(true);
    try {
      // In productie: POST /api/auth/register + POST /api/mollie/create-payment
      // Demo: simuleer redirect
      await new Promise(r => setTimeout(r, 1500));
      setStep(4);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flow-page">
      <style>{css}</style>

      {/* SIDEBAR */}
      <aside className="flow-sidebar">
        <div>
          <div className="sidebar-logo">The Happy State</div>
          <div className="sidebar-steps">
            {STEPS.map(s => {
              const state = step > s.id ? "done" : step === s.id ? "active" : "";
              return (
                <div key={s.id} className="sidebar-step">
                  <div className={`step-circle ${state}`}>
                    {step > s.id ? "✓" : s.id}
                  </div>
                  <div className="step-info">
                    <div className={`step-name ${state}`}>{s.name}</div>
                    <div className="step-sub">{s.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="sidebar-quote">
          "Jouw vaste plek om te vertragen, te verdiepen en te groeien."
        </div>
      </aside>

      {/* MAIN */}
      <main className="flow-main">
        {step === 1 && (
          <StepPlan
            selected={plan}
            billing={billing}
            onSelect={setPlan}
            onBilling={setBilling}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <StepAccount
            form={form}
            onChange={updateForm}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <StepPayment
            plan={plan}
            billing={billing}
            form={form}
            onPay={handlePay}
            onBack={() => setStep(2)}
            loading={loading}
          />
        )}
        {step === 4 && (
          <StepConfirm plan={plan} form={form} billing={billing} />
        )}
      </main>
    </div>
  );
}
