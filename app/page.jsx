"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

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

const PROJECTS = [
  {
    slug: "lira", title: "Lira", year: "2024", kind: "Mobile App", badge: "Play Store",
    aspect: "phone",
    shots: ["/shots/lira_1.png","/shots/lira_2.png","/shots/lira_3.png","/shots/lira_4.png","/shots/lira_5.png"],
    accent: "#B8924A",
    blurb: "Family expense tracker with budgets, multi-currency support, nested categories, reminders, and one-tap CSV / PDF exports. Shipped and live on Google Play.",
    tags: ["Flutter","Firebase","Cloud Functions","native IAP"],
  },
  {
    slug: "chefbasket", title: "ChefBasket", year: "2025", kind: "Mobile App",
    aspect: "phone",
    shots: ["/shots/chefbasket_1.png","/shots/chefbasket_2.png","/shots/chefbasket_3.png","/shots/chefbasket_4.png","/shots/chefbasket_5.png"],
    accent: "#C4633A",
    blurb: "Weekly meal-box planner — build a plan, drain the pantry, split the grocery list across stores. WhatsApp order in one tap.",
    tags: ["Flutter","Riverpod","GoRouter","RevenueCat","Firebase"],
  },
  {
    slug: "tanke", title: "TANKe", year: "2024", kind: "IoT + Mobile",
    aspect: "phone", shots: ["/shots/tanke.png"], accent: "#3A7DB5",
    blurb: "ESP8266 weight sensors stream live fill-level via MQTT to a Flutter app. FCM, SMS, and WhatsApp alerts when gas runs low.",
    tags: ["MQTT","ESP8266","Firebase","Twilio","Syncfusion"],
  },
  {
    slug: "yallatuk", title: "YallaTuk", year: "2024", kind: "Mobile App",
    aspect: "phone", shots: ["/shots/yallatuk.png"], accent: "#7B6BD4",
    blurb: "Tuk-tuk ride-hailing for two — rider + driver apps, live map tracking, near-zero infra cost on Fly.io.",
    tags: ["Socket.IO","OpenStreetMap","Fly.io","Flutter"],
  },
  {
    slug: "expiryguard", title: "ExpiryGuard", year: "2024", kind: "Mobile App",
    aspect: "phone",
    shots: ["/shots/expiryguard_1.png","/shots/expiryguard_2.png","/shots/expiryguard_3.png","/shots/expiryguard_4.png","/shots/expiryguard_5.png"],
    accent: "#4A9B6F",
    blurb: "Track household items by expiry date, get nudges before waste, find donation drop-offs on a live OpenStreetMap layer.",
    tags: ["Firebase","OpenStreetMap","Overpass API","Flutter"],
  },
  {
    slug: "cartiq", title: "Cartiq", year: "2025", kind: "Mobile App",
    aspect: "phone", shots: ["/shots/cartiq.png"], accent: "#5A9E82",
    blurb: "Compare grocery prices across supermarkets in real time. Barcode scan, receipt OCR via Gemini, split list across stores.",
    tags: ["Firebase","Gemini OCR","price pipeline","Flutter"],
  },
  {
    slug: "gravit", title: "Gravit", year: "2024", kind: "Game", badge: "Flame Engine",
    aspect: "wide",
    shots: ["/shots/gravit_2.png","/shots/gravit_3.png","/shots/gravit_1.png","/shots/gravit_4.png","/shots/gravit_5.png"],
    accent: "#2AABBF",
    blurb: "Arcade tower-stacking across 5 worlds. Firebase leaderboard, AdMob, Google Sign-In — packaged tight for Android.",
    tags: ["Flutter + Flame","Firebase","AdMob","App Check"],
  },
  {
    slug: "engravia", title: "Engravia", year: "2023", kind: "Web Storefront",
    aspect: "web",
    shots: ["/shots/engravia_1.png","/shots/engravia_2.png","/shots/engravia_3.png","/shots/engravia_4.png"],
    accent: "#A87D45",
    blurb: "E-commerce for personalized engraved gifts — real-time customization preview, cart, and full checkout built end to end.",
    tags: ["PHP","MySQL","PHPMailer"],
  },
  {
    slug: "engravia-admin", title: "Engravia Admin", year: "2023", kind: "Web Dashboard",
    aspect: "web",
    shots: ["/shots/engravia_admin_1.png","/shots/engravia_admin_2.png","/shots/engravia_admin_3.png","/shots/engravia_admin_4.png"],
    accent: "#C4945A",
    blurb: "Full merchant back-office — order management, product catalog, customer CRM, WhatsApp campaigns, and live inventory.",
    tags: ["PHP","MySQL","WhatsApp API","PHPMailer"],
  },
  {
    slug: "yalla-admin", title: "Yalla Admin", year: "2025", kind: "Web Dashboard",
    aspect: "web", shots: ["/shots/yalla-admin.png"], accent: "#8B6FD4",
    blurb: "Operations console for the Yalla platform — KYC review, wallet top-ups, driver management, ride audits, and live trip maps.",
    tags: ["Next.js 16","TypeScript","TanStack","Firebase","Leaflet"],
  },
  {
    slug: "admin", title: "Admin Suite", year: "2023–25", kind: "Web Dashboards",
    aspect: "web", shots: ["/shots/dashboards.png"], accent: "#4A9B6F",
    blurb: "The back offices behind the products — orders, inventory, live ops, analytics. What clients never see but can't run without.",
    tags: ["Next.js","Firebase","Cloud Functions"],
  },
];

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const TK = {
  bg:       "#ffffff",
  bgAlt:    "#f7f8fa",
  text:     "#14181f",
  muted:    "#6b7280",
  border:   "rgba(20,24,31,0.12)",
  accent:   "#0DA2E7",          // Uppit sky-blue
  accentBg: "rgba(13,162,231,0.08)",
  sans:     "'DM Sans', system-ui, sans-serif",
  mono:     "'JetBrains Mono', monospace",
  ease:     "cubic-bezier(0.16,1,0.3,1)",
  radius:   "12px",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ${TK.ease} ${delay}ms, transform 0.7s ${TK.ease} ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(["hero","work","about","contact"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#hero", label: "Home" },
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${TK.border}` : "1px solid transparent",
        transition: `background 0.3s, border-color 0.3s, backdrop-filter 0.3s`,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#hero" style={{ fontFamily: TK.sans, fontWeight: 800, fontSize: 18, color: TK.text, textDecoration: "none", letterSpacing: "-.02em" }}>
            Merheb<span style={{ color: TK.accent }}>.</span>
          </a>

          {/* Desktop nav */}
          <nav className="pill-nav" style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {links.map(l => (
              <a key={l.href} href={l.href} style={{
                fontFamily: TK.sans, fontSize: 14, fontWeight: 500,
                color: active === l.href.slice(1) ? TK.accent : TK.muted,
                padding: "6px 14px", borderRadius: 9999,
                textDecoration: "none",
                background: active === l.href.slice(1) ? TK.accentBg : "transparent",
                transition: `color 0.2s, background 0.2s`,
              }}>
                {l.label}
              </a>
            ))}
            <a href={`mailto:${CONTACT.email}`} style={{
              marginLeft: 8, fontFamily: TK.sans, fontSize: 14, fontWeight: 600,
              color: "#fff", background: TK.accent,
              padding: "8px 20px", borderRadius: 9999,
              textDecoration: "none",
              transition: `opacity 0.2s`,
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Get in Touch
            </a>
          </nav>

          {/* Hamburger */}
          <button className="hamburger-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menu" style={{
            background: "none", border: "none", cursor: "pointer", padding: 8,
            display: "flex", flexDirection: "column", gap: 5,
          }}>
            <span style={{ display: "block", width: 22, height: 2, background: TK.text, borderRadius: 2, transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none", transition: "transform 0.25s" }} />
            <span style={{ display: "block", width: 22, height: 2, background: TK.text, borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
            <span style={{ display: "block", width: 22, height: 2, background: TK.text, borderRadius: 2, transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none", transition: "transform 0.25s" }} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: TK.sans, fontSize: 28, fontWeight: 700,
              color: active === l.href.slice(1) ? TK.accent : TK.text,
              textDecoration: "none", padding: "10px 0",
              opacity: 0, animation: `fadeUp 0.4s ${TK.ease} ${i * 60}ms forwards`,
            }}>
              {l.label}
            </a>
          ))}
          <a href={`mailto:${CONTACT.email}`} onClick={() => setMenuOpen(false)} style={{
            marginTop: 16, fontFamily: TK.sans, fontSize: 16, fontWeight: 600,
            color: "#fff", background: TK.accent,
            padding: "12px 32px", borderRadius: 9999,
            textDecoration: "none",
          }}>
            Get in Touch
          </a>
        </div>
      )}

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
        @media (max-width: 768px) { .pill-nav { display: none !important; } .hamburger-btn { display: flex !important; } }
        @media (min-width: 769px) { .hamburger-btn { display: none !important; } }
      `}</style>
    </>
  );
}

