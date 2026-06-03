import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const styles = {
  primary: "bg-[#74F32B] text-[#123D1D] border-[#74F32B] shadow-[0_18px_34px_rgba(116,243,43,0.28)] hover:bg-[#66df21]",
  secondary: "bg-white/78 text-[#123D1D] border-[#123D1D]/10 hover:border-[#74F32B]/70 hover:bg-[#F3FFE9]",
  ghost: "bg-transparent text-[#123D1D] border-[#123D1D]/10 hover:bg-white/70",
  navy: "bg-[#050816] text-white border-[#050816] hover:bg-[#123D1D]",
};

export default function CTAButton({
  children,
  to,
  onClick,
  type = "button",
  variant = "primary",
  icon: Icon = ArrowRight,
  className = "",
}) {
  const content = (
    <>
      <span>{children}</span>
      {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
    </>
  );

  const baseClass = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`;

  if (to) {
    return (
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <Link className={baseClass} to={to}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={baseClass} type={type} onClick={onClick}>
      {content}
    </motion.button>
  );
}
