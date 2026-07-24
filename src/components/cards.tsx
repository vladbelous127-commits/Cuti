import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Service, Solution, CaseStudy } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <div className="card card-hover group flex h-full flex-col">
      <div className="grid h-12 w-12 place-items-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-300 transition group-hover:bg-brand-500/20">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{service.summary}</p>
      {service.points && (
        <ul className="mt-4 space-y-2">
          {service.points.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm text-muted">
              <Check className="h-4 w-4 shrink-0 text-brand-400" />
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SolutionCard({ solution }: { solution: Solution }) {
  const Icon = solution.icon;
  return (
    <div className="card card-hover group flex h-full items-start gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-brand-300 transition group-hover:border-brand-500/30 group-hover:text-brand-200">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-semibold text-white">{solution.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{solution.desc}</p>
      </div>
    </div>
  );
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies#${study.slug}`}
      className="card card-hover group flex h-full flex-col"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-brand-300">
          {study.industry}
        </span>
        <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:text-brand-300" />
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{study.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
        {study.problem}
      </p>
      <div className="mt-auto flex items-baseline gap-2 pt-6">
        <span className="text-3xl font-bold text-gold">{study.metric.value}</span>
        <span className="text-sm text-muted">{study.metric.label}</span>
      </div>
    </Link>
  );
}
