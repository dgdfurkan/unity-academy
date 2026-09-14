import { RootShell } from "@/components/layout/RootShell";
import { localeMetadata, sharedViewport } from "../metadata";
import "../globals.css";

export const metadata = localeMetadata("tr");
export const viewport = sharedViewport;

export default function TrLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="tr">{children}</RootShell>;
}
