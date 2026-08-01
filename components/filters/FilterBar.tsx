import { cn } from "@/lib/utils";

export type CategoryFilterValue = "all" | "phone" | "accessory" | "laptop";
export type ConditionFilterValue = "all" | "new" | "used";

const CATEGORIES: { value: CategoryFilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "phone", label: "📱 Phone" },
  { value: "laptop", label: "💻 Laptop" },
  { value: "accessory", label: "🎧 Accessories" },
];

const CONDITIONS: { value: ConditionFilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "used", label: "Used" },
];

type FilterBarProps = {
  category: CategoryFilterValue;
  onCategoryChange: (value: CategoryFilterValue) => void;
  condition: ConditionFilterValue;
  onConditionChange: (value: ConditionFilterValue) => void;
};

export function FilterBar({
  category,
  onCategoryChange,
  condition,
  onConditionChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-sm font-bold text-ink">Category</span>
        <div className="flex gap-2" role="group" aria-label="Filter by category">
          {CATEGORIES.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => onCategoryChange(item.value)}
              aria-pressed={category === item.value}
              className={cn(
                "shrink-0 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60",
                category === item.value
                  ? "border-brand-500 bg-brand-500 text-white shadow-glow"
                  : "border-slate-200/80 bg-white/70 text-ink-muted hover:border-brand-300 hover:text-ink dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-brand-400",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-sm font-bold text-ink">Condition</span>
        <div className="flex gap-2" role="group" aria-label="Filter by condition">
          {CONDITIONS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => onConditionChange(item.value)}
              aria-pressed={condition === item.value}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60",
                condition === item.value
                  ? item.value === "new"
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : item.value === "used"
                      ? "border-amber-500 bg-amber-500 text-white"
                      : "border-brand-500 bg-brand-500 text-white"
                  : "border-slate-200/80 bg-white/70 text-ink-muted hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/70",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
