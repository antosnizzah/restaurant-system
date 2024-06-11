import { Hono } from "hono";
import { getStatusCatalogByIdController, getStatusCatalogController, createStatusCatalogController, deleteStatusCatalogController, updateStatusCatalogController } from "./status_catalog.controller";

export const StatusCatalogRouter = new Hono();

StatusCatalogRouter.get("/status_catalog/:id", getStatusCatalogByIdController);

StatusCatalogRouter.get("/status_catalog", getStatusCatalogController);

StatusCatalogRouter.post("/status_catalog", createStatusCatalogController);

StatusCatalogRouter.delete("/status_catalog/:id", deleteStatusCatalogController);

StatusCatalogRouter.put("/status_catalog/:id", updateStatusCatalogController);

