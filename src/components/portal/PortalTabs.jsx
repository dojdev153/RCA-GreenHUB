import { motion } from "framer-motion";

export default function PortalTabs({ tabs = [], active = 0, onChange }) {
  return (
    <div className="overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
      <div className="flex min-w-max gap-1.5 rounded-2xl border border-[#123D1D]/10 bg-white/80 p-1.5 backdrop-blur-xl shadow-sm">
        {tabs.map((tab, index) => {
          const isActive = active === index;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onChange?.(index)}
              className={`relative rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                isActive
                  ? "text-[#123D1D]"
                  : "text-[#9CA3AF] hover:text-[#050816]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="portal-tab-pill"
                  className="absolute inset-0 rounded-xl bg-[#74F32B]"
                  style={{ boxShadow: "0 0 16px rgba(116,243,43,0.35)" }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{tab}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
