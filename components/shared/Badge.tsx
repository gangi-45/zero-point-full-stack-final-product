import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "green" | "amber" | "brand" | "neutral";

const toneClasses: Record<BadgeTone, string> = {
  green:
    "bg-emerald-50 text-emerald-700 border-emerald-200/70 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800",
  amber:
    "bg-amber-50 text-amber-700 border-amber-200/70 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800",
  brand:
    "bg-brand-50 text-brand-700 border-brand-200/70 dark:bg-brand-500/15 dark:text-brand-300 dark:border-brand-800",
  neutral:
    "bg-slate-100 text-slate-700 border-slate-200/70 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
};

type BadgeProps = {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
};

export function Badge({ tone = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
