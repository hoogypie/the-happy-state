import { useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --cream:#F4EFE6;--linen:#EDE7D9;--sand:#C9B99A;
  --sage-light:#8AAF96;--sage:#4D7A5E;--sage-deep:#2E5040;
  --terra:#B8654A;--charcoal:#1E2420;--white:#fff;
  --sidebar:220px;
  --ff-d:'Cormorant Garamond',serif;--ff-b:'Jost',sans-serif;
}
body{font-family:var(--ff-b);color:var(--charcoal);background:#F0EBE1}

/* ── Shell ── */
.shell{display:grid;grid-template-columns:var(--sidebar) 1fr;min-height:100vh}
@media(max-width:900px){.shell{grid-template-columns:1fr}}

/* ── Sidebar ── */
.sidebar{
  background:var(--sage-deep);display:flex;flex-direction:column;
  position:sticky;top:0;height:100vh;overflow-y:auto;
}
@media(max-width:900px){.sidebar{display:none}}
.sb-logo{
  display:flex;align-items:center;gap:9px;
  padding:24px 20px 20px;border-bottom:1px solid rgba(255,255,255,.07);
  margin-bottom:8px;
}
.sb-logo-text{font-family:var(--ff-d);font-size:16px;color:var(--cream);letter-spacing:.04em}
.sb-section{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.3);padding:14px 20px 6px;margin-top:4px}
.sb-item{
  display:flex;align-items:center;gap:10px;
  padding:10px 20px;cursor:pointer;
  font-size:12px;color:rgba(255,255,255,.5);letter-spacing:.04em;
  border-left:2px solid transparent;transition:all .2s;
}
.sb-item:hover{color:rgba(255,255,255,.85);background:rgba(255,255,255,.04)}
.sb-item.active{color:var(--cream);border-left-color:var(--terra);background:rgba(255,255,255,.06)}
.sb-icon{font-size:14px;width:18px;text-align:center}
.sb-bottom{margin-top:auto;padding:16px 20px;border-top:1px solid rgba(255,255,255,.07)}
.sb-user{display:flex;align-items:center;gap:10px}
.sb-avatar{width:28px;height:28px;border-radius:50%;background:var(--sage);display:flex;align-items:center;justify-content:center;font-size:11px;color:white;font-weight:500;flex-shrink:0}
.sb-username{font-size:11px;color:rgba(255,255,255,.5)}

/* ── Main ── */
.main{overflow:auto}
.topbar{
  background:white;border-bottom:1px solid rgba(0,0,0,.06);
  padding:0 32px;height:56px;display:flex;align-items:center;justify-content:space-between;
  position:sticky;top:0;z-index:10;
}
.tb-title{font-size:14px;font-weight:500;color:var(--charcoal)}
.tb-right{display:flex;align-items:center;gap:12px}
.tb-btn{background:var(--sage-deep);color:white;border:none;padding:8px 18px;border-radius:4px;font-family:var(--ff-b);font-size:11px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;font-weight:500}
.content{padding:32px}

/* ── Stats ── */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px}
@media(max-width:1100px){.stats{grid-template-columns:repeat(2,1fr)}}
.stat-card{background:white;border-radius:10px;padding:20px 22px;border:0.5px solid rgba(0,0,0,.06)}
.stat-label{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--sand);margin-bottom:8px}
.stat-value{font-family:var(--ff-d);font-size:36px;font-weight:400;color:var(--sage-deep);line-height:1;margin-bottom:4px}
.stat-delta{font-size:11px;color:var(--sage);font-weight:300}
.stat-delta.neg{color:var(--terra)}

/* ── Grid 2-col ── */
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
@media(max-width:1000px){.grid2{grid-template-columns:1fr}}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media(max-width:1100px){.grid3{grid-template-columns:1fr 1fr}}

/* ── Card ── */
.card{background:white;border-radius:10px;padding:22px 24px;border:0.5px solid rgba(0,0,0,.06)}
.card-title{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--sand);margin-bottom:16px}
.card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.card-header .card-title{margin-bottom:0}

