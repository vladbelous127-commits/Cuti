"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Clock,
  TrendingUp,
  Wallet,
  RotateCcw,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Question model                                                     */
/* ------------------------------------------------------------------ */

type Choice = { label: string; solutions: string[] };
type Question = {
  id: string;
  title: string;
  subtitle: string;
  multi?: boolean;
  choices: Choice[];
};

const questions: Question[] = [
  {
    id: "industry",
    title: "What kind of business do you run?",
    subtitle: "This helps us tailor the recommendations to your sector.",
    choices: [
      { label: "Retail / E-commerce", solutions: ["AI Customer Support", "WhatsApp Automation", "Sales Automation"] },
      { label: "Healthcare / Clinic", solutions: ["Appointment Booking", "AI Customer Support", "Document AI"] },
      { label: "Professional Services", solutions: ["Proposal Generator", "Email Automation", "CRM Automation"] },
      { label: "Education / Training", solutions: ["Internal Company Assistant", "Content Generator", "Knowledge Base"] },
      { label: "Other", solutions: ["AI Consulting", "Business AI Strategy"] },
    ],
  },
  {
    id: "bottleneck",
    title: "Where do you lose the most time?",
    subtitle: "Pick everything that applies.",
    multi: true,
    choices: [
      { label: "Answering the same customer questions", solutions: ["AI Chatbots", "AI Customer Support", "WhatsApp Automation"] },
      { label: "Booking & scheduling", solutions: ["Appointment Booking"] },
      { label: "Following up with leads", solutions: ["CRM Automation", "Sales Automation", "Email Automation"] },
      { label: "Creating content & social posts", solutions: ["Content Generator", "Social Media AI"] },
      { label: "Paperwork & documents", solutions: ["Document AI", "Invoice Automation"] },
      { label: "Answering internal team questions", solutions: ["Internal Company Assistant", "Knowledge Base"] },
    ],
  },
  {
    id: "size",
    title: "How big is your team?",
    subtitle: "Automation impact scales with team size.",
    choices: [
      { label: "Just me / solo", solutions: [] },
      { label: "2–10 people", solutions: [] },
      { label: "11–50 people", solutions: ["HR Automation"] },
      { label: "50+ people", solutions: ["HR Automation", "Internal Company Assistant"] },
    ],
  },
  {
    id: "goal",
    title: "What matters most right now?",
    subtitle: "We'll prioritize your report around this goal.",
    choices: [
      { label: "Save time", solutions: ["Workflow Automation"] },
      { label: "Increase sales", solutions: ["Sales Automation", "Marketing Automation"] },
      { label: "Improve customer experience", solutions: ["AI Customer Support", "Voice AI"] },
      { label: "Cut costs", solutions: ["AI Automation"] },
    ],
  },
];

type Lead = { name: string; email: string; business: string };

