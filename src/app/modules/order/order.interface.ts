import { Types } from "mongoose";

export type TProduct = {
  product: Types.ObjectId;
  quantity: number;
};

export type TPaymentMethod = "cashOnDelivery" | "stripe";

export type TOrder = {
  name: string;
  email: string;
  phNumber: string;
  address: string;
  products: [TProduct];
  payment: TPaymentMethod;
};
