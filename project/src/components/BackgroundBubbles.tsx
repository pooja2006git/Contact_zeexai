import FloatingBubble from './FloatingBubble';

export default function BackgroundBubbles() {
  const bubbles = [
    { delay: 0, duration: 25, size: 300, color: 'bg-cyan-500', x: -150, y: 100, blur: true },
    { delay: 2, duration: 30, size: 250, color: 'bg-blue-500', x: 100, y: -100, blur: true },
    { delay: 4, duration: 28, size: 200, color: 'bg-purple-500', x: 600, y: 300, blur: false },
    { delay: 1, duration: 32, size: 280, color: 'bg-cyan-400', x: 1000, y: 150, blur: true },
    { delay: 3, duration: 26, size: 220, color: 'bg-blue-400', x: 200, y: 700, blur: false },
    { delay: 5, duration: 29, size: 260, color: 'bg-cyan-600', x: 800, y: 600, blur: true },
    { delay: 1.5, duration: 27, size: 190, color: 'bg-violet-500', x: -100, y: 500, blur: false },
    { delay: 3.5, duration: 31, size: 240, color: 'bg-blue-600', x: 500, y: -50, blur: true },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble, idx) => (
        <FloatingBubble
          key={idx}
          delay={bubble.delay}
          duration={bubble.duration}
          size={bubble.size}
          color={bubble.color}
          x={bubble.x}
          y={bubble.y}
          blur={bubble.blur}
        />
      ))}
    </div>
  );
}
