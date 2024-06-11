
import { Context } from "hono";
import {getStatusCatalogByIdService,getStatusCatalogService,createStatusCatalogService,deleteStatusCatalogService,updateStatusCatalogService} from "./status_catalog.service";

// get all StatusCatalog 
export const getStatusCatalogController = async (c: Context) => {
    try {
        const StatusCatalog = await getStatusCatalogService();
        if (StatusCatalog == null || StatusCatalog.length == 0) {
            return c.text("No StatusCatalog  found", 404);
        }
        return c.json(StatusCatalog, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get StatusCatalog  by id
export const getStatusCatalogByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const StatusCatalog = await getStatusCatalogByIdService(id);
        if (StatusCatalog == null) {
            return c.text("StatusCatalog   not found", 404);
        }
        return c.json(StatusCatalog, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create StatusCatalog
export const createStatusCatalogController = async (c: Context) => {
    try {
        const StatusCatalog = await c.req.json();
        const newStatusCatalog = await createStatusCatalogService(StatusCatalog);

        if (!newStatusCatalog) return c.text("StatusCatalog not created", 400);
        return c.json({ message: newStatusCatalog }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update StatusCatalog 
export const updateStatusCatalogController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const StatusCatalog = await c.req.json();

        // search for  StatusCatalog  by id
        const updatedStatusCatalog = await getStatusCatalogByIdService(id);
        if (!updatedStatusCatalog === undefined) return c.text("order  not found", 404);

        // get data to StatusCatalog 
        const res = await updateStatusCatalogService(id, StatusCatalog);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete  StatusCatalog

export const deleteStatusCatalogController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for  by id
        const StatusCatalog = await getStatusCatalogByIdService(id);
        if (!StatusCatalog) return c.text("StatusCatalog not found", 404);

        // delete StatusCatalog 
        const res = await deleteStatusCatalogService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};