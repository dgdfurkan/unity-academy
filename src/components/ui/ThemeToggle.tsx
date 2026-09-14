"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function ThemeToggle({
  labelToDark,
  labelToLight,
}: {
  labelToDark: string;
  labelToLight: string;
}) {
  // Sunucuda tema bilinmiyor. İlk boyamada ikon yerine boşluk tutuluyor,
  // böylece yanlış ikon görünüp değişmiyor.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Gizli sekmede yazma engellenebilir. Tema yine de bu oturumda değişir.
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? labelToDark : labelToLight}
      className="grid size-11 cursor-pointer place-items-center rounded-md text-text-muted transition-colors duration-(--dur-instant) hover:bg-surface-2 hover:text-text"
    >
      {theme === null ? (
        <span className="size-[18px]" />
      ) : theme === "light" ? (
        <Moon className="size-[18px]" strokeWidth={1.75} />
      ) : (
        <Sun className="size-[18px]" strokeWidth={1.75} />
      )}
    </button>
  );
}
