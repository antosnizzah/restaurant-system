import { Hono } from "hono";
import{getOrderStatusByIdController,getOrderStatusController,updateOrderStatusController,deleteOrderStatusController,createOrderStatusController,} from "./order_status.controller";

export const OrderStatusRouter = new Hono();

OrderStatusRouter.get("/order_status/:id", getOrderStatusByIdController);

OrderStatusRouter.get("/order_status", getOrderStatusController);

OrderStatusRouter.delete("/order_status/:id", deleteOrderStatusController);

OrderStatusRouter.put("/order_status/:id", updateOrderStatusController);

OrderStatusRouter.post("/order_status", createOrderStatusController);


