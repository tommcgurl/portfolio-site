"use client";

import { useEffect, useRef } from "react";

const ORANGE = "#f97316";
const PINK = "#ec4899";
const MAX_OPACITY = 0.6;
const FADE_IN_RATE = 0.008;
const FADE_OUT_RATE = 0.005;

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
  phase: "in" | "out";
}

export interface ParticleBackgroundProps {
  count?: number;
  className?: string;
}

function randomSize() {
  return Math.random() < 0.5 ? 2 : 3;
}

function randomSpeed() {
  return 0.4 + Math.random() * 0.5;
}

function randomColor() {
  return Math.random() < 2 / 3 ? ORANGE : PINK;
}

function spawnParticle(
  width: number,
  height: number,
  scattered = false
): Particle {
  return {
    x: Math.random() * width,
    y: scattered ? Math.random() * height : height + 4,
    size: randomSize(),
    speed: randomSpeed(),
    color: randomColor(),
    opacity: scattered ? Math.random() * MAX_OPACITY : 0,
    phase: scattered && Math.random() < 0.5 ? "out" : "in",
  };
}

export default function ParticleBackground({
  count = 30,
  className,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    function setSize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);
    }

    function resetParticle(p: Particle) {
      p.x = Math.random() * width;
      p.y = height + 4;
      p.size = randomSize();
      p.speed = randomSpeed();
      p.color = randomColor();
      p.opacity = 0;
      p.phase = "in";
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y -= p.speed;

        if (p.phase === "in") {
          p.opacity += FADE_IN_RATE;
          if (p.opacity >= MAX_OPACITY) {
            p.opacity = MAX_OPACITY;
            p.phase = "out";
          }
        } else {
          p.opacity -= FADE_OUT_RATE;
          if (p.opacity <= 0 || p.y < 0) {
            resetParticle(p);
            continue;
          }
        }

        ctx!.globalAlpha = p.opacity;
        ctx!.fillStyle = p.color;
        ctx!.fillRect(p.x, p.y, p.size, p.size);
      }

      ctx!.globalAlpha = 1;
      rafId = requestAnimationFrame(tick);
    }

    setSize();
    if (width > 0 && height > 0) {
      particles = Array.from({ length: count }, () =>
        spawnParticle(width, height, true)
      );
    } else {
      particles = [];
    }

    const ro = new ResizeObserver(() => {
      const prevWidth = width;
      const prevHeight = height;
      setSize();
      if (particles.length === 0 && width > 0 && height > 0) {
        particles = Array.from({ length: count }, () =>
          spawnParticle(width, height, true)
        );
        return;
      }
      const xRatio = prevWidth > 0 ? width / prevWidth : 1;
      const yRatio = prevHeight > 0 ? height / prevHeight : 1;
      for (const p of particles) {
        p.x *= xRatio;
        p.y *= yRatio;
      }
    });

    ro.observe(canvas);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className ?? ""}`}
      style={{ zIndex: 0 }}
    />
  );
}
