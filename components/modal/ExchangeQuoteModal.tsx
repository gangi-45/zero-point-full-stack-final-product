"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Smartphone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { Modal } from "@/components/modal/Modal";
import { waLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ExchangeModalProps = {
  open: boolean;
  onClose: () => void;
  whatsapp: string;
};

const DEVICES = [
  "iPhone",
  "Samsung Galaxy",
  "Xiaomi / Redmi",
  "OnePlus",
  "Vivo / Oppo",
  "Sony",
  "Laptop",
  "Smartwatch",
  "Headphone",
  "Other",
];

const CONDITIONS = [
  { value: "excellent", label: "অসাধারণ (Excellent)", hint: "পারফেক্ট, হালকা ব্যবহার" },
  { value: "good", label: "ভালো (Good)", hint: "সামান্য স্ক্র্যাচ থাকতে পারে" },
  { value: "fair", label: "মাঝারি (Fair)", hint: "দৃশ্যমান ব্যবহারের চিহ্ন" },
  { value: "broken", label: "ভাঙা / নষ্ট (Broken)", hint: "স্ক্রিন ফাটা বা যন্ত্রগত সমস্যা" },
];

type FormState = {
  device: string;
  condition: string;
  expectedPrice: string;
  name: string;
  phone: string;
};

const initialState: FormState = {
  device: "",
  condition: "",
  expectedPrice: "",
  name: "",
  phone: "",
};

export function ExchangeQuoteModal({
  open,
  onClose,
  whatsapp,
}: ExchangeModalProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState("");

  const totalSteps = 4;

  const canProceed = useMemo(() => {
    if (step === 1) return form.device !== "";
    if (step === 2) return form.condition !== "";
    if (step === 3) {
      const value = Number(form.expectedPrice.replace(/[^\d]/g, ""));
      return value > 0;
    }
    return form.name.trim() !== "" && form.phone.trim().length >= 7;
  }, [step, form]);

  const handleNext = () => {
    if (!canProceed) {
      setError("দয়া করে প্রয়োজনীয় তথ্যগুলো পূরণ করুন।");
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const handleBack = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setForm(initialState);
      setError("");
    }, 200);
  };

  const handleSubmit = () => {
    if (!canProceed) {
      setError("দয়া করে নাম ও ফোন নম্বর সঠিকভাবে দিন।");
      return;
    }
    const price = Number(form.expectedPrice.replace(/[^\d]/g, ""));
    const message = [
      "আসসালামু আলাইকুম, আমি Instant Exchange Quote চাই।",
      `ডিভাইস: ${form.device}`,
      `কন্ডিশন: ${form.condition}`,
      `প্রত্যাশিত দাম: ৳${price.toLocaleString("en-US")}`,
      `নাম: ${form.name}`,
      `ফোন: ${form.phone}`,
    ].join("\n");
    window.open(waLink(whatsapp, message), "_blank", "noopener,noreferrer");
    handleClose();
  };

  const setField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal open={open} onClose={handleClose} title="Instant Exchange Quote">
      <div className="mb-6 flex items-center gap-2" aria-hidden="true">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const active = stepNumber === step;
          const done = stepNumber < step;
          return (
            <div
              key={stepNumber}
              className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200"
            >
              <div
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full bg-brand-500 transition-all duration-300",
                  done ? "w-full" : active ? "w-1/2" : "w-0",
                )}
              />
            </div>
          );
        })}
      </div>

      <p className="mb-5 text-sm font-medium text-ink-muted" aria-live="polite">
        ধাপ {step} / {totalSteps} —{" "}
        {step === 1
          ? "কোন ডিভাইস এক্সচেঞ্জ করতে চান?"
          : step === 2
            ? "ডিভাইসের কন্ডিশন কী?"
            : step === 3
              ? "প্রত্যাশিত দাম কত?"
              : "আপনার যোগাযোগের তথ্য দিন"}
      </p>

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-2xl border border-red-200/70 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
        >
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.18 }}
        >
          {step === 1 && (
            <div
              className="grid grid-cols-2 gap-2.5"
              role="radiogroup"
              aria-label="Select device"
            >
              {DEVICES.map((device) => (
                <button
                  key={device}
                  type="button"
                  role="radio"
                  aria-checked={form.device === device}
                  onClick={() => setField("device", device)}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60",
                    form.device === device
                      ? "border-brand-500 bg-brand-50 text-brand-700 shadow-sm"
                      : "border-slate-200/80 bg-white/70 text-ink hover:border-brand-300",
                  )}
                >
                  <Smartphone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {device}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div role="radiogroup" aria-label="Select condition">
              <div className="flex flex-col gap-2.5">
                {CONDITIONS.map((condition) => (
                  <button
                    key={condition.value}
                    type="button"
                    role="radio"
                    aria-checked={form.condition === condition.value}
                    onClick={() => setField("condition", condition.value)}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60",
                      form.condition === condition.value
                        ? "border-brand-500 bg-brand-50 shadow-sm"
                        : "border-slate-200/80 bg-white/70 hover:border-brand-300",
                    )}
                  >
                    <span>
                      <span className="block text-sm font-semibold text-ink">
                        {condition.label}
                      </span>
                      <span className="block text-xs text-ink-muted">
                        {condition.hint}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        form.condition === condition.value
                          ? "border-brand-500 bg-brand-500 text-white"
                          : "border-slate-300",
                      )}
                      aria-hidden="true"
                    >
                      {form.condition === condition.value && (
                        <Check className="h-3 w-3" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <label htmlFor="expected-price" className="mb-2 block text-sm font-semibold text-ink">
                আপনি কত দাম আশা করছেন?
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-ink-muted">
                  ৳
                </span>
                <input
                  id="expected-price"
                  type="text"
                  inputMode="numeric"
                  placeholder="যেমন: 25000"
                  value={form.expectedPrice}
                  onChange={(event) =>
                    setField("expectedPrice", event.target.value.replace(/[^\d]/g, ""))
                  }
                  className="input-glass pl-10 text-base font-semibold"
                />
              </div>
              <p className="mt-3 text-xs text-ink-muted">
                দাম আলোচনার মাধ্যমে চূড়ান্ত হবে। আমরা যত দ্রুত সম্ভব অফার জানাবো।
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="quote-name" className="mb-2 block text-sm font-semibold text-ink">
                  আপনার নাম
                </label>
                <input
                  id="quote-name"
                  type="text"
                  autoComplete="name"
                  placeholder="আপনার নাম লিখুন"
                  value={form.name}
                  onChange={(event) => setField("name", event.target.value)}
                  className="input-glass"
                />
              </div>
              <div>
                <label htmlFor="quote-phone" className="mb-2 block text-sm font-semibold text-ink">
                  ফোন নম্বর
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="01XXXXXXXXX"
                  value={form.phone}
                  onChange={(event) =>
                    setField("phone", event.target.value.replace(/[^\d+]/g, ""))
                  }
                  className="input-glass"
                />
              </div>
              <p className="flex items-start gap-2 text-xs text-ink-muted">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                সাবমিট করলে আপনার তথ্য সহ একটি WhatsApp বার্তা খুলে যাবে — কোনো ডেটা সেভ হয় না।
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-7 flex items-center justify-between gap-3">
        <Button
          variant="outline"
          size="md"
          onClick={handleBack}
          disabled={step === 1}
          aria-label="Previous step"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Button>

        {step < totalSteps ? (
          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            aria-label="Next step"
          >
            Next
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            aria-label="Submit exchange quote via WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
            Get Quote
          </Button>
        )}
      </div>
    </Modal>
  );
}
