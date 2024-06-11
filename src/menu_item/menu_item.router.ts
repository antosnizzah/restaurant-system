import { Hono } from "hono";
import { getMenuItemByIdController, getMenuItemController, createMenuItemController, updateMenuItemController, deleteMenuItemController } from "./menu_item.controller";
export const MenuItemRouter = new Hono();

MenuItemRouter.get("/menu_item/:id", getMenuItemByIdController);

MenuItemRouter.get("/menu_item", getMenuItemController);

MenuItemRouter.post("/menu_item", createMenuItemController);

MenuItemRouter.put("/menu_item/:id", updateMenuItemController);

MenuItemRouter.delete("/menu_item/:id", deleteMenuItemController);