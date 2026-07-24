import type { Metadata } from "next";
import {
  MessageCircle,
  Mail,
  Linkedin,
  Instagram,
  Music2,
  Facebook,
  MapPin,
  CalendarCheck,
} from "lucide-react";
import { PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with M.I Tech NG — WhatsApp, email, LinkedIn, Instagram, TikTok and Facebook. Book your free AI consultation.",
};

const channels = [
  { label: "WhatsApp", value: "Chat with us", href: site.socials.whatsapp, icon: MessageCircle },
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: "LinkedIn", value: "Connect", href: site.socials.linkedin, icon: Linkedin },
  { label: "Instagram", value: "Follow", href: site.socials.instagram, icon: Instagram },
  { label: "TikTok", value: "Follow", href: site.socials.tiktok, icon: Music2 },
  { label: "Facebook", value: "Follow", href: site.socials.facebook, icon: Facebook },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your business"
        intro="Whether you're ready to start or just exploring, we'd love to hear from you. Reach out on any channel — or send a message directly."
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Left: channels */}
          <div>
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {channels.map((c) => {
                  const Icon = c.icon;
                  return (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card card-hover group flex items-center gap-4"
                    >
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-300 transition group-hover:bg-brand-500/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {c.label}
                        </div>
                        <div className="text-sm text-muted">{c.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card mt-6 flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <div>
                  <div className="text-sm font-semibold text-white">Office</div>
                  <div className="text-sm text-muted">{site.location}</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <a
                href="/discovery"
                className="mt-6 flex items-center gap-4 rounded-2xl border border-gold/20 bg-gold/[0.05] p-5 transition hover:border-gold/40"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
                  <CalendarCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Book a free consultation
                  </div>
                  <div className="text-sm text-muted">
                    Start with the 2-minute AI Discovery Session
                  </div>
                </div>
              </a>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
