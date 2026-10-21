/* ══════════════════════════════════════════════════════════════
   Homepage-secties. Elke sectie is een losse component, zodat je
   ze makkelijk kunt verplaatsen, weglaten of later aanvullen
   (zie src/app/page.jsx voor de volgorde).
   Teksten en foto's staan in src/content/site.js
   ══════════════════════════════════════════════════════════════ */
import * as site from "@/content/site";
import { Btn, CloverLogo, Eyebrow, Icon, Photo, Rich } from "./ui";
import HeroMedia from "./HeroMedia";
import ContactForm from "./ContactForm";

/* 1 ─ HERO */
export function Hero() {
  const h = site.hero;
  return (
    <section id="top" className={`hero${h.fotos.length ? " has-photo" : ""}`}>
      <HeroMedia fotos={h.fotos} video={h.video} videoLabel={h.videoLabel} />
      <div className="hero-overlay" aria-hidden="true" />
      {!h.fotos.length && (
        <div className="hero-mark" aria-hidden="true"><CloverLogo size={420} variant="cream" opacity={0.06} /></div>
      )}
      <div className="hero-inner container">
        <Eyebrow licht>{h.eyebrow}</Eyebrow>
        <h1 className="hero-title">
          {h.titel}<br /><em>{h.titelAccent}</em>
        </h1>
        <p className="hero-intro">{h.intro}</p>
        <div className="btn-row">
          {h.knoppen.map((k) => <Btn key={k.label} knop={k} />)}
        </div>
        <ul className="hero-usps">
          {h.voordelen.map((v) => (
            <li key={v.tekst}>
              <span className="usp-icon"><Icon name={v.icoon} size={18} /></span>
              {v.tekst}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* SPLITSING ─ voor jezelf / voor je team */
export function Splitsing() {
  return (
    <div className="split container">
      {site.splitsing.map((s, i) => (
        <a key={s.label} href={s.href} className={`split-card split-${i === 0 ? "a" : "b"}`}>
          <span className="split-icon"><Icon name={s.icoon} size={22} /></span>
          <span className="split-text">
            <span className="split-label">{s.label}</span>
            <span className="split-title">{s.titel}</span>
            <span className="split-sub">{s.tekst}</span>
          </span>
          <Icon name="arrow" size={20} className="split-arrow" />
        </a>
      ))}
    </div>
  );
}

/* 2 ─ ALTIJD "AAN" */
export function AltijdAan() {
  const a = site.altijdAan;
  return (
    <section className="section aan">
      <div className="container aan-grid">
        <div className="reveal">
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <h2 className="title">{a.titel}<br />{a.titelRegel2} <em>{a.titelAccent}</em></h2>
          <p className="body">{a.tekst}</p>
          <Btn knop={a.knop} />
        </div>
        <div className="aan-visual reveal">
          <Photo src={a.foto} alt="Man die tot rust komt in de studio" sizes="(max-width: 900px) 100vw, 50vw" className="aan-photo" />
          {a.citaat && <blockquote className="hand-quote">“{a.citaat}”</blockquote>}
        </div>
      </div>
    </section>
  );
}

/* 3 ─ DE BINNENWERELD */
export function Binnenwereld() {
  const b = site.binnenwereld;
  return (
    <section id="binnenwereld" className="section binnen">
      <div className="container binnen-grid">
        <div className="reveal">
          <Eyebrow>{b.eyebrow}</Eyebrow>
          <h2 className="title">{b.titel}</h2>
          <p className="body">{b.tekst}</p>
          <Btn knop={b.knop} stijl="lijn" />
        </div>
        <div className="diagram reveal" role="img" aria-label={`${b.midden}: ${b.lagen.map((l) => `${l.naam} – ${l.sub}`).join(", ")}`}>
          {b.lagen.map((l, i) => (
            <div key={l.naam} className={`circle c${i} kleur-${l.kleur}`}>
              <Icon name={l.icoon} size={30} strokeWidth={1.2} />
              <span className="circle-name">{l.naam}</span>
              <span className="circle-sub">{l.sub}</span>
            </div>
          ))}
          <div className="circle-mid">{b.midden}</div>
        </div>
        <ul className="binnen-list reveal">
          {b.lagen.map((l) => (
            <li key={l.naam}>
              <span className={`dot kleur-${l.kleur}`}><Icon name={l.icoon} size={20} strokeWidth={1.3} /></span>
              <span><strong>{l.naam}</strong>{l.effect}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 4 ─ LESSEN */
export function Lessen() {
  const l = site.lessen;
  const heeftReviews = l.reviews.length > 0;
  return (
    <section id="aanbod" className="section lessen">
      <div className="container">
        <div className="reveal">
          <Eyebrow>{l.eyebrow}</Eyebrow>
          <h2 className="title">{l.titel} <em>{l.titelAccent}</em></h2>
          <p className="body">{l.intro}</p>
        </div>
        <div className={`lessen-wrap${heeftReviews ? " met-reviews" : ""}`}>
          <div className="lessen-grid">
            {l.items.map((les, i) => (
              <article key={les.naam} className="les-card reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <Photo src={les.foto} alt={les.naam} sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw" className="les-photo" />
                <div className="les-body">
                  <h3>{les.naam}</h3>
                  <div className="les-sub">{les.sub}</div>
                  <p>{les.tekst}</p>
                  <Btn
                    knop={{
                      label: l.knopLabel,
                      href: "#contact",
                      onderwerp: les.naam === "1:1 Coaching" ? "1:1 Coaching" : "Vrijblijvende kennismaking",
                    }}
                    stijl="lijn"
                    className="btn-klein"
                  />
                </div>
              </article>
            ))}
          </div>
          {heeftReviews && (
            <aside className="reviews reveal">
              {l.reviews.map((r) => (
                <figure key={r.naam}>
                  <blockquote>“{r.tekst}”</blockquote>
                  <figcaption>— {r.naam}{r.sub && <span>{r.sub}</span>}</figcaption>
                </figure>
              ))}
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

/* 5 ─ VOOR BEDRIJVEN */
export function Bedrijven() {
  const b = site.bedrijven;
  return (
    <section id="bedrijven" className="section bedrijven">
      <div className="bedrijven-grid">
        <div className="bedrijven-text reveal">
          <Eyebrow>{b.eyebrow}</Eyebrow>
          <h2 className="title">{b.titel}<br />{b.titelRegel2}</h2>
          <p className="body">{b.tekst}</p>
          <ul className="bedrijven-aanbod">
            {b.aanbod.map((a) => (
              <li key={a.naam}>
                <Icon name={a.icoon} size={26} strokeWidth={1.2} />
                <strong>{a.naam}</strong>
                <span>{a.sub}</span>
              </li>
            ))}
          </ul>
          <Btn knop={b.knop} />
        </div>
        <div className={`bedrijven-fotos n${Math.min(b.fotos.length, 3)} reveal`}>
          {(b.fotos.length ? b.fotos : [null]).slice(0, 3).map((f, i) => (
            <Photo key={i} src={f} alt="Training voor een team" sizes="(max-width: 900px) 100vw, 45vw" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* 6 ─ KLAVERBENADERING */
export function Klaver() {
  const k = site.klaver;
  return (
    <section id="methode" className="section klaver">
      <div className="container klaver-grid">
        <div className="reveal">
          <Eyebrow>{k.eyebrow}</Eyebrow>
          <h2 className="title">{k.titel} <em>{k.titelAccent}</em>{k.titelRest}</h2>
          <p className="body">{k.tekst}</p>
          <Btn knop={k.knop} stijl="lijn" />
        </div>
        <div className="klaver-cards reveal">
          {k.onderdelen.map((o) => (
            <div key={o.nr} className="klaver-card">
              <span className="klaver-nr">{o.nr}</span>
              <div className="klaver-head"><Icon name={o.icoon} size={22} strokeWidth={1.3} /><h3>{o.naam}</h3></div>
              <p>{o.tekst}</p>
            </div>
          ))}
        </div>
        <div className="klaver-visual reveal">
          <Photo src={k.foto} alt="Deelnemer in de studio" sizes="(max-width: 900px) 100vw, 25vw" className="klaver-photo" />
          {k.citaat && <blockquote className="hand-quote licht">“{k.citaat}”</blockquote>}
        </div>
      </div>
    </section>
  );
}

/* 7 ─ COMMUNITY & EVENTS */
export function Community() {
  const c = site.community;
  return (
    <section id="community" className="section community">
      <div className="container community-grid">
        <div className="reveal">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 className="title">{c.titel}<br />{c.titelRegel2} <em>{c.titelAccent}</em></h2>
          <p className="body">{c.tekst}</p>
          <Btn knop={c.knop} stijl="lijn" />
        </div>
        <div className="community-fotos reveal">
          {c.fotos.map((f, i) => (
            <Photo key={i} src={f} alt="Sfeer tijdens een community-avond" sizes="(max-width: 700px) 50vw, 18vw" />
          ))}
        </div>
      </div>
      {c.events.length > 0 && (
        <div className="container events reveal">
          {c.events.map((e) => (
            <div key={e.titel} className="event">
              <span className="event-datum">{e.datum}</span>
              <span><strong>{e.titel}</strong>{e.tekst}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* 8 ─ LIDMAATSCHAPPEN */
export function Lidmaatschappen() {
  const m = site.lidmaatschappen;
  return (
    <section id="lidmaatschappen" className="section leden">
      <div className="container">
        <div className="reveal">
          <Eyebrow>{m.eyebrow}</Eyebrow>
          <h2 className="title">{m.titel}</h2>
        </div>
        <div className="plans reveal">
          {m.plannen.map((p) => (
            <div key={p.naam} className={`plan${p.uitgelicht ? " featured" : ""}`}>
              <div className="plan-head">
                <h3>{p.naam}</h3>
                {p.uitgelicht && <span className="plan-badge">{p.uitgelicht}</span>}
              </div>
              <p className="plan-sub">{p.sub}</p>
              <ul>
                {p.voordelen.map((v) => (
                  <li key={v}><Icon name="check" size={16} strokeWidth={2} />{v}</li>
                ))}
              </ul>
              <div className="plan-price">€{p.prijs}<span>{m.prijsLabel}</span></div>
              <Btn
                knop={{ label: `${m.knopLabel} ${p.naam}`, href: "#contact", onderwerp: `Lidmaatschap ${p.naam}` }}
                stijl={p.uitgelicht ? "creme" : "primair"}
                className="btn-vol"
              />
            </div>
          ))}
        </div>
        <p className="plans-note">{m.voetnoot}</p>
      </div>
    </section>
  );
}

/* 9 ─ KENNISMAKEN + FORMULIER */
export function Kennismaken() {
  const k = site.kennismaken;
  return (
    <section id="contact" className="section kennis">
      <div className="container kennis-grid">
        <div className="kennis-banner reveal">
          <Photo src={k.foto} alt="De studio van The Happy State" sizes="(max-width: 900px) 100vw, 50vw" className="kennis-photo" label="Sfeerfoto studio volgt" />
          <div className="kennis-overlay" aria-hidden="true" />
          <div className="kennis-text">
            <Eyebrow licht>{k.eyebrow}</Eyebrow>
            <h2 className="title licht">{k.titel}</h2>
            <p>{k.tekst}</p>
            <p className="kennis-mail">Liever mailen? <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
          </div>
        </div>
        <div className="reveal">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/* 10 ─ OPRICHTERS */
export function Oprichters() {
  const o = site.oprichters;
  return (
    <section id="over-ons" className="section oprichters">
      <div className="container oprichters-grid">
        <div className="reveal">
          <Eyebrow>{o.eyebrow}</Eyebrow>
          <h2 className="title">{o.titel}<br /><em>{o.titelAccent}</em></h2>
          {o.tekst.map((t, i) => <p key={i} className="body"><Rich text={t} /></p>)}
          <Btn knop={o.knop} stijl="lijn" />
        </div>
        <div className={`oprichters-fotos n${o.fotos.length} reveal`}>
          {o.fotos.map((f, i) => (
            <Photo key={i} src={f} alt={i === 0 ? "Daniel" : "Raphael"} sizes="(max-width: 900px) 50vw, 25vw" />
          ))}
        </div>
        {o.citaat && (
          <blockquote className="hand-quote oprichters-quote reveal">
            “{o.citaat}”
            <span>{o.ondertekening}</span>
          </blockquote>
        )}
      </div>
    </section>
  );
}

/* FOOTER */
export function Footer() {
  const f = site.footer;
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <a href="#top" className="footer-logo"><CloverLogo size={34} variant="cream" opacity={0.85} /><span>The Happy State</span></a>
          <p>{f.tagline}</p>
        </div>
        <nav aria-label="Footer">
          {site.nav.links.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="footer-contact">
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          {f.adres && <span>{f.adres}</span>}
          {f.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} The Happy State · Rotterdam</div>
    </footer>
  );
}
