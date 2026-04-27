import { useState } from "react";

/* ─── TOKENS ─── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --cream:#F4EFE6;--linen:#EDE7D9;--sand:#C9B99A;
  --sage-light:#8AAF96;--sage:#4D7A5E;--sage-deep:#2E5040;
  --terra:#B8654A;--charcoal:#1E2420;
  --ff-d:'Cormorant Garamond',serif;--ff-b:'Jost',sans-serif;
}
body{background:var(--cream);font-family:var(--ff-b);color:var(--charcoal)}

.page{min-height:100vh;padding:0 0 80px}

/* TOP BAR */
.topbar{background:var(--sage-deep);padding:0 48px;height:56px;display:flex;align-items:center;justify-content:space-between}
.topbar-logo{font-family:var(--ff-d);font-size:18px;color:var(--cream);letter-spacing:.06em}
.topbar-user{display:flex;align-items:center;gap:10px;font-size:12px;color:rgba(255,255,255,.6)}
.user-avatar{width:30px;height:30px;border-radius:50%;background:var(--sage);display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--cream);font-weight:500}

/* HEADER */
.header{padding:40px 48px 0;display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:28px}
.header-left{}
.header-eyebrow{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--sage);margin-bottom:6px}
.header-title{font-family:var(--ff-d);font-size:36px;font-weight:300;color:var(--sage-deep);line-height:1.1}
.header-title em{font-style:italic;color:var(--terra)}

/* FILTER TABS */
.tabs{display:flex;gap:4px;padding:0 48px;margin-bottom:28px;flex-wrap:wrap}
.tab{padding:8px 20px;border-radius:30px;border:1.5px solid var(--linen);background:transparent;font-family:var(--ff-b);font-size:11px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;color:var(--charcoal);opacity:.55;transition:all .2s}
.tab:hover{opacity:.9}
.tab.active{background:var(--sage-deep);border-color:var(--sage-deep);color:var(--cream);opacity:1}
.tab-dot{display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:6px;vertical-align:middle}

/* WEEK NAV */
.week-nav{padding:0 48px;display:flex;align-items:center;gap:16px;margin-bottom:24px}
.week-btn{width:32px;height:32px;border-radius:50%;border:1.5px solid var(--linen);background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--charcoal);opacity:.5;transition:opacity .2s}
.week-btn:hover{opacity:1}
.week-label{font-family:var(--ff-d);font-size:20px;color:var(--sage-deep)}

/* CALENDAR GRID */
.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:10px;padding:0 48px}
@media(max-width:900px){.cal{grid-template-columns:repeat(3,1fr);padding:0 20px}}
.day-col{}
.day-head{text-align:center;margin-bottom:10px}
.day-name{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--charcoal);opacity:.45;margin-bottom:3px}
.day-num{font-family:var(--ff-d);font-size:22px;color:var(--sage-deep)}
.day-num.today{color:var(--terra)}
.day-slots{display:flex;flex-direction:column;gap:8px}

