import Hero from '@components/home-sections/hero';
import About from '@components/home-sections/about';
import Skills from '@components/home-sections/skills';
import Blog from '@components/home-sections/blog-preview';
import Contact from '@components/home-sections/contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Hero />
      <About />
      <Skills />
      <Blog />
      <Contact />
    </div>
  );
}
