import { SearchX } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";

export default function NotFound() {
  return (
    <div className="pt-24 pb-16">
      <Container>
        <div className="glass-card mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
            <SearchX className="h-8 w-8" aria-hidden="true" />
          </span>
          <h1 className="text-2xl font-extrabold text-ink">404 — Page Not Found</h1>
          <p className="text-sm text-ink-muted">
            আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button href="/" variant="primary">
              Back to Home
            </Button>
            <Button href="/products" variant="outline">
              Browse Products
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
