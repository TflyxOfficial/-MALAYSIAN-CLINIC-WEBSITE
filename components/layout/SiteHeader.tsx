"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { site } from "@/lib/data/site";

const navLinks = [
  { href: "/about", key: "about" as const },
  { href: "/doctors", key: "doctors" as const },
  { href: "/services", key: "services" as const },
  { href: "/facilities", key: "facilities" as const },
  { href: "/testimonials", key: "testimonials" as const },
  { href: "/faq", key: "faq" as const },
];

export default function SiteHeader() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-bone/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="font-serif text-lg tracking-tight md:text-xl">
          {site.clinicName}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-charcoal-soft transition-colors hover:text-teal"
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "bm" : "en")}
            className="rounded-full border border-charcoal/20 px-3 py-1 text-xs tracking-wide"
            aria-label="Toggle language"
          >
            {locale === "en" ? "EN / BM" : "BM / EN"}
          </button>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-teal px-3 py-1 text-xs text-teal-dark transition-colors hover:bg-teal-tint"
          >
            {t.cta.whatsapp}
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-charcoal px-4 py-2 text-xs text-bone transition-colors hover:bg-teal-dark"
          >
            {t.cta.bookNow}
          </Link>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span className="block h-px w-6 bg-charcoal" />
          <span className="block h-px w-6 bg-charcoal" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bone lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-serif text-lg">{site.clinicName}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <motion.nav
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.05 } },
              }}
              className="flex flex-col gap-1 px-5 py-6"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    closed: { opacity: 0, y: 10 },
                    open: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-charcoal/10 py-4 font-serif text-2xl"
                  >
                    {t.nav[link.key]}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <div className="flex flex-col gap-3 px-5">
              <button
                type="button"
                onClick={() => setLocale(locale === "en" ? "bm" : "en")}
                className="rounded-full border border-charcoal/20 px-3 py-2 text-sm"
              >
                {locale === "en" ? "Switch to Bahasa Malaysia" : "Switch to English"}
              </button>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-teal px-3 py-2 text-center text-sm text-teal-dark"
              >
                {t.cta.whatsapp}
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-charcoal px-4 py-3 text-center text-sm text-bone"
              >
                {t.cta.bookNow}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
