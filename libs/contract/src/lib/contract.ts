import { z } from 'zod';

export const YellowBookCategoryEnum = z.enum([
  'apartment',
  'house',
  'office',
  'land',
]);

export const YellowBookStatusEnum = z.enum(['active', 'archived']);

export const YellowBookEntrySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().min(10),
  pricePerMonth: z.number().int().nonnegative(),
  address: z.string().min(5),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),

  category: YellowBookCategoryEnum,
  status: YellowBookStatusEnum,
  contactName: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email().optional(),

  publishedAt: z.string().datetime(),
});

export type YellowBookEntry = z.infer<typeof YellowBookEntrySchema>;

export const YellowBookListSchema = z.array(YellowBookEntrySchema);
