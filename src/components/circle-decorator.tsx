export interface CircleDecoratorProps {
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'middle-left'
    | 'middle-right';
  color?: string;
  size?: string;
  delay?: number;
}

export function CircleDecorator({
  position = 'top-right',
  color = 'bg-rose-100',
  size = 'w-48 h-48',
  delay = 0,
}: CircleDecoratorProps) {
  let positionClasses = '';

  switch (position) {
    case 'top-left':
      positionClasses = 'absolute top-10 left-10';
      break;
    case 'top-right':
      positionClasses = 'absolute top-10 right-10';
      break;
    case 'bottom-left':
      positionClasses = 'absolute bottom-10 left-10';
      break;
    case 'bottom-right':
      positionClasses = 'absolute bottom-10 right-10';
      break;
    case 'middle-left':
      positionClasses = 'absolute top-1/3 -left-20';
      break;
    case 'middle-right':
      positionClasses = 'absolute top-1/3 -right-20';
      break;
    default:
      positionClasses = 'absolute top-10 right-10';
  }

  return (
    <div
      className={`${positionClasses} ${size} rounded-full ${color} mix-blend-multiply animate-pulse z-0`}
      style={{ animationDelay: `${delay}s` }}
    ></div>
  );
}
