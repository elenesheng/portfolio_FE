import Link from 'next/link';
import { Instagram, Linkedin, Music, Github, CameraIcon } from 'lucide-react';

interface SocialIconsProps {
  className?: string;
}

export function SocialIcons({ className = '' }: SocialIconsProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Link
        href="https://www.linkedin.com/in/elene-s-b49433b6/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-amber-700 hover:text-rose-600 transition-colors"
        aria-label="LinkedIn Profile"
      >
        <Linkedin size={24} />
      </Link>

      <Link
        href="https://www.instagram.com/elene_sheng?igsh=NHJuZGFqMG1uYzlm"
        target="_blank"
        rel="noopener noreferrer"
        className="text-amber-700 hover:text-rose-600 transition-colors"
        aria-label="Instagram Profile"
      >
        <Instagram size={24} />
      </Link>

      <Link
        href="https://github.com/elenesheng"
        target="_blank"
        rel="noopener noreferrer"
        className="text-amber-700 hover:text-rose-600 transition-colors"
        aria-label="GitHub Profile"
      >
        <Github size={24} />
      </Link>

      <Link
        href="https://open.spotify.com/user/31xwtun3fgzsbgxkbwg5sfk5qo7e?si=uQMw9waeSyq1BfVoZzUyOA"
        target="_blank"
        rel="noopener noreferrer"
        className="text-amber-700 hover:text-rose-600 transition-colors"
        aria-label="Spotify Profile"
      >
        <Music size={24} />
      </Link>

      <Link
        href="https://www.lomography.com/homes/elenesh"
        target="_blank"
        rel="noopener noreferrer"
        className="text-amber-700 hover:text-rose-600 transition-colors"
        aria-label="YouTube Profile"
      >
        <CameraIcon />
      </Link>
    </div>
  );
}
