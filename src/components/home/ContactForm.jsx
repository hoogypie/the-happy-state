"use client";
import { useEffect, useState } from "react";
import { contact, kennismaken } from "@/content/site";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

export default function ContactForm() {
  const [type, setType] = useState("particulier");
  const [onderwerp, setOnderwerp] = useState(kennismaken.onderwerpen[0]);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  /* Knoppen elders op de pagina met data-onderwerp vullen het onderwerp alvast in */
  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest?.("[data-onderwerp]");
      if (!el) return;
      const o = el.getAttribute("data-onderwerp");
      if (!o) return;
      if (!kennismaken.onderwerpen.includes(o)) return;
      setOnderwerp(o);
      if (o === "Zakelijk aanbod") setType("bedrijf");
      setStatus("idle");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Nog geen Formspree gekoppeld → open het mailprogramma als noodoplossing
    if (!FORMSPREE_ID) {
      const body = Object.entries(data)
        .filter(([k, v]) => v && !k.startsWith("_"))
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(data.onderwerp)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _subject: `Website: ${data.onderwerp}` }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-card form-done" role="status">
        <div className="form-done-title">Dank je wel!</div>
        <p>We hebben je bericht ontvangen en nemen binnen twee werkdagen contact met je op.</p>
        <button className="btn btn-lijn" onClick={() => setStatus("idle")}>Nog een bericht sturen</button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <fieldset className="form-type">
        <legend className="sr-only">Ik ben</legend>
        {[
          ["particulier", "Voor mezelf"],
          ["bedrijf", "Voor mijn team / bedrijf"],
        ].map(([v, l]) => (
          <label key={v} className={type === v ? "active" : ""}>
            <input type="radio" name="type" value={v} checked={type === v} onChange={() => setType(v)} />
            {l}
          </label>
        ))}
      </fieldset>

      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-naam">Naam</label>
          <input id="cf-naam" name="naam" required autoComplete="name" placeholder="Jouw naam" />
        </div>
        {type === "bedrijf" && (
          <div className="field">
            <label htmlFor="cf-bedrijf">Organisatie</label>
            <input id="cf-bedrijf" name="organisatie" autoComplete="organization" placeholder="Naam organisatie" />
          </div>
        )}
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-email">E-mailadres</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="jij@email.nl" />
        </div>
        <div className="field">
          <label htmlFor="cf-tel">Telefoon <span className="optional">(optioneel)</span></label>
          <input id="cf-tel" name="telefoon" type="tel" autoComplete="tel" placeholder="06 …" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-onderwerp">Waar gaat het over?</label>
        <select id="cf-onderwerp" name="onderwerp" value={onderwerp} onChange={(e) => setOnderwerp(e.target.value)}>
          {kennismaken.onderwerpen.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="field">
        <label htmlFor="cf-bericht">Bericht <span className="optional">(optioneel)</span></label>
        <textarea id="cf-bericht" name="bericht" rows={4} placeholder="Vertel kort wat je zoekt, of wanneer het je uitkomt." />
      </div>

      <button type="submit" className="btn btn-primair btn-vol" disabled={status === "sending"}>
        {status === "sending" ? "Versturen…" : "Verstuur"}
      </button>
      {status === "error" && (
        <p className="form-error" role="alert">
          Er ging iets mis. Probeer het opnieuw of mail ons via <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      )}
    </form>
  );
}
