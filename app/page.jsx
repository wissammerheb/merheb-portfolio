"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const CONTACT = {
  email:  "wissam@merheb.net",
  github: "https://github.com/wissammerheb",
};

const STACK = [
  "Flutter", "Dart", "Firebase", "Next.js", "TypeScript",
  "PHP / MySQL", "Socket.IO", "Cloud Functions", "Riverpod",
  "GoRouter", "OpenStreetMap", "Gemini OCR", "MQTT", "ESP8266",
  "Flame Engine", "RevenueCat", "Fly.io", "Twilio",
];

// aspect: "phone" = portrait 9:16 container, "web" = landscape 16:9 container
const PROJECTS = [
  {
    slug: "lira",
    title: "Lira",
    year: "2024",
    kind: "Mobile App",
    badge: "Play Store",
    aspect: "phone",
    shots: ["/shots/lira_1.png", "/shots/lira_2.png", "/shots/lira_3.png", "/shots/lira_4.png", "/shots/lira_5.png"],
    accent: "#B8924A",
    tint: "rgba(184,146,74,0.08)",
    blurb: "Family expense tracker with budgets, multi-currency support, nested categories, reminders, and one-tap CSV / PDF exports. Shipped and live on Google Play.",
    tags: ["Flutter", "Firebase", "Cloud Functions", "native IAP"],
    bento: "hero",
  },
  {
    slug: "chefbasket",
    title: "ChefBasket",
    year: "2025",
    kind: "Mobile App",
    aspect: "phone",
    shots: ["/shots/chefbasket_1.png", "/shots/chefbasket_2.png", "/shots/chefbasket_3.png", "/shots/chefbasket_4.png", "/shots/chefbasket_5.png"],
    accent: "#C4633A",
    tint: "rgba(196,99,58,0.08)",
    blurb: "Weekly meal-box planner — build a plan, drain the pantry, split the grocery list across stores. WhatsApp order in one tap.",
    tags: ["Flutter", "Riverpod", "GoRouter", "RevenueCat", "Firebase"],
    bento: "tall",
  },
  {
    slug: "tanke",
    title: "TANKe",
    year: "2024",
    kind: "IoT + Mobile",
    aspect: "phone",
    shots: ["/shots/tanke.png"],
    accent: "#3A7DB5",
    tint: "rgba(58,125,181,0.08)",
    blurb: "ESP8266 weight sensors stream live fill-level via MQTT to a Flutter app. FCM, SMS, and WhatsApp alerts when gas runs low.",
    tags: ["MQTT", "ESP8266", "Firebase", "Twilio", "Syncfusion"],
    bento: "wide",
  },
  {
    slug: "yallatuk",
    title: "YallaTuk",
    year: "2024",
    kind: "Mobile App",
    aspect: "phone",
    shots: ["/shots/yallatuk.png"],
    accent: "#7B6BD4",
    tint: "rgba(123,107,212,0.08)",
    blurb: "Tuk-tuk ride-hailing for two — rider + driver apps, live map tracking, near-zero infra cost on Fly.io.",
    tags: ["Socket.IO", "OpenStreetMap", "Fly.io", "Flutter"],
    bento: "tall",
  },
  {
    slug: "expiryguard",
    title: "ExpiryGuard",
    year: "2024",
    kind: "Mobile App",
    aspect: "phone",
    shots: ["/shots/expiryguard_1.png", "/shots/expiryguard_2.png", "/shots/expiryguard_3.png", "/shots/expiryguard_4.png", "/shots/expiryguard_5.png"],
    accent: "#4A9B6F",
    tint: "rgba(74,155,111,0.08)",
    blurb: "Track household items by expiry date, get nudges before waste, find donation drop-offs on a live OpenStreetMap layer.",
    tags: ["Firebase", "OpenStreetMap", "Overpass API", "Flutter"],
    bento: "square",
  },
  {
    slug: "cartiq",
    title: "Cartiq",
    year: "2025",
    kind: "Mobile App",
    aspect: "phone",
    shots: ["/shots/cartiq.png"],
    accent: "#5A9E82",
    tint: "rgba(90,158,130,0.08)",
    blurb: "Compare grocery prices across supermarkets in real time. Barcode scan, receipt OCR via Gemini, split list across stores.",
    tags: ["Firebase", "Gemini OCR", "price pipeline", "Flutter"],
    bento: "square",
  },
  {
    slug: "gravit",
    title: "Gravit",
    year: "2024",
    kind: "Game",
    badge: "Flame Engine",
    aspect: "wide",
    shots: ["/shots/gravit_1.png", "/shots/gravit_2.png", "/shots/gravit_3.png", "/shots/gravit_4.png", "/shots/gravit_5.png"],
    accent: "#2AABBF",
    tint: "rgba(42,171,191,0.08)",
    blurb: "Arcade tower-stacking across 5 worlds. Firebase leaderboard, AdMob, Google Sign-In — packaged tight for Android.",
    tags: ["Flutter + Flame", "Firebase", "AdMob", "App Check"],
    bento: "hero",
  },
  {
    slug: "engravia",
    title: "Engravia",
    year: "2023",
    kind: "Web Storefront",
    aspect: "web",
    shots: ["/shots/engravia.png"],
    accent: "#A87D45",
    tint: "rgba(168,125,69,0.08)",
    blurb: "E-commerce for personalized engraved gifts — real-time customization preview, cart, and full checkout built end to end.",
    tags: ["PHP", "MySQL", "PHPMailer"],
    bento: "wide",
  },
  {
    slug: "yalla-admin",
    title: "Yalla Admin",
    year: "2025",
    kind: "Web Dashboard",
    aspect: "web",
    shots: ["/shots/yalla-admin.png"],
    accent: "#8B6FD4",
    tint: "rgba(139,111,212,0.08)",
    blurb: "Operations console for the Yalla platform — KYC review, wallet top-ups, driver management, ride audits, and live trip maps.",
    tags: ["Next.js 16", "TypeScript", "TanStack", "Firebase", "Leaflet"],
    bento: "tall",
  },
  {
    slug: "admin",
    title: "Admin Suite",
    year: "2023–25",
    kind: "Web Dashboards",
    aspect: "web",
    shots: ["/shots/dashboards.png"],
    accent: "#4A9B6F",
    tint: "rgba(74,155,111,0.08)",
    blurb: "The back offices behind the products — orders, inventory, live ops, analytics. What clients never see but can't run without.",
    tags: ["Next.js", "Firebase", "Cloud Functions"],
    bento: "square",
  },
];

