import type { Metadata } from "next";
import { fraunces, manrope } from "@/lib/fonts";
import { site } from "@/lib/data/site";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://klinikserenity.example"),
  title: {
    default: `${site.clinicName} — Private Medical & Aesthetic Clinic, Kuala Lumpur`,
    template: `%s — ${site.clinicName}`,
  },
  description:
    "Klinik Serenity is a private medical and aesthetic clinic in Kuala Lumpur offering physician-led general, specialist, aesthetic, and wellness care. Content is placeholder pending final client copy.",
  keywords: [
    "aesthetic clinic Kuala Lumpur",
    "private clinic Malaysia",
    "medical aesthetics KL",
    "general practitioner Kuala Lumpur",
  ],
  openGraph: {
    title: `${site.clinicName} — Private Medical & Aesthetic Clinic`,
    description: site.tagline,
    type: "website",
    locale: "en_MY",
  },
};

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: site.clinicNameFull,
  image: "https://klinikserenity.example/og-image.jpg",
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: "Kuala Lumpur",
    addressCountry: "MY",
  },
  medicalSpecialty: ["Dermatology", "PlasticSurgery", "PrimaryCare"],
  priceRange: "$$$",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-bone text-charcoal antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
        />
        <LocaleProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
