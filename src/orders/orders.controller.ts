
import { Context } from "hono";
import {getOrdersByIdService,getOrdersService,updateOrdersService,deleteOrdersService,createOrdersService,} from "./orders.service";

// get all  orders
export const getOrdersController = async (c: Context) => {
    try {
        const ordersitem = await getOrdersService();
        if (ordersitem == null || ordersitem.length == 0) {
            return c.text("No order  found", 404);
        }
        return c.json(ordersitem, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get order  by id
export const getOrdersByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const ordersitem = await getOrdersByIdService(id);
        if (ordersitem == null) {
            return c.text("order   not found", 404);
        }
        return c.json(ordersitem, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create  order 
export const createOrdersController = async (c: Context) => {
    try {
        const ordersitem = await c.req.json();
        const newordersitem= await createOrdersService(ordersitem);

        if (!newordersitem) return c.text("order not created", 400);
        return c.json({ message: newordersitem }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update order 
export const updateOrdersController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const ordersitem = await c.req.json();

        // search for  order  by id
        const updatedordersitem = await getOrdersByIdService(id);
        if (!updatedordersitem === undefined) return c.text("order  not found", 404);

        // get data to order 
        const res = await updateOrdersService(id, ordersitem);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete  order 

export const deleteOrdersController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for  by id
        const ordersitem = await getOrdersByIdService(id);
        if (!ordersitem) return c.text("order not found", 404);

        // delete order 
        const res = await deleteOrdersService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};