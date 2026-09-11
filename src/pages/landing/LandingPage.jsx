import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Cpu,
  Globe,
  Handshake,
  Leaf,
  Menu,
  Network,
  Rocket,
  Sprout,
  Star,
  Trees,
  Users,
  X,
  Zap,
} from "lucide-react";

/* ─── Navbar ─────────────────────────────────────────────────── */
const navLinks = [
  { label: "About",       href: "#about" },
  { label: "Projects",    href: "#projects" },
  { label: "Departments", href: "#departments" },
  { label: "Impact",      href: "#impact" },
  { label: "Portals",     href: "#portals" },
  { label: "Join",        href: "/register" },
];

function LandingNavbar({ currentPanel }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = currentPanel === 0; // hero panel has dark bg

  return (
    <header className="landing-navbar">
      <div className="landing-navbar-inner">
        {/* Logo */}
        <Link to="/" className="flex min-w-max items-center gap-2.5 text-[#050816]">
          <span
            className="pulse-glow-anim flex h-9 w-9 items-center justify-center rounded-full bg-[#74F32B] text-[#123D1D]"
            style={{ boxShadow: "0 0 24px rgba(116,243,43,0.45)" }}
          >
            <Leaf className="h-4 w-4" aria-hidden />
          </span>
          <span className="text-base font-black tracking-tight text-[#050816]">GreenHubRCA</span>
        </Link>

        {/* Desktop links */}
        <nav className="ml-auto hidden items-center gap-0.5 lg:flex">
          {navLinks.slice(0, 5).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#050816]/75 transition hover:bg-[#74F32B]/12 hover:text-[#123D1D]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <Link
          to="/register"
          className="ml-2 hidden items-center gap-1.5 rounded-full bg-[#74F32B] px-5 py-2.5 text-sm font-bold text-[#123D1D] shadow-[0_4px_18px_rgba(116,243,43,0.35)] transition hover:bg-[#5ecf1c] lg:flex"
        >
          Get Started <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        {/* Mobile toggle */}
        <button
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#74F32B]/15 text-[#123D1D] lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-4 right-4 top-[72px] z-50 rounded-3xl border border-white/70 bg-white/96 p-4 shadow-2xl backdrop-blur-2xl lg:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[#050816]/80 hover:bg-[#F3FFE9] hover:text-[#123D1D]"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/register"
            className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[#74F32B] px-4 py-3 text-sm font-bold text-[#123D1D]"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      )}
    </header>
  );
}

/* ─── Floating badge ─────────────────────────────────────────── */
function FloatBadge({ icon: Icon, label, value, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "backOut" }}
      className={`float-anim pointer-events-none absolute flex items-center gap-2 rounded-2xl border border-white/50 bg-white/22 px-4 py-3 text-white backdrop-blur-xl ${className}`}
      style={{ animationDelay: `${delay * 0.6}s` }}
    >
      {Icon && <Icon className="h-4 w-4 text-[#74F32B]" />}
      <div>
        {value && <p className="text-xs font-black leading-none text-[#74F32B]">{value}</p>}
        <p className="text-xs font-semibold leading-snug text-white/90">{label}</p>
      </div>
    </motion.div>
  );
}

