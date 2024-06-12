import { Hono } from "hono";
import { getOrdersByIdController,getOrdersController,updateOrdersController,deleteOrdersController,createOrdersController, } from "./orders.controller";
import { rerstaurantRoleAuthenticate } from "../middleware/bearAuth";
import { adminRoleAuth } from "../middleware/bearAuth";
export const OrdersRouter = new Hono();

OrdersRouter.get("/orders/:id",adminRoleAuth, getOrdersByIdController);

OrdersRouter.get("/orders", getOrdersController);

OrdersRouter.post("/orders", createOrdersController);

OrdersRouter.delete("/orders/:id",rerstaurantRoleAuthenticate, deleteOrdersController);

OrdersRouter.put("/orders/:id", updateOrdersController);
