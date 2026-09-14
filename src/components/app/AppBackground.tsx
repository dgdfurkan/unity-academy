import { WaveLines, WireCube, WireSphere } from "@/components/art/Doodles";

/**
 * Uygulama ve giriş ekranlarının ortak zemini. Ana sayfadaki dalga çizgileri
 * ve wireframe dekorlar burada da var, böylece giriş yaptıktan sonra başka bir
 * ürüne geçmiş hissi olmuyor.
 *
 * Tamamen dekoratif ve sabit: kaydırmayla hareket etmiyor, dikkat çalmıyor.
 */
export function AppBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <WaveLines className="top-0 h-[460px] text-border" />
      <div className="absolute left-1/2 top-[-18rem] size-[46rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[130px]" />
      <WireSphere className="absolute left-[4%] top-[28%] hidden size-16 text-accent/25 xl:block" />
      <WireCube className="absolute bottom-[14%] right-[5%] hidden size-20 text-accent/20 xl:block" />
    </div>
  );
}
