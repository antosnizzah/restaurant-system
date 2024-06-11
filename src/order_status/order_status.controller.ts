
import { Context } from "hono";
import {getOrderStatusByIdService,getOrderStatusService,updateOrderStatusService,deleteOrderStatusService,createOrderStatusService} from "./order_status.service";

// get all  orders status
export const getOrderStatusController = async (c: Context) => {
    try {
        const orderstatusitem = await getOrderStatusService();
        if (orderstatusitem == null || orderstatusitem.length == 0) {
            return c.text("No order status found", 404);
        }
        return c.json(orderstatusitem, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get order status  by id
export const getOrderStatusByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const orderstatusitem = await getOrderStatusByIdService(id);
        if (orderstatusitem == null) {
            return c.text("order status  not found", 404);
        }
        return c.json(orderstatusitem, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create  order status
export const createOrderStatusController = async (c: Context) => {
    try {
        const orderstatusitem = await c.req.json();
        const neworderstatusitem= await createOrderStatusService(orderstatusitem);

        if (!neworderstatusitem) return c.text("order status not created", 400);
        return c.json({ message: neworderstatusitem }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update order status
export const updateOrderStatusController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const orderstatusitem = await c.req.json();

        // search for  order  by id
        const updatedordersitem = await getOrderStatusByIdService(id);
        if (!updatedordersitem === undefined) return c.text("order  not found", 404);

        // get data to order status
        const res = await updateOrderStatusService(id, orderstatusitem);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete  order status

export const deleteOrderStatusController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for order status by id
        const orderstatusitem = await getOrderStatusByIdService(id);
        if (!orderstatusitem) return c.text("order status not found", 404);

        // delete order status
        const res = await deleteOrderStatusService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};