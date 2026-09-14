"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Sıralı girişte kaçıncı öğe. 60ms aralıkla, en fazla 8 öğe gecikir. */
  index?: number;
  className?: string;
};

/**
 * Görünüme girince bir kez çalışan giriş. Geri kaydırınca tekrarlamaz.
 * Yalnızca transform ve opacity animasyonlanır.
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: 0.42,
        delay: Math.min(index, 7) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </m.div>
  );
}
