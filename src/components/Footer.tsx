export default function Footer() {
  return (
    <footer className="py-8 sm:py-10 md:py-12 px-6 sm:px-8 lg:px-12 xl:px-20 2xl:px-24 border-t border-[rgba(11,16,32,0.08)] bg-white">
      <div className="w-full mx-auto text-center">
        <div className="text-[24px] sm:text-[28px] md:text-[32px] font-[920] tracking-[-0.03em] bg-linear-to-r from-[#4B8FD8] to-[#ffb199] bg-clip-text text-transparent mb-3 sm:mb-4">
          DoneThat
        </div>
        <p className="text-[12px] sm:text-[13px] md:text-sm text-[rgba(11,16,32,0.52)] mb-3 sm:mb-4 px-4">
          Learn from small business owners who've been there, done that.
        </p>
        <p className="text-[10px] sm:text-[11px] md:text-xs text-[rgba(11,16,32,0.4)]">
          © 2026 DoneThat. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
