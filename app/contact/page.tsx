import type { Metadata } from "next";
import { site } from "@/lib/data/site";
import BookingForm from "@/components/contact/BookingForm";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Book a consultation at Klinik Serenity, reach us on WhatsApp, or find directions via Google Maps and Waze.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
      <p className="text-xs uppercase tracking-widest2 text-teal-dark">
        Contact
      </p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
        Book a consultation, or say hello first.
      </h1>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-charcoal/10 p-6 sm:p-8">
          <h2 className="font-serif text-2xl">Request an appointment</h2>
          <p className="mt-2 text-sm text-charcoal-muted">
            This is a stub booking form — submissions are validated but not
            yet wired to a live booking system.
          </p>
          <div className="mt-6">
            <BookingForm />
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl bg-charcoal p-6 text-bone sm:p-8">
            <h2 className="font-serif text-xl">Prefer WhatsApp?</h2>
            <p className="mt-2 text-sm text-bone/70">
              Message our front desk directly for the fastest response.
            </p>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-full bg-bone px-5 py-3 text-sm text-charcoal"
            >
              Chat on WhatsApp ({site.whatsapp})
            </a>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-widest2 text-charcoal-muted">
              Clinic Address
            </h2>
            <p className="mt-2 text-sm leading-relaxed">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city}, {site.address.country}
            </p>
            <div className="mt-3 flex gap-4 text-sm">
              <a
                href={site.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-dark underline underline-offset-4"
              >
                Open in Waze
              </a>
              <a
                href={site.phoneHref}
                className="text-teal-dark underline underline-offset-4"
              >
                Call {site.phone}
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-widest2 text-charcoal-muted">
              Operating Hours
            </h2>
            <ul className="mt-2 space-y-1 text-sm">
              {site.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-charcoal-muted">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-charcoal/10">
            <iframe
              title="Klinik Serenity location"
              src={site.mapsEmbedSrc}
              width="100%"
              height="240"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
