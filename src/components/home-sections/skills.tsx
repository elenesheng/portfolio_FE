import { SocialIcons } from '@components/social-icons';
import { CircleDecorator } from '@components/circle-decorator';

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-16 md:py-24 bg-amber-100 relative overflow-hidden"
    >
      <CircleDecorator
        position="middle-left"
        color="bg-amber-200"
        size="w-72 h-72"
      />
      <CircleDecorator
        position="top-right"
        color="bg-rose-100"
        size="w-48 h-48"
        delay={1.5}
      />
      <CircleDecorator
        position="bottom-left"
        color="bg-orange-100"
        size="w-56 h-56"
        delay={0.5}
      />

      <div className="container mx-auto relative z-20">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-amber-200 rounded-full text-amber-800 font-mono text-sm mb-4">
            My Skills
          </div>
          <h2 className="text-4xl font-bold text-amber-900 font-serif">
            What I Do Best
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ul className="flex flex-wrap gap-3">
              {[
                { name: 'Front-End Development', color: '#C2410C' },
                { name: 'Full-Stack Development', color: '#EA580C' },
                { name: 'Tech Writing', color: '#F97316' },
                { name: '3D Animation', color: '#FB923C' },
                { name: 'Headless CMS', color: '#FDBA74' },
                { name: 'AI tools in real projects', color: '#D97706' },
                { name: 'Photography', color: '#E11D48' },
              ].map((skill) => (
                <li
                  key={skill.name}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-amber-900 bg-[#fffbeb] px-4 py-2 text-sm font-medium text-amber-950 shadow-[3px_3px_0_0_#78350f] transition hover:-translate-y-0.5 hover:bg-amber-100"
                >
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -right-6 w-full h-full border-4 border-dashed border-amber-700 rounded-lg"></div>
            <div className="relative z-10 bg-amber-50 p-8 rounded-lg border-4 border-amber-200 shadow-xl">
              <div className="space-y-6">
                <RetroIcon />
                <p className="text-amber-800 leading-relaxed">
                  I work full time as a full-stack developer, mostly with React,
                  Next.js, Node.js, and headless CMS like Strapi and Drupal. I
                  still take on occasional freelance projects when the work
                  genuinely interests me.
                </p>
                <p className="text-amber-800 leading-relaxed">
                  While I specialize in front-end and full-stack projects, I’m
                  also exploring creative coding with p5.js and Three.js, and
                  learning more about 2D/3D programming. I’m curious about AI
                  too and where they genuinely speed up work versus where you
                  still need a human to think things through.
                </p>
                <p className="text-amber-800 leading-relaxed">
                  I also love writing articles, it helps me understand topics
                  more deeply, and I hope they’re useful to other developers
                  too. Feel free to check out my articles in the blog section.
                </p>
                <p className="text-amber-800 leading-relaxed">
                  Outside of code, I enjoy{' '}
                  <span className="font-medium text-amber-900">
                    film and street photography
                  </span>
                  . I’ll be sharing some of my photos here, along with short
                  articles on photography when I have something worth writing
                  down.
                </p>
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
        </div>
      </div>
    </section>
  );
}
function RetroIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="32"
        cy="32"
        r="28"
        fill="#FFEDD5"
        stroke="#C2410C"
        strokeWidth="4"
      />
      <path
        d="M20 32C20 25.373 25.373 20 32 20C38.627 20 44 25.373 44 32"
        stroke="#EA580C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M20 32C20 38.627 25.373 44 32 44C38.627 44 44 38.627 44 32"
        stroke="#F97316"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="4" fill="#C2410C" />
    </svg>
  );
}
