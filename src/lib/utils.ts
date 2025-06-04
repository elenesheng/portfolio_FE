import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using clsx and then merges Tailwind CSS classes
 * to avoid conflicts using tailwind-merge.
 *
 * @param inputs - Class values to be combined
 * @returns A string of combined and merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: 'smooth',
    });
    return true;
  }
  return false;
};

export function renderRichText(content: string | undefined | null): string {
  if (!content || !Array.isArray(content)) return '';

  return content
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
          const text = block.children
            ?.map((child: any) => child.text || '')
            .join('');
          return `<p>${text}</p>`;

        case 'heading':
          const headingText = block.children
            ?.map((child: any) => child.text || '')
            .join('');
          return `<h${block.level}>${headingText}</h${block.level}>`;

        default:
          return '';
      }
    })
    .join('');
}
