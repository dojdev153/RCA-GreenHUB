import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, HeartHandshake, MessageCircle, Users, Zap } from "lucide-react";
import StatusBadge from "../common/StatusBadge.jsx";
import { shortNumber } from "../../utils/routes.js";

const ACTION_ICONS = {
  "View Project":             Eye,
  Support:                    HeartHandshake,
  Comment:                    MessageCircle,
  "Join Team":                Users,
  Review:                     Eye,
  "Give Feedback":            MessageCircle,
  Endorse:                    HeartHandshake,
  "Recommend for Support":    HeartHandshake,
  "Recommend for Investors":  Eye,
  "Express Interest":         HeartHandshake,
  "Mark Ready":               Eye,
  "Accept Support":           HeartHandshake,
  "Assign Member":            Users,
  "Accept Request":           HeartHandshake,
  "Assign Support":           Users,
  "Mark Prototype":           Eye,
  "Approve Activity":         HeartHandshake,
  "Assign Volunteers":        Users,
  "Request Budget":           HeartHandshake,
  "Approve Collaboration":    HeartHandshake,
  "Request Update":           MessageCircle,
  "Feature Project":          Eye,
  "Mark Priority":            Eye,
};

export default function ProjectCard({
  project,
  actions = ["View Project", "Support", "Comment", "Join Team"],
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="glass-card overflow-hidden rounded-[28px]"
    >
      {/* Visual banner */}
      <div
        className={`relative h-36 bg-gradient-to-br ${project.imageTone ?? "from-lime-100 via-white to-emerald-100"}`}
      >
        {/* Overlay pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(116,243,43,0.40),transparent_14rem),radial-gradient(circle_at_85%_10%,rgba(5,8,22,0.14),transparent_12rem)]" />

        {/* Points badge — top-right */}
        <span
          className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-[#123D1D] backdrop-blur"
          style={{ boxShadow: "0 0 16px rgba(116,243,43,0.30)" }}
        >
          <Zap className="h-3 w-3 text-[#74F32B]" />
          {shortNumber(project.points)} pts
        </span>

        {/* Bottom row */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
          <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-[#123D1D] backdrop-blur">
            {project.category}
          </span>
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Author line */}
        <p className="text-xs font-semibold text-[#9CA3AF]">
          {project.author} · {project.department}
        </p>

        {/* Title */}
        <Link
          to={`/projects/${project.id}`}
          className="mt-2 block text-lg font-black leading-snug text-[#050816] transition hover:text-[#123D1D]"
        >
          {project.title}
        </Link>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6B7280]">
          {project.description}
        </p>

        {/* Support tags */}
        {project.supportNeeded?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.supportNeeded.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#F3FFE9] px-2.5 py-1 text-xs font-semibold text-[#123D1D]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="my-4 border-t border-[#123D1D]/06" />

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          {actions.map((action, i) => {
            const Icon = ACTION_ICONS[action] ?? Eye;
            const isPrimary = i === 0;

            const cls = isPrimary
              ? "inline-flex items-center gap-1.5 rounded-full bg-[#74F32B] px-4 py-2 text-xs font-bold text-[#123D1D] shadow-[0_0_14px_rgba(116,243,43,0.30)] transition hover:bg-[#5ecf1c]"
              : "inline-flex items-center gap-1.5 rounded-full border border-[#123D1D]/10 bg-white/70 px-4 py-2 text-xs font-bold text-[#6B7280] transition hover:border-[#74F32B]/50 hover:text-[#123D1D]";

            return isPrimary ? (
              <Link key={action} to={`/projects/${project.id}`} className={cls}>
                <Icon className="h-3.5 w-3.5" aria-hidden /> {action}
              </Link>
            ) : (
              <button key={action} type="button" className={cls}>
                <Icon className="h-3.5 w-3.5" aria-hidden /> {action}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
