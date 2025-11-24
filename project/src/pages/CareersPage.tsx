import { motion } from 'framer-motion';
import { useState } from 'react';
import JobCard from '../components/JobCard';
import ApplyModal from '../components/ApplyModal';
import BackgroundBubbles from '../components/BackgroundBubbles';
import { roles, Role } from '../data/roles';
import { Sparkles } from 'lucide-react';

export default function CareersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleApply = (role: Role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] relative overflow-hidden">
      <BackgroundBubbles />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/25 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-400/15 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">Join Our Team</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Open Roles at Zeex AI
            </h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Find your next opportunity and grow with us.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent blur-3xl" />
          </motion.div>
        </motion.section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <JobCard
                key={role.id}
                role={role}
                index={index}
                onApply={handleApply}
              />
            ))}
          </div>

          <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6">
            {roles.map((role, index) => (
              <JobCard
                key={role.id}
                role={role}
                index={index}
                onApply={handleApply}
              />
            ))}
          </div>

          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-4 w-max">
              {roles.map((role, index) => (
                <div key={role.id} className="w-[85vw] max-w-sm">
                  <JobCard
                    role={role}
                    index={index}
                    onApply={handleApply}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-cyan-500/30 py-12 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 hover:text-cyan-300 transition-colors duration-300"
            >
              © 2024 Zeex AI. Building the future of artificial intelligence.
            </motion.p>
          </div>
        </motion.footer>
      </div>

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role={selectedRole}
      />
    </div>
  );
}
