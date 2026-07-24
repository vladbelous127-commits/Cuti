import Link from "next/link";
import {
  Mail,
  MessageCircle,
  Linkedin,
  Instagram,
  Facebook,
  MapPin,
} from "lucide-react";
import { site, footerNav } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SocialLink href={site.socials.whatsapp} label="WhatsApp">
                <MessageCircle className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={`mailto:${site.email}`} label="Email">
                <Mail className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={site.socials.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={site.socials.instagram} label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={site.socials.facebook} label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialLink>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-brand-400" /> {site.location}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-white">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted transition hover:text-brand-300"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-muted-soft sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            Founded by{" "}
            <Link href="/founder" className="text-muted hover:text-brand-300">
              {site.founder}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-muted transition hover:border-brand-400/50 hover:text-brand-300"
    >
      {children}
    </a>
  );
}
