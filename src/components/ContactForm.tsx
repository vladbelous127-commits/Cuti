"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="card flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-400" />
        <h3 className="text-xl font-semibold text-white">Message received</h3>
        <p className="max-w-sm text-sm text-muted">
          Thanks for reaching out. A member of the M.I Tech team will get back to
          you shortly.
        </p>
        <button onClick={() => setSent(false)} className="btn-outline mt-2">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="card space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Your name" required />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Business" name="business" placeholder="Your business" />
        <Field label="Phone / WhatsApp" name="phone" placeholder="+234…" />
      </div>
      <label className="block">
        <span className="text-sm font-medium text-white">
          How can we help?
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your business and what you'd like to achieve with AI…"
          className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-muted-soft focus:border-brand-500/50 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </label>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Send message <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-muted-soft focus:border-brand-500/50 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      />
    </label>
  );
}
