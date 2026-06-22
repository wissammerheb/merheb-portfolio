"use client";

import React, { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Merheb.net — portfolio (Brittany Chiang-style sticky two-column).
// EDIT TEXT:  NAME / EMAIL / TAGLINE / ABOUT below, and the PROJECTS array.
// ADD SHOTS:  drop PNG/JPG in /public/shots/ using the filename in each
//             project's `shot` field — placeholder shows until file is added.
// ---------------------------------------------------------------------------

const NAME  = "Merheb";
const ROLE  = "Solo Product Engineer";
const LINE  = "I build complete products — and the systems behind them.";
const EMAIL = "hello@merheb.net";
const GITHUB = "https://github.com/wissam-merheb";

const C = {
  bg: "#0E0F13", panel: "#15171D", panel2: "#1B1E26", line: "#262A33",
  text: "#C9CDD6", dim: "#6B7180", green: "#5BD68A", cyan: "#56C7D4", amber: "#E3B341",
};

const mono = "'JetBrains Mono', ui-monospace, monospace";
const sans = "'Inter', sans-serif";

const NAV = [
  { id: "about",   label: "about.md"   },
  { id: "work",    label: "work.tsx"   },
  { id: "contact", label: "contact.sh" },
];

const STACK = [
  "flutter", "firebase", "next.js", "php/mysql", "socket.io",
  "cloud-functions", "openstreetmap", "ocr/ai", "mqtt", "iot",
  "typescript", "riverpod", "flame",
];

const PROJECTS = [
  { name: "lira", kind: "phone", shipped: true, shot: "/shots/lira.png",
    blurb: "Family expense tracker — budgets, multi-currency, nested categories, reminders, and clean CSV / PDF exports. Shipped to Play Store.",
    surface: "Flutter · Android / iOS", system: "Firebase · Cloud Functions · native IAP",
    fg: "#C9A24B", tint: "#1b1a17", motto: "EVERY LIRA COUNTS" },
  { name: "chefbasket", kind: "phone", shot: "/shots/chefbasket.png",
    blurb: "Weekly meal-box planner for families — build a plan, stay on budget, drain the pantry, and split the grocery list across stores. WhatsApp order in one tap.",
    surface: "Flutter · Android / iOS", system: "Firebase · Riverpod · GoRouter · RevenueCat",
    fg: "#E07B54", tint: "#2a1a14" },
  { name: "cartiq", kind: "phone", shot: "/shots/cartiq.png",
    blurb: "Compare grocery prices across supermarkets and build the cheapest basket. Scan barcodes, search, split one list across stores — Gemini OCR reads the receipt.",
    surface: "Flutter · Android", system: "Firebase · Gemini OCR · price pipeline",
    fg: "#7FB59A", tint: "#15302a" },
  { name: "expiryguard", kind: "phone", shot: "/shots/expiryguard.png",
    blurb: "Track household items by expiry, get reminders, and rescue what's about to go — recipes + donation drop-offs on a live map.",
    surface: "Flutter · Android", system: "Firebase · OpenStreetMap · Overpass · sharing",
    fg: "#86C29A", tint: "#16241c" },
  { name: "tanke", kind: "phone", shot: "/shots/tanke.png",
    blurb: "IoT propane-tank monitor — ESP8266 weight sensors stream live fill-level via MQTT to a Flutter app. Alerts fire over FCM, SMS, and WhatsApp when gas runs low.",
    surface: "Flutter · Node.js bridge · ESP8266", system: "MQTT · Firebase · Twilio · Syncfusion",
    fg: "#5BAED6", tint: "#102233" },
  { name: "yallatuk", kind: "phone", shot: "/shots/yallatuk.png",
    blurb: "Tuk-tuk ride-hailing — book, track the driver live on a map, pay your way. Two apps (rider + driver) engineered to run at near-zero infra cost.",
    surface: "Flutter · Android", system: "Socket.IO · OpenStreetMap · Fly.io",
    fg: "#9C8CE0", tint: "#1f1b2e" },
  { name: "gravit", kind: "phone", tag: "game", shot: "/shots/gravit.png",
    blurb: "Arcade tower-stacking — 50 levels across 5 worlds, with the game-feel that keeps people tapping one more time. Online leaderboard via Firebase.",
    surface: "Flutter + Flame · Android", system: "Firebase · AdMob · App Check · Google Sign-In",
    fg: "#5FC7D6", tint: "#102a33" },
  { name: "engravia", kind: "browser", shot: "/shots/engravia.png",
    blurb: "Online store for personalized engraved gifts — live customization preview, cart, and checkout, built end to end.",
    surface: "Web storefront · Lebanon", system: "PHP · MySQL · PHPMailer",
    fg: "#C99A5B", tint: "#231d16" },
  { name: "yalla-admin", kind: "browser", shot: "/shots/yalla-admin.png",
    blurb: "Operations console for the Yalla ride platform — KYC review, wallet top-ups, driver management, ride audits, and live trip maps.",
    surface: "Web dashboard", system: "Next.js 16 · TypeScript · TanStack · Firebase · Leaflet",
    fg: "#A78BFA", tint: "#1a1730" },
  { name: "admin", kind: "browser", capstone: true, shot: "/shots/dashboards.png",
    blurb: "The back office behind the products — orders, inventory, live ops, analytics. What clients don't see but can't run without.",
    surface: "Web dashboards", system: "Next.js · Firebase · Cloud Functions",
    fg: "#7FB59A", tint: "#13201d" },
];

// ── Thumb ────────────────────────────────────────────────────────────────────
function Thumb({ p }) {
  const [ok, setOk] = useState(true);
  const phone = p.kind === "phone";
  return (
    <div style={{
      width: phone ? 56 : 80, height: phone ? 80 : 52, flexShrink: 0,
      borderRadius: 6, overflow: "hidden", border: `1px solid ${C.line}`,
      background: `linear-gradient(160deg, ${p.tint}, rgba(0,0,0,.5))`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {ok ? (
        <img src={p.shot} alt={p.name} onError={() => setOk(false)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <span style={{ fontFamily: mono, fontSize: 8, fontWeight: 700, color: p.fg, letterSpacing: ".06em", textAlign: "center", padding: "0 4px" }}>
          {p.name.toUpperCase()}
        </span>
      )}
    </div>
  );
}

// ── Project card (horizontal row) ────────────────────────────────────────────
function ProjectCard({ p }) {
  const [hover, setHover] = useState(false);
  const tags = [p.surface, ...p.system.split(" · ")];
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", gap: 16, padding: "16px 14px", borderRadius: 8,
        background: hover ? C.panel : "transparent",
        border: `1px solid ${hover ? C.line : "transparent"}`,
        transition: "background .2s, border-color .2s",
        cursor: "default",
      }}
    >
      <Thumb p={p} />
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: mono, fontSize: 13.5, fontWeight: 600, color: C.text }}>
            {p.name}
          </span>
          {p.shipped && (
            <span style={{ fontFamily: mono, fontSize: 10, color: C.amber, border: `1px solid ${C.amber}55`, borderRadius: 4, padding: "1px 6px" }}>
              play store
            </span>
          )}
          {p.tag && (
            <span style={{ fontFamily: mono, fontSize: 10, color: C.cyan, border: `1px solid ${C.cyan}55`, borderRadius: 4, padding: "1px 6px" }}>
              {p.tag}
            </span>
          )}
        </div>
        <p style={{ fontFamily: sans, fontSize: 13.5, color: C.dim, lineHeight: 1.6, margin: "6px 0 10px" }}>
          {p.blurb}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {tags.map((t) => (
            <span key={t} style={{
              fontFamily: mono, fontSize: 10.5, color: C.green,
              background: `${C.green}18`, borderRadius: 4, padding: "2px 8px",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Scroll-spy hook ───────────────────────────────────────────────────────────
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const active = useActiveSection(NAV.map((n) => n.id));

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh" }}>

      {/* ── Two-column shell ── */}
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "grid", gridTemplateColumns: "minmax(0,5fr) minmax(0,7fr)",
        minHeight: "100vh",
      }} className="shell">

        {/* ── LEFT — sticky ── */}
        <aside style={{
          position: "sticky", top: 0, height: "100vh",
          display: "flex", flexDirection: "column",
          padding: "72px 40px 48px",
          borderRight: `1px solid ${C.line}`,
        }} className="left-col">

          {/* Identity */}
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, color: C.green, letterSpacing: ".1em", marginBottom: 14 }}>
              // solo product engineer
            </div>
            <h1 style={{ fontFamily: sans, fontWeight: 700, fontSize: "clamp(26px,2.8vw,38px)", lineHeight: 1.1, letterSpacing: "-.02em", margin: 0, color: C.text }}>
              {NAME}
            </h1>
            <div style={{ fontFamily: sans, fontSize: 15, color: C.green, marginTop: 8, fontWeight: 500 }}>
              {ROLE}
            </div>
            <p style={{ fontFamily: sans, fontSize: 14, color: C.dim, lineHeight: 1.65, marginTop: 16, maxWidth: "30ch" }}>
              {LINE}
            </p>
          </div>

          {/* Nav */}
          <nav style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <a key={id} href={`#${id}`} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  fontFamily: mono, fontSize: 11.5, letterSpacing: ".08em",
                  color: isActive ? C.text : C.dim,
                  padding: "6px 0",
                  textDecoration: "none",
                  transition: "color .2s",
                }}>
                  <span style={{
                    display: "inline-block",
                    width: isActive ? 36 : 18,
                    height: 1,
                    background: isActive ? C.text : C.dim,
                    transition: "width .3s ease, background .2s",
                    flexShrink: 0,
                  }} />
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Stack pills */}
          <div style={{ marginTop: 40 }}>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.dim, marginBottom: 10, letterSpacing: ".08em" }}>
              <span style={{ color: C.cyan }}>dependencies</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {STACK.map((s) => (
                <span key={s} style={{
                  fontFamily: mono, fontSize: 9.5, color: C.green,
                  background: `${C.green}15`, borderRadius: 3, padding: "2px 7px",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div style={{ marginTop: "auto", display: "flex", gap: 18, paddingTop: 32 }}>
            <a href={GITHUB} target="_blank" rel="noreferrer"
              style={{ fontFamily: mono, fontSize: 11, color: C.dim, textDecoration: "none", transition: "color .2s" }}
              className="social-link">
              github ↗
            </a>
            <a href={`mailto:${EMAIL}`}
              style={{ fontFamily: mono, fontSize: 11, color: C.dim, textDecoration: "none", transition: "color .2s" }}
              className="social-link">
              email ↗
            </a>
          </div>
        </aside>

        {/* ── RIGHT — scrollable ── */}
        <main style={{ padding: "72px 48px 120px" }} className="right-col">

          {/* About */}
          <section id="about" style={{ marginBottom: 96 }}>
            <SectionLabel>about.md</SectionLabel>
            <p style={{ fontFamily: sans, fontSize: 15.5, color: C.dim, lineHeight: 1.75, marginTop: 20 }}>
              I design, build, and maintain the whole product — so you talk to one person, not a relay of five.
            </p>
            <p style={{ fontFamily: sans, fontSize: 15.5, color: C.dim, lineHeight: 1.75, marginTop: 16 }}>
              Most apps run on <Hl>Flutter</Hl> and <Hl>Firebase</Hl>; web work on <Hl>Next.js</Hl> and <Hl>PHP/MySQL</Hl>. I'm just as comfortable in the back office — admin panels, data pipelines, and the infrastructure that keeps a product reliable in production.
            </p>
            <p style={{ fontFamily: sans, fontSize: 15.5, color: C.dim, lineHeight: 1.75, marginTop: 16 }}>
              If it needs to be built, launched, and kept running, that's the job.
            </p>
          </section>

          {/* Work */}
          <section id="work" style={{ marginBottom: 96 }}>
            <SectionLabel>work.tsx</SectionLabel>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 4 }}>
              {PROJECTS.map((p) => <ProjectCard key={p.name} p={p} />)}
            </div>
          </section>

          {/* Contact */}
          <section id="contact">
            <SectionLabel>contact.sh</SectionLabel>
            <p style={{ fontFamily: sans, fontSize: 15.5, color: C.dim, lineHeight: 1.75, marginTop: 20, maxWidth: "46ch" }}>
              Tell me what you're making and where it's stuck. I'll tell you honestly whether I'm the right person for it.
            </p>
            <a href={`mailto:${EMAIL}`} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              marginTop: 28, fontFamily: mono, fontSize: 13.5,
              color: C.green, border: `1px solid ${C.green}`,
              borderRadius: 7, padding: "12px 20px", textDecoration: "none",
              transition: "background .2s, color .2s",
            }} className="contact-btn">
              $ mail {EMAIL}
            </a>

            {/* Footer note */}
            <p style={{ fontFamily: mono, fontSize: 11, color: C.dim, marginTop: 80, lineHeight: 1.7 }}>
              Built with <span style={{ color: C.green }}>Next.js</span> · deployed on <span style={{ color: C.green }}>Vercel</span>
              <br />© {new Date().getFullYear()} {NAME}
            </p>
          </section>

        </main>
      </div>
    </div>
  );
}

// ── Small helpers ─────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 10.5, color: "#6B7180",
      letterSpacing: ".12em", textTransform: "uppercase",
      paddingBottom: 10, borderBottom: "1px solid #262A33",
    }}>
      {children}
    </div>
  );
}

function Hl({ children }) {
  return <span style={{ color: "#C9CDD6", fontWeight: 500 }}>{children}</span>;
}