/* ── Table ── */
.table{width:100%;border-collapse:collapse}
.table th{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--sand);padding:0 0 10px;text-align:left;border-bottom:1px solid var(--linen);font-weight:400}
.table td{padding:11px 0;border-bottom:1px solid var(--linen);font-size:12px;font-weight:300;color:var(--charcoal);vertical-align:middle}
.table tr:last-child td{border-bottom:none}
.table td:last-child{text-align:right}

/* ── Badges ── */
.badge{display:inline-block;font-size:9px;letter-spacing:.08em;text-transform:uppercase;padding:3px 8px;border-radius:4px;font-weight:500}
.badge-green{background:rgba(77,122,94,.1);color:var(--sage)}
.badge-terra{background:rgba(184,101,74,.1);color:var(--terra)}
.badge-gray{background:rgba(0,0,0,.06);color:rgba(0,0,0,.45)}
.badge-blue{background:rgba(59,130,246,.1);color:rgb(59,130,246)}

/* ── Today's Agenda ── */
.agenda-slot{
  display:flex;align-items:center;gap:12px;
  padding:10px 0;border-bottom:1px solid var(--linen);
}
.agenda-slot:last-child{border:none}
.ag-time{font-size:11px;font-weight:500;color:var(--charcoal);min-width:80px}
.ag-bar{width:3px;height:36px;border-radius:2px;flex-shrink:0}
.ag-info{}
.ag-lesson{font-size:12px;font-weight:500;color:var(--charcoal)}
.ag-meta{font-size:10px;color:var(--sand);margin-top:1px}
.ag-spots{margin-left:auto;text-align:right}
.ag-count{font-family:var(--ff-d);font-size:18px;color:var(--sage-deep)}
.ag-countlabel{font-size:9px;color:var(--sand);letter-spacing:.08em;text-transform:uppercase}

/* ── Pricing form ── */
.price-row{
  display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;
  padding:14px 0;border-bottom:1px solid var(--linen);align-items:center;
}
.price-row:last-child{border:none}
.price-name{font-size:13px;font-weight:500;color:var(--charcoal)}
.price-name small{display:block;font-size:10px;font-weight:300;color:var(--sand);margin-top:2px}
.price-input-wrap{position:relative}
.price-prefix{position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:13px;color:var(--sand)}
.price-input{
  width:100%;background:var(--linen);border:1.5px solid transparent;border-radius:6px;
  padding:9px 10px 9px 24px;font-family:var(--ff-b);font-size:13px;color:var(--charcoal);
  outline:none;transition:border-color .2s;
}
.price-input:focus{border-color:var(--sage);background:white}

/* ── Roster schedule ── */
.roster-week{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}
.roster-day-head{text-align:center;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--sand);margin-bottom:8px}
.roster-slot{
  background:var(--linen);border-radius:6px;padding:8px;margin-bottom:6px;
  font-size:10px;cursor:pointer;border:1.5px solid transparent;
  transition:border-color .2s;
}
.roster-slot:hover{border-color:var(--sage)}
.roster-slot.regular{border-left:2px solid var(--sage)}
.roster-slot.trial{border-left:2px solid var(--terra)}
.roster-slot.course{border-left:2px solid var(--sage-deep)}
.rs-time{font-weight:500;color:var(--charcoal);margin-bottom:2px}
.rs-coach{color:var(--sand)}
.rs-spots{color:var(--sage)}

/* ── Toggle ── */
.toggle-wrap{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--charcoal);opacity:.7}
.toggle{width:36px;height:20px;background:var(--linen);border-radius:10px;position:relative;cursor:pointer;transition:background .2s;flex-shrink:0}
.toggle.on{background:var(--sage)}
.toggle-knob{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:white;transition:transform .2s}
.toggle.on .toggle-knob{transform:translateX(16px)}

