// src/screens/Kits.jsx
import { Page, Header } from "../components/UI.jsx";

const HOME_KIT = "/home-kit.png";
const AWAY_KIT = "/away-kit.png";

export default function Kits({ onGo }) {
  return (
    <Page>
      <Header title="Kit Room" sub="Season 2025–26" onBack={() => onGo("menu")} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "16px" }}>
        {[
          { src: HOME_KIT, label: "Home", name: "Green & Gold", desc: "Dark Loughborough green with gold pinstripes and oak leaf motifs. 124 years of history in its fibres." },
          { src: AWAY_KIT, label: "Away", name: "Bone & Forest", desc: "Bone white with forest green and gold trim. Players call it the Ghost Kit. Nobody knows exactly why." },
        ].map(kit => (
          <div key={kit.label} style={{
            border: "1px solid var(--border)",
            background: "var(--glass)",
            padding: "20px 14px",
            textAlign: "center",
          }}>
            <img
              src={kit.src} alt={`${kit.label} Kit`}
              style={{ width: "100%", maxWidth: 160, objectFit: "contain", margin: "0 auto" }}
              onError={e => { e.currentTarget.style.opacity = 0.3; }}
            />
            <div style={{
              fontSize: "0.65rem", letterSpacing: 3, textTransform: "uppercase",
              color: "var(--gold)", marginTop: 16,
            }}>{kit.label}</div>
            <div style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 700,
              fontSize: "1rem", marginTop: 4,
            }}>{kit.name}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "8px 24px 48px" }}>
        <div style={{
          fontSize: "0.65rem", letterSpacing: 4, textTransform: "uppercase",
          color: "var(--gold)", padding: "12px 0", borderBottom: "1px solid var(--border)",
          marginBottom: 16,
        }}>About the Kits</div>
        {[
          "The home kit — deep Loughborough green with gold pinstripes and oak leaf motifs — carries the weight of 124 years. It has been worn in triumph and, far more often, in defeat.",
          "The away kit, bone white with forest green and gold trim, is reserved for away fixtures. Players call it the Ghost Kit. Nobody knows exactly why. The reason, one suspects, is historical.",
          "Both kits carry the leaping stag and the inscription: Proud · Noble · Forever.",
        ].map((p, i) => (
          <p key={i} style={{ color: "#c0b898", lineHeight: 1.8, marginBottom: "1em", fontSize: "1rem" }}>{p}</p>
        ))}
      </div>
    </Page>
  );
}
