import express from "express";

import { orderValidation } from "./order.validation";
import validateRequest from "../../midddleware/validateRequest";
import { orderControllers } from "./order.controller";

const router = express.Router();

router.post(
  "/create-order",
  validateRequest(orderValidation.orderValidationSchema),
  orderControllers.createOrder
);

export const orderRoute = router;
