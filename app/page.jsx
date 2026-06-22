"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const NAME   = "Merheb";
const ROLE   = "Solo Product Engineer";
const EMAIL  = "hello@merheb.net";
const GITHUB = "https://github.com/wissam-merheb";

const NAV_ITEMS = [
  { id: "about",   label: "About"   },
  { id: "work",    label: "Work"    },
  { id: "contact", label: "Contact" },
];

const STACK = [
  { label: "Flutter",         kind: "mobile"   },
  { label: "Firebase",        kind: "backend"  },
  { label: "Next.js",         kind: "web"      },
  { label: "PHP / MySQL",     kind: "web"      },
  { label: "Socket.IO",       kind: "realtime" },
  { label: "Cloud Functions", kind: "backend"  },
  { label: "OpenStreetMap",   kind: "maps"     },
  { label: "Gemini OCR",      kind: "ai"       },
  { label: "MQTT",            kind: "iot"      },
  { label: "ESP8266",         kind: "iot"      },
  { label: "TypeScript",      kind: "lang"     },
  { label: "Riverpod",        kind: "mobile"   },
  { label: "Flame Engine",    kind: "game"     },
];

// bento grid: large = hero card (full width on row), medium = half, small = third
// span: 12 cols total, each project has colSpan + rowSpan hint
const PROJECTS = [
  {
    name: "lira",
    headline: "Every Lira Counts",
    blurb: "Family expense tracker with budgets, multi-currency support, nested categories, smart reminders, and one-tap CSV / PDF exports. Shipped and live on the Play Store.",
    kind: "phone", bento: "hero", shipped: true, shot: "/shots/lira.png",
    surface: "Flutter · Android / iOS",
    tags: ["Firebase", "Cloud Functions", "native IAP"],
    accent: "#C9A24B", tint: "#1b1a17",
    year: "2024",
  },
  {
    name: "chefbasket",
    headline: "Meal Planning, Simplified",
    blurb: "Weekly meal-box planner for families — build a plan, stay on budget, drain the pantry, and split the grocery list across stores. WhatsApp order in one tap.",
    kind: "phone", bento: "medium", shot: "/shots/chefbasket.png",
    surface: "Flutter · Android / iOS",
    tags: ["Firebase", "Riverpod", "GoRouter", "RevenueCat"],
    accent: "#E07B54", tint: "#2a1a14",
    year: "2025",
  },
  {
    name: "tanke",
    headline: "Never Run Out of Gas",
    blurb: "IoT propane-tank monitor — ESP8266 weight sensors stream live fill-level via MQTT. Alerts fire over FCM, SMS, and WhatsApp when gas runs low.",
    kind: "phone", bento: "medium", shot: "/shots/tanke.png",
    surface: "Flutter · Node.js · ESP8266",
    tags: ["MQTT", "Firebase", "Twilio", "Syncfusion"],
    accent: "#5BAED6", tint: "#102233",
    year: "2024",
  },
  {
    name: "yallatuk",
    headline: "Ride the Tuk-Tuk",
    blurb: "Tuk-tuk ride-hailing — book, track the driver live on a map, pay your way. Two apps (rider + driver) engineered to run at near-zero infra cost.",
    kind: "phone", bento: "medium", shot: "/shots/yallatuk.png",
    surface: "Flutter · Android",
    tags: ["Socket.IO", "OpenStreetMap", "Fly.io"],
    accent: "#9C8CE0", tint: "#1f1b2e",
    year: "2024",
  },
  {
    name: "expiryguard",
    headline: "Rescue What's About to Go",
    blurb: "Track household items by expiry date, get nudges before waste happens, and find donation drop-offs on a live OpenStreetMap layer.",
    kind: "phone", bento: "medium", shot: "/shots/expiryguard.png",
    surface: "Flutter · Android",
    tags: ["Firebase", "OpenStreetMap", "Overpass API"],
    accent: "#86C29A", tint: "#16241c",
    year: "2024",
  },
  {
    name: "cartiq",
    headline: "Build the Cheapest Basket",
    blurb: "Compare grocery prices across supermarkets in real time. Scan barcodes, search, split one list across stores — Gemini OCR reads receipts.",
    kind: "phone", bento: "medium", shot: "/shots/cartiq.png",
    surface: "Flutter · Android",
    tags: ["Firebase", "Gemini OCR", "price pipeline"],
    accent: "#7FB59A", tint: "#15302a",
    year: "2025",
  },
  {
    name: "gravit",
    headline: "50 Levels. One More Time.",
    blurb: "Arcade tower-stacking game — 50 levels across 5 worlds, with a game-feel that keeps people tapping one more time. Online leaderboard via Firebase.",
    kind: "phone", bento: "hero", tag: "game", shot: "/shots/gravit.png",
    surface: "Flutter + Flame · Android",
    tags: ["Firebase", "AdMob", "App Check", "Google Sign-In"],
    accent: "#5FC7D6", tint: "#102a33",
    year: "2024",
  },
  {
    name: "engravia",
    headline: "Personalized Gifts, Live Preview",
    blurb: "Online store for personalized engraved gifts — live customization preview, cart, and full checkout pipeline, built end to end from scratch.",
    kind: "browser", bento: "medium", shot: "/shots/engravia.png",
    surface: "Web storefront · Lebanon",
    tags: ["PHP", "MySQL", "PHPMailer"],
    accent: "#C99A5B", tint: "#231d16",
    year: "2023",
  },
  {
    name: "yalla-admin",
    headline: "Operations Console",
    blurb: "Back-office for the Yalla ride platform — KYC review, wallet top-ups, driver management, ride audits, and live trip maps all in one console.",
    kind: "browser", bento: "medium", shot: "/shots/yalla-admin.png",
    surface: "Web dashboard",
    tags: ["Next.js 16", "TypeScript", "TanStack", "Firebase", "Leaflet"],
    accent: "#A78BFA", tint: "#1a1730",
    year: "2025",
  },
  {
    name: "admin dashboards",
    headline: "The Engine Room",
    blurb: "The back office behind the products — orders, inventory, live ops, analytics. What clients never see, but can't operate without.",
    kind: "browser", bento: "medium", shot: "/shots/dashboards.png",
    surface: "Web dashboards",
    tags: ["Next.js", "Firebase", "Cloud Functions"],
    accent: "#7FB59A", tint: "#13201d",
    year: "2023–2025",
  },
];

