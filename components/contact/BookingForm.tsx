"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, BookingFormValues } from "@/lib/validation/booking";
import { submitBooking, BookingActionState } from "@/lib/actions/booking";
import { services } from "@/lib/data/services";

const initialState: BookingActionState = { status: "idle" };

export default function BookingForm() {
  const [state, setState] = useState<BookingActionState>(initialState);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("service", values.service);
    formData.append("preferredDate", values.preferredDate);
    if (values.message) formData.append("message", values.message);
    if (values.consent) formData.append("consent", "on");

    startTransition(async () => {
      const result = await submitBooking(state, formData);
      setState(result);
      if (result.status === "success") reset();
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-widest2 text-charcoal-muted">
            Full name
          </label>
          <input
            {...register("fullName")}
            className="mt-2 w-full rounded-lg border border-charcoal/20 bg-white px-4 py-3 text-sm outline-none focus:border-teal"
            placeholder="Your name"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest2 text-charcoal-muted">
            Phone
          </label>
          <input
            {...register("phone")}
            className="mt-2 w-full rounded-lg border border-charcoal/20 bg-white px-4 py-3 text-sm outline-none focus:border-teal"
            placeholder="+60 12-345 6789"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-widest2 text-charcoal-muted">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          className="mt-2 w-full rounded-lg border border-charcoal/20 bg-white px-4 py-3 text-sm outline-none focus:border-teal"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-widest2 text-charcoal-muted">
            Service of interest
          </label>
          <select
            {...register("service")}
            className="mt-2 w-full rounded-lg border border-charcoal/20 bg-white px-4 py-3 text-sm outline-none focus:border-teal"
            defaultValue=""
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1 text-xs text-red-600">{errors.service.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest2 text-charcoal-muted">
            Preferred date
          </label>
          <input
            {...register("preferredDate")}
            type="date"
            className="mt-2 w-full rounded-lg border border-charcoal/20 bg-white px-4 py-3 text-sm outline-none focus:border-teal"
          />
          {errors.preferredDate && (
            <p className="mt-1 text-xs text-red-600">
              {errors.preferredDate.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-widest2 text-charcoal-muted">
          Message (optional)
        </label>
        <textarea
          {...register("message")}
          rows={4}
          className="mt-2 w-full rounded-lg border border-charcoal/20 bg-white px-4 py-3 text-sm outline-none focus:border-teal"
          placeholder="Anything you'd like us to know ahead of your visit"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-charcoal-muted">
        <input type="checkbox" {...register("consent")} className="mt-0.5" />
        <span>
          I consent to Klinik Serenity contacting me about this enquiry via
          phone, email, or WhatsApp, in accordance with the clinic&apos;s
          PDPA-compliant privacy practices.
        </span>
      </label>
      {errors.consent && (
        <p className="text-xs text-red-600">{errors.consent.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-charcoal px-6 py-3 text-sm text-bone transition-colors hover:bg-teal-dark disabled:opacity-60 sm:w-auto"
      >
        {isPending ? "Sending…" : "Request appointment"}
      </button>

      {state.status !== "idle" && (
        <p
          className={`text-sm ${
            state.status === "success" ? "text-teal-dark" : "text-red-600"
          }`}
          role="status"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