// ─── FONTS (via CSS @import injected once) ───────────────────────────────────
// Loaded in layout.jsx — using Satoshi (Fontshare) + JetBrains Mono (Google)

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const TK = {
  bg:      "#09090b",   // zinc-950
  surface: "#111113",
  card:    "#141416",
  border:  "rgba(255,255,255,0.06)",
  borderH: "rgba(255,255,255,0.11)",
  text:    "#e4e4e7",   // zinc-200
  muted:   "#71717a",   // zinc-500
  faint:   "#3f3f46",   // zinc-700
  accent:  "#34d399",   // emerald-400 — single accent
  accentD: "#059669",   // emerald-600
  mono:    "'JetBrains Mono', ui-monospace, monospace",
  sans:    "'Satoshi', 'Cabinet Grotesk', system-ui, sans-serif",
  display: "'Satoshi', 'Cabinet Grotesk', system-ui, sans-serif",
  ease:    "cubic-bezier(0.16, 1, 0.3, 1)",
  spring:  "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/** Scroll-reveal: fires once when element enters viewport */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, y = 28, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) blur(0px)" : `translateY(${y}px)`,
      filter: visible ? "blur(0px)" : "blur(6px)",
      transition: `opacity 0.75s ${TK.ease} ${delay}ms, transform 0.75s ${TK.ease} ${delay}ms, filter 0.75s ${TK.ease} ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/** Active section tracker */
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

// ─── FLOATING NAV ────────────────────────────────────────────────────────────

function FloatingNav() {
  const active = useActiveSection(["about", "work", "contact"]);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { id: "about", label: "About" },
    { id: "work",  label: "Work"  },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* Pill nav — desktop */}
      <nav style={{
        position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
        zIndex: 80,
        display: "flex", alignItems: "center", gap: 2,
        padding: "5px 6px",
        borderRadius: 9999,
        background: scrolled ? "rgba(9,9,11,0.88)" : "rgba(9,9,11,0.55)",
        border: `1px solid ${scrolled ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.05)"}`,
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" : "none",
        transition: `all 0.45s ${TK.ease}`,
      }} className="pill-nav">
        {/* Wordmark */}
        <span style={{
          fontFamily: TK.mono, fontSize: 11, color: TK.accent,
          padding: "6px 14px", letterSpacing: ".1em",
          borderRight: `1px solid ${TK.border}`, marginRight: 4,
        }}>
          merheb.net
        </span>
        {links.map(({ id, label }) => {
          const isA = active === id;
          return (
            <a key={id} href={`#${id}`} style={{
              fontFamily: TK.sans, fontSize: 12.5, fontWeight: 500,
              color: isA ? TK.text : TK.muted,
              padding: "6px 14px", borderRadius: 9999,
              background: isA ? "rgba(255,255,255,0.07)" : "transparent",
              textDecoration: "none",
              transition: `all 0.3s ${TK.ease}`,
              letterSpacing: "0.01em",
            }}>
              {label}
            </a>
          );
        })}
        <a href={`mailto:${CONTACT.email}`} style={{
          fontFamily: TK.sans, fontSize: 12, fontWeight: 600,
          color: "#09090b", background: TK.accent,
          padding: "7px 16px", borderRadius: 9999, marginLeft: 4,
          textDecoration: "none",
          transition: `opacity 0.2s ${TK.ease}`,
          boxShadow: `0 0 0 1px ${TK.accentD}`,
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = ".82"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Hire me
        </a>
      </nav>

      {/* Hamburger — mobile only */}
      <button onClick={() => setOpen(v => !v)} aria-label="Menu" style={{
        position: "fixed", top: 16, right: 16, zIndex: 90,
        width: 42, height: 42, borderRadius: 9999,
        background: "rgba(9,9,11,0.88)", border: `1px solid ${TK.border}`,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        display: "none", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5,
        cursor: "pointer", padding: 0,
      }} className="hamburger-btn">
        <span style={{
          width: 16, height: 1.5, background: TK.text, borderRadius: 2, display: "block",
          transformOrigin: "center",
          transform: open ? "translateY(3.25px) rotate(45deg)" : "none",
          transition: `transform 0.35s ${TK.ease}`,
        }} />
        <span style={{
          width: 16, height: 1.5, background: TK.text, borderRadius: 2, display: "block",
          transform: open ? "translateY(-3.25px) rotate(-45deg)" : "none",
          transition: `transform 0.35s ${TK.ease}`,
        }} />
      </button>

      {/* Mobile overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 85,
        background: "rgba(9,9,11,0.96)",
        backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: `opacity 0.38s ${TK.ease}`,
      }}>
        {links.map(({ id, label }, i) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)} style={{
            fontFamily: TK.display, fontSize: 52, fontWeight: 700,
            color: TK.text, textDecoration: "none", letterSpacing: "-.03em",
            transform: open ? "translateY(0)" : "translateY(18px)",
            opacity: open ? 1 : 0,
            transition: `all 0.5s ${TK.ease} ${80 + i * 55}ms`,
          }}>
            {label}
          </a>
        ))}
        <a href={`mailto:${CONTACT.email}`} onClick={() => setOpen(false)} style={{
          fontFamily: TK.mono, fontSize: 12, color: TK.accent, marginTop: 28,
          textDecoration: "none", letterSpacing: ".06em",
          transform: open ? "translateY(0)" : "translateY(12px)",
          opacity: open ? 1 : 0,
          transition: `all 0.5s ${TK.ease} 260ms`,
        }}>
          {CONTACT.email} ↗
        </a>
      </div>
    </>
  );
}

// ─── AMBIENT MESH ─────────────────────────────────────────────────────────────

function AmbientMesh() {
  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "-30%", left: "-20%",
        width: 800, height: 800, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(52,211,153,0.035) 0%, transparent 68%)",
      }} />
      <div style={{
        position: "absolute", top: "40%", right: "-25%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(90,158,130,0.03) 0%, transparent 68%)",
      }} />
      <div style={{
        position: "absolute", bottom: "5%", left: "25%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(52,211,153,0.025) 0%, transparent 68%)",
      }} />
    </div>
  );
}

// ─── MAGNETIC BUTTON (mousemove only, no setState in loop) ───────────────────

function MagneticBtn({ href, children, primary = false, style: extStyle = {} }) {
  const ref = useRef(null);
  const frameRef = useRef(null);

  const onMove = useCallback((e) => {
    if (!ref.current) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.22;
      const dy = (e.clientY - cy) * 0.22;
      ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  }, []);

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    ref.current.style.transform = "translate(0,0)";
  }, []);

  useEffect(() => () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); }, []);

  const base = {
    display: "inline-flex", alignItems: "center", gap: 10,
    fontFamily: TK.sans, fontSize: 14, fontWeight: 600,
    padding: "13px 24px", borderRadius: 9999, textDecoration: "none",
    cursor: "pointer", userSelect: "none",
    transition: `transform 0.55s ${TK.spring}, opacity 0.18s ${TK.ease}`,
    willChange: "transform",
  };
  const styles = primary
    ? { ...base, color: "#09090b", background: TK.accent, border: `1px solid ${TK.accentD}` }
    : { ...base, color: TK.text, background: "rgba(255,255,255,0.05)", border: `1px solid ${TK.border}` };

  return (
    <a ref={ref} href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={e => { e.currentTarget.style.opacity = ".88"; }}
      style={{ ...styles, ...extStyle }}
    >
      {children}
    </a>
  );
}

// ─── SPOTLIGHT CARD ───────────────────────────────────────────────────────────

function SpotlightCard({ p, delay = 0 }) {
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgErrors, setImgErrors] = useState({});

  const shots = p.shots || [p.shot].filter(Boolean);
  const hasMany = shots.length > 1;

  // aspect ratios: phone = tall portrait, wide = landscape game, web = landscape
  const imgHeight = p.aspect === "phone"
    ? (p.bento === "hero" ? 420 : 360)
    : p.aspect === "wide"
    ? (p.bento === "hero" ? 320 : 240)
    : (p.bento === "hero" ? 280 : 220);

  const objPosition = p.aspect === "phone" ? "top center" : "center";

  const onMove = useCallback((e) => {
    if (!cardRef.current) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty("--mx", `${x}px`);
      cardRef.current.style.setProperty("--my", `${y}px`);
      cardRef.current.style.setProperty("--spotlight", "1");
    });
  }, []);

  const onLeave = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (cardRef.current) cardRef.current.style.setProperty("--spotlight", "0");
  }, []);

  useEffect(() => () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); }, []);

  const goTo = (idx, e) => {
    e.stopPropagation();
    setActiveIdx(idx);
  };
  const prev = (e) => { e.stopPropagation(); setActiveIdx(i => (i - 1 + shots.length) % shots.length); };
  const next = (e) => { e.stopPropagation(); setActiveIdx(i => (i + 1) % shots.length); };

  const currentSrc = shots[activeIdx];
  const isError = imgErrors[activeIdx];

  return (
    <Reveal delay={delay}>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="spotlight-card"
        style={{
          "--mx": "50%", "--my": "50%", "--spotlight": "0",
          position: "relative", borderRadius: 20, overflow: "hidden",
          background: TK.card,
          border: `1px solid ${TK.border}`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          transition: `border-color 0.3s ${TK.ease}, box-shadow 0.3s ${TK.ease}`,
          height: "100%", display: "flex", flexDirection: "column",
        }}
      >
        {/* Spotlight glow layer */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          background: `radial-gradient(320px circle at var(--mx) var(--my), ${p.accent}18, transparent 65%)`,
          opacity: "var(--spotlight)",
          transition: "opacity 0.3s",
        }} />

        {/* Image / Carousel */}
        <div style={{
          position: "relative", overflow: "hidden", flexShrink: 0,
          background: `linear-gradient(145deg, ${p.tint}, rgba(0,0,0,0.5))`,
          height: imgHeight,
        }}>
          {!isError ? (
            <img
              key={currentSrc}
              src={currentSrc}
              alt={`${p.title} screenshot ${activeIdx + 1}`}
              onError={() => setImgErrors(e => ({ ...e, [activeIdx]: true }))}
              style={{
                width: "100%", height: "100%", display: "block",
                objectFit: "cover",
                objectPosition: objPosition,
                transition: `transform 0.65s ${TK.ease}, opacity 0.3s`,
              }}
              className="card-img"
            />
          ) : (
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontFamily: TK.mono, fontSize: 11, color: p.accent, letterSpacing: ".15em", opacity: 0.5 }}>
                {p.slug.toUpperCase()}
              </span>
            </div>
          )}

          {/* Gradient overlay */}
          <div aria-hidden style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 45%, rgba(20,20,22,0.85) 100%)",
          }} />

          {/* Badges */}
          <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6, zIndex: 2 }}>
            {p.badge && (
              <span style={{
                fontFamily: TK.mono, fontSize: 9.5, color: TK.accent,
                background: "rgba(9,9,11,0.65)", border: `1px solid ${TK.accent}44`,
                borderRadius: 9999, padding: "3px 9px",
                backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                letterSpacing: ".08em",
              }}>
                {p.badge}
              </span>
            )}
            <span style={{
              fontFamily: TK.mono, fontSize: 9.5, color: TK.muted,
              background: "rgba(9,9,11,0.65)", border: `1px solid ${TK.faint}`,
              borderRadius: 9999, padding: "3px 9px",
              backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              letterSpacing: ".06em",
            }}>
              {p.year}
            </span>
          </div>

          {/* Carousel nav arrows */}
          {hasMany && (
            <>
              <button onClick={prev} aria-label="Previous" style={{
                position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
                zIndex: 3, width: 28, height: 28, borderRadius: 9999,
                background: "rgba(9,9,11,0.7)", border: `1px solid ${TK.border}`,
                color: TK.text, fontSize: 12, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(6px)",
              }}>‹</button>
              <button onClick={next} aria-label="Next" style={{
                position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                zIndex: 3, width: 28, height: 28, borderRadius: 9999,
                background: "rgba(9,9,11,0.7)", border: `1px solid ${TK.border}`,
                color: TK.text, fontSize: 12, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(6px)",
              }}>›</button>
            </>
          )}

          {/* Dot indicators */}
          {hasMany && (
            <div style={{
              position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)",
              display: "flex", gap: 5, zIndex: 3,
            }}>
              {shots.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => goTo(i, e)}
                  aria-label={`Go to screenshot ${i + 1}`}
                  style={{
                    width: i === activeIdx ? 18 : 6,
                    height: 6, borderRadius: 9999, padding: 0,
                    background: i === activeIdx ? p.accent : "rgba(255,255,255,0.3)",
                    border: "none", cursor: "pointer",
                    transition: `width 0.25s ${TK.ease}, background 0.25s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "22px 24px 26px", display: "flex", flexDirection: "column", gap: 10, flex: 1, position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
            <div>
              <div style={{ fontFamily: TK.mono, fontSize: 9.5, color: p.accent, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 5 }}>
                {p.kind}
              </div>
              <h3 style={{
                fontFamily: TK.display, fontSize: p.bento === "hero" ? 22 : 18,
                fontWeight: 700, color: TK.text, margin: 0,
                letterSpacing: "-.025em", lineHeight: 1.2,
              }}>
                {p.title}
              </h3>
            </div>
            {/* Arrow chip */}
            <span style={{
              width: 30, height: 30, borderRadius: 9999, flexShrink: 0, marginTop: 2,
              background: "rgba(255,255,255,0.05)", border: `1px solid ${TK.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, color: TK.muted,
            }}>
              ↗
            </span>
          </div>

          <p style={{
            fontFamily: TK.sans, fontSize: 13.5, color: TK.muted,
            lineHeight: 1.72, margin: 0, flex: 1,
          }}>
            {p.blurb}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 4 }}>
            {p.tags.map(t => (
              <span key={t} style={{
                fontFamily: TK.mono, fontSize: 10,
                color: TK.faint,
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${TK.border}`,
                borderRadius: 9999, padding: "2px 9px",
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────

function HeroSection() {
  const stats = [
    { v: "10+",  l: "products shipped" },
    { v: "4+",   l: "years building"   },
    { v: "13",   l: "technologies"     },
    { v: "∞",    l: "ownership"        },
  ];

  return (
    <section style={{
      minHeight: "100dvh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "140px 24px 80px",
      maxWidth: 1040, margin: "0 auto",
      position: "relative",
    }}>
      {/* Left-aligned content — ANTI-CENTER-BIAS */}
      <Reveal>
        <span style={{
          display: "inline-block", fontFamily: TK.mono, fontSize: 10, fontWeight: 500,
          color: TK.accent, letterSpacing: ".18em", textTransform: "uppercase",
          background: `${TK.accent}12`, border: `1px solid ${TK.accent}28`,
          borderRadius: 9999, padding: "4px 12px", marginBottom: 28,
        }}>
          Solo Product Engineer
        </span>
      </Reveal>

      <Reveal delay={80}>
        <h1 style={{
          fontFamily: TK.display,
          fontSize: "clamp(56px, 9.5vw, 110px)",
          fontWeight: 700,
          letterSpacing: "-.04em",
          lineHeight: 0.94,
          color: TK.text,
          margin: "0 0 36px",
          maxWidth: "14ch",
        }}>
          I build{" "}
          <span style={{ color: TK.muted }}>products</span>
          {" "}and the{" "}
          <span style={{ color: TK.muted }}>systems</span>
          {" "}behind them.
        </h1>
      </Reveal>

      <Reveal delay={160}>
        <p style={{
          fontFamily: TK.sans, fontSize: "clamp(15px, 1.8vw, 18px)",
          color: TK.muted, lineHeight: 1.72,
          maxWidth: "52ch", margin: "0 0 44px",
        }}>
          One person. Full ownership — from the first screen to the production database. Mobile, web, IoT, and the admin dashboards running them.
        </p>
      </Reveal>

      <Reveal delay={220}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <MagneticBtn href="#work" primary>
            View work
            <span style={{
              width: 26, height: 26, borderRadius: "50%",
              background: "rgba(0,0,0,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13,
            }}>↓</span>
          </MagneticBtn>
          <MagneticBtn href={`mailto:${CONTACT.email}`}>
            Get in touch ↗
          </MagneticBtn>
        </div>
      </Reveal>

      {/* Stats row — 4 columns, left-aligned */}
      <Reveal delay={320} style={{ marginTop: 80, width: "100%" }}>
        <div style={{ display: "grid", gap: 1 }} className="stats-row">
          {stats.map(({ v, l }, i) => (
            <div key={l} style={{
              padding: "24px 0",
              borderTop: `1px solid ${TK.border}`,
              borderRight: i < stats.length - 1 ? `1px solid ${TK.border}` : "none",
              paddingRight: 32,
              paddingLeft: i > 0 ? 32 : 0,
            }}>
              <div style={{ fontFamily: TK.display, fontSize: 42, fontWeight: 700, color: TK.text, lineHeight: 1, letterSpacing: "-.03em" }}>
                {v}
              </div>
              <div style={{ fontFamily: TK.mono, fontSize: 10, color: TK.muted, marginTop: 7, letterSpacing: ".1em", textTransform: "uppercase" }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ─── ABOUT SECTION ───────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" style={{ maxWidth: 1040, margin: "0 auto", padding: "120px 24px" }}>
      <Reveal>
        <span style={{
          fontFamily: TK.mono, fontSize: 10, color: TK.accent,
          letterSpacing: ".16em", textTransform: "uppercase",
          display: "block", marginBottom: 48,
        }}>
          // about
        </span>
      </Reveal>

      {/* Asymmetric split: big headline left, prose right */}
      <div style={{ display: "grid", gap: "48px 80px", alignItems: "start" }} className="about-grid">
        <Reveal>
          <h2 style={{
            fontFamily: TK.display,
            fontSize: "clamp(38px, 5.5vw, 64px)",
            fontWeight: 700, letterSpacing: "-.035em",
            lineHeight: 1.05, color: TK.text, margin: 0,
          }}>
            One engineer.<br />
            <span style={{ color: TK.muted }}>The whole stack.</span>
          </h2>
        </Reveal>

        <Reveal delay={80} style={{ paddingTop: 8 }}>
          <div style={{ borderTop: `1px solid ${TK.border}`, paddingTop: 28 }}>
            <p style={{ fontFamily: TK.sans, fontSize: 16, color: TK.muted, lineHeight: 1.78, margin: "0 0 18px" }}>
              I design, build, and maintain the whole product — so you talk to one person, not a relay of five. From the first Figma frame to the production Firestore rules, I own it.
            </p>
            <p style={{ fontFamily: TK.sans, fontSize: 16, color: TK.muted, lineHeight: 1.78, margin: "0 0 18px" }}>
              Most apps run on <Hl>Flutter</Hl> and <Hl>Firebase</Hl>; web work on <Hl>Next.js</Hl> and <Hl>PHP/MySQL</Hl>. Equally comfortable wiring ESP8266 sensors to a MQTT broker as shipping a RevenueCat paywall.
            </p>
            <p style={{ fontFamily: TK.sans, fontSize: 16, color: TK.muted, lineHeight: 1.78, margin: 0 }}>
              If it needs to be built, launched, and kept running — that's the job.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Stack — horizontal overflow pill list */}
      <Reveal delay={140} style={{ marginTop: 60 }}>
        <div style={{ fontFamily: TK.mono, fontSize: 10, color: TK.faint, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>
          // dependencies
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {STACK.map((s, i) => (
            <StackPill key={s} label={s} delay={i * 22} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/** Isolated pill — hover state only, no parent re-renders */
function StackPill({ label, delay }) {
  const ref = useRef(null);
  const onEnter = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.color = TK.accent;
    ref.current.style.borderColor = `${TK.accent}36`;
    ref.current.style.background = `${TK.accent}0b`;
  }, []);
  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.color = TK.muted;
    ref.current.style.borderColor = TK.border;
    ref.current.style.background = "rgba(255,255,255,0.03)";
  }, []);

  return (
    <Reveal delay={delay}>
      <span ref={ref}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          fontFamily: TK.mono, fontSize: 11, color: TK.muted,
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${TK.border}`,
          borderRadius: 9999, padding: "5px 13px",
          display: "inline-block", cursor: "default",
          transition: `all 0.25s ${TK.ease}`,
        }}
      >
        {label}
      </span>
    </Reveal>
  );
}

// ─── WORK SECTION ────────────────────────────────────────────────────────────

function WorkSection() {
  const heroes  = PROJECTS.filter(p => p.bento === "hero");
  const mediums = PROJECTS.filter(p => p.bento !== "hero");

  return (
    <section id="work" style={{ maxWidth: 1040, margin: "0 auto", padding: "80px 24px 120px" }}>
      <Reveal>
        <span style={{
          fontFamily: TK.mono, fontSize: 10, color: TK.accent,
          letterSpacing: ".16em", textTransform: "uppercase",
          display: "block", marginBottom: 20,
        }}>
          // work
        </span>
      </Reveal>
      <Reveal delay={50}>
        <h2 style={{
          fontFamily: TK.display,
          fontSize: "clamp(36px, 6vw, 68px)",
          fontWeight: 700, letterSpacing: "-.038em",
          lineHeight: 1.02, color: TK.text,
          margin: "0 0 64px",
        }}>
          {PROJECTS.length} products.<br />
          <span style={{ color: TK.muted }}>Zero co-founders.</span>
        </h2>
      </Reveal>

      {/* Hero cards — full width */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 16 }}>
        {heroes.map((p, i) => (
          <SpotlightCard key={p.slug} p={p} delay={i * 60} />
        ))}
      </div>

      {/* Medium cards — asymmetric 2-col then last full-width if odd */}
      <div className="medium-grid" style={{ display: "grid", gap: 16 }}>
        {mediums.map((p, i) => (
          <SpotlightCard key={p.slug} p={p} delay={50 + i * 40} />
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" style={{ maxWidth: 1040, margin: "0 auto", padding: "80px 24px 160px" }}>
      {/* Divider */}
      <div style={{ height: 1, background: TK.border, marginBottom: 80 }} />

      <Reveal>
        <span style={{
          fontFamily: TK.mono, fontSize: 10, color: TK.accent,
          letterSpacing: ".16em", textTransform: "uppercase",
          display: "block", marginBottom: 32,
        }}>
          // contact
        </span>
      </Reveal>

      {/* Left-aligned — not centered */}
      <Reveal delay={60}>
        <h2 style={{
          fontFamily: TK.display,
          fontSize: "clamp(40px, 7vw, 80px)",
          fontWeight: 700, letterSpacing: "-.04em",
          lineHeight: 1.0, color: TK.text,
          margin: "0 0 24px", maxWidth: "14ch",
        }}>
          Got something<br />
          <span style={{ color: TK.muted }}>to build?</span>
        </h2>
      </Reveal>

      <Reveal delay={110}>
        <p style={{
          fontFamily: TK.sans, fontSize: 17, color: TK.muted,
          lineHeight: 1.72, maxWidth: "48ch", margin: "0 0 44px",
        }}>
          Tell me what you're making and where it's stuck. I'll tell you honestly whether I'm the right person for it.
        </p>
      </Reveal>

      <Reveal delay={165}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <MagneticBtn href={`mailto:${CONTACT.email}`} primary>
            {CONTACT.email}
            <span style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "rgba(0,0,0,0.14)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13,
            }}>↗</span>
          </MagneticBtn>
          <MagneticBtn href={CONTACT.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </MagneticBtn>
        </div>
      </Reveal>

      {/* Footer */}
      <Reveal delay={220} style={{ marginTop: 100 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, paddingTop: 32, borderTop: `1px solid ${TK.border}` }}>
          <span style={{ fontFamily: TK.mono, fontSize: 11, color: TK.faint, letterSpacing: ".04em" }}>
            © {new Date().getFullYear()} Merheb.net
          </span>
          <span style={{ fontFamily: TK.mono, fontSize: 11, color: TK.faint, letterSpacing: ".04em" }}>
            Built with{" "}
            <span style={{ color: TK.accent }}>Next.js 14</span>
            {" · "}
            <span style={{ color: TK.accent }}>Vercel</span>
          </span>
        </div>
      </Reveal>
    </section>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <div style={{ background: TK.bg, color: TK.text, minHeight: "100dvh", position: "relative" }}>
      <AmbientMesh />
      <FloatingNav />
      <div style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </div>
    </div>
  );
}

// ─── INLINE HELPERS ───────────────────────────────────────────────────────────

function Hl({ children }) {
  return (
    <span style={{ color: TK.text, fontWeight: 600 }}>{children}</span>
  );
}