// ─── DOT GRID BACKGROUND ─────────────────────────────────────────────────────

function DotGrid() {
  return (
    <div aria-hidden style={{
      position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
      backgroundImage: `radial-gradient(circle, rgba(13,162,231,0.18) 1px, transparent 1px)`,
      backgroundSize: "28px 28px",
      maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
      WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
    }} />
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="hero" style={{
      minHeight: "100dvh", position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: TK.bg, paddingTop: 64,
    }}>
      <DotGrid />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "80px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{
            display: "inline-block", fontFamily: TK.mono, fontSize: 11, fontWeight: 500,
            color: TK.accent, letterSpacing: ".14em", textTransform: "uppercase",
            marginBottom: 24,
          }}>
            Product Engineering Studio
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 style={{
            fontFamily: TK.sans, fontSize: "clamp(42px, 6vw, 72px)",
            fontWeight: 800, color: TK.accent,
            margin: "0 0 12px", letterSpacing: "-.03em", lineHeight: 1.08,
          }}>
            Build. Ship. Own.
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p style={{
            fontFamily: TK.sans, fontSize: "clamp(18px, 2.5vw, 24px)",
            fontWeight: 700, color: TK.text,
            margin: "0 0 20px", letterSpacing: "-.02em", lineHeight: 1.3,
          }}>
            Full products from zero — mobile apps, web storefronts,<br />and the dashboards that run them.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <p style={{
            fontFamily: TK.sans, fontSize: 16, color: TK.muted,
            margin: "0 0 48px", lineHeight: 1.7, maxWidth: 520, marginLeft: "auto", marginRight: "auto",
          }}>
            One engineer who takes an idea from spec to App Store — with real data, real users, and no hand-offs.
          </p>
        </Reveal>

        {/* Stats */}
        <Reveal delay={260}>
          <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 48 }}>
            {[
              { v: "11+", l: "Products shipped" },
              { v: "4+",  l: "Years building" },
              { v: "18",  l: "Technologies" },
            ].map((s, i) => (
              <div key={s.v} style={{
                padding: "0 32px",
                borderLeft: i > 0 ? `1px solid ${TK.border}` : "none",
                textAlign: "center",
              }}>
                <div style={{ fontFamily: TK.sans, fontSize: 32, fontWeight: 800, color: TK.text, letterSpacing: "-.03em" }}>{s.v}</div>
                <div style={{ fontFamily: TK.sans, fontSize: 13, color: TK.muted, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#work" style={{
              fontFamily: TK.sans, fontSize: 15, fontWeight: 600,
              color: "#fff", background: TK.accent,
              padding: "13px 28px", borderRadius: 9999,
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
              transition: `opacity 0.2s, transform 0.2s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
            >
              View Work →
            </a>
            <a href={`mailto:${CONTACT.email}`} style={{
              fontFamily: TK.sans, fontSize: 15, fontWeight: 600,
              color: TK.text, background: "transparent",
              border: `1.5px solid ${TK.border}`,
              padding: "13px 28px", borderRadius: 9999,
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
              transition: `border-color 0.2s, color 0.2s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = TK.accent; e.currentTarget.style.color = TK.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = TK.border; e.currentTarget.style.color = TK.text; }}
            >
              Get in Touch
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── PROJECT CARD ────────────────────────────────────────────────────────────

function ProjectCard({ p, delay = 0 }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgErrors, setImgErrors] = useState({});
  const [hovered, setHovered] = useState(false);

  const shots = p.shots || [];
  const hasMany = shots.length > 1;

  const imgHeight = p.aspect === "phone" ? 340 : p.aspect === "wide" ? 240 : 200;
  const objPosition = p.aspect === "phone" ? "top center" : "center";

  const prev = (e) => { e.stopPropagation(); setActiveIdx(i => (i - 1 + shots.length) % shots.length); };
  const next = (e) => { e.stopPropagation(); setActiveIdx(i => (i + 1) % shots.length); };

  const currentSrc = shots[activeIdx];
  const isError = imgErrors[activeIdx];

  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: TK.bg,
          border: `1px solid ${hovered ? p.accent + "66" : TK.border}`,
          borderRadius: TK.radius,
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          height: "100%",
          transition: `border-color 0.25s ${TK.ease}, box-shadow 0.25s ${TK.ease}`,
          boxShadow: hovered ? `0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px ${p.accent}22` : "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", overflow: "hidden", flexShrink: 0, background: "#f0f2f5", height: imgHeight }}>
          {!isError && currentSrc ? (
            <img
              key={currentSrc}
              src={currentSrc}
              alt={`${p.title} ${activeIdx + 1}`}
              onError={() => setImgErrors(e => ({ ...e, [activeIdx]: true }))}
              style={{
                width: "100%", height: "100%", display: "block",
                objectFit: "cover", objectPosition: objPosition,
                transition: `transform 0.5s ${TK.ease}`,
                transform: hovered ? "scale(1.03)" : "scale(1)",
              }}
            />
          ) : (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: TK.mono, fontSize: 11, color: p.accent, letterSpacing: ".1em", opacity: 0.5 }}>
                {p.slug.toUpperCase()}
              </span>
            </div>
          )}

          {/* Badges top-left */}
          <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 5, zIndex: 2 }}>
            {p.badge && (
              <span style={{
                fontFamily: TK.mono, fontSize: 9, fontWeight: 600, color: "#fff",
                background: p.accent, borderRadius: 9999, padding: "3px 8px",
                letterSpacing: ".06em",
              }}>{p.badge}</span>
            )}
            <span style={{
              fontFamily: TK.mono, fontSize: 9, fontWeight: 500, color: TK.muted,
              background: "rgba(255,255,255,0.9)", border: `1px solid ${TK.border}`,
              borderRadius: 9999, padding: "3px 8px", letterSpacing: ".05em",
              backdropFilter: "blur(6px)",
            }}>{p.year}</span>
          </div>

          {/* Carousel arrows */}
          {hasMany && (
            <>
              <button onClick={prev} aria-label="Previous" style={{
                position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
                zIndex: 3, width: 28, height: 28, borderRadius: 9999,
                background: "rgba(255,255,255,0.9)", border: `1px solid ${TK.border}`,
                color: TK.text, fontSize: 13, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}>‹</button>
              <button onClick={next} aria-label="Next" style={{
                position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                zIndex: 3, width: 28, height: 28, borderRadius: 9999,
                background: "rgba(255,255,255,0.9)", border: `1px solid ${TK.border}`,
                color: TK.text, fontSize: 13, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}>›</button>
            </>
          )}

          {/* Dots */}
          {hasMany && (
            <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4, zIndex: 3 }}>
              {shots.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setActiveIdx(i); }}
                  aria-label={`Screenshot ${i + 1}`}
                  style={{
                    width: i === activeIdx ? 16 : 5, height: 5, borderRadius: 9999,
                    padding: 0, border: "none", cursor: "pointer",
                    background: i === activeIdx ? p.accent : "rgba(255,255,255,0.6)",
                    transition: `width 0.22s ${TK.ease}, background 0.22s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
          <div style={{ fontFamily: TK.mono, fontSize: 10, fontWeight: 600, color: p.accent, letterSpacing: ".12em", textTransform: "uppercase" }}>
            {p.kind}
          </div>
          <h3 style={{ fontFamily: TK.sans, fontSize: 18, fontWeight: 700, color: TK.text, margin: 0, letterSpacing: "-.02em" }}>
            {p.title}
          </h3>
          <p style={{ fontFamily: TK.sans, fontSize: 13.5, color: TK.muted, lineHeight: 1.65, margin: 0, flex: 1 }}>
            {p.blurb}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
            {p.tags.map(t => (
              <span key={t} style={{
                fontFamily: TK.mono, fontSize: 10, color: TK.muted,
                background: TK.bgAlt, border: `1px solid ${TK.border}`,
                borderRadius: 9999, padding: "2px 8px",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── WORK SECTION ────────────────────────────────────────────────────────────

function WorkSection() {
  return (
    <section id="work" style={{ background: TK.bgAlt, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontFamily: TK.mono, fontSize: 11, fontWeight: 600, color: TK.accent, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 12 }}>
              SELECTED WORK
            </div>
            <h2 style={{ fontFamily: TK.sans, fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: TK.text, margin: "0 0 14px", letterSpacing: "-.03em" }}>
              11 Products. Real users.
            </h2>
            <p style={{ fontFamily: TK.sans, fontSize: 16, color: TK.muted, margin: 0, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
              Mobile apps, games, storefronts, and dashboards — every one owned and shipped solo.
            </p>
          </div>
        </Reveal>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} p={p} delay={i * 50} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STACK SECTION ───────────────────────────────────────────────────────────

function StackSection() {
  const icons = [
    { label: "Flutter", color: "#54C5F8" },
    { label: "Firebase", color: "#FFCA28" },
    { label: "Next.js", color: "#000" },
    { label: "TypeScript", color: "#3178C6" },
    { label: "PHP", color: "#8993BE" },
    { label: "Socket.IO", color: "#010101" },
    { label: "MQTT", color: "#660066" },
    { label: "RevenueCat", color: "#F25129" },
  ];

  return (
    <section style={{ background: TK.bg, padding: "100px 24px", borderTop: `1px solid ${TK.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontFamily: TK.mono, fontSize: 11, fontWeight: 600, color: TK.accent, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 12 }}>
              WHAT I BUILD WITH
            </div>
            <h2 style={{ fontFamily: TK.sans, fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, color: TK.text, margin: 0, letterSpacing: "-.03em" }}>
              Full-stack, end to end.
            </h2>
          </div>
        </Reveal>

        <div className="stack-grid">
          {STACK.map((s, i) => (
            <Reveal key={s} delay={i * 35}>
              <div style={{
                background: TK.bg, border: `1px solid ${TK.border}`,
                borderRadius: TK.radius, padding: "16px 20px",
                display: "flex", alignItems: "center", gap: 10,
                transition: `border-color 0.2s, box-shadow 0.2s`,
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = TK.accent; e.currentTarget.style.boxShadow = `0 4px 16px ${TK.accentBg}`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = TK.border; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ width: 8, height: 8, borderRadius: 9999, background: TK.accent, flexShrink: 0 }} />
                <span style={{ fontFamily: TK.sans, fontSize: 14, fontWeight: 600, color: TK.text }}>{s}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT SECTION ───────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" style={{ background: TK.bgAlt, padding: "100px 24px", borderTop: `1px solid ${TK.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="about-grid" style={{ display: "grid", gap: 60, alignItems: "start" }}>
          {/* Left — headline */}
          <Reveal>
            <div>
              <div style={{ fontFamily: TK.mono, fontSize: 11, fontWeight: 600, color: TK.accent, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>
                ABOUT
              </div>
              <h2 style={{ fontFamily: TK.sans, fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 800, color: TK.text, margin: "0 0 24px", letterSpacing: "-.03em", lineHeight: 1.15 }}>
                One engineer.<br />Full ownership.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { n: "11+", l: "Products shipped" },
                  { n: "4+",  l: "Years building" },
                  { n: "18",  l: "Technologies" },
                  { n: "∞",   l: "Ownership" },
                ].map(s => (
                  <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontFamily: TK.sans, fontSize: 22, fontWeight: 800, color: TK.accent, minWidth: 48 }}>{s.n}</span>
                    <span style={{ fontFamily: TK.sans, fontSize: 14, color: TK.muted }}>{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — bio */}
          <Reveal delay={120}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "I'm Wissam Merheb — a Flutter and full-stack developer based in Lebanon who builds complete products solo. From initial spec to shipped APK, I handle every layer: product thinking, architecture, UI, backend, and deployment.",
                "I've shipped 11 products across mobile apps, IoT systems, games, e-commerce, and ops dashboards — all owned end to end, with real users.",
                "My approach: mock-first, ship early, iterate fast. No hand-offs, no waiting for the backend team, no design-by-committee.",
              ].map((t, i) => (
                <p key={i} style={{ fontFamily: TK.sans, fontSize: 15.5, color: TK.muted, lineHeight: 1.75, margin: 0 }}>{t}</p>
              ))}
              <div style={{ marginTop: 8, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={`mailto:${CONTACT.email}`} style={{
                  fontFamily: TK.sans, fontSize: 14, fontWeight: 600,
                  color: "#fff", background: TK.accent,
                  padding: "10px 22px", borderRadius: 9999, textDecoration: "none",
                  transition: `opacity 0.2s`,
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  Get in Touch →
                </a>
                <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: TK.sans, fontSize: 14, fontWeight: 600,
                  color: TK.text, background: "transparent",
                  border: `1.5px solid ${TK.border}`,
                  padding: "10px 22px", borderRadius: 9999, textDecoration: "none",
                  transition: `border-color 0.2s`,
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = TK.accent}
                  onMouseLeave={e => e.currentTarget.style.borderColor = TK.border}
                >
                  GitHub
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" style={{ background: TK.bg, padding: "100px 24px", borderTop: `1px solid ${TK.border}` }}>
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div style={{ fontFamily: TK.mono, fontSize: 11, fontWeight: 600, color: TK.accent, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>
            CONTACT
          </div>
          <h2 style={{ fontFamily: TK.sans, fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, color: TK.text, margin: "0 0 16px", letterSpacing: "-.03em" }}>
            Let's build something.
          </h2>
          <p style={{ fontFamily: TK.sans, fontSize: 16, color: TK.muted, margin: "0 0 40px", lineHeight: 1.7 }}>
            Got a product idea, a tricky feature, or a side project you want shipped? I take on select work. Let's talk.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`mailto:${CONTACT.email}`} style={{
              fontFamily: TK.sans, fontSize: 15, fontWeight: 600,
              color: "#fff", background: TK.accent,
              padding: "14px 32px", borderRadius: 9999, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 8,
              transition: `opacity 0.2s, transform 0.2s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
            >
              {CONTACT.email} →
            </a>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: TK.sans, fontSize: 15, fontWeight: 600,
              color: TK.text, background: "transparent",
              border: `1.5px solid ${TK.border}`,
              padding: "14px 32px", borderRadius: 9999, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 8,
              transition: `border-color 0.2s, color 0.2s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = TK.accent; e.currentTarget.style.color = TK.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = TK.border; e.currentTarget.style.color = TK.text; }}
            >
              GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${TK.border}`,
      background: TK.bg,
      padding: "24px",
      textAlign: "center",
    }}>
      <p style={{ fontFamily: TK.sans, fontSize: 13, color: TK.muted, margin: 0 }}>
        © {new Date().getFullYear()} Merheb. All rights reserved.
      </p>
    </footer>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <WorkSection />
        <StackSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />

      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: ${TK.bg}; }
        ::selection { background: ${TK.accent}; color: #fff; }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .stack-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .about-grid {
          grid-template-columns: 1fr 1.4fr;
        }

        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
          .stack-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr; }
          .stack-grid { grid-template-columns: repeat(2, 1fr); }
          .about-grid { grid-template-columns: 1fr !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
      `}</style>
    </>
  );
}
