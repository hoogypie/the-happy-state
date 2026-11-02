/* Scherpe (vector) versies van de lesplaatjes Noise, Emotions en Connect.
   Gebruik in site.js: illustratie: "noise" | "emotions" | "connect" */

const LIJN = "#BFA79D";

function pad(points) {
  return points.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ") + " Z";
}

function Noise() {
  return (
    <g fill="none" stroke={LIJN} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M62 52 H80 L86 44 L92 58 L102 30 L110 56 L118 42 L124 54 L132 48 H140" />
      <path d="M44 80 H70 L76 70 L84 92 L94 52 L104 104 L114 62 L122 92 L130 72 L138 84 L146 78 H170" />
      <path d="M74 108 H92 L100 118 L108 96 L116 124 L124 100 L132 112 L140 104 H152" />
      <path d="M176 66 Q184 79 176 92" />
      <path d="M184 58 Q196 79 184 100" />
      <path d="M192 50 Q208 79 192 108" />
    </g>
  );
}

function Emotions() {
  const loops = [];
  for (let k = 0; k < 8; k++) {
    const pts = [];
    const fase = k * 0.35;
    for (let i = 0; i < 160; i++) {
      const t = (i / 160) * Math.PI * 2;
      const x = 120 + (66 + k * 1.6) * Math.cos(t) + 8 * Math.sin(2 * t + fase);
      const y = 80 + (34 + (k % 4) * 2.5) * Math.sin(t) + 14 * Math.sin(3 * t + fase) * 0.6 - 10 * Math.cos(2 * t - fase) * 0.5;
      pts.push([x, y]);
    }
    loops.push(<path key={k} d={pad(pts)} />);
  }
  return <g fill="none" stroke={LIJN} strokeWidth="1" opacity="0.95">{loops}</g>;
}

function Connect() {
  return (
    <g fill="none" stroke={LIJN} strokeWidth="1.2">
      <circle cx="96" cy="80" r="50" />
      <circle cx="144" cy="80" r="50" />
      <ellipse cx="120" cy="80" rx="24" ry="46" />
      <path d="M56 80 Q120 30 184 80" />
      <path d="M56 80 Q120 130 184 80" />
      <circle cx="46" cy="80" r="5" fill={LIJN} stroke="none" />
      <circle cx="194" cy="80" r="5" fill={LIJN} stroke="none" />
      <path d="M120 68 Q122 78 132 80 Q122 82 120 92 Q118 82 108 80 Q118 78 120 68 Z" fill={LIJN} stroke="none" />
    </g>
  );
}

const ITEMS = { noise: Noise, emotions: Emotions, connect: Connect };

export default function LesIllustratie({ naam, titel }) {
  const Teken = ITEMS[naam];
  return (
    <div className={`les-illu les-illu-${naam}`} role="img" aria-label={titel}>
      <span className="les-illu-titel">{titel.toUpperCase()}</span>
      {Teken && (
        <svg viewBox="0 0 240 160" aria-hidden="true">
          <Teken />
        </svg>
      )}
    </div>
  );
}