/* ── Save bar ── */
.save-bar{
  position:sticky;bottom:0;background:white;border-top:1px solid var(--linen);
  padding:14px 24px;display:flex;justify-content:flex-end;gap:10px;margin-top:20px;
}
.btn-save{background:var(--sage-deep);color:white;border:none;padding:10px 28px;border-radius:6px;font-family:var(--ff-b);font-size:11px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;font-weight:500}
.btn-cancel{background:transparent;border:1.5px solid var(--linen);color:var(--charcoal);padding:9px 20px;border-radius:6px;font-family:var(--ff-b);font-size:11px;cursor:pointer;opacity:.6}

/* ── Klanten ── */
.customer-row{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--linen)}
.customer-row:last-child{border:none}
.cust-avatar{width:32px;height:32px;border-radius:50%;background:var(--linen);display:flex;align-items:center;justify-content:center;font-family:var(--ff-d);font-size:14px;color:var(--sage);flex-shrink:0}
.cust-info{flex:1}
.cust-name{font-size:13px;font-weight:500;color:var(--charcoal)}
.cust-email{font-size:11px;color:var(--sand);font-weight:300}
.cust-meta{text-align:right;font-size:11px;color:var(--sand);font-weight:300}
`;

function CloverSVG({ size = 20, color = "rgba(255,255,255,0.7)" }) {
  return (
    <svg width={size} height={Math.round(size * 1.1)} viewBox="0 0 40 44" fill="none">
      <ellipse cx="20" cy="11" rx="8" ry="11" fill={color} opacity=".95"/>
      <ellipse cx="29" cy="20" rx="11" ry="8" fill={color} opacity=".9"/>
      <ellipse cx="20" cy="29" rx="8" ry="11" fill={color} opacity=".95"/>
      <ellipse cx="11" cy="20" rx="11" ry="8" fill={color} opacity=".9"/>
      <circle cx="20" cy="20" r="6" fill={color}/>
    </svg>
  );
}

/* ── Mock data ── */
const BOOKINGS = [
  { name: "Sarah Dijkstra",    email: "sarah@email.nl",   lesson: "Ochtendflow",    coach: "Daniel",  time: "07:30", status: "confirmed", plan: "Basis Plus" },
  { name: "Niels van den Berg", email: "niels@email.nl",  lesson: "Energieles",     coach: "Raphael", time: "18:30", status: "confirmed", plan: "Premium" },
  { name: "Fatima Bouali",     email: "fatima@email.nl",  lesson: "Proefles",       coach: "Daniel",  time: "07:30", status: "pending",   plan: "Geen" },
  { name: "Tom Bakker",        email: "tom@email.nl",     lesson: "Avondflow",      coach: "Raphael", time: "20:00", status: "confirmed", plan: "Basis" },
  { name: "Iris Smit",         email: "iris@email.nl",    lesson: "Wie ben ik? S1", coach: "Raphael", time: "19:00", status: "confirmed", plan: "Premium" },
];
const CUSTOMERS = [
  { name: "Sarah Dijkstra",     email: "sarah@email.nl",   plan: "Basis Plus", since: "Jan 2026",  bookings: 8 },
  { name: "Niels van den Berg", email: "niels@email.nl",   plan: "Premium",    since: "Feb 2026",  bookings: 12 },
  { name: "Fatima Bouali",      email: "fatima@email.nl",  plan: "—",          since: "Apr 2026",  bookings: 1 },
  { name: "Tom Bakker",         email: "tom@email.nl",     plan: "Basis",      since: "Mrt 2026",  bookings: 5 },
  { name: "Iris Smit",          email: "iris@email.nl",    plan: "Premium",    since: "Jan 2026",  bookings: 14 },
  { name: "Ravi Sharma",        email: "ravi@email.nl",    plan: "Basis Plus", since: "Mrt 2026",  bookings: 7 },
];
const TODAY_SLOTS = [
  { time: "07:30 – 08:15", lesson: "Ochtendsessie", coach: "Daniel Vissers",  taken: 7,  total: 10, type: "regular" },
  { time: "07:30 – 08:15", lesson: "Proefles",      coach: "Raphael Dollart", taken: 2,  total: 3,  type: "trial" },
  { time: "18:30 – 19:30", lesson: "Energieles",    coach: "Daniel Vissers",  taken: 9,  total: 10, type: "regular" },
  { time: "19:00 – 21:00", lesson: "Wie ben ik? S2",coach: "Raphael Dollart", taken: 8,  total: 12, type: "course" },
  { time: "20:00 – 21:00", lesson: "Avondflow",     coach: "Daniel Vissers",  taken: 4,  total: 10, type: "regular" },
];
const ROSTER = {
  0: [{ t: "07:30–08:15", c: "Daniel",  type: "regular" }, { t: "18:30–19:30", c: "Daniel",  type: "regular" }, { t: "20:00–21:00", c: "Raphael", type: "regular" }],
  1: [{ t: "19:00–21:00", c: "Raphael", type: "course" }],
  2: [{ t: "07:30–08:15", c: "Raphael", type: "regular" }, { t: "18:30–19:30", c: "Daniel",  type: "regular" }, { t: "20:00–21:00", c: "Daniel",  type: "regular" }],
  3: [{ t: "19:00–21:00", c: "Daniel",  type: "course" }],
  4: [{ t: "07:30–08:15", c: "Daniel",  type: "regular" }, { t: "18:30–19:30", c: "Raphael", type: "regular" }, { t: "20:00–21:00", c: "Raphael", type: "regular" }],
  5: [], 6: [],
};
const DAYS_SHORT = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
const typeColor = { regular: "var(--sage)", trial: "var(--terra)", course: "var(--sage-deep)" };

/* ── Sections ── */
function Dashboard() {
  return (
    <>
      <div className="stats">
        {[
          { label: "Actieve abonnementen", value: "24", delta: "+3 deze maand" },
          { label: "Boekingen vandaag",    value: "30", delta: "5 plekken vrij" },
          { label: "Proefles aanvragen",   value: "3",  delta: "Nieuw vandaag" },
          { label: "Omzet deze maand",     value: "€ —", delta: "Prijzen nog in te stellen" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-delta">{s.delta}</div>
          </div>
        ))}
      </div>
      <div className="grid2">
        <div className="card">
          <div className="card-title">Agenda vandaag — maandag</div>
          {TODAY_SLOTS.map((s, i) => (
            <div key={i} className="agenda-slot">
              <div className="ag-time">{s.time}</div>
              <div className="ag-bar" style={{ background: typeColor[s.type] }} />
              <div className="ag-info">
                <div className="ag-lesson">{s.lesson}</div>
                <div className="ag-meta">{s.coach}</div>
              </div>
              <div className="ag-spots">
                <div className="ag-count">{s.taken}/{s.total}</div>
                <div className="ag-countlabel">deelnemers</div>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title">Recente boekingen</div>
          <table className="table">
            <thead><tr>
              <th>Naam</th><th>Les</th><th>Status</th>
            </tr></thead>
            <tbody>
              {BOOKINGS.map((b, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ fontWeight: 500, fontSize: 12 }}>{b.name}</div>
                    <div style={{ fontSize: 10, color: "var(--sand)" }}>{b.time} · {b.coach}</div>
                  </td>
                  <td>{b.lesson}</td>
                  <td>
                    <span className={`badge ${b.status === "confirmed" ? "badge-green" : "badge-gray"}`}>
                      {b.status === "confirmed" ? "Bevestigd" : "In afwachting"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Boekingen() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Alle boekingen</div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Alle", "Bevestigd", "In afwachting", "Geannuleerd"].map(f => (
            <span key={f} className="badge badge-gray" style={{ cursor: "pointer" }}>{f}</span>
          ))}
        </div>
      </div>
      <table className="table">
        <thead><tr>
          <th>Klant</th><th>Les</th><th>Coach</th><th>Tijd</th><th>Abonnement</th><th>Status</th>
        </tr></thead>
        <tbody>
          {BOOKINGS.map((b, i) => (
            <tr key={i}>
              <td>
                <div style={{ fontWeight: 500 }}>{b.name}</div>
                <div style={{ fontSize: 10, color: "var(--sand)" }}>{b.email}</div>
              </td>
              <td>{b.lesson}</td>
              <td>{b.coach}</td>
              <td>{b.time}</td>
              <td><span className="badge badge-gray">{b.plan}</span></td>
              <td>
                <span className={`badge ${b.status === "confirmed" ? "badge-green" : "badge-gray"}`}>
                  {b.status === "confirmed" ? "Bevestigd" : "Wachtend"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Klanten() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Klanten ({CUSTOMERS.length})</div>
        <input placeholder="Zoeken..." style={{ padding: "7px 12px", borderRadius: 6, border: "1.5px solid var(--linen)", fontFamily: "var(--ff-b)", fontSize: 12, outline: "none", background: "var(--linen)" }} />
      </div>
      {CUSTOMERS.map((c, i) => (
        <div key={i} className="customer-row">
          <div className="cust-avatar">{c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
          <div className="cust-info">
            <div className="cust-name">{c.name}</div>
            <div className="cust-email">{c.email}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className={`badge ${c.plan !== "—" ? "badge-green" : "badge-gray"}`}>{c.plan}</span>
          </div>
          <div className="cust-meta">
            <div>{c.bookings}× geboekt</div>
            <div>Lid sinds {c.since}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Prijzen() {
  const [saved, setSaved] = useState(false);
  const plans = [
    { name: "Basis", sub: "Alleen ochtendsessies" },
    { name: "Basis Plus", sub: "Ochtend + avond" },
    { name: "Premium", sub: "Alles inclusief" },
  ];
  return (
    <div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Abonnementsprijzen</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid var(--linen)" }}>
          <div style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sand)" }}>Plan</div>
          <div style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sand)" }}>Per maand (€)</div>
          <div style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sand)" }}>Per jaar (€)</div>
          <div style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sand)" }}>Actief</div>
        </div>
        {plans.map(p => (
          <div key={p.name} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, padding: "12px 0", borderBottom: "1px solid var(--linen)", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
              <div style={{ fontSize: 10, color: "var(--sand)", marginTop: 2 }}>{p.sub}</div>
            </div>
            <div className="price-input-wrap">
              <span className="price-prefix">€</span>
              <input className="price-input" type="number" placeholder="0.00" step="0.01" />
            </div>
            <div className="price-input-wrap">
              <span className="price-prefix">€</span>
              <input className="price-input" type="number" placeholder="0.00" step="0.01" />
            </div>
            <Toggle />
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">Losse sessies & cursussen</div>
        {[
          { name: "1:1 Coaching sessie", sub: "60 minuten" },
          { name: "1:1 Coaching sessie", sub: "90 minuten" },
          { name: "Cursus Wie ben ik?",  sub: "6 weken, 1× per week" },
          { name: "Teambuilding",        sub: "Dagdeel 3–4 uur" },
        ].map(s => (
          <div key={s.sub} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: "12px 0", borderBottom: "1px solid var(--linen)", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
              <div style={{ fontSize: 10, color: "var(--sand)", marginTop: 2 }}>{s.sub}</div>
            </div>
            <div className="price-input-wrap">
              <span className="price-prefix">€</span>
              <input className="price-input" type="number" placeholder="0.00" step="0.01" />
            </div>
            <Toggle />
          </div>
        ))}
      </div>

      <div className="save-bar">
        <button className="btn-cancel">Annuleren</button>
        <button className="btn-save" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}>
          {saved ? "✓ Opgeslagen" : "Opslaan"}
        </button>
      </div>
    </div>
  );
}

function Toggle() {
  const [on, setOn] = useState(true);
  return (
    <div className="toggle-wrap" onClick={() => setOn(o => !o)} style={{ cursor: "pointer" }}>
      <div className={`toggle${on ? " on" : ""}`}><div className="toggle-knob" /></div>
      <span>{on ? "Actief" : "Inactief"}</span>
    </div>
  );
}

function Rooster() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Weekrooster — template</div>
        <button className="tb-btn" style={{ fontSize: 10 }}>+ Slot toevoegen</button>
      </div>
      <div className="roster-week">
        {DAYS_SHORT.map((d, i) => (
          <div key={d}>
            <div className="roster-day-head">{d}</div>
            {(ROSTER[i] || []).map((s, j) => (
              <div key={j} className={`roster-slot ${s.type}`}>
                <div className="rs-time">{s.t}</div>
                <div className="rs-coach">{s.c}</div>
              </div>
            ))}
            {(ROSTER[i] || []).length === 0 && (
              <div style={{ textAlign: "center", fontSize: 11, color: "var(--sand)", opacity: .4, paddingTop: 8 }}>—</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, display: "flex", gap: 16, flexWrap: "wrap" }}>
        {[["regular", "Regulier"], ["trial", "Proefles"], ["course", "Cursus"]].map(([t, l]) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--charcoal)", opacity: .6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: typeColor[t] }} />
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

function Lessen() {
  const lessons = [
    { name: "Ochtendsessie", type: "regular", duration: "45 min", active: true },
    { name: "Energieles",    type: "regular", duration: "60 min", active: true },
    { name: "Avondflow",     type: "regular", duration: "60 min", active: true },
    { name: "Proefles",      type: "trial",   duration: "60 min", active: true },
    { name: "Wie ben ik?",   type: "course",  duration: "120 min", active: true },
  ];
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Lestypes</div>
        <button className="tb-btn" style={{ fontSize: 10 }}>+ Lestype toevoegen</button>
      </div>
      <table className="table">
        <thead><tr><th>Naam</th><th>Type</th><th>Duur</th><th>Actief</th></tr></thead>
        <tbody>
          {lessons.map(l => (
            <tr key={l.name}>
              <td style={{ fontWeight: 500 }}>{l.name}</td>
              <td><span className={`badge ${l.type === "regular" ? "badge-green" : l.type === "trial" ? "badge-terra" : "badge-blue"}`}>{l.type}</span></td>
              <td>{l.duration}</td>
              <td><Toggle /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── NAV CONFIG ── */
const NAV = [
  { section: "Overzicht", items: [{ id: "dashboard", icon: "◎", label: "Dashboard" }] },
  { section: "Beheer",    items: [
    { id: "boekingen",  icon: "◈", label: "Boekingen" },
    { id: "klanten",    icon: "◇", label: "Klanten" },
    { id: "rooster",    icon: "✦", label: "Rooster" },
    { id: "lessen",     icon: "◉", label: "Lestypes" },
    { id: "prijzen",    icon: "€", label: "Prijzen" },
  ]},
];

const SECTION_TITLES = {
  dashboard: "Dashboard",
  boekingen: "Boekingen",
  klanten: "Klanten",
  rooster: "Weekrooster",
  lessen: "Lestypes beheren",
  prijzen: "Prijzen instellen",
};

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const sections = { dashboard: <Dashboard />, boekingen: <Boekingen />, klanten: <Klanten />, rooster: <Rooster />, lessen: <Lessen />, prijzen: <Prijzen /> };

  return (
    <div className="shell">
      <style>{css}</style>

      <aside className="sidebar">
        <div className="sb-logo">
          <CloverSVG size={18} />
          <span className="sb-logo-text">The Happy State</span>
        </div>
        {NAV.map(g => (
          <div key={g.section}>
            <div className="sb-section">{g.section}</div>
            {g.items.map(item => (
              <div key={item.id} className={`sb-item${active === item.id ? " active" : ""}`} onClick={() => setActive(item.id)}>
                <span className="sb-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        ))}
        <div className="sb-bottom">
          <div className="sb-user">
            <div className="sb-avatar">DV</div>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.65)", fontWeight: 500 }}>Daniel Vissers</div>
              <div className="sb-username">Admin</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="main">
        <div className="topbar">
          <div className="tb-title">{SECTION_TITLES[active]}</div>
          <div className="tb-right">
            <span style={{ fontSize: 11, color: "var(--sand)" }}>
              {new Date().toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })}
            </span>
            {active === "boekingen" && <button className="tb-btn">Export CSV</button>}
            {active === "dashboard" && <button className="tb-btn">+ Slot genereren</button>}
          </div>
        </div>
        <div className="content">
          {sections[active]}
        </div>
      </div>
    </div>
  );
}
