import { motion } from "framer-motion";

export default function HorizontalLandingPanel({ children, className = "", id }) {
  return (
    <motion.section
      id={id}
      className={`landing-panel flex items-center px-4 py-24 sm:px-6 lg:px-10 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.section>
  );
}
