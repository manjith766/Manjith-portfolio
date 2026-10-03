import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Architecture from './components/Architecture';
import Experience from './components/Experience';
import Education from './components/Education';
import Testimonials from './components/Testimonials';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user } = useAuth();

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Architecture />
        <Experience />
        <Education />
        <Testimonials />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />

      {/* Quick access to edit, update and delete when logged in as admin */}
      {user && (
        <div className="fixed bottom-6 left-6 z-50">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 text-xs font-semibold shadow-xl border border-white/10 dark:border-slate-800 backdrop-blur-md hover:scale-105 transition-all"
            title="Open Admin Dashboard to Edit, Update & Delete"
          >
            <ShieldCheck size={15} className="text-emerald-500" />
            <span>Admin Panel (Edit / Update / Delete)</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </>
  );
}
