'use client';

import { Button } from '@components/ui/button';
import HeroVintageBackground from '@components/hero-vintage-background';
import { scrollToSection } from '@/lib/utils';

export default function Hero() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-amber-100 to-amber-50 overflow-hidden">
      <HeroVintageBackground />

      {/* Static gradient circles */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-rose-100 mix-blend-multiply animate-pulse opacity-60"></div>
        <div
          className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-amber-200 mix-blend-multiply animate-pulse opacity-60"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-orange-100 mix-blend-multiply animate-pulse opacity-60"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-amber-900 font-serif">
            Elene <span className="text-rose-600">Shengelia</span>
          </h1>
          <p className="text-xl md:text-2xl text-amber-800 max-w-2xl mx-auto font-serif">
            Software Developer & Tech writer
          </p>

          <div className="pt-8 flex flex-wrap gap-4 justify-center">
            <Button
              className="bg-rose-600 hover:bg-rose-700 text-amber-50 px-6 py-3 rounded-md"
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-amber-50 to-transparent"
        style={{ zIndex: 3 }}
      ></div>
    </section>
  );
}
