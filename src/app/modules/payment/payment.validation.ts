// src/api/payment/payment.validation.ts

import { z } from 'zod';

export const paymentValidation = z.object({
   body: z.object({
    price: z.number().positive(),
   })
});

export type PaymentValidationType = z.infer<typeof paymentValidation>;
