import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Users, Shield, Sparkles } from 'lucide-react';

type UserType = 'user' | 'expert' | null;

export default function Hero() {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && userType) {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, userType }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to submit');
        }

        setSubmitted(true);
        
        // Reset after 5 seconds
        setTimeout(() => {
          setEmail('');
          setUserType(null);
          setSubmitted(false);
        }, 5000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
        setTimeout(() => setError(null), 5000);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 sm:px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-[rgba(75,143,216,0.22)] to-[rgba(255,161,120,0.2)] border border-[rgba(11,16,32,0.08)]">
            <span className="text-[11px] sm:text-xs md:text-sm font-extrabold text-[#4B8FD8]">🚀 Launching Soon • Join 500+ on the waitlist</span>
          </div>
          
          <h1 className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] xl:text-[64px] font-[920] tracking-[-0.04em] leading-[1.1] mb-5 sm:mb-6 text-[#0b1020]">
            Start your small business<br />
            <span className="bg-gradient-to-r from-[#4B8FD8] to-[#ffb199] bg-clip-text text-transparent">
              without expensive mistakes
            </span>
          </h1>
          
          <p className="text-[16px] sm:text-[18px] md:text-[20px] text-[rgba(11,16,32,0.64)] mb-10 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
            Book 1:1 video calls with real small business owners who've launched coffee shops, 
            Airbnbs, nail salons, food trucks, and more. Get real advice before you invest.
          </p>
        </motion.div>

        {/* Email Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl sm:rounded-[28px] p-6 sm:p-8 shadow-[0_26px_80px_rgba(11,16,32,0.14)] border border-[rgba(11,16,32,0.08)]">
              <div className="mb-6">
                <label className="block text-left text-[16px] sm:text-[18px] font-[920] tracking-[-0.02em] mb-4 text-[#0b1020]">
                  I'm interested as a...
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <motion.button
                    type="button"
                    onClick={() => setUserType('user')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-5 sm:p-6 rounded-[18px] sm:rounded-[20px] border-2 transition-all ${
                      userType === 'user'
                        ? 'border-[#4B8FD8] bg-gradient-to-r from-[rgba(75,143,216,0.1)] to-[rgba(255,161,120,0.08)] scale-[1.02]'
                        : 'border-[rgba(11,16,32,0.12)] hover:border-[#4B8FD8]'
                    }`}
                  >
                    <Users className="w-7 h-7 sm:w-8 sm:h-8 mb-3 text-[#4B8FD8] mx-auto" />
                    <div className="font-[920] text-[16px] sm:text-[18px] mb-2">Aspiring Entrepreneur</div>
                    <div className="text-xs sm:text-sm text-[rgba(11,16,32,0.64)]">
                      Book sessions with owners before you commit time or money
                    </div>
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => setUserType('expert')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-5 sm:p-6 rounded-[18px] sm:rounded-[20px] border-2 transition-all ${
                      userType === 'expert'
                        ? 'border-[#4B8FD8] bg-gradient-to-r from-[rgba(75,143,216,0.1)] to-[rgba(255,161,120,0.08)] scale-[1.02]'
                        : 'border-[rgba(11,16,32,0.12)] hover:border-[#4B8FD8]'
                    }`}
                  >
                    <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 mb-3 text-[#ffb199] mx-auto" />
                    <div className="font-[920] text-[16px] sm:text-[18px] mb-2">Business Owner</div>
                    <div className="text-xs sm:text-sm text-[rgba(11,16,32,0.64)]">
                      Get paid to share what you've learned building a real business
                    </div>
                  </motion.button>
                </div>
              </div>

              <div className="mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-5 sm:px-6 py-3 sm:py-4 rounded-[14px] sm:rounded-2xl border-2 border-[rgba(11,16,32,0.12)] focus:border-[#4B8FD8] focus:outline-none text-[15px] sm:text-[16px] transition-all"
                />
              </div>

              <motion.button
                type="submit"
                disabled={!email || !userType || loading}
                className="w-full px-6 sm:px-8 py-4 sm:py-5 rounded-2xl sm:rounded-[18px] bg-gradient-to-r from-[#4B8FD8] to-[#ffb199] text-white font-[920] text-[16px] sm:text-[18px] tracking-[-0.02em] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
                whileHover={{ scale: !email || !userType || loading ? 1 : 1.02 }}
                animate={{
                  boxShadow: !email && !userType && !loading ? [
                    '0 0 0 0 rgba(75, 143, 216, 0)',
                    '0 16px 36px rgba(75, 143, 216, 0.3)',
                    '0 0 0 0 rgba(75, 143, 216, 0)',
                  ] : '0 16px 36px rgba(75, 143, 216, 0.3)',
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: 0.2
                  }
                }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut"
                  }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <motion.span
                    animate={{
                      y: [0, -1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut"
                    }}
                  >
                    {loading ? 'Submitting...' : 'Join the Waitlist'}
                  </motion.span>
                  {!loading && (
                    <motion.div
                      animate={{
                        x: [0, 3, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                      }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  )}
                </span>
              </motion.button>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <p className="text-xs sm:text-sm text-[rgba(11,16,32,0.52)] mt-4 flex items-center justify-center gap-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                No spam. You'll only hear from us when early access opens.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-[#78FFC7] to-[#4B8FD8] rounded-3xl sm:rounded-[28px] p-8 sm:p-10 shadow-[0_26px_80px_rgba(11,16,32,0.14)]"
            >
              <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-white mx-auto mb-4" />
              <h3 className="text-[28px] sm:text-[32px] font-[920] tracking-[-0.03em] text-white mb-2">
                All set! You're on the DoneThat waitlist.
              </h3>
              <p className="text-white/90 text-[16px] sm:text-[18px]">
                We'll notify you when we launch!
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-[rgba(11,16,32,0.64)] px-4"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#78FFC7]" />
            <span>Free to join</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#78FFC7]" />
            <span>Early bird perks</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#78FFC7]" />
            <span>Exclusive access</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
