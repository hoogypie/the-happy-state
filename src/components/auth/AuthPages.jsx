import { useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --cream:#F4EFE6;--linen:#EDE7D9;--sand:#C9B99A;
  --sage-light:#8AAF96;--sage:#4D7A5E;--sage-deep:#2E5040;
  --terra:#B8654A;--charcoal:#1E2420;--error:#C0392B;
  --ff-d:'Cormorant Garamond',serif;--ff-b:'Jost',sans-serif;
}
body{font-family:var(--ff-b);color:var(--charcoal)}
.auth-shell{
  min-height:100vh;display:grid;grid-template-columns:1fr 480px;
  background:var(--cream);
}
@media(max-width:900px){.auth-shell{grid-template-columns:1fr}}
.auth-left{
  background:var(--sage-deep);position:relative;overflow:hidden;
  display:flex;flex-direction:column;justify-content:space-between;padding:56px 64px;
}
@media(max-width:900px){.auth-left{display:none}}
.auth-left-img{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  filter:brightness(.35) saturate(.6);mix-blend-mode:multiply;
}
.auth-left-content{position:relative;z-index:1}
.auth-brand{display:flex;align-items:center;gap:10px;margin-bottom:auto}
.auth-brand-text{font-family:var(--ff-d);font-size:20px;color:var(--cream);letter-spacing:.05em}
.auth-left-quote{position:relative;z-index:1;margin-top:auto}
.auth-quote-text{font-family:var(--ff-d);font-size:32px;font-weight:300;font-style:italic;color:rgba(255,255,255,.75);line-height:1.3;margin-bottom:20px}
.auth-quote-author{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.35)}
.auth-clover-bg{position:absolute;bottom:-60px;right:-60px;opacity:.04;z-index:0}

.auth-right{
  display:flex;flex-direction:column;justify-content:center;
  padding:56px 56px;background:var(--cream);
}
@media(max-width:500px){.auth-right{padding:40px 24px}}

.auth-eyebrow{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--sage);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.auth-eyebrow::before{content:'';width:20px;height:1px;background:var(--sage)}
.auth-title{font-family:var(--ff-d);font-size:38px;font-weight:300;color:var(--sage-deep);margin-bottom:6px;line-height:1.1}
.auth-title em{font-style:italic;color:var(--terra)}
.auth-sub{font-size:13px;font-weight:300;color:var(--charcoal);opacity:.6;line-height:1.7;margin-bottom:36px}

.field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
.field label{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--sage);font-weight:500}
.field input{
  background:white;border:1.5px solid var(--linen);border-radius:6px;
  padding:13px 14px;font-family:var(--ff-b);font-size:14px;font-weight:300;
  color:var(--charcoal);outline:none;transition:border-color .2s;
}
.field input:focus{border-color:var(--sage)}
.field input.err{border-color:var(--error)}
.field-error{font-size:11px;color:var(--error)}
.field-forgot{font-size:11px;color:var(--sage);cursor:pointer;text-align:right;margin-top:-8px;margin-bottom:4px}
.field-forgot:hover{text-decoration:underline}

