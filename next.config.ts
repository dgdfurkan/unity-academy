import type { NextConfig } from "next";

// GitHub Pages proje sitesi alt yolda servis edilir. Özel alan adına geçildiğinde
// bu değişken boş bırakılır ve site kökten çalışır.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  typedRoutes: true,
};

export default nextConfig;
