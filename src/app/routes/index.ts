import { Router } from "express";
import { productRoute } from "../modules/product/product.route";
import { orderRoute } from "../modules/order/order.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/order",
    route: orderRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
