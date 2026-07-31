import type { MetadataRoute } from "next";
import { doctors } from "@/lib/data/doctors";
import { services } from "@/lib/data/services";

const baseUrl = "https://klinikserenity.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/doctors",
    "/services",
    "/facilities",
    "/testimonials",
    "/contact",
    "/faq",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const doctorRoutes = doctors.map((doctor) => ({
    url: `${baseUrl}/doctors/${doctor.slug}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...doctorRoutes, ...serviceRoutes];
}
