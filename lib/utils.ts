export function formatPrice(price: number): string {
  const value = Number(price);
  if (!Number.isFinite(value)) return "৳0";
  return `৳${value.toLocaleString("en-US")}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
