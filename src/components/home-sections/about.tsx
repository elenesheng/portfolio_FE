import { Button } from '@components/ui/button';
import Image from 'next/image';
import { SocialIcons } from '@components/social-icons';
import { getAboutMe } from '@lib/strapi';
import { renderRichText } from '@lib/utils';

export default async function About() {
  const aboutMe = await getAboutMe();
  console.log(aboutMe);

  return (
    <section id="about" className="py-16 md:py-24 container mx-auto relative">
      <div className="grid md:grid-cols-2 gap-8 items-center relative z-20">
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-full h-full border-4 border-amber-700 rounded-lg"></div>
          <div className="relative z-10 rounded-lg overflow-hidden border-4 border-amber-200 shadow-xl flex justify-center items-center bg-amber-50 p-4">
            <Image
              src="/images/me.jpeg"
              alt="Your Name"
              width={300}
              height={300}
              className=" h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24">
            <RetroShape />
          </div>
        </div>
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 bg-amber-200 rounded-full text-amber-800 font-mono text-sm">
            {aboutMe?.Title || 'About Me'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 font-serif">
            Hi, Im <span className="text-rose-600">Elene</span>
          </h2>
          <div className="prose prose-amber max-w-none bg-amber-50 p-8 rounded-lg shadow-md bg-[url('/images/vintage-paper-texture.png')] bg-repeat blog-content">
            <div
              dangerouslySetInnerHTML={{
                __html: renderRichText(aboutMe?.Content) || '',
              }}
            />

            <div className="space-y-4">
              <div className="pt-4">
                <p className="text-amber-800 font-medium mb-2">
                  <span className="text-rose-600">Connect with me: </span>
                </p>
                <SocialIcons />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RetroShape() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20,20 L80,20 L80,80 L20,80 Z"
        fill="#FDBA74"
        stroke="#C2410C"
        strokeWidth="4"
      />
      <circle
        cx="50"
        cy="50"
        r="20"
        fill="#FB923C"
        stroke="#C2410C"
        strokeWidth="4"
      />
    </svg>
  );
}
