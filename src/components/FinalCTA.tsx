import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#4B8FD8] to-[#ffb199] rounded-3xl sm:rounded-[28px] md:rounded-4xl p-8 sm:p-10 md:p-12 lg:p-14 shadow-[0_26px_80px_rgba(11,16,32,0.2)]"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] font-[920] tracking-[-0.04em] mb-3 sm:mb-4 text-white"
        >
          Ready to get started?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-[16px] sm:text-[18px] md:text-[20px] text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
       
          Join our waitlist for exclusive early access and special launch perks
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 sm:px-10 py-4 sm:py-5 rounded-2xl sm:rounded-[18px] bg-white text-[#4B8FD8] font-[920] text-[16px] sm:text-[18px] tracking-[-0.02em] hover:shadow-[0_16px_36px_rgba(255,255,255,0.5)] transition-all inline-flex items-center gap-2"
          >
            Join the Waitlist
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-5 sm:mt-6 text-white/70 text-[12px] sm:text-[13px] md:text-sm"
        >
          No credit card required • Cancel anytime
        </motion.p>
      </motion.div>
    </section>
  );
}
