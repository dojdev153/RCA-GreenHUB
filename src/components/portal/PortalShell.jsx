import { motion } from "framer-motion";
import TopNavbar from "../layout/TopNavbar.jsx";
import ProfileSummaryCard from "../cards/ProfileSummaryCard.jsx";
import InsightCard from "../cards/InsightCard.jsx";

/* ─── Portal hero header ──────────────────────────────────────── */
function PortalHeroHeader({ eyebrow, title, description }) {
  return (
    <div className="relative overflow-hidden rounded-[32px] p-8 sm:p-10"
      style={{
        background: "radial-gradient(circle at 80% 30%, rgba(116,243,43,0.22), transparent 50%), linear-gradient(135deg, #f0fff4, #ffffff)",
        border: "1px solid rgba(116,243,43,0.18)",
        boxShadow: "0 4px 32px rgba(18,61,29,0.08)",
      }}
    >
      {/* Decorative orb */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-48 w-48 opacity-40"
        style={{ background: "radial-gradient(circle, rgba(116,243,43,0.50), transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="inline-block rounded-full bg-[#74F32B]/18 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#123D1D]">
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight text-[#050816] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280] sm:text-base">
          {description}
        </p>
      </motion.div>
    </div>
  );
}

/* ─── Portal shell layout ─────────────────────────────────────── */
export default function PortalShell({
  user,
  stats,
  quickLinks,
  navLinks,
  title,
  eyebrow,
  description,
  tabs,
  left,
  center,
  rightCards = [],
}) {
  return (
    <div className="app-surface min-h-screen">
      <TopNavbar portal links={navLinks} userInitials={user.avatar} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Portal hero header */}
        <div className="mb-6">
          <PortalHeroHeader eyebrow={eyebrow} title={title} description={description} />
        </div>

        {/* Tabs row */}
        {tabs && (
          <div className="mb-6 overflow-x-auto">
            {tabs}
          </div>
        )}

        {/* Three-column layout */}
        <div className="portal-grid items-start">
          {/* Left — Profile context */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            {left ?? <ProfileSummaryCard user={user} stats={stats} quickLinks={quickLinks} />}
          </aside>

          {/* Center — Main feed */}
          <section className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              {center}
            </motion.div>
          </section>

          {/* Right — Insight cards */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            {rightCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <InsightCard {...card} />
              </motion.div>
            ))}
          </aside>
        </div>
      </main>
    </div>
  );
}