/* SLOT CARDS */
.slot{border-radius:8px;padding:12px;cursor:pointer;border:1.5px solid transparent;transition:all .2s;position:relative}
.slot:hover{transform:translateY(-1px)}
.slot.regular{background:rgba(77,122,94,.08);border-color:rgba(77,122,94,.15)}
.slot.regular:hover{border-color:var(--sage)}
.slot.trial{background:rgba(184,101,74,.08);border-color:rgba(184,101,74,.15)}
.slot.trial:hover{border-color:var(--terra)}
.slot.course{background:rgba(46,80,64,.08);border-color:rgba(46,80,64,.15)}
.slot.course:hover{border-color:var(--sage-deep)}
.slot.full{opacity:.45;cursor:not-allowed}
.slot.full:hover{transform:none}
.slot-type-tag{font-size:9px;letter-spacing:.1em;text-transform:uppercase;font-weight:500;margin-bottom:5px}
.slot.regular .slot-type-tag{color:var(--sage)}
.slot.trial   .slot-type-tag{color:var(--terra)}
.slot.course  .slot-type-tag{color:var(--sage-deep)}
.slot-time{font-size:12px;font-weight:500;color:var(--charcoal);margin-bottom:3px}
.slot-lesson{font-size:11px;color:var(--charcoal);opacity:.7;font-weight:300;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.slot-footer{display:flex;justify-content:space-between;align-items:center}
.slot-coach{font-size:10px;color:var(--charcoal);opacity:.5}
.spots-bar{display:flex;gap:2px;align-items:center}
.spot{width:5px;height:5px;border-radius:1px}
.spot.taken{background:var(--sand);opacity:.5}
.spot.free.regular-s{background:var(--sage)}
.spot.free.trial-s{background:var(--terra)}
.spot.free.course-s{background:var(--sage-deep)}
.full-badge{position:absolute;top:8px;right:8px;font-size:9px;background:var(--sand);color:white;padding:2px 6px;border-radius:4px;letter-spacing:.06em;text-transform:uppercase}

/* COURSE BANNER */
.course-banner{margin:0 48px 24px;background:var(--sage-deep);border-radius:12px;padding:28px 32px;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center}
@media(max-width:700px){.course-banner{grid-template-columns:1fr}}
.cb-eyebrow{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--sage-light);margin-bottom:8px}
.cb-title{font-family:var(--ff-d);font-size:28px;font-weight:300;color:var(--cream);margin-bottom:6px}
.cb-sub{font-size:12px;color:rgba(255,255,255,.5);font-weight:300;line-height:1.6;max-width:420px}
.cb-meta{display:flex;gap:16px;margin-top:12px;flex-wrap:wrap}
.cb-tag{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--sage-light);display:flex;align-items:center;gap:5px}
.cb-tag::before{content:'';width:4px;height:4px;border-radius:50%;background:var(--sage-light)}
.cb-btn{background:var(--terra);color:white;border:none;padding:12px 28px;border-radius:6px;font-family:var(--ff-b);font-size:11px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;white-space:nowrap;font-weight:500}

/* CORPORATE BANNER */
.corp-banner{margin:0 48px 24px;background:var(--linen);border-radius:12px;padding:28px 32px;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;border:1.5px solid var(--sand)}
@media(max-width:700px){.corp-banner{grid-template-columns:1fr}}
.corp-title{font-family:var(--ff-d);font-size:24px;font-weight:300;color:var(--sage-deep);margin-bottom:6px}
.corp-sub{font-size:12px;color:var(--charcoal);opacity:.6;font-weight:300;line-height:1.6;max-width:420px}
.corp-btn{background:var(--sage-deep);color:var(--cream);border:none;padding:12px 28px;border-radius:6px;font-family:var(--ff-b);font-size:11px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;white-space:nowrap;font-weight:500}

/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(30,36,32,.5);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px}
.modal{background:var(--cream);border-radius:14px;padding:40px;max-width:460px;width:100%;position:relative;max-height:90vh;overflow-y:auto}
.modal-close{position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:50%;border:1.5px solid var(--linen);background:transparent;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;color:var(--charcoal);opacity:.5}
.modal-close:hover{opacity:1}
.modal-eyebrow{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--sage);margin-bottom:8px}
.modal-title{font-family:var(--ff-d);font-size:28px;font-weight:300;color:var(--sage-deep);margin-bottom:6px}
.modal-title em{font-style:italic;color:var(--terra)}
.modal-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--linen);font-size:13px}
.modal-row:last-of-type{border-bottom:none}
.modal-row .ml{opacity:.6;font-weight:300}
.modal-row .mv{font-weight:500}
.modal-info{background:var(--linen);border-radius:8px;padding:14px 16px;margin:16px 0;font-size:12px;color:var(--charcoal);opacity:.7;line-height:1.6;font-weight:300}
.modal-btns{display:flex;gap:10px;margin-top:20px}
.mbtn-primary{flex:1;background:var(--sage-deep);color:var(--cream);border:none;padding:13px;border-radius:6px;font-family:var(--ff-b);font-size:11px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;font-weight:500}
.mbtn-ghost{background:transparent;border:1.5px solid var(--linen);color:var(--charcoal);padding:13px 20px;border-radius:6px;font-family:var(--ff-b);font-size:11px;cursor:pointer;opacity:.6}
.mbtn-ghost:hover{opacity:1}

