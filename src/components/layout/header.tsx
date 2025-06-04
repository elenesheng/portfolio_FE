'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { scrollToSection } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSectionClick = (
    id: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (!isHomePage) return;
    e.preventDefault();

    const scrolled = scrollToSection(id);

    if (scrolled) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-amber-50/95 backdrop-blur supports-[backdrop-filter]:bg-amber-50/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="font-bold text-2xl font-serif text-amber-900">ESH</div>
        <div className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-amber-900 hover:text-rose-600 transition-colors"
          >
            Home
          </Link>
          <a
            href={isHomePage ? '#about' : '/#about'}
            onClick={(e) => handleSectionClick('about', e)}
            className="text-amber-900 hover:text-rose-600 transition-colors"
          >
            About
          </a>
          <a
            href={isHomePage ? '#skills' : '/#skills'}
            onClick={(e) => handleSectionClick('skills', e)}
            className="text-amber-900 hover:text-rose-600 transition-colors"
          >
            Skills
          </a>
          <a
            href={isHomePage ? '#blog' : '/#blog'}
            onClick={(e) => handleSectionClick('blog', e)}
            className="text-amber-900 hover:text-rose-600 transition-colors"
          >
            Blog
          </a>
          <a
            href={isHomePage ? '#contact' : '/#contact'}
            onClick={(e) => handleSectionClick('contact', e)}
            className="text-amber-900 hover:text-rose-600 transition-colors"
          >
            Contact
          </a>
        </div>
        <div className="md:hidden">
          <button
            className="p-2 text-amber-900 hover:text-rose-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-amber-50 border-t border-amber-200 py-4 absolute left-0 right-0 shadow-lg">
          <div className="container mx-auto flex flex-col space-y-4 px-4">
            <Link
              href="/"
              className="text-amber-900 hover:text-rose-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href={isHomePage ? '#about' : '/#about'}
              onClick={(e) => handleSectionClick('about', e)}
              className="text-amber-900 hover:text-rose-600 transition-colors py-2"
            >
              About
            </a>
            <a
              href={isHomePage ? '#skills' : '/#skills'}
              onClick={(e) => handleSectionClick('skills', e)}
              className="text-amber-900 hover:text-rose-600 transition-colors py-2"
            >
              Skills
            </a>
            <a
              href={isHomePage ? '#blog' : '/#blog'}
              onClick={(e) => handleSectionClick('blog', e)}
              className="text-amber-900 hover:text-rose-600 transition-colors py-2"
            >
              Blog
            </a>
            <a
              href={isHomePage ? '#contact' : '/#contact'}
              onClick={(e) => handleSectionClick('contact', e)}
              className="text-amber-900 hover:text-rose-600 transition-colors py-2"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
