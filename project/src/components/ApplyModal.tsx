import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Role } from '../data/roles';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role | null;
}

export default function ApplyModal({ isOpen, onClose, role }: ApplyModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '0',
  });
  const [uploadType, setUploadType] = useState<'resume' | 'coverLetter' | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({ fullName: '', email: '', phone: '', experience: '0' });
      setUploadType(null);
      setUploadedFile(null);
    }, 3000);
  };

  if (!role) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-gradient-to-br from-[#0f1420]/95 via-[#1a1f2e]/90 to-[#0f1420]/85 border-2 border-cyan-500/40 rounded-3xl shadow-[0_0_80px_rgba(34,211,238,0.4)] max-h-[90vh] overflow-y-auto backdrop-blur-xl"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 w-full rounded-t-3xl"
            />
            <motion.button
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-cyan-300 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <div className="p-8">
              {!isSubmitted ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                  >
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-transparent mb-2">
                      Apply for {role.title}
                    </h2>
                    <p className="text-gray-400">
                      Fill out the form below and we'll get back to you soon.
                    </p>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gradient-to-r from-[#0b0f19] to-[#0f1420] border border-cyan-500/30 hover:border-cyan-400/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email ID *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gradient-to-r from-[#0b0f19] to-[#0f1420] border border-cyan-500/30 hover:border-cyan-400/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gradient-to-r from-[#0b0f19] to-[#0f1420] border border-cyan-500/30 hover:border-cyan-400/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300"
                        placeholder="+91 98765 43210"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Position
                      </label>
                      <input
                        type="text"
                        value={role.title}
                        disabled
                        className="w-full bg-gradient-to-r from-[#0b0f19]/70 to-[#0f1420]/50 border border-cyan-500/20 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Years of Experience *
                      </label>
                      <motion.select
                        whileFocus={{ scale: 1.01 }}
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gradient-to-r from-[#0b0f19] to-[#0f1420] border border-cyan-500/30 hover:border-cyan-400/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300"
                      >
                        <option value="0">0 years</option>
                        <option value="1">1 year</option>
                        <option value="2">2 years</option>
                        <option value="3+">3+ years</option>
                      </motion.select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Upload Document *
                      </label>
                      <div className="space-y-3">
                        <div className="flex gap-4">
                          <motion.label
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <motion.input
                              whileHover={{ scale: 1.2 }}
                              type="checkbox"
                              checked={uploadType === 'resume'}
                              onChange={() => setUploadType(uploadType === 'resume' ? null : 'resume')}
                              className="w-4 h-4 accent-cyan-500 cursor-pointer"
                            />
                            <span className="text-gray-300 hover:text-cyan-300 transition-colors">Resume</span>
                          </motion.label>
                          <motion.label
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <motion.input
                              whileHover={{ scale: 1.2 }}
                              type="checkbox"
                              checked={uploadType === 'coverLetter'}
                              onChange={() => setUploadType(uploadType === 'coverLetter' ? null : 'coverLetter')}
                              className="w-4 h-4 accent-cyan-500 cursor-pointer"
                            />
                            <span className="text-gray-300 hover:text-cyan-300 transition-colors">Cover Letter</span>
                          </motion.label>
                        </div>

                        {uploadType && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            className="relative"
                          >
                            <input
                              type="file"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx"
                              required
                              className="hidden"
                              id="file-upload"
                            />
                            <motion.label
                              whileHover={{ borderColor: 'rgba(34, 211, 238, 0.8)', backgroundColor: 'rgba(34, 211, 238, 0.1)' }}
                              htmlFor="file-upload"
                              className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#0b0f19] to-[#0f1420] border-2 border-dashed border-cyan-500/40 rounded-xl px-4 py-6 text-gray-400 hover:border-cyan-300 transition-all cursor-pointer group"
                            >
                              <motion.div
                                whileHover={{ rotate: 20, scale: 1.2 }}
                              >
                                <Upload className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                              </motion.div>
                              <span className="group-hover:text-cyan-300 transition-colors">
                                {uploadedFile
                                  ? uploadedFile.name
                                  : `Upload ${uploadType === 'resume' ? 'Resume' : 'Cover Letter'}`}
                              </span>
                            </motion.label>
                            {uploadedFile && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm text-cyan-400 mt-2 flex items-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                File uploaded successfully
                              </motion.p>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full relative group bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 hover:from-cyan-400 hover:via-blue-400 hover:to-cyan-500 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_60px_rgba(34,211,238,0.8)] transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
                      <span className="relative">Submit Application</span>
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/20 rounded-full mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-cyan-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Application Submitted!
                  </h3>
                  <p className="text-gray-400 text-lg">
                    Our team will get back to you soon.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
