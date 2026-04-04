import { z } from 'zod';

export const vitalSignSchema = z.object({
  timestamp: z.string(),
  bloodPressure: z.string().optional(),
  heartRate: z.number().optional(),
  temp: z.number().optional(),
  spo2: z.number().optional(),
  notes: z.string().optional(),
});

export const nursingAssessmentSchema = z.object({
  patient: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    gender: z.enum(['M', 'F', 'NB', 'OTHER']),
    age: z.number(),
  }),
  model1: z.any().optional(),
  model2: z.any().optional(),
  model3: z.object({
    urinationType: z.string().optional(),
    urinationFrequency: z.string().optional(),
    urinaryAlterations: z.array(z.string()).default([]),
    diuresis24h: z.number().optional(),
    bowelFrequency: z.string().optional(),
    lastBowelMovement: z.string().optional(),
    bowelAlterations: z.array(z.string()).default([]),
    bristolScale: z.string().optional(),
    abdomenExam: z.string().optional(),
    peristalsis: z.string().optional(),
    model3Status: z.enum(['FUNZIONALE', 'DISFUNZIONALE']).optional(),
    model3Notes: z.string().optional(),
  }).optional(),
  vitalSigns: z.array(vitalSignSchema).default([]),
});

export type NursingAssessment = z.infer<typeof nursingAssessmentSchema>;
export type VitalSign = z.infer<typeof vitalSignSchema>;