// ─── THEME ───────────────────────────────────────────────────────────────────
const T = {
  bg:      "#060709",
  surface: "#0d0f14",
  card:    "#111318",
  border:  "rgba(255,255,255,0.07)",
  borderHover: "rgba(255,255,255,0.13)",
  text:    "#e2e4ea",
  muted:   "#5a6172",
  green:   "#4ade80",
  cyan:    "#22d3ee",
  amber:   "#fbbf24",
  purple:  "#a78bfa",
};

// ─── FONTS ───────────────────────────────────────────────────────────────────
const display = "'Clash Display', 'Plus Jakarta Sans', system-ui, sans-serif";
const body    = "'Plus Jakarta Sans', system-ui, sans-serif";
const mono    = "'JetBrains Mono', 'Fira Code', ui-monospace, monospace";

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-35% 0px -55% 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

// ─── REVEAL WRAPPER ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      transition: `opacity 0.85s cubic-bezier(0.32,0.72,0,1) ${delay}ms, transform 0.85s cubic-bezier(0.32,0.72,0,1) ${delay}ms, filter 0.85s cubic-bezier(0.32,0.72,0,1) ${delay}ms`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      filter: visible ? "blur(0px)" : "blur(4px)",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── FLOATING PILL NAV ───────────────────────────────────────────────────────
function FloatingNav() {
  const active = useActiveSection(NAV_ITEMS.map(n => n.id));
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop nav pill */}
      <nav style={{
        position: "fixed", top: 24, left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex", alignItems: "center", gap: 2,
        padding: "6px 8px",
        borderRadius: 9999,
        background: scrolled ? "rgba(6,7,9,0.85)" : "rgba(6,7,9,0.5)",
        border: `1px solid ${scrolled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        transition: "background 0.4s cubic-bezier(0.32,0.72,0,1), border-color 0.4s cubic-bezier(0.32,0.72,0,1)",
      }} className="desktop-nav">
        <span style={{ fontFamily: mono, fontSize: 12, color: T.green, padding: "6px 14px", letterSpacing: ".06em" }}>
          merheb /
        </span>
        <div style={{ width: 1, height: 16, background: T.border, margin: "0 4px" }} />
        {NAV_ITEMS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <a key={id} href={`#${id}`} style={{
              fontFamily: body, fontSize: 12.5, fontWeight: 500,
              color: isActive ? T.text : T.muted,
              padding: "6px 14px", borderRadius: 9999, textDecoration: "none",
              background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
              transition: "all 0.3s cubic-bezier(0.32,0.72,0,1)",
              letterSpacing: ".01em",
            }}>
              {label}
            </a>
          );
        })}
        <div style={{ width: 1, height: 16, background: T.border, margin: "0 4px" }} />
        <a href={`mailto:${EMAIL}`} style={{
          fontFamily: body, fontSize: 12, fontWeight: 600,
          color: T.bg, background: T.green,
          padding: "6px 14px", borderRadius: 9999,
          textDecoration: "none",
          transition: "opacity 0.2s cubic-bezier(0.32,0.72,0,1)",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Hire me
        </a>
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(v => !v)}
        className="mobile-menu-btn"
        style={{
          position: "fixed", top: 20, right: 20, zIndex: 110,
          width: 44, height: 44, borderRadius: 9999,
          background: "rgba(6,7,9,0.85)", border: `1px solid ${T.border}`,
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5,
          cursor: "pointer", padding: 0,
        }}
        aria-label="Menu"
      >
        <span style={{
          display: "block", width: 18, height: 1.5, background: T.text, borderRadius: 2,
          transformOrigin: "center",
          transform: menuOpen ? "translateY(3.25px) rotate(45deg)" : "none",
          transition: "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
        }} />
        <span style={{
          display: "block", width: 18, height: 1.5, background: T.text, borderRadius: 2,
          transform: menuOpen ? "translateY(-3.25px) rotate(-45deg)" : "none",
          transition: "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
        }} />
      </button>

      {/* Mobile overlay menu */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 105,
        background: "rgba(6,7,9,0.95)",
        backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity 0.4s cubic-bezier(0.32,0.72,0,1)",
      }}>
        {NAV_ITEMS.map(({ id, label }, i) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} style={{
            fontFamily: display, fontSize: 42, fontWeight: 700, color: T.text,
            textDecoration: "none", letterSpacing: "-.02em",
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            opacity: menuOpen ? 1 : 0,
            transition: `all 0.5s cubic-bezier(0.32,0.72,0,1) ${100 + i * 60}ms`,
          }}>
            {label}
          </a>
        ))}
        <a href={`mailto:${EMAIL}`} onClick={() => setMenuOpen(false)} style={{
          fontFamily: mono, fontSize: 13, color: T.green, marginTop: 32,
          textDecoration: "none",
          transform: menuOpen ? "translateY(0)" : "translateY(20px)",
          opacity: menuOpen ? 1 : 0,
          transition: "all 0.5s cubic-bezier(0.32,0.72,0,1) 320ms",
        }}>
          {EMAIL} ↗
        </a>
      </div>
    </>
  );
}

