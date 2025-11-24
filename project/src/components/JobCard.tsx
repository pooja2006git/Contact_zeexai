import { motion } from 'framer-motion';
import { Briefcase, MapPin, Users, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Role } from '../data/roles';

interface JobCardProps {
  role: Role;
  index: number;
  onApply: (role: Role) => void;
}

export default function JobCard({ role, index, onApply }: JobCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-gradient-to-br from-[#0f1420]/90 via-[#1a1f2e]/80 to-[#0f1420]/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 overflow-hidden transition-all duration-500"
    >
      <motion.div
        animate={isHovered ? { y: -8, scale: 1.02 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl duration-500" />

        <motion.div
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent"
        />

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors duration-300">
            {role.title}
          </h3>

          <div className="flex flex-wrap gap-2 mb-4">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/40 rounded-full text-xs text-cyan-300 hover:border-cyan-400 transition-colors duration-300"
            >
              <Briefcase className="w-3 h-3" />
              {role.type}
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/40 rounded-full text-xs text-cyan-300 hover:border-cyan-400 transition-colors duration-300"
            >
              <MapPin className="w-3 h-3" />
              {role.location}
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/40 rounded-full text-xs text-cyan-300 hover:border-cyan-400 transition-colors duration-300"
            >
              <Users className="w-3 h-3" />
              {role.eligibility}
            </motion.span>
          </div>

          <p className="text-gray-300 text-sm mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
            {role.description}
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onApply(role)}
            className="w-full relative group/btn bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 hover:from-cyan-400 hover:via-blue-400 hover:to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-all duration-700" />
            <span className="relative flex items-center justify-center gap-2">
              Apply Now
              <motion.span
                animate={isHovered ? { x: 5 } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </span>
          </motion.button>
        </div>
      </motion.div>

      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
      </div>
    </motion.div>
  );
}
