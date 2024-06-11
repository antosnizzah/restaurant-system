import { Hono } from "hono";
import { getRestaurantByIdController, getRestaurantController, createRestaurantController, updateRestaurantController, deleteRestaurantController } from "./restaurant.controller";

export const RestaurantRouter = new Hono();

RestaurantRouter.get("/restaurant/:id", getRestaurantByIdController);

RestaurantRouter.get("/restaurant", getRestaurantController);

RestaurantRouter.post("/restaurant", createRestaurantController);

RestaurantRouter.put("/restaurant/:id", updateRestaurantController);

RestaurantRouter.delete("/restaurant/:id", deleteRestaurantController);
