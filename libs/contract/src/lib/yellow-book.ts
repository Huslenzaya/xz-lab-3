import { z } from 'zod';

export const YellowBookEntrySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  pricePerMonth: z.number().int(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  category: z.string(),
  status: z.string(),
  contactName: z.string(),
  phone: z.string(),
  email: z.string().email().nullable().optional(),
  publishedAt: z.coerce.date(),
});

export type YellowBookEntry = z.infer<typeof YellowBookEntrySchema>;
export const YellowBookListSchema = z.array(YellowBookEntrySchema);