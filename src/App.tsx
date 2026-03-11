import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import SocialProofBar from './components/SocialProofBar';
import BenefitsSection from './components/BenefitsSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';

function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <SocialProofBar />
      <BenefitsSection />
      <FinalCTA />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-linear-to-br from-[#f6f7fb] to-white overflow-x-hidden">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
