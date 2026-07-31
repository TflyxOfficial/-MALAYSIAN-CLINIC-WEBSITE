"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { site } from "@/lib/data/site";

export default function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-charcoal/10 bg-bone-dim">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-serif text-xl">{site.clinicName}</p>
          <p className="mt-3 max-w-xs text-sm text-charcoal-muted">
            {site.tagline}
          </p>
          <div className="mt-5 flex gap-4 text-xs text-charcoal-muted">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} className="hover:text-teal">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-widest2 text-charcoal-muted">
            {t.footer.sitemap}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/" className="hover:text-teal">{t.nav.home}</Link></li>
            <li><Link href="/about" className="hover:text-teal">{t.nav.about}</Link></li>
            <li><Link href="/doctors" className="hover:text-teal">{t.nav.doctors}</Link></li>
            <li><Link href="/services" className="hover:text-teal">{t.nav.services}</Link></li>
            <li><Link href="/facilities" className="hover:text-teal">{t.nav.facilities}</Link></li>
            <li><Link href="/testimonials" className="hover:text-teal">{t.nav.testimonials}</Link></li>
            <li><Link href="/contact" className="hover:text-teal">{t.nav.contact}</Link></li>
            <li><Link href="/faq" className="hover:text-teal">{t.nav.faq}</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-widest2 text-charcoal-muted">
            {t.footer.hours}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-charcoal-muted">
            {site.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-widest2 text-charcoal-muted">
            {t.footer.compliance}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-charcoal-muted">
            <li>MOH Licence: {site.mohLicense}</li>
            <li>Company Reg: {site.companyReg}</li>
            <li>
              <Link href="/faq" className="underline hover:text-teal">
                MOH Aesthetic Advertising Guidelines
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-charcoal/10 px-5 py-6 md:px-8">
        <p className="mx-auto max-w-content text-xs leading-relaxed text-charcoal-muted">
          {t.footer.pdpa} &copy; {new Date().getFullYear()} {site.clinicNameFull}.
          All content on this website is placeholder pending final client
          copy and does not constitute medical advice.
        </p>
      </div>
    </footer>
  );
}
