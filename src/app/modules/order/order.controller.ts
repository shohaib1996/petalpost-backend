import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderServices } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrderIntoDB(req.body);

  await req.body;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully.",
    data: result,
  });
});

export const orderControllers = {
  createOrder,
};
