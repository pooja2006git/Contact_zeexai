import { motion } from 'framer-motion';
import { useState } from 'react';

interface FloatingBubbleProps {
  delay: number;
  duration: number;
  size: number;
  color: string;
  x: number;
  y: number;
  blur: boolean;
}

export default function FloatingBubble({
  delay,
  duration,
  size,
  color,
  x,
  y,
  blur
}: FloatingBubbleProps) {
  const [isHovered, setIsHovered] = useState(false);

  const randomOffset = Math.random() * 200 - 100;
  const randomOffsetY = Math.random() * 200 - 100;

  return (
    <motion.div
      initial={{ x, y, opacity: 0 }}
      animate={{
        x: [x, x + randomOffset, x - randomOffset / 2, x],
        y: [y, y + randomOffsetY, y - randomOffsetY / 2, y],
        opacity: 1,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`absolute pointer-events-auto cursor-pointer ${blur ? 'blur-[80px]' : 'blur-[60px]'} transition-transform duration-300`}
      style={{
        width: size,
        height: size,
        transform: isHovered ? 'scale(1.3)' : 'scale(1)',
      }}
    >
      <motion.div
        animate={{
          opacity: isHovered ? 0.9 : 0.5,
          boxShadow: isHovered
            ? `0 0 80px currentColor`
            : `0 0 40px currentColor`,
        }}
        transition={{ duration: 0.3 }}
        className={`w-full h-full rounded-full ${color}`}
      />
    </motion.div>
  );
}
