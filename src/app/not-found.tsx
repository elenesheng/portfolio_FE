import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto py-24 px-4 text-center">
      <h1 className="text-6xl font-bold text-amber-900 mb-4">404</h1>
      <p className="text-2xl text-amber-800 mb-8">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 text-amber-50 bg-amber-700 hover:bg-amber-800 rounded-md transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
