import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlassCard from "../common/GlassCard.jsx";

export default function InsightCard({ title, items = [], actionLabel, to, icon: Icon }) {
  return (
    <GlassCard className="overflow-hidden p-0">
      {/* Card header */}
      <div
        className="flex items-center gap-3 border-b border-[#123D1D]/08 px-5 py-4"
        style={{ background: "linear-gradient(135deg, rgba(116,243,43,0.08), transparent)" }}
      >
        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#74F32B]/18 text-[#123D1D]">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
        )}
        <h3 className="text-sm font-black text-[#050816]">{title}</h3>
      </div>

      {/* Items */}
      <div className="space-y-1 p-3">
        {items.map((item, i) => (
          <motion.div
            key={`${item.title ?? item.label}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="flex items-start justify-between gap-3 rounded-2xl bg-white/60 px-4 py-3 transition hover:bg-[#F3FFE9]"
          >
            <p className="text-sm font-semibold leading-snug text-[#050816]">
              {item.title ?? item.label}
            </p>
            {(item.value || item.meta || item.date) && (
              <span className="shrink-0 text-right text-xs font-bold text-[#6B7280]">
                {item.value ?? item.meta ?? item.date}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Action link */}
      {actionLabel && to && (
        <div className="border-t border-[#123D1D]/08 px-5 py-3">
          <Link
            to={to}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#050816] py-2.5 text-sm font-bold text-white transition hover:bg-[#123D1D]"
          >
            {actionLabel}
          </Link>
        </div>
      )}
    </GlassCard>
  );
}
