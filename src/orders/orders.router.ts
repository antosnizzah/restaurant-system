import { Hono } from "hono";
import { getOrdersByIdController,getOrdersController,updateOrdersController,deleteOrdersController,createOrdersController, } from "./orders.controller";

export const OrdersRouter = new Hono();

OrdersRouter.get("/orders/:id", getOrdersByIdController);

OrdersRouter.get("/orders", getOrdersController);

OrdersRouter.post("/orders", createOrdersController);

OrdersRouter.delete("/orders/:id", deleteOrdersController);

OrdersRouter.put("/orders/:id", updateOrdersController);
