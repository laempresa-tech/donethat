import { motion } from 'framer-motion';
import { Users, Star, MessageSquare } from 'lucide-react';

export default function SocialProofBar() {
  const stats = [
    {
      icon: Users,
      stat: '500+',
      label: 'Early access signups',
      color: '#4B8FD8'
    },
    {
      icon: Star,
      stat: '20+',
      label: 'Business categories represented',
      color: '#ffb199'
    },
    {
      icon: MessageSquare,
      stat: '1:1',
      label: 'Private video sessions',
      color: '#78FFC7'
    }
  ];

  return (
    <section className="py-8 sm:py-12 px-6 sm:px-8 lg:px-12 xl:px-20 2xl:px-24 bg-linear-to-r from-[rgba(75,143,216,0.04)] to-[rgba(255,161,120,0.04)] overflow-hidden">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <motion.div 
                className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-[14px] flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)` }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <item.icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: item.color }} />
              </motion.div>
              <motion.div 
                className="font-[920] text-[24px] sm:text-[28px] md:text-[32px] text-[#0b1020] mb-1"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
              >
                {item.stat}
              </motion.div>
              <div className="text-[11px] sm:text-xs md:text-sm text-[rgba(11,16,32,0.64)] px-2">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
