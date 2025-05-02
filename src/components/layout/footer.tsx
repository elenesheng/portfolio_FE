import Link from 'next/link';
import { Github, Linkedin, Instagram, Music } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 text-center sm:text-left">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-serif text-amber-100">
              Elene Shengelia
            </h3>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-bold font-serif text-amber-100">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-amber-200 hover:text-amber-50 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-amber-200 hover:text-amber-50 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold font-serif text-amber-100">
              Connect
            </h4>
            <div className="flex space-x-6 justify-center sm:justify-start">
              <Link
                href="https://github.com/elenesheng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-200 hover:text-amber-50 transition-colors"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/elene-s-b49433b6/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-200 hover:text-amber-50 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://www.instagram.com/elene_sheng?igsh=NHJuZGFqMG1uYzlm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-200 hover:text-amber-50 transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://open.spotify.com/user/31xwtun3fgzsbgxkbwg5sfk5qo7e?si=uQMw9waeSyq1BfVoZzUyOA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-200 hover:text-amber-50 transition-colors"
              >
                <Music className="h-6 w-6" />
                <span className="sr-only">Spotify</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-300">
          <p>
            © {new Date().getFullYear()} Elene Shengelia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
