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
