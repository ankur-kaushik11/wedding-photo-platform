import { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';

const ConfettiBurst = ({ trigger = false, onComplete }) => {
  const canvasRef = useRef(null);
  const { currentTheme } = useTheme();

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const confettiCount = 100;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;

    const colors = [
      currentTheme.colors.primary,
      currentTheme.colors.secondary,
      currentTheme.colors.accent,
    ];

    // Initialize confetti
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        color: colors[Math.floor(Math.random() * colors.length)],
        dimensions: {
          x: Math.random() * 10 + 5,
          y: Math.random() * 10 + 5,
        },
        position: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        },
        rotation: Math.random() * 360,
        scale: {
          x: 1,
          y: 1,
        },
        velocity: {
          x: (Math.random() - 0.5) * 25,
          y: (Math.random() - 0.5) * 25,
        },
      });
    }

    let animationId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale.x;
        let height = confetto.dimensions.y * confetto.scale.y;

        // Move confetti
        confetto.position.x += confetto.velocity.x;
        confetto.position.y += confetto.velocity.y;
        confetto.velocity.x *= 0.99;
        confetto.velocity.y *= 0.99;
        confetto.velocity.y += gravity;

        // Spin confetti
        confetto.rotation += confetto.velocity.x * 0.05;

        // Draw
        ctx.save();
        ctx.translate(confetto.position.x, confetto.position.y);
        ctx.rotate((confetto.rotation * Math.PI) / 180);
        ctx.fillStyle = confetto.color;
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.restore();

        // Remove if out of bounds
        if (confetto.position.y >= canvas.height) confetti.splice(index, 1);
      });

      if (confetti.length > 0) {
        animationId = requestAnimationFrame(render);
      } else {
        if (onComplete) onComplete();
      }
    };

    render();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [trigger, currentTheme, onComplete]);

  if (!trigger) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 gpu-accelerated"
    />
  );
};

export default ConfettiBurst;
