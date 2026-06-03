import { motion } from "framer-motion";
import ProjectCard from "../cards/ProjectCard.jsx";

export default function ProjectFeed({ projects = [], actions }) {
  return (
    <div className="space-y-5">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04, duration: 0.28 }}
        >
          <ProjectCard project={project} actions={actions} />
        </motion.div>
      ))}
    </div>
  );
}
