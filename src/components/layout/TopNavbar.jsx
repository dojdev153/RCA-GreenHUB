import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Bell, Leaf, Search, Sparkles, UserCircle } from "lucide-react";

/* ─── Portal Navbar ─────────────────────────────────────────── */
function PortalNavbar({ links = [], portal = false, ctaLabel = "Join Platform", ctaTo = "/register", userInitials = "GH" }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#123D1D]/08 bg-white/88 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-max items-center gap-2.5 text-[#050816]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#74F32B] text-[#123D1D] shadow-[0_0_22px_rgba(116,243,43,0.38)]">
            <Leaf className="h-4 w-4" aria-hidden />
          </span>
          <span className="text-base font-black tracking-tight">GreenHubRCA</span>
        </Link>

        {portal && (
          <label className="hidden min-w-0 flex-1 items-center gap-2 rounded-full border border-[#123D1D]/10 bg-[#F3FFE9]/60 px-4 py-2.5 text-sm text-[#6B7280] md:flex">
            <Search className="h-4 w-4 shrink-0" aria-hidden />
            <input
              className="w-full bg-transparent outline-none placeholder:text-[#9CA3AF]"
              placeholder="Search projects, departments, requests…"
            />
          </label>
        )}

        {portal ? (
          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#74F32B] text-[#123D1D] shadow-[0_0_16px_rgba(116,243,43,0.30)]"
                      : "text-[#050816]/70 hover:bg-[#F3FFE9] hover:text-[#123D1D]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        ) : (
          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm font-semibold text-[#050816]/72 transition hover:bg-[#F3FFE9] hover:text-[#123D1D]">
                {link.label}
              </a>
            ))}
          </nav>
        )}

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          {portal ? (
            <>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#123D1D]/10 bg-white/70 text-[#123D1D] transition hover:border-[#74F32B]/60 hover:bg-[#F3FFE9]"
                type="button"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
              </button>
              <Link
                to="/login"
                className="flex h-9 min-w-9 items-center justify-center rounded-full border border-[#123D1D]/10 bg-[#050816] px-3 text-sm font-bold text-white"
                aria-label="Profile"
              >
                {userInitials || <UserCircle className="h-4 w-4" />}
              </Link>
            </>
          ) : (
            <Link
              to={ctaTo}
              className="hidden items-center gap-1.5 rounded-full bg-[#74F32B] px-5 py-2.5 text-sm font-bold text-[#123D1D] shadow-[0_4px_16px_rgba(116,243,43,0.30)] transition hover:bg-[#5ecf1c] sm:flex"
            >
              {ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

/* ─── Portal Shell ───────────────────────────────────────────── */
export default function TopNavbar(props) {
  return <PortalNavbar {...props} />;
}
