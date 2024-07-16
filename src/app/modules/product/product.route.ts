import validateRequest from "../../midddleware/validateRequest";
import { productValidationSchema } from "./product.validation";
import { ProductControllers } from "./product.controller";
import express from "express";

const router = express.Router();

router.post(
  "/create-product",
  validateRequest(productValidationSchema.productSchema),
  ProductControllers.createProduct
);
router.get("/", ProductControllers.getAllProduct);
router.get("/:id", ProductControllers.getSingleProduct);
router.put(
  "/:id",
  validateRequest(productValidationSchema.updateProductValidation),
  ProductControllers.updateProduct
);
router.delete("/:id", ProductControllers.deleteProduct);
export const productRoute = router;