/* CORP MODAL FORM */
.field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
.field label{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--sage);font-weight:500}
.field input,.field textarea,.field select{background:white;border:1.5px solid var(--linen);border-radius:6px;padding:10px 12px;font-family:var(--ff-b);font-size:13px;font-weight:300;color:var(--charcoal);outline:none}
.field input:focus,.field textarea:focus,.field select:focus{border-color:var(--sage)}
.field textarea{resize:vertical;min-height:80px}
.form-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
`;

/* ─── MOCK DATA ─── */
function getWeekDates(offset = 0) {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - now.getDay() + 1 + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

const DAY_NAMES = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
const COACHES = { daniel: "Daniel V.", nanda: "Nanda K.", raphael: "Raphael D." };

function buildSlots(dates) {
  const slots = {};
  dates.forEach((date, di) => {
    slots[di] = [];
    const dow = di; // 0=Mon
    // Ma/Wo/Vr (0,2,4) → regular + trial slots
    if ([0, 2, 4].includes(dow)) {
      slots[di].push(
        { id: `t${di}-1`, type: "regular", time: "07:30–08:15", lesson: "Ochtendbeweging", coach: "daniel", spots: 10, taken: 3 + di },
        { id: `t${di}-2`, type: "trial",   time: "07:30–08:15", lesson: "Proefles ochtend", coach: "raphael", spots: 3, taken: di === 2 ? 3 : 1 },
        { id: `t${di}-3`, type: "regular", time: "18:30–19:30", lesson: "Energieles", coach: "daniel", spots: 10, taken: 5 + di },
        { id: `t${di}-4`, type: "regular", time: "20:00–21:00", lesson: "Avondflow", coach: "raphael", spots: 10, taken: 2 },
        { id: `t${di}-5`, type: "trial",   time: "18:30–19:30", lesson: "Proefles avond", coach: "daniel", spots: 3, taken: di === 0 ? 3 : 0 },
      );
    }
    // Di/Do (1,3) → course sessions
    if ([1, 3].includes(dow)) {
      slots[di].push(
        { id: `c${di}-1`, type: "course", time: "19:00–21:00", lesson: "Wie ben ik? — Sessie " + (di === 1 ? "1" : "2"), coach: "raphael", spots: 12, taken: 7, course: true },
      );
    }
  });
  return slots;
}

function spotsLeft(s) { return s.spots - s.taken; }

/* ─── COMPONENTS ─── */
function SlotCard({ slot, onClick }) {
  const free = spotsLeft(slot);
  const isFull = free <= 0;
  return (
    <div className={`slot ${slot.type}${isFull ? " full" : ""}`} onClick={() => !isFull && onClick(slot)}>
      {isFull && <span className="full-badge">Vol</span>}
      <div className="slot-type-tag">
        {slot.type === "regular" ? "Regulier" : slot.type === "trial" ? "Proefles" : "Cursus"}
      </div>
      <div className="slot-time">{slot.time}</div>
      <div className="slot-lesson">{slot.lesson}</div>
      <div className="slot-footer">
        <span className="slot-coach">{COACHES[slot.coach]}</span>
        <div className="spots-bar">
          {Array.from({ length: slot.spots }).map((_, i) => (
            <span key={i} className={`spot ${i < slot.taken ? "taken" : `free ${slot.type}-s`}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BookingModal({ slot, date, onClose, onConfirm }) {
  const free = spotsLeft(slot);
  const typeLabel = slot.type === "regular" ? "Reguliere les" : slot.type === "trial" ? "Proefles" : "Cursussessie";
  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-eyebrow">{typeLabel}</div>
        <h2 className="modal-title">{slot.lesson.split("—")[0].trim()}<br /><em>{slot.time}</em></h2>
        <div style={{ marginTop: 20 }}>
          <div className="modal-row"><span className="ml">Dag</span><span className="mv">{date.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })}</span></div>
          <div className="modal-row"><span className="ml">Tijd</span><span className="mv">{slot.time}</span></div>
          <div className="modal-row"><span className="ml">Coach</span><span className="mv">{COACHES[slot.coach]}</span></div>
          <div className="modal-row"><span className="ml">Plekken vrij</span><span className="mv" style={{ color: free <= 2 ? "var(--terra)" : "inherit" }}>{free} van {slot.spots}</span></div>
          {slot.type !== "regular" && (
            <div className="modal-row"><span className="ml">Prijs</span><span className="mv">{slot.type === "trial" ? "Gratis" : "Zie cursusprijs"}</span></div>
          )}
        </div>
        {slot.type === "trial" && (
          <div className="modal-info">
            Dit is een eenmalige proefles. Je hoeft nog geen abonnement te hebben.
            Na de les ontvang je informatie over onze abonnementen.
          </div>
        )}
        {slot.type === "course" && (
          <div className="modal-info">
            Dit is sessie 1 van 6 van de cursus <strong>Wie ben ik?</strong>.
            Door in te schrijven reserveer je alle 6 sessies in één keer.
          </div>
        )}
        {slot.type === "regular" && (
          <div className="modal-info">
            Je abonnement geeft je toegang tot deze les. De plek wordt direct gereserveerd.
          </div>
        )}
        <div className="modal-btns">
          <button className="mbtn-ghost" onClick={onClose}>Annuleren</button>
          <button className="mbtn-primary" onClick={() => onConfirm(slot)}>
            {slot.type === "trial" ? "Gratis aanmelden →" : slot.type === "course" ? "Inschrijven →" : "Reserveren →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CorpModal({ onClose }) {
  const [sent, setSent] = useState(false);
  if (sent) return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ textAlign: "center", padding: "60px 40px" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
        <h2 style={{ fontFamily: "var(--ff-d)", fontSize: 28, color: "var(--sage-deep)", fontWeight: 300, marginBottom: 10 }}>Aanvraag verstuurd!</h2>
        <p style={{ fontSize: 13, opacity: .65, fontWeight: 300, lineHeight: 1.7, marginBottom: 28 }}>
          We nemen binnen 2 werkdagen contact op om de mogelijkheden te bespreken.
        </p>
        <button className="mbtn-primary" onClick={onClose}>Sluiten</button>
      </div>
    </div>
  );
  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-eyebrow">Voor bedrijven</div>
        <h2 className="modal-title">Teambuilding <em>aanvragen</em></h2>
        <p style={{ fontSize: 12, opacity: .6, fontWeight: 300, lineHeight: 1.6, margin: "12px 0 20px" }}>
          Dagdeel van 3–4 uur, volledig op maat. Wij nemen contact op voor een vrijblijvend gesprek.
        </p>
        <div className="form-grid-2">
          <div className="field"><label>Bedrijfsnaam</label><input placeholder="ACME B.V." /></div>
          <div className="field"><label>Contactpersoon</label><input placeholder="Naam" /></div>
        </div>
        <div className="form-grid-2">
          <div className="field"><label>E-mail</label><input type="email" placeholder="naam@bedrijf.nl" /></div>
          <div className="field"><label>Telefoon</label><input placeholder="+31 6 ..." /></div>
        </div>
        <div className="form-grid-2">
          <div className="field"><label>Aantal deelnemers</label>
            <select><option>5–10</option><option>10–20</option><option>20–30</option><option>30+</option></select>
          </div>
          <div className="field"><label>Dagdeel voorkeur</label>
            <select><option>Ochtend</option><option>Middag</option><option>Geen voorkeur</option></select>
          </div>
        </div>
        <div className="field"><label>Voorkeursdatum</label><input type="date" /></div>
        <div className="field"><label>Bericht (optioneel)</label>
          <textarea placeholder="Vertel iets over jullie team en wat je zoekt..." />
        </div>
        <div className="modal-btns">
          <button className="mbtn-ghost" onClick={onClose}>Annuleren</button>
          <button className="mbtn-primary" onClick={() => setSent(true)}>Aanvraag versturen →</button>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
