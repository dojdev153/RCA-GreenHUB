import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", as = "div", hover = false }) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={`glass-card rounded-[28px] ${className}`}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {children}
    </Component>
  );
}