export function DiscoveryForm() {
  const [step, setStep] = useState(0); // 0..questions.length-1, then lead, then report
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [lead, setLead] = useState<Lead>({ name: "", email: "", business: "" });
  const [submitted, setSubmitted] = useState(false);

  const total = questions.length;
  const inQuestions = step < total;
  const inLead = step === total;
  const inReport = step === total + 1;
  const progress = Math.min(step / (total + 1), 1) * 100;

  const current = questions[step];

  function toggle(qid: string, label: string, multi?: boolean) {
    setAnswers((prev) => {
      const existing = prev[qid] ?? [];
      if (multi) {
        return {
          ...prev,
          [qid]: existing.includes(label)
            ? existing.filter((l) => l !== label)
            : [...existing, label],
        };
      }
      return { ...prev, [qid]: [label] };
    });
    if (!multi) {
      // auto-advance on single select
      setTimeout(() => setStep((s) => s + 1), 220);
    }
  }

  const recommendations = useMemo(() => {
    const counts = new Map<string, number>();
    for (const q of questions) {
      const selected = answers[q.id] ?? [];
      for (const label of selected) {
        const choice = q.choices.find((c) => c.label === label);
        choice?.solutions.forEach((sol) =>
          counts.set(sol, (counts.get(sol) ?? 0) + 1)
        );
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([sol]) => sol)
      .slice(0, 5);
  }, [answers]);

  const answeredCurrent = (answers[current?.id]?.length ?? 0) > 0;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      {!inReport && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-muted-soft">
            <span>
              {inLead ? "Almost there" : `Question ${step + 1} of ${total}`}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-gold"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      )}

      <div className="card min-h-[360px] p-6 md:p-8">
        <AnimatePresence mode="wait">
          {/* Questions */}
          {inQuestions && (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-white md:text-2xl">
                {current.title}
              </h2>
              <p className="mt-1.5 text-sm text-muted">{current.subtitle}</p>

              <div className="mt-6 space-y-3">
                {current.choices.map((c) => {
                  const selected = (answers[current.id] ?? []).includes(c.label);
                  return (
                    <button
                      key={c.label}
                      onClick={() => toggle(current.id, c.label, current.multi)}
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm transition ${
                        selected
                          ? "border-brand-500/50 bg-brand-500/10 text-white"
                          : "border-white/10 bg-white/[0.02] text-muted hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {c.label}
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition ${
                          selected
                            ? "border-brand-400 bg-brand-500 text-ink-950"
                            : "border-white/20"
                        }`}
                      >
                        {selected && <Check className="h-3 w-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-white disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                {current.multi && (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!answeredCurrent}
                    className="btn-primary !py-2.5 disabled:opacity-40"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Lead capture */}
          {inLead && (
            <motion.div
              key="lead"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 text-brand-300">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Your report is ready
                </span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-white md:text-2xl">
                Where should we send it?
              </h2>
              <p className="mt-1.5 text-sm text-muted">
                Get your personalized AI report and a free follow-up
                consultation.
              </p>

              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                  setStep((s) => s + 1);
                }}
              >
                <Field
                  label="Full name"
                  value={lead.name}
                  onChange={(v) => setLead({ ...lead, name: v })}
                  placeholder="Your name"
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={lead.email}
                  onChange={(v) => setLead({ ...lead, email: v })}
                  placeholder="you@company.com"
                  required
                />
                <Field
                  label="Business name"
                  value={lead.business}
                  onChange={(v) => setLead({ ...lead, business: v })}
                  placeholder="Your business"
                />
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button type="submit" className="btn-primary">
                    See my report <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Report */}
          {inReport && (
            <motion.div
              key="report"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2 text-brand-300">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Your AI Opportunity Report
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                {lead.name ? `${lead.name.split(" ")[0]}, here's where AI can help` : "Here's where AI can help"}
              </h2>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Stat icon={<Clock className="h-4 w-4" />} value="10+ hrs" label="saved / week" />
                <Stat icon={<Wallet className="h-4 w-4" />} value="30%" label="lower cost" />
                <Stat icon={<TrendingUp className="h-4 w-4" />} value="24/7" label="responsiveness" />
              </div>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-white">
                Recommended AI solutions
              </h3>
              <ul className="mt-4 space-y-2.5">
                {(recommendations.length ? recommendations : ["AI Consulting", "Business AI Strategy"]).map(
                  (r, i) => (
                    <motion.li
                      key={r}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-500/15 text-xs font-bold text-brand-300">
                        {i + 1}
                      </span>
                      <span className="text-sm text-white">{r}</span>
                    </motion.li>
                  )
                )}
              </ul>

              <div className="mt-8 rounded-2xl border border-brand-500/20 bg-brand-500/[0.05] p-5">
                <p className="text-sm text-muted">
                  {submitted
                    ? "Thanks — we've noted your details. A M.I Tech consultant will follow up to walk you through this report and next steps."
                    : "Book a free consultation to turn this into an action plan."}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href="/contact" className="btn-primary !py-2.5">
                    Book my consultation <ArrowRight className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => {
                      setAnswers({});
                      setLead({ name: "", email: "", business: "" });
                      setSubmitted(false);
                      setStep(0);
                    }}
                    className="btn-outline !py-2.5"
                  >
                    <RotateCcw className="h-4 w-4" /> Start over
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-muted-soft focus:border-brand-500/50 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      />
    </label>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
      <div className="mx-auto grid h-8 w-8 place-items-center rounded-lg bg-gold/10 text-gold">
        {icon}
      </div>
      <div className="mt-2 text-lg font-bold text-white">{value}</div>
      <div className="text-[11px] text-muted">{label}</div>
    </div>
  );
}