export default function BookingScreen() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [filter, setFilter]         = useState("all");
  const [modal, setModal]           = useState(null);
  const [corpModal, setCorpModal]   = useState(false);
  const [courseModal, setCourseModal] = useState(false);
  const [booked, setBooked]         = useState([]);
  const [confirmed, setConfirmed]   = useState(null);

  const dates = getWeekDates(weekOffset);
  const allSlots = buildSlots(dates);

  const weekLabel = `${dates[0].toLocaleDateString("nl-NL", { day: "numeric", month: "short" })} – ${dates[6].toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" })}`;

  const FILTERS = [
    { id: "all",     label: "Alle sessies",  dot: null },
    { id: "regular", label: "Regulier",      dot: "var(--sage)" },
    { id: "trial",   label: "Proefles",      dot: "var(--terra)" },
    { id: "course",  label: "Wie ben ik?",   dot: "var(--sage-deep)" },
  ];

  function visibleSlots(daySlots) {
    if (filter === "all") return daySlots;
    return daySlots.filter(s => s.type === filter);
  }

  function handleConfirm(slot) {
    setBooked(prev => [...prev, slot.id]);
    setConfirmed(slot);
    setModal(null);
    setTimeout(() => setConfirmed(null), 3000);
  }

  return (
    <div className="page">
      <style>{css}</style>

      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-logo">The Happy State</div>
        <div className="topbar-user">
          <div className="user-avatar">DV</div>
          <span>Daniel Vissers</span>
        </div>
      </div>

      {/* HEADER */}
      <div className="header">
        <div className="header-left">
          <div className="header-eyebrow">Mijn agenda</div>
          <h1 className="header-title">Sessies <em>boeken</em></h1>
        </div>
        {confirmed && (
          <div style={{ background: "rgba(77,122,94,.1)", border: "1.5px solid var(--sage)", borderRadius: 8, padding: "10px 16px", fontSize: 12, color: "var(--sage)", fontWeight: 500 }}>
            ✓ {confirmed.lesson} gereserveerd
          </div>
        )}
      </div>

      {/* COURSE BANNER */}
      <div className="course-banner">
        <div>
          <div className="cb-eyebrow">6-weekse cursus</div>
          <div className="cb-title">Wie ben ik?</div>
          <div className="cb-sub">Een intensieve reis naar zelfkennis en authenticiteit. Elke week bouw je voort op de vorige sessie.</div>
          <div className="cb-meta">
            <span className="cb-tag">6 sessies</span>
            <span className="cb-tag">Dinsdag of donderdag</span>
            <span className="cb-tag">Max 12 deelnemers</span>
            <span className="cb-tag">Prijs volgt</span>
          </div>
        </div>
        <button className="cb-btn" onClick={() => setCourseModal(true)}>Meer info & inschrijven →</button>
      </div>

      {/* CORP BANNER */}
      <div className="corp-banner">
        <div>
          <div className="corp-title">Voor bedrijven — Teambuilding</div>
          <div className="corp-sub">Een dagdeel van 3 à 4 uur voor jouw team. Diepere verbinding, betere samenwerking. Volledig op maat samengesteld.</div>
        </div>
        <button className="corp-btn" onClick={() => setCorpModal(true)}>Offerte aanvragen →</button>
      </div>

      {/* FILTER TABS */}
      <div className="tabs">
        {FILTERS.map(f => (
          <button key={f.id} className={`tab${filter === f.id ? " active" : ""}`} onClick={() => setFilter(f.id)}>
            {f.dot && <span className="tab-dot" style={{ background: filter === f.id ? "rgba(255,255,255,.6)" : f.dot }} />}
            {f.label}
          </button>
        ))}
      </div>

      {/* WEEK NAV */}
      <div className="week-nav">
        <button className="week-btn" onClick={() => setWeekOffset(o => o - 1)}>←</button>
        <div className="week-label">{weekLabel}</div>
        <button className="week-btn" onClick={() => setWeekOffset(o => o + 1)}>→</button>
        {weekOffset !== 0 && (
          <button className="tab" onClick={() => setWeekOffset(0)} style={{ marginLeft: 8 }}>Vandaag</button>
        )}
      </div>

      {/* CALENDAR */}
      <div className="cal">
        {dates.map((date, di) => {
          const slots = visibleSlots(allSlots[di] || []);
          const isToday = date.toDateString() === new Date().toDateString();
          return (
            <div key={di} className="day-col">
              <div className="day-head">
                <div className="day-name">{DAY_NAMES[di]}</div>
                <div className={`day-num${isToday ? " today" : ""}`}>{date.getDate()}</div>
              </div>
              <div className="day-slots">
                {slots.length === 0 ? (
                  <div style={{ fontSize: 11, opacity: .3, textAlign: "center", paddingTop: 12 }}>—</div>
                ) : slots.map(slot => (
                  booked.includes(slot.id) ? (
                    <div key={slot.id} className={`slot ${slot.type}`} style={{ opacity: .6 }}>
                      <div className="slot-type-tag">✓ Geboekt</div>
                      <div className="slot-time">{slot.time}</div>
                      <div className="slot-lesson">{slot.lesson}</div>
                    </div>
                  ) : (
                    <SlotCard key={slot.id} slot={slot} onClick={s => setModal({ slot: s, date })} />
                  )
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* BOOKING MODAL */}
      {modal && (
        <BookingModal slot={modal.slot} date={modal.date} onClose={() => setModal(null)} onConfirm={handleConfirm} />
      )}

      {/* CORP MODAL */}
      {corpModal && <CorpModal onClose={() => setCorpModal(false)} />}

      {/* COURSE MODAL */}
      {courseModal && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setCourseModal(false)}>
          <div className="modal">
            <button className="modal-close" onClick={() => setCourseModal(false)}>×</button>
            <div className="modal-eyebrow">6-weekse cursus</div>
            <h2 className="modal-title">Wie ben ik?</h2>
            <p style={{ fontSize: 13, opacity: .65, fontWeight: 300, lineHeight: 1.7, margin: "12px 0 20px" }}>
              Een intensieve reis naar zelfkennis, authenticiteit en persoonlijke groei. Elke week bouw je voort op de inzichten van de vorige sessie — via de klaverbenadering.
            </p>
            {[["Duur", "6 weken · 1 sessie per week"],["Tijdstip","Dinsdag of donderdag · 19:00–21:00"],["Coach","Raphael Dollart of Daniel Vissers"],["Max deelnemers","12 personen"],["Prijs","Prijs volgt — vraag naar mogelijkheden"]].map(([l, v]) => (
              <div key={l} className="modal-row"><span className="ml">{l}</span><span className="mv">{v}</span></div>
            ))}
            <div className="modal-info">
              Door in te schrijven reserveer je alle 6 sessies in één keer. Je ontvangt een bevestiging met alle data per e-mail.
            </div>
            <div className="modal-btns">
              <button className="mbtn-ghost" onClick={() => setCourseModal(false)}>Sluiten</button>
              <button className="mbtn-primary" onClick={() => { setCourseModal(false); alert("→ Door naar cursus inschrijfflow + betaling"); }}>
                Inschrijven →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
