"use client";

import { Info, TriangleAlert } from "lucide-react";
import { Sim } from "@/components/sim";
import type { TeachBlock } from "@/content/types";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

/** Anlatım adımının içeriği. Metin, liste, tablo, kod ve uyarı kutusu. */
export function TeachBlocks({ blocks, locale }: { blocks: TeachBlock[]; locale: Locale }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "text":
            return (
              <p key={i} className="max-w-[42rem] text-[15.5px]/[1.75] text-text">
                {block.text[locale]}
              </p>
            );

          case "list":
            return (
              <ul key={i} className="flex max-w-[42rem] flex-col gap-3">
                {block.items.map((item) => (
                  <li key={item[locale]} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="text-[15.5px]/[1.7] text-text">{item[locale]}</span>
                  </li>
                ))}
              </ul>
            );

          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-2xl ring-1 ring-border">
                <table className="w-full border-collapse text-left text-[14px]">
                  <thead>
                    <tr className="bg-surface-2">
                      {block.head.map((cell) => (
                        <th
                          key={cell[locale]}
                          className="px-4 py-3 font-semibold text-text first:rounded-tl-2xl last:rounded-tr-2xl"
                        >
                          {cell[locale]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="border-t border-border bg-surface">
                        {row.map((cell) => (
                          <td key={cell[locale]} className="px-4 py-3 align-top text-text-muted">
                            {cell[locale]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "code":
            return (
              <figure key={i} className="overflow-hidden rounded-2xl bg-ink">
                <pre className="overflow-x-auto p-4 font-mono text-[13px]/[1.75] text-on-ink">
                  <code>{block.code}</code>
                </pre>
                {block.caption ? (
                  <figcaption className="border-t border-ink-border px-4 py-2.5 text-[13px] text-on-ink-muted">
                    {block.caption[locale]}
                  </figcaption>
                ) : null}
              </figure>
            );

          case "sim":
            return (
              <figure key={i} className="max-w-[46rem]">
                <Sim variant={block.variant} locale={locale} />
                {block.caption ? (
                  <figcaption className="mt-2.5 text-[13px] text-text-subtle">
                    {block.caption[locale]}
                  </figcaption>
                ) : null}
              </figure>
            );

          case "callout": {
            const Icon = block.tone === "warning" ? TriangleAlert : Info;
            return (
              <aside
                key={i}
                className={cn(
                  "flex max-w-[42rem] gap-3 rounded-2xl p-4",
                  block.tone === "warning" ? "bg-warning-surface" : "bg-info-surface",
                )}
              >
                <Icon
                  className={cn(
                    "mt-0.5 size-[18px] shrink-0",
                    block.tone === "warning" ? "text-warning" : "text-info",
                  )}
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
                <p className="text-[14.5px]/[1.65] text-text">{block.text[locale]}</p>
              </aside>
            );
          }
        }
      })}
    </div>
  );
}
