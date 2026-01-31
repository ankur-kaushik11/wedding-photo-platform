import { useEffect, useRef, useContext } from 'react';
import { AnimationContext } from '../../context/AnimationContext';
import { randomInRange } from '../../utils/animationHelpers';
import { useTheme } from '../../hooks/useTheme';

const FloatingPetals = () => {
  const canvasRef = useRef(null);
  const petalsRef = useRef([]);
  const animationRef = useRef(null);
  const { shouldAnimate, getParticleCount } = useContext(AnimationContext);
  const { currentTheme } = useTheme();

  useEffect(() => {
    if (!shouldAnimate) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize petals
    const petalCount = getParticleCount(30);
    petalsRef.current = Array.from({ length: petalCount }, () => ({
      x: randomInRange(0, window.innerWidth),
      y: randomInRange(-100, window.innerHeight),
      size: randomInRange(5, 15),
      speedY: randomInRange(1, 3),
      speedX: randomInRange(-0.5, 0.5),
      rotation: randomInRange(0, 360),
      rotationSpeed: randomInRange(-2, 2),
      opacity: randomInRange(0.3, 0.8),
    }));

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      petalsRef.current.forEach(petal => {
        // Update position
        petal.y += petal.speedY;
        petal.x += petal.speedX;
        petal.rotation += petal.rotationSpeed;

        // Reset if out of bounds
        if (petal.y > window.innerHeight) {
          petal.y = -20;
          petal.x = randomInRange(0, window.innerWidth);
        }
        if (petal.x < -20) petal.x = window.innerWidth;
        if (petal.x > window.innerWidth + 20) petal.x = 0;

        // Draw petal
        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate((petal.rotation * Math.PI) / 180);
        ctx.globalAlpha = petal.opacity;

        // Draw flower petal shape
        ctx.fillStyle = currentTheme.colors.accent;
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size, petal.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shouldAnimate, getParticleCount, currentTheme]);

  if (!shouldAnimate) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 gpu-accelerated"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default FloatingPetals;
