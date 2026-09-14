"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Motion'ın tamamı yerine yalnızca kullandığımız özellikler paketlenir.
 * Çekirdek yaklaşık 5KB kalıyor, tam paket 34KB.
 * Bu sağlayıcının altında `motion.div` değil `m.div` kullanılır.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
