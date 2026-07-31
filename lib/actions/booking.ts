"use server";

import { bookingSchema } from "@/lib/validation/booking";

export interface BookingActionState {
  status: "idle" | "success" | "error";
  message?: string;
}

// Stub server action. In production this would create a lead in the
// clinic's PMS / CRM and trigger a WhatsApp / email notification.
export async function submitBooking(
  _prevState: BookingActionState,
  formData: FormData
): Promise<BookingActionState> {
  const raw = {
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    service: formData.get("service"),
    preferredDate: formData.get("preferredDate"),
    message: formData.get("message") ?? undefined,
    consent: formData.get("consent") === "on",
  };

  const parsed = bookingSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the form for errors and try again.",
    };
  }

  // Simulate network / PMS latency.
  await new Promise((resolve) => setTimeout(resolve, 600));

  // eslint-disable-next-line no-console
  console.log("[booking-stub] received booking request:", parsed.data);

  return {
    status: "success",
    message:
      "Thank you. Your enquiry has been received — our front desk will confirm your slot by phone or WhatsApp within one business day.",
  };
}
