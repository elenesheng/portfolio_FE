import { Button } from '@components/ui/button';

export default function Hero() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-amber-100 to-amber-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-rose-100 mix-blend-multiply animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-amber-200 mix-blend-multiply animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-orange-100 mix-blend-multiply animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>

        <div
          className="absolute top-20 left-20 animate-bounce"
          style={{ animationDuration: '6s' }}
        >
          <RetroCircle />
        </div>
        <div
          className="absolute bottom-20 right-20 animate-bounce"
          style={{ animationDuration: '8s', animationDelay: '1s' }}
        >
          <RetroSquare />
        </div>
        <div
          className="absolute top-1/2 right-1/4 animate-bounce"
          style={{ animationDuration: '7s', animationDelay: '0.5s' }}
        >
          <RetroTriangle />
        </div>
      </div>

      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-amber-900 font-serif">
            Elene <span className="text-rose-600">Shengelia</span>
          </h1>
          <p className="text-xl md:text-2xl text-amber-800 max-w-2xl mx-auto font-serif">
            Software Developer & Tech writer
          </p>

          <div className="pt-8 flex flex-wrap gap-4 justify-center">
            <Button className="bg-rose-600 hover:bg-rose-700 text-amber-50 px-6 py-3 rounded-md">
              Contact Me
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-amber-50 to-transparent"></div>
    </section>
  );
}

function RetroCircle() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="40"
        cy="40"
        r="36"
        fill="#FFEDD5"
        stroke="#C2410C"
        strokeWidth="4"
        strokeDasharray="12 6"
      />
      <circle
        cx="40"
        cy="40"
        r="20"
        fill="#FB923C"
        stroke="#C2410C"
        strokeWidth="2"
      />
    </svg>
  );
}

function RetroSquare() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="10"
        y="10"
        width="60"
        height="60"
        fill="#FED7AA"
        stroke="#C2410C"
        strokeWidth="4"
      />
      <rect
        x="25"
        y="25"
        width="30"
        height="30"
        fill="#FB923C"
        stroke="#C2410C"
        strokeWidth="2"
      />
    </svg>
  );
}

function RetroTriangle() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 10L70 65H10L40 10Z"
        fill="#FED7AA"
        stroke="#C2410C"
        strokeWidth="4"
      />
      <path
        d="M40 30L55 60H25L40 30Z"
        fill="#FB923C"
        stroke="#C2410C"
        strokeWidth="2"
      />
    </svg>
  );
}
