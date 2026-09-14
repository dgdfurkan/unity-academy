import { RootShell } from "@/components/layout/RootShell";
import { localeMetadata, sharedViewport } from "../metadata";
import "../globals.css";

export const metadata = localeMetadata("en");
export const viewport = sharedViewport;

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
