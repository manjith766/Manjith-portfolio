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

// The public, visitor-facing site. All content (bio, skills, projects,
// experience, education, certifications, social links) is read live from
// Firestore (see src/hooks/useFirestoreCollection.ts,
// src/hooks/useSiteData.ts) with a bundled fallback in src/data/seed.ts,
// so the site is never blank even before you've added anything in /admin.
// ThemeProvider and routing are set up once at the root in src/main.tsx.
export default function App() {
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
    </>
  );
}
