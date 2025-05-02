export function RetroCircle({ className = '' }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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

export function RetroSquare({ className = '' }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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

export function RetroTriangle({ className = '' }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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

export function ShapeDecorator({ position = 'top-right' }) {
  let positionClasses = '';
  let animationDelay = 0;

  switch (position) {
    case 'top-left':
      positionClasses = 'absolute top-4 left-4';
      animationDelay = 0;
      break;
    case 'top-right':
      positionClasses = 'absolute top-4 right-4';
      animationDelay = 1;
      break;
    case 'bottom-left':
      positionClasses = 'absolute bottom-4 left-4';
      animationDelay = 2;
      break;
    case 'bottom-right':
      positionClasses = 'absolute bottom-4 right-4';
      animationDelay = 0.5;
      break;
    case 'middle-left':
      positionClasses = 'absolute top-1/3 -left-6';
      animationDelay = 1.5;
      break;
    case 'middle-right':
      positionClasses = 'absolute top-1/3 -right-6';
      animationDelay = 2.5;
      break;
    default:
      positionClasses = 'absolute top-4 right-4';
      animationDelay = 0;
  }

  const getRandomShape = () => {
    const shapes = [RetroCircle, RetroSquare, RetroTriangle];
    const randomIndex = Math.floor(Math.random() * shapes.length);
    const Shape = shapes[randomIndex];
    return <Shape />;
  };

  return (
    <div
      className={`${positionClasses} z-10 animate-bounce`}
      style={{
        animationDuration: `${6 + animationDelay}s`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      {getRandomShape()}
    </div>
  );
}
