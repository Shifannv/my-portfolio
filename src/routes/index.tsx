import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Mail,
  MapPin,
  Phone,
  Code2,
  Camera,
  Building2,
} from "lucide-react";
import { ThemeProvider, useTheme } from "@/lib/theme";
import { ThemeToggle } from "@/components/ThemeToggle";

import outdoor from "@/assets/shifan-outdoor.jpeg.asset.json";
import matrix from "@/assets/shifan-matrix.png.asset.json";
import code1 from "@/assets/code1.jpg.asset.json";
import code2 from "@/assets/code2.jpg.asset.json";
import code3 from "@/assets/code3.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammad Shifan NV — Frontend Developer & Visual Creator" },
      {
        name: "description",
        content:
          "Portfolio of Mohammad Shifan NV — MERN stack developer, frontend engineer and visual content creator from Calicut, India.",
      },
      { property: "og:title", content: "Mohammad Shifan NV — Portfolio" },
      { property: "og:description", content: "MERN stack developer, frontend engineer & visual creator." },
      { property: "og:image", content: outdoor.url },
    ],
  }),
  component: () => (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  ),
});

/* ------------------------- INTRO ------------------------- */
function Intro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    const t = setTimeout(onDone, reduce ? 200 : 2400);
    return () => clearTimeout(t);
  }, [onDone, reduce]);

  const letters = "SHIFAN.".split("");
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } }}
      className="fixed inset-0 z-[60] grid place-items-center bg-background"
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ delay: 1.9, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-x-0 top-0 z-10 h-1/2 bg-surface"
      />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ delay: 1.9, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-surface"
      />

      <div className="relative z-20 px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-mono-tight text-xs uppercase tracking-[0.4em] text-muted-foreground"
        >
          Mohammad <span className="text-primary">/</span> Calicut, IN
        </motion.p>

        <div className="mt-6 flex justify-center overflow-hidden">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.06, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
              className="font-display inline-block text-[18vw] font-bold leading-[0.9] tracking-tighter sm:text-[12rem]"
            >
              {l === "." ? <span className="text-primary">.</span> : l}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="mx-auto mt-4 h-px w-48 origin-left bg-primary"
        />
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="font-mono-tight mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          Frontend · MERN · Visual content
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ------------------------- NAV ------------------------- */
function Nav() {
  const links = [
    { id: "work", label: "Work" },
    { id: "story", label: "Story" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#top" className="font-display flex items-center gap-2 text-sm font-semibold">
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
          shifan<span className="text-primary">.</span>nv
        </a>
        <nav className="hidden items-center gap-1 rounded-full border border-border bg-background/70 px-2 py-1 backdrop-blur md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

/* ------------------------- HERO ------------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100dvh] overflow-hidden grain">
      <motion.div style={{ y, scale, filter }} className="absolute inset-0 -z-10">
        <img
          src={outdoor.url}
          alt="Mohammad Shifan NV — portrait"
          className="h-full w-full object-cover object-[50%_15%] opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_30%,transparent,var(--color-background))]" />
      </motion.div>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-between px-6 pb-12 pt-32 sm:px-10">
        <motion.div style={{ y: textY }} className="max-w-4xl">
          <div className="font-mono-tight mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.25em] backdrop-blur">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Available · Q3 / 2026
          </div>

          <h1 className="font-display text-[12vw] font-semibold leading-[0.95] tracking-tight sm:text-[5.8rem]">
            I build <span className="italic text-primary">interfaces</span>
            <br />
            and shoot the <span className="text-signal italic">stories</span>
            <br />
            that sell them.
          </h1>

          <p className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg">
            Mohammad Shifan NV — MERN stack developer, frontend engineer and visual
            content creator from Calicut. Two years closing luxury property in the day,
            shipping React at night. I bring the salesfloor instinct into product.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              See selected work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-5 py-3 text-sm backdrop-blur hover:bg-surface"
            >
              Get in touch
            </a>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { k: "Stack", v: "MERN" },
            { k: "Based", v: "Calicut, IN" },
            { k: "Languages", v: "EN · ML · HI · AR" },
            { k: "Also", v: "DaVinci · Capcut" },
          ].map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <div className="font-mono-tight text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {s.k}
              </div>
              <div className="font-display mt-1 text-base font-medium">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- MARQUEE ------------------------- */
function Marquee() {
  const items = [
    "React","Node.js","MongoDB","Tailwind","Framer Motion","Redux",
    "DaVinci Resolve","Capcut","Photoshop","Figma","Cloudinary","Clerk Auth",
  ];
  return (
    <div className="overflow-hidden border-y border-border bg-surface marquee-mask py-6">
      <div className="flex w-max animate-scroll-x gap-12 whitespace-nowrap">
        {[...items, ...items].map((w, i) => (
          <span key={i} className="font-display flex items-center gap-12 text-3xl font-medium sm:text-5xl">
            {w}
            <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------- ABOUT ------------------------- */
function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section id="about" ref={ref} className="relative border-t border-border bg-background py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="font-mono-tight text-xs uppercase tracking-[0.25em] text-muted-foreground">/01 — About</p>
        <div className="mt-6 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">
              Multidisciplinary by design.
              <br />
              <span className="text-muted-foreground">
                Code in the morning, closings in the afternoon, color-grading at night.
              </span>
            </h2>

            <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90 sm:text-lg">
              <p>
                I&apos;m <strong>Mohammad Shifan NV</strong> — a BSc Computer Science graduate
                who treats software like product, not just tickets. I work across the MERN
                stack with a frontend bias, and I obsess over motion, typography and the
                tiny details that make a UI feel alive.
              </p>
              <p>
                In parallel I&apos;ve spent the last year at Hi-LITE Builders selling luxury
                residences in the 1.6Cr–2.35Cr range. That salesfloor — 50+ calls a day,
                site walkthroughs, real objections from real buyers — is the best UX
                research I&apos;ve ever done.
              </p>
              <p>
                I edit my own video on DaVinci & Capcut, design in Figma, and ship the
                code myself. One person, full pipeline.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { icon: <Code2 className="h-5 w-5" />, k: "MERN", v: "React · Node · Mongo" },
                { icon: <Building2 className="h-5 w-5" />, k: "Sales", v: "Hi-LITE Realtor" },
                { icon: <Camera className="h-5 w-5" />, k: "Visuals", v: "Edit · Grade · Shoot" },
              ].map((t) => (
                <div key={t.k} className="rounded-2xl border border-border bg-card p-4">
                  <span className="text-primary">{t.icon}</span>
                  <div className="font-display mt-3 text-sm font-semibold">{t.k}</div>
                  <div className="text-xs text-muted-foreground">{t.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <motion.div style={{ y: y1 }} className="aspect-[3/4] overflow-hidden rounded-2xl border border-border">
              <img src={matrix.url} alt="Mohammad Shifan — code portrait" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              style={{ y: y2 }}
              className="font-mono-tight mt-4 flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-foreground"
            >
              <span>01 — On the move</span>
              <span>Calicut · 2026</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- TIMELINE ------------------------- */
function Timeline() {
  const items = [
    { t: "Apr 2026 — Now", role: "MERN Stack Developer — Intern", org: "Mentrex",
      notes: "Building production React + Node features end-to-end. Component systems, REST APIs, MongoDB schemas, code reviews — shipping in a real team since 7 April 2026." },
    { t: "2025 — 2026", role: "Sales Officer / Realtor", org: "Hi-LITE Builders, Chemmad",
      notes: "Closing luxury residences and commercial property, 1.6Cr–2.35Cr. 50+ calls a day, in-person site walkthroughs." },
    { t: "2025", role: "Accountant & Operations", org: "Furniture Shop, Malappuram",
      notes: "Billing, stock, supplier negotiation, store ops and social-media driven sales." },
    { t: "2025", role: "Business Associate", org: "Alza International Inc, Trivandrum",
      notes: "SOS International promotion, telecalling, lead handling." },
    { t: "2024", role: "MERN Stack Developer", org: "Luminar Technolab, Kochi (Kakkanad)",
      notes: "Full MERN training — frontend and backend production builds." },
    { t: "2024", role: "BSc Computer Science", org: "Blossom Arts & Science College, Kondotty",
      notes: "Graduated. Python add-on certificate from Bluegen Solutions." },
  ];
  return (
    <section className="border-t border-border bg-surface py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="font-mono-tight text-xs uppercase tracking-[0.25em] text-muted-foreground">/02 — Background</p>
        <h2 className="font-display mt-3 text-4xl font-semibold leading-[1.05] sm:text-6xl">A non-linear résumé.</h2>
        <ol className="mt-14 space-y-2">
          {items.map((it, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group grid grid-cols-12 items-baseline gap-4 border-t border-border py-6 transition-colors hover:bg-background/40"
            >
              <span className="font-mono-tight col-span-12 text-xs uppercase tracking-widest text-muted-foreground sm:col-span-2">{it.t}</span>
              <div className="col-span-12 sm:col-span-4">
                <div className="font-display text-xl font-medium">{it.role}</div>
                <div className="text-sm text-muted-foreground">{it.org}</div>
              </div>
              <p className="col-span-12 text-sm text-foreground/80 sm:col-span-6">{it.notes}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------- STORY ------------------------- */
function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const panels = [
    { img: code1.url, kicker: "01 — Source", title: "JSX, tokens, intent.",
      body: "React components, typed end-to-end. Semantic design tokens, motion as a first-class citizen, every line written with shipping in mind.",
      alt: "Syntax-highlighted React code on a dark editor" },
    { img: code2.url, kicker: "02 — Night build", title: "Ship after midnight.",
      body: "Git log scrolling, terminal humming, city outside the window. Most of the production deploys happen when the world goes quiet.",
      alt: "Dark terminal with city skyline at night" },
    { img: code3.url, kicker: "03 — Data in motion", title: "Interfaces that breathe.",
      body: "Flowing particle waves, real-time charts, scroll-driven storytelling. Motion is how I make a static screen feel alive.",
      alt: "Abstract glowing data visualization" },
    { img: matrix.url, kicker: "04 — Into the matrix", title: "Down to the bits.",
      body: "From JSX all the way down — binary, bytes, packets. I like knowing what the machine is actually doing underneath my UI.",
      alt: "Portrait of Shifan with matrix-style green falling binary code overlay" },
  ];

  const n = panels.length;

  return (
    <section id="story" ref={ref} className="relative border-t border-border bg-background" style={{ height: `${n * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-1 mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface lg:order-none lg:max-w-none">
            {panels.map((p, i) => {
              const start = i / n;
              const end = (i + 1) / n;
              const mid = (start + end) / 2;
              const clamp = (v: number) => Math.min(1, Math.max(0, v));
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress,
                [clamp(start - 0.05), clamp(start + 0.02), clamp(end - 0.02), clamp(end + 0.05)],
                [0, 1, 1, 0]);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const scale = useTransform(scrollYProgress, [clamp(start), clamp(mid), clamp(end)], [1.08, 1, 1.08]);
              return (
                <motion.img key={i} src={p.img} alt={p.alt} style={{ opacity, scale }}
                  className="absolute inset-0 h-full w-full object-cover" />
              );
            })}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 text-[10px]">
              <span className="font-mono-tight rounded-full bg-background/80 px-2 py-1 uppercase tracking-widest text-foreground backdrop-blur">scroll to advance</span>
              <span className="font-mono-tight rounded-full bg-background/80 px-2 py-1 tabular-nums text-foreground backdrop-blur">
                <StoryIndex progress={scrollYProgress} total={n} />
              </span>
            </div>
          </div>

          <div className="relative flex min-h-[60vh] items-center">
            <div className="relative w-full">
              {panels.map((p, i) => {
                const start = i / n;
                const end = (i + 1) / n;
                const clamp = (v: number) => Math.min(1, Math.max(0, v));
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress,
                  [clamp(start - 0.03), clamp(start + 0.04), clamp(end - 0.04), clamp(end + 0.03)],
                  [0, 1, 1, 0]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(scrollYProgress, [clamp(start), clamp(end)], [30, -30]);
                return (
                  <motion.div key={i} style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
                    <p className="font-mono-tight text-xs uppercase tracking-[0.3em] text-primary">{p.kicker}</p>
                    <h3 className="font-display mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl">{p.title}</h3>
                    <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">{p.body}</p>
                  </motion.div>
                );
              })}
              <div className="invisible">
                <p className="font-mono-tight text-xs uppercase tracking-[0.3em]">x</p>
                <h3 className="font-display mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl">placeholder title here</h3>
                <p className="mt-5 max-w-md text-base sm:text-lg">placeholder body line one placeholder body line two placeholder body line three.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryIndex({ progress, total }: { progress: ReturnType<typeof useScroll>["scrollYProgress"]; total: number }) {
  const [i, setI] = useState(1);
  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      const idx = Math.min(total, Math.max(1, Math.floor(v * total) + 1));
      setI(idx);
    });
    return () => unsub();
  }, [progress, total]);
  return <span>{String(i).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>;
}

/* ------------------------- WORK ------------------------- */
function Work() {
  const projects = [
    { no: "01", title: "Realtor CRM", tag: "React · Node · MongoDB",
      blurb: "Internal CRM I prototyped from my own salesfloor: lead intake, follow-up scheduling, site-visit tracking and deal pipeline. Built around how I actually close.",
      tint: "from-primary/30 to-signal/10" },
    { no: "02", title: "Edit Suite", tag: "DaVinci · Capcut · Premiere",
      blurb: "Property walkthrough videos and short-form reels for residential listings. Color science, sound design and motion graphics, one-person pipeline.",
      tint: "from-signal/30 to-primary/10" },
    { no: "03", title: "Auth-Ready React Kit", tag: "React · Redux · Clerk · Cloudinary",
      blurb: "Starter scaffold for client projects: routing, protected routes, image upload pipeline, theme system and a Framer Motion preset library.",
      tint: "from-primary/20 to-primary/5" },
    { no: "04", title: "Property Microsite", tag: "React · Tailwind · Framer Motion",
      blurb: "Single-property landing site with cinematic hero, floor-plan explorer and lead-capture form wired to the CRM.",
      tint: "from-signal/20 to-signal/5" },
  ];

  return (
    <section id="work" className="relative border-t border-border bg-background py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono-tight text-xs uppercase tracking-[0.25em] text-muted-foreground">/03 — Selected work</p>
            <h2 className="font-display mt-3 text-4xl font-semibold leading-[1.05] sm:text-6xl">
              Things I shipped,<br />
              <span className="text-primary">things I&apos;m shipping.</span>
            </h2>
          </div>
          <a href="https://github.com/Shifannv" target="_blank" rel="noreferrer"
            className="hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground sm:inline-flex">
            <Github className="h-4 w-4" /> github.com/Shifannv
          </a>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article key={p.no}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8">
              <div className={`pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br ${p.tint} opacity-70 blur-3xl transition-opacity group-hover:opacity-100`} />
              <div className="relative flex items-start justify-between">
                <span className="font-mono-tight text-xs text-muted-foreground">{p.no}</span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <h3 className="font-display relative mt-12 text-3xl font-semibold sm:text-4xl">{p.title}</h3>
              <p className="font-mono-tight relative mt-2 text-xs uppercase tracking-widest text-muted-foreground">{p.tag}</p>
              <p className="relative mt-6 max-w-md text-sm text-foreground/85 sm:text-base">{p.blurb}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- SKILLS ------------------------- */
function Skills() {
  const groups = [
    { k: "Frontend", v: ["HTML5","CSS","JavaScript","React.js","Redux","Tailwind CSS","Bootstrap","Framer Motion"] },
    { k: "Backend", v: ["Node.js","Express","MongoDB","Clerk Auth","Cloudinary","REST APIs"] },
    { k: "Tools", v: ["VS Code","Figma","Photoshop","Lightroom","Git / GitHub","Excel"] },
    { k: "Visual", v: ["DaVinci Resolve","Capcut Pro","Color grading","Graphic design","Wall sketch"] },
    { k: "Business", v: ["High-ticket sales","Negotiation","Billing","Stock mgmt","Telecalling","Presentation"] },
    { k: "Languages", v: ["Malayalam","English","Hindi","Arabic"] },
  ];
  return (
    <section id="skills" className="border-t border-border bg-surface py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="font-mono-tight text-xs uppercase tracking-[0.25em] text-muted-foreground">/05 — Stack & skills</p>
        <h2 className="font-display mt-3 text-4xl font-semibold leading-[1.05] sm:text-6xl">The toolbelt.</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <motion.div key={g.k}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl font-semibold">{g.k}</h3>
                <span className="font-mono-tight text-xs text-muted-foreground">{String(g.v.length).padStart(2, "0")}</span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.v.map((s) => (
                  <li key={s} className="rounded-full border border-border bg-background px-3 py-1 text-sm">{s}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- CONTACT ------------------------- */
function Contact() {
  return (
    <section id="contact" className="border-t border-border bg-background py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="font-mono-tight text-xs uppercase tracking-[0.25em] text-muted-foreground">/06 — Contact</p>
        <h2 className="font-display mt-3 text-5xl font-semibold leading-[1.02] sm:text-[8rem] sm:tracking-tighter">
          Let&apos;s build<br />
          <span className="italic text-primary">something real.</span>
        </h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <a href="mailto:m.shifan.nv@gmail.com" className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 hover:bg-surface">
            <div>
              <div className="font-mono-tight text-[11px] uppercase tracking-widest text-muted-foreground">Email</div>
              <div className="font-display mt-2 text-lg">m.shifan.nv@gmail.com</div>
            </div>
            <Mail className="h-5 w-5 text-primary transition-transform group-hover:-translate-y-0.5" />
          </a>
          <a href="tel:+919544531014" className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 hover:bg-surface">
            <div>
              <div className="font-mono-tight text-[11px] uppercase tracking-widest text-muted-foreground">Phone</div>
              <div className="font-display mt-2 text-lg">+91 95445 31014</div>
            </div>
            <Phone className="h-5 w-5 text-primary transition-transform group-hover:-translate-y-0.5" />
          </a>
          <a href="https://github.com/Shifannv" target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 hover:bg-surface">
            <div>
              <div className="font-mono-tight text-[11px] uppercase tracking-widest text-muted-foreground">GitHub</div>
              <div className="font-display mt-2 text-lg">/Shifannv</div>
            </div>
            <Github className="h-5 w-5 text-primary transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <span className="font-mono-tight inline-flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> Calicut, Kerala — India
          </span>
          <span className="font-mono-tight text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mohammad Shifan NV. Built with React + Framer Motion.
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- PAGE ------------------------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-primary" />;
}

function Page() {
  const [introDone, setIntroDone] = useState(false);
  const { theme } = useTheme();
  void theme;
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <AnimatePresence>{!introDone && <Intro onDone={() => setIntroDone(true)} />}</AnimatePresence>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Story />
        <Timeline />
        <Work />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
