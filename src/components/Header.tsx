import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[rgba(11,16,32,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-[920] tracking-[-0.03em] bg-linear-to-r from-[#4B8FD8] to-[#ffb199] bg-clip-text text-transparent"
        >
          DoneThat
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 sm:gap-3"
        >
          <div className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-[#4B8FD8] to-[#ffb199] text-white text-[10px] sm:text-xs md:text-sm font-extrabold">
            <Sparkles className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-0.5 sm:mr-1 -mt-0.5" />
            <span className="hidden xs:inline">Early Access</span>
            <span className="xs:hidden">Early</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
