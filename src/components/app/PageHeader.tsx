import type { ReactNode } from "react";

/** Uygulama içindeki her ekranın başlığı aynı biçimde kurulur. */
export function PageHeader({
  title,
  lead,
  action,
}: {
  title: string;
  lead?: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-display text-[1.7rem]/[1.15] font-semibold tracking-[-0.02em] text-text sm:text-[2.1rem]/[1.1]">
          {title}
        </h1>
        {lead ? (
          <p className="mt-2 max-w-[34rem] text-[15px]/[1.65] text-text-muted">{lead}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
