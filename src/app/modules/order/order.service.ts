import { startSession } from "mongoose";
import { TOrder } from "./order.interface";
import { Product } from "../product/product.model";
import httpStatus from "http-status";
import appError from "../../midddleware/appError";
import { Order } from "./order.model";

const createOrderIntoDB = async (payload: TOrder) => {
  const session = await startSession();
  session.startTransaction();

  try {
    for (const item of payload.products) {
      const product = await Product.findById(item.product).session(session);
      if (!product) {
        throw new appError(httpStatus.NOT_FOUND, "Product not found");
      }
      if (item.quantity > product.quantity) {
        throw new appError(
          httpStatus.BAD_REQUEST,
          `Requested quantity for product ${product.title} exceeds available stock`
        );
      }
    }

    // Create the order if all products exist and have sufficient quantity->
    const result = await Order.create([payload], { session });

    if (!result.length) {
      throw new appError(httpStatus.BAD_REQUEST, "Failed to create order");
    }

    for (const item of payload.products) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { quantity: -item.quantity } },
        { session }
      );
    }

    // Commit the transaction
    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export default createOrderIntoDB;

export const OrderServices = { createOrderIntoDB };
