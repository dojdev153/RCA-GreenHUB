import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.26, ease: "easeOut" }}
      >
        <AppRoutes />
      </motion.div>
    </AnimatePresence>
  );
}
