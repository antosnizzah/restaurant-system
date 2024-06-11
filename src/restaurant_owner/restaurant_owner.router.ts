import { Hono } from "hono";
import { getRestaurantOwnerController, getRestaurantOwnerByIdController, createRestaurantOwnerController, updateRestaurantOwnerController, deleteRestaurantOwnerController } from "./restaurant_owner.controller";

export const RestaurantOwnerRouter = new Hono();

RestaurantOwnerRouter.get("/restaurant_owner", getRestaurantOwnerController);

RestaurantOwnerRouter.get("/restaurant_owner/:id", getRestaurantOwnerByIdController);

RestaurantOwnerRouter.post("/restaurant_owner", createRestaurantOwnerController);

RestaurantOwnerRouter.put("/restaurant_owner/:id", updateRestaurantOwnerController);

RestaurantOwnerRouter.delete("/restaurant_owner/:id", deleteRestaurantOwnerController);