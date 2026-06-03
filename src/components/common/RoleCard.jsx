import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function RoleCard({ label, selected, onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex min-h-16 items-center justify-between rounded-2xl border px-4 text-left transition ${
        selected ? "border-[#74F32B] bg-[#74F32B]/18 text-[#123D1D]" : "border-[#123D1D]/10 bg-white/72 text-[#050816] hover:border-[#74F32B]/60"
      }`}
    >
      <span className="text-sm font-semibold">{label}</span>
      {selected ? <CheckCircle2 className="h-5 w-5 text-[#123D1D]" aria-hidden="true" /> : null}
    </motion.button>
  );
}
