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
            <div className="space-y-8">
              {[
                { name: 'Front-End Development', level: 100, color: '#C2410C' },
                { name: 'Tech Writing', level: 100, color: '#EA580C' },
                {
                  name: '3D Animation (just started)',
                  level: 75,
                  color: '#FB923C',
                },
                { name: 'Headless CMS', level: 100, color: '#FDBA74' },
              ].map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-amber-900">
                      {skill.name}
                    </span>
                    <span className="text-amber-700">{skill.level}%</span>
                  </div>
                  <div className="h-3 w-full bg-amber-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -right-6 w-full h-full border-4 border-dashed border-amber-700 rounded-lg"></div>
            <div className="relative z-10 bg-amber-50 p-8 rounded-lg border-4 border-amber-200 shadow-xl">
              <div className="space-y-6">
                <RetroIcon />
                <h3 className="text-2xl font-bold text-amber-900 font-serif">
                  My Approach
                </h3>
                <p className="text-amber-800 leading-relaxed">
                  I love collaborating with teams, but I'm also highly effective
                  working as a freelancer. I specialize in building full-stack
                  web apps for businesses, from simple websites to complex
                  platforms. Using modern technologies like Next.js paired with
                  headless CMSs such as Strapi, Drupal, or WordPress, I create
                  high-quality, user-friendly solutions that cater to your
                  needs.
                </p>
                <p className="text-amber-800 leading-relaxed">
                  Do you run a small or medium-sized business and want a
                  top-tier web app with clear communication and ongoing support?
                  Let's work together to bring your vision to life.
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
