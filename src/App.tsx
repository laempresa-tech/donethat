import Header from './components/Header';
import Hero from './components/Hero';
import SocialProofBar from './components/SocialProofBar';
import BenefitsSection from './components/BenefitsSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#f6f7fb] to-white overflow-x-hidden">
      <Header />
      <Hero />
      <SocialProofBar />
      <BenefitsSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
