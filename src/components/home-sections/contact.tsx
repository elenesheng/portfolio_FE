import { SocialIcons } from '@components/social-icons';
import { CircleDecorator } from '@components/circle-decorator';

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-b from-amber-100 to-amber-200 relative overflow-hidden"
    >
      <CircleDecorator
        position="top-left"
        color="bg-amber-200"
        size="w-56 h-56"
      />
      <CircleDecorator
        position="top-right"
        color="bg-rose-100"
        size="w-48 h-48"
        delay={1}
      />
      <CircleDecorator
        position="bottom-left"
        color="bg-orange-100"
        size="w-64 h-64"
        delay={2}
      />
      <CircleDecorator
        position="bottom-right"
        color="bg-amber-100"
        size="w-72 h-72"
        delay={1.5}
      />

      <div className="container mx-auto relative z-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-block px-4 py-1 bg-amber-300 rounded-full text-amber-800 font-mono text-sm">
            Get In Touch
          </div>
          <h2 className="text-4xl font-bold text-amber-900 font-serif">
            Lets Work Together
          </h2>
          <p className="text-lg text-amber-800">
            Have a project in mind or just want to say hello? Id love to hear
            from you!
          </p>
          <div className="space-y-4">
            <div className="pt-4">
              <p className="text-amber-800 font-medium mb-2">
                <span className="text-rose-600">Connect with me:</span>
              </p>
              <div className="flex justify-center">
                <SocialIcons />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
