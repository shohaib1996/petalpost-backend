

// src/api/payment/payment.interface.ts

export interface PaymentRequest {
    price: number;
}

export interface PaymentResponse {
    clientSecret: string;
}


