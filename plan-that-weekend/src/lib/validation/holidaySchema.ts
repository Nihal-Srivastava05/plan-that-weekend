import { z } from 'zod';

export const HolidaySchema = z.object({
  id: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  name: z.string().min(1).max(100).optional(),
  country: z.string().length(2).optional(),
  isUserAdded: z.boolean().default(true),
});

export const StorageSchema = z.object({
  version: z.number().int().positive(),
  holidays: z.record(z.string(), z.array(HolidaySchema)),
  preferences: z.object({
    defaultYear: z.number().int().min(2020).max(2100),
    theme: z.enum(['light', 'dark']),
    maxGapDays: z.number().int().min(1).max(7).default(3),
  }),
  lastUpdated: z.string(),
});

export type Holiday = z.infer<typeof HolidaySchema>;
export type StorageData = z.infer<typeof StorageSchema>;