/* ─── Section wrapper ────────────────────────────────────────── */
function Panel({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`landing-panel flex-col ${className}`}
    >
      {children}
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION 1 — HERO
   ════════════════════════════════════════════════════════════════ */
function HeroPanel() {
  return (
    <Panel id="hero" className="hero-bg items-end justify-start">
      {/* Glow orbs */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[50vw] opacity-40"
        style={{ background: "radial-gradient(circle at 80% 20%, rgba(116,243,43,0.38), transparent 55%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[40vh] w-[40vw] opacity-25"
        style={{ background: "radial-gradient(circle at 10% 90%, rgba(18,61,29,0.60), transparent 50%)" }}
      />

      {/* Floating badge cards */}
      <FloatBadge icon={Star}     label="Green Impact Points" value="120+"  className="right-[4%]  top-[22%]" delay={0.2} />
      <FloatBadge icon={Rocket}   label="Student Projects"                  className="right-[18%] top-[36%]" delay={0.4} />
      <FloatBadge icon={Users}    label="Teacher Reviews"                   className="right-[6%]  top-[50%]" delay={0.6} />
      <FloatBadge icon={Globe}    label="Nyabihu Outreach"                  className="right-[20%] top-[62%]" delay={0.8} />
      <FloatBadge icon={Cpu}      label="IoT + Web Solutions"               className="right-[4%]  top-[72%]" delay={1.0} />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-4xl flex-col px-6 pb-14 pt-28 sm:px-10 lg:px-16 lg:pt-36"
      >
        {/* Eyebrow */}
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80 backdrop-blur-xl">
          <Leaf className="h-3.5 w-3.5 text-[#74F32B]" />
          RCA GreenTech Initiative
        </span>

        {/* Title */}
        <h1 className="mt-5 text-6xl font-black leading-none tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
          GreenHub<span className="text-[#74F32B]">RCA</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg font-bold text-[#74F32B] sm:text-xl">
          The digital innovation platform of RCA GreenTech Initiative
        </p>

        {/* Description */}
        <p className="mt-4 max-w-xl text-base leading-8 text-white/78 sm:text-lg">
          A collaborative space where students, teachers, departments, and partners build environmental solutions for RCA and Nyabihu District.
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/student"
            className="inline-flex items-center gap-2 rounded-full bg-[#74F32B] px-7 py-3.5 text-sm font-bold text-[#123D1D] shadow-[0_8px_28px_rgba(116,243,43,0.42)] transition hover:bg-[#5ecf1c]"
          >
            Start Exploring <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/student/post-project"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/22"
          >
            Post a Project
          </Link>
        </div>

        {/* Stat strip */}
        <div className="mt-10 flex flex-wrap gap-6">
          {[
            { n: "39+", label: "Active Projects" },
            { n: "3,420", label: "Impact Points" },
            { n: "9",    label: "Portals" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-black text-[#74F32B]">{s.n}</p>
              <p className="text-xs font-semibold text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </Panel>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION 2 — ABOUT
   ════════════════════════════════════════════════════════════════ */
const aboutCards = [
  {
    icon: Rocket,
    title: "Project Sharing",
    body: "Students post web, embedded, and campus improvement ideas — giving every innovation a permanent, shareable home.",
  },
  {
    icon: Users,
    title: "Teacher Mentorship",
    body: "Teachers review, guide, and endorse promising projects, turning ideas into structured, supported work.",
  },
  {
    icon: Building2,
    title: "Department Support",
    body: "Each project can request help from the right department — web, embedded, or environment — for materials and expertise.",
  },
  {
    icon: Trees,
    title: "Community Impact",
    body: "Solutions can grow from RCA campus to Nyabihu District, creating real-world environmental change.",
  },
];

function AboutPanel() {
  return (
    <Panel
      id="about"
      className="justify-center"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(116,243,43,0.18), transparent 40%), linear-gradient(135deg, #ffffff, #f7fff2)",
      }}
    >
      {/* Decorative shape */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(116,243,43,0.40), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(18,61,29,0.45), transparent 70%)" }}
      />

      <div className="relative z-10 flex h-full w-full items-center px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block rounded-full bg-[#74F32B]/15 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#123D1D]">
              About the initiative
            </span>
            <h2 className="mt-5 text-5xl font-black leading-tight tracking-tight text-[#050816] sm:text-6xl">
              Built for<br />
              <span className="text-[#74F32B]">RCA GreenTech</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#4B5563]">
              GreenHubRCA supports environmental projects, embedded systems, web platforms, and direct campus or community improvement ideas. A polished place to turn innovation into visible action.
            </p>
            <p className="mt-4 text-base leading-7 text-[#6B7280]">
              The platform connects RCA campus projects, Nyabihu District community work, teacher mentorship, department support, finance visibility, and outside investor discovery.
            </p>
            <Link
              to="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#74F32B] px-6 py-3 text-sm font-bold text-[#123D1D] shadow-[0_6px_22px_rgba(116,243,43,0.30)] transition hover:bg-[#5ecf1c]"
            >
              Join Platform <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Right — stacked glass cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.1, duration: 0.55 }}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-[28px] p-6"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#74F32B]/15 text-[#123D1D]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-black text-[#050816]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">{card.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION 3 — PROJECT CATEGORIES
   ════════════════════════════════════════════════════════════════ */
const categories = [
  {
    icon: Globe,
    title: "Web Platforms",
    body: "Digital tools for reporting, awareness, public storytelling, and campus coordination.",
    points: 50,
    accent: "#74F32B",
    bg: "from-lime-50 to-white",
  },
  {
    icon: Cpu,
    title: "Embedded / IoT Projects",
    body: "Sensors, automation, smart devices, and hardware prototypes that solve real environmental problems.",
    points: 75,
    accent: "#3bdfb8",
    bg: "from-teal-50 to-white",
  },
  {
    icon: Sprout,
    title: "RCA Campus Environment",
    body: "Direct improvements for gardens, waste handling, cleanups, and greener daily life at RCA.",
    points: 100,
    accent: "#74F32B",
    bg: "from-green-50 to-white",
  },
  {
    icon: Trees,
    title: "Nyabihu District Community",
    body: "Community-facing actions with wider environmental impact beyond campus.",
    points: 120,
    accent: "#4ade80",
    bg: "from-emerald-50 to-white",
  },
];

function CategoriesPanel() {
  return (
    <Panel
      id="projects"
      className="justify-center"
      style={{ background: "linear-gradient(160deg, #f0fff4 0%, #ffffff 60%)" }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 opacity-30"
        style={{ background: "radial-gradient(circle, rgba(116,243,43,0.50), transparent 70%)" }}
      />

      <div className="relative z-10 flex h-full flex-col justify-center px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="inline-block rounded-full bg-[#74F32B]/15 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#123D1D]">
              Project Categories
            </span>
            <h2 className="mt-4 text-5xl font-black tracking-tight text-[#050816] sm:text-6xl">
              Ideas become<br /><span className="text-[#74F32B]">visible impact</span>
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.08, duration: 0.55 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="glass-card relative overflow-hidden rounded-[28px] p-6"
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.bg} opacity-50`} />

                  {/* Icon */}
                  <span
                    className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: `${cat.accent}22` }}
                  >
                    <Icon className="h-7 w-7" style={{ color: cat.accent === "#74F32B" ? "#123D1D" : cat.accent }} />
                  </span>

                  {/* Content */}
                  <h3 className="relative mt-5 text-lg font-black leading-snug text-[#050816]">{cat.title}</h3>
                  <p className="relative mt-2 text-sm leading-6 text-[#6B7280]">{cat.body}</p>

                  {/* Points badge */}
                  <div className="relative mt-5 flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-black"
                      style={{
                        background: `${cat.accent}20`,
                        color: cat.accent === "#74F32B" ? "#123D1D" : cat.accent,
                        boxShadow: `0 0 16px ${cat.accent}30`,
                      }}
                    >
                      <Zap className="h-3 w-3" />
                      Base: {cat.points} pts
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION 4 — HOW IT WORKS
   ════════════════════════════════════════════════════════════════ */
const steps = [
  { n: "01", title: "Student Posts Project", body: "A student submits their environmental project or idea with a description, problem, and proposed solution." },
  { n: "02", title: "Choose Category & Support", body: "The student selects a project category and specifies what support they need from departments." },
  { n: "03", title: "Department Review", body: "Department heads review support requests and assign resources, materials, or technical guidance." },
  { n: "04", title: "Teacher Feedback", body: "Teachers provide structured feedback, mentorship, and formal endorsements for promising projects." },
  { n: "05", title: "Earn Green Impact Points", body: "Projects accumulate Green Impact Points based on type, progress stage, and real-world impact." },
  { n: "06", title: "Investor Discovery", body: "Approved public projects become discoverable to investors, partners, and environmental organizations." },
];

function HowItWorksPanel() {
  return (
    <Panel
      id="departments"
      className="justify-center"
      style={{ background: "linear-gradient(145deg, #ffffff 0%, #f0fff4 100%)" }}
    >
      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-96 w-96 rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, rgba(116,243,43,0.45), transparent 70%)" }}
      />

      <div className="relative z-10 flex h-full flex-col justify-center px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="inline-block rounded-full bg-[#74F32B]/15 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#123D1D]">
              How It Works
            </span>
            <h2 className="mt-4 text-5xl font-black tracking-tight text-[#050816] sm:text-6xl">
              From idea to<br /><span className="text-[#74F32B]">supported project</span>
            </h2>
          </motion.div>

          {/* Timeline grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="glass-card relative rounded-[24px] p-6"
              >
                {/* Connector dot */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rounded-full bg-[#74F32B] shadow-[0_0_12px_rgba(116,243,43,0.60)] lg:block" />
                )}

                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#050816] text-sm font-black text-[#74F32B]">
                    {step.n}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-[#74F32B]" />
                </div>
                <h3 className="text-base font-black text-[#050816]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION 5 — PORTALS
   ════════════════════════════════════════════════════════════════ */
const portals = [
  { icon: Rocket,      title: "Student Portal",                       desc: "Post projects, request support, track progress.",      to: "/student" },
  { icon: Users,       title: "Teacher Portal",                       desc: "Review, mentor, and endorse student projects.",        to: "/teacher" },
  { icon: Globe,       title: "Web Development Dept.",                desc: "Manage web builds, hosting, and UI support.",          to: "/departments/web" },
  { icon: Cpu,         title: "Embedded Systems Dept.",               desc: "Coordinate IoT prototypes and component requests.",    to: "/departments/embedded" },
  { icon: Sprout,      title: "Environment Dept.",                    desc: "Run campus cleanups and community outreach.",          to: "/departments/environment" },
  { icon: BadgeCheck,  title: "Secretary Portal",                     desc: "Announcements, records, and meeting notes.",           to: "/secretary" },
  { icon: Handshake,   title: "Finance Portal",                       desc: "Review budgets, materials, and partner leads.",        to: "/finance" },
  { icon: Network,     title: "Head of Departments Portal",           desc: "Oversee all departments and escalations.",             to: "/head-departments" },
  { icon: Star,        title: "Investor / Partner Portal",            desc: "Discover public projects and express interest.",       to: "/investor" },
];

function PortalsPanel() {
  return (
    <Panel
      id="portals"
      className="justify-center"
      style={{ background: "linear-gradient(155deg, #f7fff2, #ffffff 55%)" }}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 h-80 w-80 opacity-25"
        style={{ background: "radial-gradient(circle at 15% 20%, rgba(116,243,43,0.50), transparent 70%)" }}
      />

      <div className="relative z-10 flex h-full flex-col justify-center px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="inline-block rounded-full bg-[#74F32B]/15 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#123D1D]">
              Platform Portals
            </span>
            <h2 className="mt-4 max-w-2xl text-5xl font-black tracking-tight text-[#050816] sm:text-6xl">
              Every role has a<br /><span className="text-[#74F32B]">dedicated space</span>
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {portals.map((portal, i) => {
              const Icon = portal.icon;
              return (
                <motion.div
                  key={portal.title}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                >
                  <Link to={portal.to} className="group block">
                    <div className="glass-card rounded-[24px] p-5 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(116,243,43,0.20)]">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#74F32B]/12 text-[#123D1D] transition group-hover:bg-[#74F32B]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 text-sm font-black leading-snug text-[#050816]">{portal.title}</h3>
                      <p className="mt-1.5 text-xs leading-5 text-[#6B7280]">{portal.desc}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-black text-[#123D1D]">
                        Preview Portal <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION 6 — GREEN IMPACT POINTS
   ════════════════════════════════════════════════════════════════ */
const pointTiers = [
  { label: "Idea / Proposal",                    pts: 25,  color: "#a3e635" },
  { label: "Web Platform",                       pts: 50,  color: "#74F32B" },
  { label: "Embedded / IoT Project",             pts: 75,  color: "#4ade80" },
  { label: "RCA Campus Environment Action",      pts: 100, color: "#22c55e" },
  { label: "Nyabihu District Community Project", pts: 120, color: "#16a34a" },
];

const boostItems = [
  "Student collaboration & team support",
  "Teacher endorsement",
  "Department approval",
  "Prototype completion",
  "Implementation at RCA",
  "Community impact in Nyabihu",
  "Investor or partner support",
];

function ImpactPointsPanel() {
  return (
    <Panel
      id="impact"
      className="justify-center"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(116,243,43,0.22), transparent 40%), linear-gradient(135deg, #ffffff, #f0fff4)",
      }}
    >
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 opacity-30"
        style={{ background: "radial-gradient(circle at 85% 80%, rgba(116,243,43,0.50), transparent 70%)" }}
      />

      <div className="relative z-10 flex h-full flex-col justify-center px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="inline-block rounded-full bg-[#74F32B]/15 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#123D1D]">
              Recognition System
            </span>
            <h2 className="mt-4 max-w-2xl text-5xl font-black tracking-tight text-[#050816] sm:text-6xl">
              Green Impact<br /><span className="text-[#74F32B]">Points</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#4B5563]">
              Green Impact Points measure how much a project contributes to innovation, environmental improvement, collaboration, and community impact.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            {/* Point tiers */}
            <div className="space-y-3">
              {pointTiers.map((tier, i) => (
                <motion.div
                  key={tier.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="glass-card flex items-center justify-between gap-4 rounded-[20px] p-5"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black text-[#123D1D]"
                      style={{ background: `${tier.color}25`, boxShadow: `0 0 14px ${tier.color}35` }}
                    >
                      <Zap className="h-4 w-4" style={{ color: tier.color }} />
                    </span>
                    <p className="text-sm font-bold text-[#050816]">{tier.label}</p>
                  </div>
                  <motion.span
                    initial={{ scale: 0.7 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="shrink-0 rounded-full px-3.5 py-1.5 text-sm font-black"
                    style={{
                      background: `${tier.color}18`,
                      color: tier.color,
                      boxShadow: `0 0 18px ${tier.color}30`,
                    }}
                  >
                    {tier.pts} pts
                  </motion.span>
                </motion.div>
              ))}
            </div>

            {/* Boost card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="glass-card-green rounded-[28px] p-7"
            >
              <h3 className="mb-5 text-lg font-black text-[#050816]">Points also increase through:</h3>
              <ul className="space-y-3">
                {boostItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#4B5563]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#74F32B]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div
                className="mt-8 rounded-2xl p-5 text-center"
                style={{ background: "rgba(116,243,43,0.12)", boxShadow: "0 0 30px rgba(116,243,43,0.20)" }}
              >
                <p className="text-3xl font-black text-[#123D1D]">3,420</p>
                <p className="mt-1 text-sm font-semibold text-[#4B5563]">Total Green Impact Points earned</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION 7 — FINAL CTA
   ════════════════════════════════════════════════════════════════ */
const ctaFloaters = [
  { icon: Leaf,   label: "Environmental Action",   className: "left-[5%]  top-[20%]" },
  { icon: Zap,    label: "Green Impact Points",    className: "left-[5%]  bottom-[22%]" },
  { icon: Rocket, label: "Student Innovation",     className: "right-[5%] top-[25%]" },
  { icon: Globe,  label: "Nyabihu Outreach",       className: "right-[5%] bottom-[20%]" },
];

function FinalCTAPanel() {
  return (
    <Panel
      id="cta"
      className="items-center justify-center"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, rgba(116,243,43,0.30), transparent 55%), radial-gradient(circle at 80% 80%, rgba(18,61,29,0.15), transparent 45%), linear-gradient(160deg, #f0fff4, #ffffff)",
      }}
    >
      {/* Large ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] max-h-[600px] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(116,243,43,0.45), transparent 65%)", filter: "blur(60px)" }}
      />

      {/* Floating mini cards */}
      {ctaFloaters.map((f) => (
        <motion.div
          key={f.label}
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`float-anim-slow pointer-events-none absolute flex items-center gap-2 rounded-2xl border border-[#74F32B]/20 bg-white/70 px-4 py-3 text-xs font-semibold text-[#123D1D] shadow-lg backdrop-blur-xl ${f.className} hidden lg:flex`}
        >
          <f.icon className="h-4 w-4 text-[#74F32B]" />
          {f.label}
        </motion.div>
      ))}

      {/* Center card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card relative z-10 mx-6 max-w-3xl rounded-[40px] p-10 text-center sm:p-16"
        style={{ boxShadow: "0 0 60px rgba(116,243,43,0.22), 0 30px 80px rgba(18,61,29,0.10)" }}
      >
        {/* Icon */}
        <span
          className="pulse-glow-anim mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#74F32B] text-[#123D1D]"
          style={{ boxShadow: "0 0 40px rgba(116,243,43,0.50)" }}
        >
          <Leaf className="h-10 w-10" />
        </span>

        <h2 className="mx-auto mt-8 max-w-2xl text-4xl font-black leading-tight tracking-tight text-[#050816] sm:text-5xl">
          Ready to build a greener<br />
          <span className="text-[#74F32B]">RCA and Nyabihu?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#4B5563]">
          Join GreenHubRCA and turn environmental ideas into projects, projects into action, and action into measurable impact.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-full bg-[#74F32B] px-8 py-4 text-sm font-bold text-[#123D1D] shadow-[0_8px_28px_rgba(116,243,43,0.40)] transition hover:bg-[#5ecf1c]"
          >
            Create Account <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/investor/projects"
            className="inline-flex items-center gap-2 rounded-full border border-[#123D1D]/12 bg-white px-8 py-4 text-sm font-bold text-[#050816] shadow-sm transition hover:border-[#74F32B]/50 hover:bg-[#F3FFE9]"
          >
            Explore Projects
          </Link>
        </div>

        {/* Stats strip */}
        <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#123D1D]/08 pt-8">
          {[
            { n: "39+",   label: "Active Projects" },
            { n: "3,420", label: "Impact Points" },
            { n: "9",     label: "Portals" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-black text-[#74F32B]">{s.n}</p>
              <p className="mt-0.5 text-xs font-semibold text-[#6B7280]">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </Panel>
  );
}

/* ════════════════════════════════════════════════════════════════
   ROOT LANDING PAGE — HORIZONTAL SCROLL
   ════════════════════════════════════════════════════════════════ */
const PANEL_COUNT = 7;

export default function LandingPage() {
  const trackRef    = useRef(null);
  const rafRef      = useRef(null);
  const [currentPanel, setCurrentPanel] = useState(0);

  useEffect(() => {
    const track  = trackRef.current;
    if (!track) return;

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollLeft   = track.scrollLeft;
        const scrollRange = track.scrollWidth - track.clientWidth;
        const progress    = scrollRange > 0 ? scrollLeft / scrollRange : 0;
        setCurrentPanel(Math.round(progress * (PANEL_COUNT - 1)));
      });
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative">
      {/* Floating navbar — always on top */}
      <LandingNavbar currentPanel={currentPanel} />

      {/* Horizontal scroll container */}
      <div
        ref={trackRef}
        className="landing-h-scroll-container"
      >
        <HeroPanel />
        <AboutPanel />
        <CategoriesPanel />
        <HowItWorksPanel />
        <PortalsPanel />
        <ImpactPointsPanel />
        <FinalCTAPanel />
      </div>

      {/* Scroll progress dots */}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex gap-2">
        {Array.from({ length: PANEL_COUNT }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === currentPanel ? "24px" : "6px",
              background: i === currentPanel ? "#74F32B" : "rgba(18,61,29,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
