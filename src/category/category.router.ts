import { Hono } from "hono";
import { getCategoryByIdController,getCategoryController,deleteCategoryController,updateCategoryController,createCategoryController } from "./category.controller";

export const CategoryRouter = new Hono();

CategoryRouter.get("/category/:id", getCategoryByIdController);

CategoryRouter.get("/category", getCategoryController);

CategoryRouter.delete("/category/:id", deleteCategoryController);

CategoryRouter.put("/category/:id", updateCategoryController);

CategoryRouter.post("/category", createCategoryController);
