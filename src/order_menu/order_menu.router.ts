import { Hono } from "hono";
import { getOrderMenuItemByIdController,getOrderMenuItemController,updateOrderMenuItemController,deleteOrderMenuItemController,createOrderMenuItemController } from "./order_menu.controller";
export const OrderMenuItemRouter = new Hono();

OrderMenuItemRouter.get("/order_menu/:id", getOrderMenuItemByIdController);

OrderMenuItemRouter.get("/order_menu", getOrderMenuItemController);

OrderMenuItemRouter.post("/order_menu", createOrderMenuItemController);

OrderMenuItemRouter.put("/order_menu/:id", updateOrderMenuItemController);

OrderMenuItemRouter.delete("/order_menu/:id", deleteOrderMenuItemController);