.btn-submit{
  width:100%;background:var(--sage-deep);color:var(--cream);border:none;
  padding:15px;border-radius:6px;font-family:var(--ff-b);font-size:11px;
  letter-spacing:.14em;text-transform:uppercase;cursor:pointer;font-weight:500;
  transition:background .2s;margin-top:8px;
}
.btn-submit:hover{background:#243D30}
.btn-submit:disabled{opacity:.45;cursor:not-allowed}

.auth-divider{display:flex;align-items:center;gap:12px;margin:20px 0;font-size:11px;color:var(--sand)}
.auth-divider::before,.auth-divider::after{content:'';flex:1;height:1px;background:var(--linen)}

.auth-switch{text-align:center;font-size:12px;color:var(--charcoal);opacity:.6;margin-top:20px;font-weight:300}
.auth-switch span{color:var(--sage);cursor:pointer;font-weight:500}
.auth-switch span:hover{text-decoration:underline}

.success-box{
  background:rgba(77,122,94,.08);border:1.5px solid rgba(77,122,94,.25);
  border-radius:8px;padding:18px;margin-bottom:20px;
  font-size:13px;font-weight:300;color:var(--sage-deep);line-height:1.6;
}

.auth-mobile-logo{
  display:none;margin-bottom:32px;
  flex-direction:row;align-items:center;gap:10px;
}
@media(max-width:900px){.auth-mobile-logo{display:flex}}
`;

function CloverSVG({ size = 24, color = "var(--sage-deep)" }) {
  return (
    <svg width={size} height={Math.round(size * 1.1)} viewBox="0 0 40 44" fill="none">
      <ellipse cx="20" cy="11" rx="8" ry="11" fill={color} opacity=".95"/>
      <ellipse cx="29" cy="20" rx="11" ry="8" fill={color} opacity=".9"/>
      <ellipse cx="20" cy="29" rx="8" ry="11" fill={color} opacity=".95"/>
      <ellipse cx="11" cy="20" rx="11" ry="8" fill={color} opacity=".9"/>
      <circle cx="20" cy="20" r="6" fill={color}/>
      <path d="M20 38 Q17 41 14 44" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function LoginForm({ onForgot }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!form.email || !form.password) { setError("Vul alle velden in."); return; }
    setLoading(true); setError("");
    try {
      // Supabase: const { error } = await supabase.auth.signInWithPassword({ email, password })
      await new Promise(r => setTimeout(r, 1200));
      alert("✓ Ingelogd — doorsturen naar dashboard");
    } catch {
      setError("E-mail of wachtwoord onjuist.");
    } finally { setLoading(false); }
  }

  return (
    <>
      <div className="auth-eyebrow">Welkom terug</div>
      <h1 className="auth-title">Inloggen bij<br /><em>The Happy State</em></h1>
      <p className="auth-sub">Log in om je sessies te bekijken en nieuwe lessen te boeken.</p>

      {error && <div className="field-error" style={{ marginBottom: 14, fontSize: 13 }}>{error}</div>}

      <div className="field">
        <label>E-mailadres</label>
        <input type="email" placeholder="jou@email.com"
          value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
      </div>
      <div className="field">
        <label>Wachtwoord</label>
        <input type="password" placeholder="••••••••"
          value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
          onKeyDown={e => e.key === "Enter" && handleSubmit()} />
      </div>
      <div className="field-forgot" onClick={onForgot}>Wachtwoord vergeten?</div>

      <button className="btn-submit" disabled={loading} onClick={handleSubmit}>
        {loading ? "Bezig..." : "Inloggen →"}
      </button>

      <div className="auth-switch">
        Nog geen account?{" "}
        <span onClick={() => alert("→ Naar abonnementspagina")}>Begin met een abonnement</span>
      </div>
    </>
  );
}

function ForgotForm({ onBack }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email.includes("@")) return;
    setLoading(true);
    // Supabase: await supabase.auth.resetPasswordForEmail(email, { redirectTo: ... })
    await new Promise(r => setTimeout(r, 1000));
    setSent(true); setLoading(false);
  }

  return (
    <>
      <div className="auth-eyebrow">Wachtwoord vergeten</div>
      <h1 className="auth-title">Nieuw<br /><em>wachtwoord</em></h1>
      <p className="auth-sub">Voer je e-mailadres in. Je ontvangt een link om je wachtwoord te resetten.</p>

      {sent ? (
        <>
          <div className="success-box">
            ✓ We hebben een link verstuurd naar <strong>{email}</strong>. Controleer ook je spam.
          </div>
          <div className="auth-switch"><span onClick={onBack}>← Terug naar inloggen</span></div>
        </>
      ) : (
        <>
          <div className="field">
            <label>E-mailadres</label>
            <input type="email" placeholder="jou@email.com"
              value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          </div>
          <button className="btn-submit" disabled={loading || !email.includes("@")} onClick={handleSubmit}>
            {loading ? "Bezig..." : "Verstuur resetlink →"}
          </button>
          <div className="auth-switch"><span onClick={onBack}>← Terug naar inloggen</span></div>
        </>
      )}
    </>
  );
}

export default function AuthPages() {
  const [view, setView] = useState("login");
  return (
    <div className="auth-shell">
      <style>{css}</style>

      <div className="auth-left">
        <img className="auth-left-img"
          src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80"
          alt="The Happy State studio" />
        <div className="auth-left-content">
          <div className="auth-brand">
            <CloverSVG size={24} color="rgba(255,255,255,0.7)" />
            <span className="auth-brand-text">The Happy State</span>
          </div>
        </div>
        <div className="auth-left-quote">
          <div className="auth-quote-text">"Jouw vaste plek om te vertragen, te verdiepen en te groeien."</div>
          <div className="auth-quote-author">The Happy State · Rotterdam</div>
        </div>
        <svg className="auth-clover-bg" width="320" height="352" viewBox="0 0 40 44">
          <ellipse cx="20" cy="11" rx="8" ry="11" fill="white"/>
          <ellipse cx="29" cy="20" rx="11" ry="8" fill="white"/>
          <ellipse cx="20" cy="29" rx="8" ry="11" fill="white"/>
          <ellipse cx="11" cy="20" rx="11" ry="8" fill="white"/>
          <circle cx="20" cy="20" r="6" fill="white"/>
        </svg>
      </div>

      <div className="auth-right">
        <div className="auth-mobile-logo">
          <CloverSVG size={22} />
          <span style={{ fontFamily: "var(--ff-d)", fontSize: 18, color: "var(--sage-deep)" }}>The Happy State</span>
        </div>
        {view === "login"
          ? <LoginForm onForgot={() => setView("forgot")} />
          : <ForgotForm onBack={() => setView("login")} />}
      </div>
    </div>
  );
}
