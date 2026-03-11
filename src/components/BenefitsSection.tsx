import { motion } from 'framer-motion';
import { Users, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BenefitsSection() {
  const aspiringBenefits = [
    'Learn real startup costs and timelines',
    'Understand permits, licenses, and regulations',
    'Get honest advice on what works (and what doesn\'t)',
    'Make informed decisions before investing',
    'Connect with owners in your specific industry'
  ];

  const ownerBenefits = [
    'Set your own hourly rate and schedule',
    'Help aspiring entrepreneurs avoid your mistakes',
    'Give back to your business community',
    'Build your reputation as an expert',
    'Generate additional revenue from your knowledge'
  ];

  return (
    <section className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 xl:px-20 2xl:px-24 overflow-hidden">
      <div className="w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* For Aspiring Entrepreneurs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -5 }}
            className="bg-linear-to-br from-[#4B8FD8] to-[#3d7ab8] rounded-[20px] sm:rounded-3xl md:rounded-[28px] p-6 sm:p-8 md:p-10 text-white shadow-[0_26px_80px_rgba(75,143,216,0.3)] hover:shadow-[0_32px_96px_rgba(75,143,216,0.4)] transition-all duration-300"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Users className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-5 md:mb-6 opacity-90" />
            </motion.div>
            <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-[920] tracking-[-0.03em] mb-3 sm:mb-4">
              For Aspiring Small Business Owners
            </h3>
            <p className="text-white/90 mb-6 sm:mb-8 text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed">
              Get practical advice from owners who've launched the exact business you're dreaming about
            </p>
            <ul className="space-y-3 sm:space-y-4">
              {aspiringBenefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                  <span className="text-white/95 text-[13px] sm:text-[14px] md:text-[16px]">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* For Business Owners */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -5 }}
            className="bg-linear-to-br from-[#ffb199] to-[#ffcab8] rounded-[20px] sm:rounded-3xl md:rounded-[28px] p-6 sm:p-8 md:p-10 text-white shadow-[0_26px_80px_rgba(255,161,120,0.3)] hover:shadow-[0_32px_96px_rgba(255,161,120,0.4)] transition-all duration-300"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-5 md:mb-6 opacity-90" />
            </motion.div>
            <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-[920] tracking-[-0.03em] mb-3 sm:mb-4">
              For Small Business Owners
            </h3>
            <p className="text-white/90 mb-6 sm:mb-8 text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed">
              Share your entrepreneurial journey and help others succeed while earning extra income
            </p>
            <ul className="space-y-3 sm:space-y-4">
              {ownerBenefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                  <span className="text-white/95 text-[13px] sm:text-[14px] md:text-[16px]">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Verification Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-10 sm:mt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full bg-linear-to-r from-[rgba(75,143,216,0.15)] to-[rgba(255,161,120,0.12)] border border-[rgba(11,16,32,0.08)]">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#4B8FD8]" />
            <span className="text-[11px] sm:text-xs md:text-sm font-extrabold text-[#0b1020]">
              All experts are verified business owners
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