// ─── AMBIENT ORBS ────────────────────────────────────────────────────────────
function AmbientOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "-20%", left: "-10%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", top: "30%", right: "-15%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", left: "30%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)",
      }} />
    </div>
  );
}

// ─── STAT CHIP ───────────────────────────────────────────────────────────────
function StatChip({ value, label }) {
  return (
    <div style={{
      padding: "1.5px",
      borderRadius: 16,
      background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))",
    }}>
      <div style={{
        background: T.card, borderRadius: "calc(16px - 1.5px)",
        padding: "20px 28px", textAlign: "center",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05)",
      }}>
        <div style={{ fontFamily: display, fontSize: 38, fontWeight: 700, color: T.text, lineHeight: 1, letterSpacing: "-.03em" }}>
          {value}
        </div>
        <div style={{ fontFamily: body, fontSize: 11.5, color: T.muted, marginTop: 6, letterSpacing: ".06em", textTransform: "uppercase" }}>
          {label}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT CARD ────────────────────────────────────────────────────────────
function ProjectCard({ p, size = "medium" }) {
  const [hover, setHover] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const isHero = size === "hero";

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "2px",
        borderRadius: 24,
        background: hover
          ? "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))"
          : "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.01))",
        transition: "background 0.5s cubic-bezier(0.32,0.72,0,1)",
        cursor: "default",
        height: "100%",
      }}
    >
      <div style={{
        background: hover
          ? `linear-gradient(160deg, ${p.tint}cc, ${T.card})`
          : `linear-gradient(160deg, ${p.tint}88, ${T.card})`,
        borderRadius: "calc(24px - 2px)",
        overflow: "hidden",
        height: "100%",
        display: "flex", flexDirection: "column",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
        transition: "background 0.5s cubic-bezier(0.32,0.72,0,1)",
      }}>

        {/* Image area */}
        <div style={{
          position: "relative",
          height: isHero ? 340 : 220,
          overflow: "hidden",
          flexShrink: 0,
          background: `linear-gradient(160deg, ${p.tint}, rgba(0,0,0,0.6))`,
        }}>
          {imgOk && (
            <img
              src={p.shot}
              alt={p.name}
              onError={() => setImgOk(false)}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover",
                objectPosition: p.kind === "phone" ? "top center" : "center",
                transform: hover ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.7s cubic-bezier(0.32,0.72,0,1)",
                display: "block",
              }}
            />
          )}
          {/* Gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }} />
          {/* Year badge */}
          <div style={{
            position: "absolute", top: 14, right: 14,
            fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,0.5)",
            background: "rgba(0,0,0,0.4)", borderRadius: 9999,
            padding: "3px 9px", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            {p.year}
          </div>
          {/* Badges */}
          <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 6 }}>
            {p.shipped && (
              <span style={{
                fontFamily: mono, fontSize: 9.5, color: T.amber,
                background: "rgba(0,0,0,0.5)", border: `1px solid ${T.amber}55`,
                borderRadius: 9999, padding: "3px 9px",
                backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              }}>
                ★ Play Store
              </span>
            )}
            {p.tag && (
              <span style={{
                fontFamily: mono, fontSize: 9.5, color: T.cyan,
                background: "rgba(0,0,0,0.5)", border: `1px solid ${T.cyan}55`,
                borderRadius: 9999, padding: "3px 9px",
                backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              }}>
                {p.tag}
              </span>
            )}
          </div>
          {/* Fallback name */}
          {!imgOk && (
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontFamily: display, fontSize: 22, fontWeight: 700, color: p.accent, opacity: 0.6 }}>
                {p.name.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: isHero ? "28px 32px 32px" : "22px 24px 26px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 10, color: p.accent, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 6 }}>
              {p.surface}
            </div>
            <h3 style={{ fontFamily: display, fontSize: isHero ? 26 : 20, fontWeight: 700, color: T.text, margin: 0, letterSpacing: "-.02em", lineHeight: 1.2 }}>
              {p.headline}
            </h3>
          </div>
          <p style={{ fontFamily: body, fontSize: 13.5, color: T.muted, lineHeight: 1.7, margin: 0, flex: 1 }}>
            {p.blurb}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 4 }}>
            {p.tags.map(t => (
              <span key={t} style={{
                fontFamily: mono, fontSize: 10, color: T.muted,
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 9999, padding: "2px 9px",
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BENTO GRID ──────────────────────────────────────────────────────────────
function BentoGrid({ projects }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="bento-grid">
      {projects.map((p, i) => {
        const isHero = p.bento === "hero";
        return (
          <Reveal key={p.name} delay={isHero ? 0 : (i % 3) * 60}>
            {isHero ? (
              <ProjectCard p={p} size="hero" />
            ) : null}
          </Reveal>
        );
      })}

      {/* Medium cards in rows of 2 */}
      <div style={{ display: "grid", gap: 16 }} className="medium-grid">
        {projects.filter(p => p.bento === "medium").map((p, i) => (
          <Reveal key={p.name} delay={i * 50}>
            <ProjectCard p={p} size="medium" />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ─── EYEBROW ─────────────────────────────────────────────────────────────────
function Eyebrow({ children, color = T.green }) {
  return (
    <span style={{
      display: "inline-block",
      fontFamily: mono, fontSize: 10, fontWeight: 500,
      color, letterSpacing: ".18em", textTransform: "uppercase",
      background: `${color}14`, border: `1px solid ${color}30`,
      borderRadius: 9999, padding: "4px 12px",
      marginBottom: 20,
    }}>
      {children}
    </span>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const heroProjects = PROJECTS.filter(p => p.bento === "hero");
  const mediumProjects = PROJECTS.filter(p => p.bento === "medium");

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: "100dvh", position: "relative" }}>
      <AmbientOrbs />
      <FloatingNav />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "140px 24px 80px", maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <Eyebrow>Solo Product Engineer</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 style={{
              fontFamily: display, fontSize: "clamp(64px, 10vw, 120px)",
              fontWeight: 700, letterSpacing: "-.04em", lineHeight: 0.92,
              margin: "0 0 32px", textAlign: "center", color: T.text,
            }}>
              {NAME}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p style={{
              fontFamily: body, fontSize: "clamp(16px, 2vw, 20px)",
              color: T.muted, lineHeight: 1.7, textAlign: "center",
              maxWidth: 520, margin: "0 0 52px",
            }}>
              I design, build, and ship complete products — mobile apps, web platforms, and the systems behind them. One person. Full ownership.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <a href="#work" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: body, fontSize: 14, fontWeight: 600,
                color: T.bg, background: T.text,
                padding: "13px 22px", borderRadius: 9999, textDecoration: "none",
                transition: "opacity 0.2s cubic-bezier(0.32,0.72,0,1), transform 0.2s cubic-bezier(0.32,0.72,0,1)",
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(0.98)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                View Work
                <span style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "rgba(0,0,0,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1)",
                }}>
                  ↓
                </span>
              </a>
              <a href={`mailto:${EMAIL}`} style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: body, fontSize: 14, fontWeight: 500,
                color: T.text,
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${T.border}`,
                padding: "13px 22px", borderRadius: 9999, textDecoration: "none",
                transition: "all 0.2s cubic-bezier(0.32,0.72,0,1)",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = T.border; }}
              >
                Get in touch ↗
              </a>
            </div>
          </Reveal>

          {/* Stats row */}
          <Reveal delay={320} style={{ width: "100%", marginTop: 80 }}>
            <div style={{ display: "grid", gap: 12 }} className="stats-grid">
              <StatChip value="10+" label="Products Shipped" />
              <StatChip value="4+" label="Years Building" />
              <StatChip value="13" label="Technologies" />
              <StatChip value="1" label="Person Studio" />
            </div>
          </Reveal>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────────────────── */}
        <section id="about" style={{ maxWidth: 860, margin: "0 auto", padding: "120px 24px" }}>
          <Reveal>
            <Eyebrow color={T.cyan}>About</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 style={{ fontFamily: display, fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1.1, color: T.text, margin: "0 0 36px" }}>
              One engineer.<br />
              <span style={{ color: T.muted }}>The whole stack.</span>
            </h2>
          </Reveal>

          {/* Double-bezel about card */}
          <Reveal delay={120}>
            <div style={{ padding: "2px", borderRadius: 28, background: "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.01))" }}>
              <div style={{
                background: T.card, borderRadius: "calc(28px - 2px)",
                padding: "40px 44px",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05)",
              }}>
                <p style={{ fontFamily: body, fontSize: 17, color: T.muted, lineHeight: 1.8, margin: "0 0 20px" }}>
                  I design, build, and maintain the whole product — so you talk to one person, not a relay of five. From the first Figma frame to the production Firestore rules, I own it.
                </p>
                <p style={{ fontFamily: body, fontSize: 17, color: T.muted, lineHeight: 1.8, margin: "0 0 20px" }}>
                  Most apps run on <Hl>Flutter</Hl> and <Hl>Firebase</Hl>; web work on <Hl>Next.js</Hl> and <Hl>PHP/MySQL</Hl>. I'm equally comfortable in the back office — admin consoles, data pipelines, and the IoT bridges that keep hardware talking to cloud.
                </p>
                <p style={{ fontFamily: body, fontSize: 17, color: T.muted, lineHeight: 1.8, margin: 0 }}>
                  If it needs to be built, launched, and kept running — that's the job.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Stack grid */}
          <Reveal delay={180} style={{ marginTop: 48 }}>
            <div style={{ fontFamily: mono, fontSize: 10, color: T.muted, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>
              <span style={{ color: T.cyan }}>// </span>dependencies
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {STACK.map((s, i) => (
                <Reveal key={s.label} delay={i * 30}>
                  <span style={{
                    fontFamily: mono, fontSize: 11,
                    color: T.muted,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 9999, padding: "5px 13px",
                    transition: "all 0.25s cubic-bezier(0.32,0.72,0,1)",
                    cursor: "default",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = T.green; e.currentTarget.style.borderColor = `${T.green}40`; e.currentTarget.style.background = `${T.green}0d`; }}
                    onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                  >
                    {s.label}
                  </span>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── WORK ─────────────────────────────────────────────────────────── */}
        <section id="work" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 120px" }}>
          <Reveal>
            <Eyebrow color={T.purple}>Work</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 style={{ fontFamily: display, fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1.1, color: T.text, margin: "0 0 60px" }}>
              {PROJECTS.length} products.<br />
              <span style={{ color: T.muted }}>Zero co-founders.</span>
            </h2>
          </Reveal>

          {/* Hero projects */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 16 }}>
            {heroProjects.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <ProjectCard p={p} size="hero" />
              </Reveal>
            ))}
          </div>

          {/* Medium projects grid */}
          <div style={{ display: "grid", gap: 16 }} className="medium-grid">
            {mediumProjects.map((p, i) => (
              <Reveal key={p.name} delay={i * 50}>
                <ProjectCard p={p} size="medium" />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────────────── */}
        <section id="contact" style={{ maxWidth: 860, margin: "0 auto", padding: "80px 24px 160px", textAlign: "center" }}>
          <Reveal>
            <Eyebrow color={T.amber}>Contact</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 style={{ fontFamily: display, fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, letterSpacing: "-.04em", lineHeight: 1.05, color: T.text, margin: "0 0 24px" }}>
              Got something<br />to build?
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ fontFamily: body, fontSize: 17, color: T.muted, lineHeight: 1.75, maxWidth: 440, margin: "0 auto 48px" }}>
              Tell me what you're making and where it's stuck. I'll tell you honestly whether I'm the right person for it.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`mailto:${EMAIL}`} style={{
                display: "inline-flex", alignItems: "center", gap: 12,
                fontFamily: body, fontSize: 15, fontWeight: 600,
                color: T.bg, background: T.green,
                padding: "15px 28px", borderRadius: 9999, textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s cubic-bezier(0.32,0.72,0,1)",
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(0.98)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                {EMAIL}
                <span style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  ↗
                </span>
              </a>
              <a href={GITHUB} target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 12,
                fontFamily: body, fontSize: 15, fontWeight: 500,
                color: T.text,
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${T.border}`,
                padding: "15px 28px", borderRadius: 9999, textDecoration: "none",
                transition: "all 0.2s cubic-bezier(0.32,0.72,0,1)",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
              >
                GitHub ↗
              </a>
            </div>
          </Reveal>

          {/* Footer */}
          <Reveal delay={240} style={{ marginTop: 100 }}>
            <p style={{ fontFamily: mono, fontSize: 11, color: T.muted, lineHeight: 2, letterSpacing: ".04em" }}>
              Built with <span style={{ color: T.green }}>Next.js 14</span> · Deployed on <span style={{ color: T.green }}>Vercel</span>
              <br />
              <span style={{ opacity: 0.5 }}>© {new Date().getFullYear()} {NAME}</span>
            </p>
          </Reveal>
        </section>
      </div>
    </div>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function Hl({ children }) {
  return <span style={{ color: "#e2e4ea", fontWeight: 600 }}>{children}</span>;
}
