// src/api/payment/payment.controller.ts

import { Request, Response } from 'express';

import { PaymentRequest } from './payment.interface';
import { stripe } from './stripe';

export const createPaymentIntent = async (req: Request<{}, {}, PaymentRequest>, res: Response) => {
    const { price } = req.body;
    const amount = Math.round(price * 100); // Convert to cents

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).send({ error: 'Payment intent creation failed.' });
    }
};

