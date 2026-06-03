import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, Leaf, Sparkles, Zap } from "lucide-react";
import GlassCard from "../common/GlassCard.jsx";

export default function ProfileSummaryCard({ user, stats = [], quickLinks = [] }) {
  const points = user.greenImpactPoints ?? user.points ?? 680;

  return (
    <GlassCard className="overflow-hidden p-0">
      {/* Profile hero */}
      <div
        className="relative px-6 pb-5 pt-6"
        style={{
          background:
            "radial-gradient(circle at 90% 10%, rgba(116,243,43,0.22), transparent 55%), linear-gradient(145deg, #f0fff4, #ffffff)",
        }}
      >
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div
            className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white shadow-xl"
            style={{ background: "linear-gradient(135deg, #050816, #123D1D)" }}
          >
            {user.avatar}
            <span
              className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#74F32B]"
              style={{ boxShadow: "0 0 10px rgba(116,243,43,0.55)" }}
            >
              <BadgeCheck className="h-3 w-3 text-[#123D1D]" />
            </span>
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-base font-black text-[#050816]">{user.name}</h2>
            <p className="mt-0.5 text-sm font-medium text-[#6B7280]">{user.role}</p>
          </div>
        </div>

        {/* Green Impact Points bar */}
        <div className="mt-5 rounded-2xl border border-[#74F32B]/20 bg-white/70 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#123D1D]">
              <Zap className="h-3.5 w-3.5 text-[#74F32B]" />
              Green Impact Points
            </div>
            <span className="text-lg font-black text-[#123D1D]">{points.toLocaleString()}</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#F3FFE9]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((points / 1000) * 100, 100)}%` }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="h-2 rounded-full bg-[#74F32B]"
              style={{ boxShadow: "0 0 12px rgba(116,243,43,0.55)" }}
            />
          </div>
          <p className="mt-2 text-xs text-[#9CA3AF]">
            {points >= 1000 ? "Top contributor 🏆" : `${1000 - points} pts to top tier`}
          </p>
        </div>
      </div>

      {/* Stats grid */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 gap-px border-t border-[#123D1D]/08 bg-[#123D1D]/08">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white px-4 py-4">
              <p className="text-xl font-black text-[#050816]">{stat.value}</p>
              <p className="mt-0.5 text-xs font-semibold text-[#9CA3AF]">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Profile completeness */}
      <div className="border-t border-[#123D1D]/08 px-5 py-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold text-[#123D1D]">Profile completeness</span>
          <span className="text-xs font-black text-[#050816]">{user.profileCompleteness ?? 84}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[#F3FFE9]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${user.profileCompleteness ?? 84}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="h-1.5 rounded-full bg-[#74F32B]"
          />
        </div>
      </div>

      {/* Quick links */}
      {quickLinks.length > 0 && (
        <div className="space-y-1.5 border-t border-[#123D1D]/08 px-4 py-4">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                link.highlight
                  ? "bg-[#74F32B] text-[#123D1D] shadow-[0_0_16px_rgba(116,243,43,0.28)] hover:bg-[#5ecf1c]"
                  : "bg-white/60 text-[#050816]/80 hover:bg-[#F3FFE9] hover:text-[#123D1D]"
              }`}
            >
              <span>{link.label}</span>
              {link.highlight ? (
                <Sparkles className="h-4 w-4" aria-hidden />
              ) : (
                <Leaf className="h-3.5 w-3.5 opacity-40" aria-hidden />
              )}
            </Link>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
