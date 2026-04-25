// src/screens/MainMenu.jsx
import { useState, useEffect, useRef } from "react";

const LOGO    = "/logo.png";
const MENU_BG = "/menu-bg.jpg";

const NAV = [
  { screen:"chapters", label:"The Story",         detail:"Chapters I – IV",           tag:"NARRATIVE", icon:"I"   },
  { screen:"fixtures", label:"Fixtures & Results", detail:"Season 2025–26",            tag:"FIXTURES",  icon:"II"  },
  { screen:"roster",   label:"Squad & Staff",      detail:"22 Players · Coaching Staff",tag:"SQUAD",    icon:"III" },
  { screen:"kits",     label:"Kit Room",           detail:"Home & Away · 2025–26",     tag:"KITS",      icon:"IV"  },
  { screen:"about",    label:"Club History",       detail:"124 Years · Est. 1901",     tag:"CLUB",      icon:"V"   },
];

export default function MainMenu({ onGo }) {
  const [mounted,  setMounted]  = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [hovered,  setHovered]  = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  useEffect(() => {
    const img = new Image();
    img.src = MENU_BG;
    img.onload  = () => setBgLoaded(true);
    img.onerror = () => setBgLoaded(false);
  }, []);

  // Floating particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const ctx = canvas.getContext("2d");
    const pts = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.1 + 0.3,
      vx:(Math.random() - 0.5) * 0.15,
      vy:-(Math.random() * 0.2 + 0.06),
      a: Math.random() * 0.6 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(201,168,76,${p.a * 0.28})`; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        p.a += (Math.random()-0.5)*0.008;
        p.a  = Math.max(0.05, Math.min(0.8, p.a));
        if (p.y < -4) p.y = canvas.height+4;
        if (p.x < -4) p.x = canvas.width+4;
        if (p.x > canvas.width+4) p.x = -4;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div style={{ minHeight:"100vh", position:"relative", display:"flex", flexDirection:"column", overflow:"hidden", background:"#060e06" }}>

      {/* Bg photo */}
      {bgLoaded && (
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:`url(${MENU_BG})`,
          backgroundSize:"cover", backgroundPosition:"center 25%",
          opacity:0.18, zIndex:0, transition:"opacity 1.2s ease",
        }} />
      )}

      {/* Fallback radial gradient */}
      {!bgLoaded && (
        <div style={{
          position:"absolute", inset:0, zIndex:0,
          background:`
            radial-gradient(ellipse at 12% 65%, rgba(28,65,28,0.6) 0%, transparent 55%),
            radial-gradient(ellipse at 88% 12%, rgba(70,50,8,0.22)  0%, transparent 50%)
          `,
        }} />
      )}

      {/* Overlay gradient */}
      <div style={{
        position:"absolute", inset:0, zIndex:1,
        background:`linear-gradient(180deg, rgba(6,14,6,0.78) 0%, rgba(6,14,6,0.22) 28%, rgba(6,14,6,0.38) 62%, rgba(6,14,6,0.98) 100%)`,
      }} />

      {/* Grid */}
      <div style={{
        position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
        backgroundImage:`
          repeating-linear-gradient(0deg,  transparent, transparent 80px, rgba(201,168,76,0.016) 80px, rgba(201,168,76,0.016) 81px),
          repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(201,168,76,0.016) 80px, rgba(201,168,76,0.016) 81px)
        `,
      }} />

      {/* Particles */}
      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, zIndex:3, width:"100%", height:"100%", pointerEvents:"none" }} />

      {/* Content */}
      <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", minHeight:"100vh" }}>

        {/* Top bar */}
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"15px 22px",
          borderBottom:"1px solid rgba(201,168,76,0.07)",
          opacity: mounted ? 1 : 0, transition:"opacity 0.6s ease",
        }}>
          <span style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"0.65rem", letterSpacing:5, color:"rgba(201,168,76,0.3)" }}>
            LOUGHBOROUGH UNIVERSITY
          </span>
          <div style={{ width:5, height:5, borderRadius:"50%", background:"rgba(201,168,76,0.3)", boxShadow:"0 0 8px rgba(201,168,76,0.5)", animation:"logoGlow 2.5s ease-in-out infinite alternate" }} />
          <span style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"0.65rem", letterSpacing:5, color:"rgba(201,168,76,0.3)" }}>
            EST. 1901
          </span>
        </div>

        {/* Hero */}
        <div style={{
          display:"flex", flexDirection:"column", alignItems:"center",
          padding:"42px 24px 34px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateY(18px)",
          transition:"opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
        }}>
          {/* Logo */}
          <div style={{ position:"relative", marginBottom:26 }}>
            <div style={{ position:"absolute", inset:-18, borderRadius:"50%", background:"radial-gradient(circle, rgba(201,168,76,0.13) 0%, transparent 68%)", animation:"logoGlow 3.5s ease-in-out infinite alternate" }} />
            <div style={{ position:"absolute", inset:-5, borderRadius:"50%", border:"1px solid rgba(201,168,76,0.12)" }} />
            <img src={LOGO} alt="Stags"
              style={{ width:118, height:118, objectFit:"contain", position:"relative", zIndex:1, filter:"drop-shadow(0 4px 28px rgba(201,168,76,0.22))" }}
              onError={e => { e.currentTarget.style.display="none"; }}
            />
          </div>

          {/* Wordmark */}
          <div style={{ textAlign:"center", marginBottom:8 }}>
            <div style={{ fontFamily:"'Crimson Pro', serif", fontStyle:"italic", fontSize:"0.75rem", letterSpacing:5, color:"rgba(201,168,76,0.45)", textTransform:"uppercase", marginBottom:8 }}>
              Inter-College Football
            </div>
            <div style={{
              fontFamily:"'Bebas Neue', sans-serif",
              fontSize:"clamp(3rem, 11vw, 5.2rem)",
              letterSpacing:5, lineHeight:0.9,
              background:"linear-gradient(180deg, #f2dc80 0%, #c9a84c 50%, #7a5c14 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              filter:"drop-shadow(0 2px 16px rgba(201,168,76,0.12))",
            }}>Loughbottom</div>
            <div style={{
              fontFamily:"'Bebas Neue', sans-serif",
              fontSize:"clamp(3rem, 11vw, 5.2rem)",
              letterSpacing:5, lineHeight:0.9,
              background:"linear-gradient(180deg, #dcc060 0%, #9a7228 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>FC</div>
          </div>

          {/* Rule + tagline */}
          <div style={{ display:"flex", alignItems:"center", gap:12, margin:"16px 0 10px", width:"100%", maxWidth:260 }}>
            <div style={{ flex:1, height:1, background:"linear-gradient(90deg, transparent, rgba(201,168,76,0.35))" }} />
            <div style={{ fontFamily:"'Playfair Display', serif", fontStyle:"italic", fontSize:"0.78rem", letterSpacing:2, color:"rgba(201,168,76,0.5)", whiteSpace:"nowrap" }}>
              The Last Leap
            </div>
            <div style={{ flex:1, height:1, background:"linear-gradient(90deg, rgba(201,168,76,0.35), transparent)" }} />
          </div>

          {/* Season tag — NO match stats */}
          <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"0.68rem", letterSpacing:5, color:"rgba(201,168,76,0.28)" }}>
            Season 2025 – 26
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex:1, display:"flex", flexDirection:"column", borderTop:"1px solid rgba(201,168,76,0.07)" }}>
          {NAV.map((item, i) => (
            <button
              key={item.screen}
              onClick={() => onGo(item.screen)}
              onMouseEnter={() => setHovered(item.screen)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background:   hovered === item.screen ? "rgba(201,168,76,0.05)" : "transparent",
                border:       "none",
                borderBottom: "1px solid rgba(201,168,76,0.07)",
                color:        "var(--cream)",
                padding:      "0 22px",
                height:       66,
                textAlign:    "left",
                display:      "flex", alignItems:"center", gap:18,
                cursor:       "pointer",
                transition:   "background 0.22s ease",
                opacity:      mounted ? 1 : 0,
                animation:    mounted ? `pageFade 0.5s ease ${0.22+i*0.08}s both` : "none",
                position:     "relative",
                width:        "100%",
              }}
            >
              {/* Left accent */}
              <div style={{
                position:"absolute", left:0, top:0, bottom:0, width:2,
                background:"linear-gradient(180deg, transparent, var(--gold), transparent)",
                opacity: hovered === item.screen ? 1 : 0,
                transition:"opacity 0.22s",
              }} />

              {/* Roman numeral */}
              <div style={{
                fontFamily:"'Bebas Neue', sans-serif",
                fontSize:"0.7rem", letterSpacing:2,
                color: hovered === item.screen ? "var(--gold)" : "rgba(201,168,76,0.2)",
                transition:"color 0.22s", minWidth:22, textAlign:"right",
              }}>{item.icon}</div>

              {/* Separator */}
              <div style={{
                width:1, height:30,
                background: hovered === item.screen ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0.08)",
                transition:"background 0.22s", flexShrink:0,
              }} />

              {/* Text */}
              <div style={{ flex:1 }}>
                <div style={{
                  fontFamily:"'Bebas Neue', sans-serif",
                  fontSize:"0.58rem", letterSpacing:4,
                  color: hovered === item.screen ? "rgba(201,168,76,0.65)" : "rgba(201,168,76,0.2)",
                  marginBottom:3, transition:"color 0.22s",
                }}>{item.tag}</div>
                <div style={{
                  fontFamily:"'Playfair Display', serif",
                  fontWeight:700, fontSize:"1.02rem", lineHeight:1.15,
                  color: hovered === item.screen ? "#ffffff" : "rgba(235,225,205,0.82)",
                  transition:"color 0.22s", letterSpacing:0.3,
                }}>{item.label}</div>
                <div style={{
                  fontFamily:"'Crimson Pro', serif",
                  fontStyle:"italic", fontSize:"0.72rem",
                  color: hovered === item.screen ? "rgba(201,168,76,0.55)" : "rgba(201,168,76,0.22)",
                  marginTop:2, transition:"color 0.22s",
                }}>{item.detail}</div>
              </div>

              {/* Arrow */}
              <div style={{
                fontFamily:"'Playfair Display', serif", fontSize:"1.1rem",
                color: hovered === item.screen ? "var(--gold)" : "rgba(201,168,76,0.18)",
                transform: hovered === item.screen ? "translateX(3px)" : "none",
                transition:"all 0.22s", flexShrink:0,
              }}>›</div>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div style={{
          padding:"13px 22px",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          borderTop:"1px solid rgba(201,168,76,0.06)",
          opacity: mounted ? 1 : 0, transition:"opacity 1s ease 0.7s",
        }}>
          <span style={{ fontSize:"0.58rem", letterSpacing:3, color:"rgba(201,168,76,0.18)", textTransform:"uppercase" }}>Proud · Noble · Forever</span>
          <span style={{ fontSize:"0.58rem", letterSpacing:3, color:"rgba(201,168,76,0.18)", textTransform:"uppercase" }}>124 Years</span>
        </div>
      </div>
    </div>
  );
}
