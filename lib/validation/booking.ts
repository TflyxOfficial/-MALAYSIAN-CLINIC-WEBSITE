import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number.")
    .regex(/^[+0-9 -]+$/, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  service: z.string().min(1, "Please select a service."),
  preferredDate: z.string().min(1, "Please select a preferred date."),
  message: z.string().max(1000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Please confirm you consent to being contacted.",
    }),
  }),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
