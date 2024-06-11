
import { Context } from "hono";
import { getOrderMenuItemByIdService,updateOrderMenuItemService,createOrderMenuItemService,deleteOrderMenuItemService,getOrderMenuItemService} from "./order_menu.service";

// get all  order menu item
export const getOrderMenuItemController = async (c: Context) => {
    try {
        const orderitem = await getOrderMenuItemService();
        if (orderitem == null || orderitem.length == 0) {
            return c.text("No order menu item found", 404);
        }
        return c.json(orderitem, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get order menu item by id
export const getOrderMenuItemByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const orderitem = await getOrderMenuItemByIdService(id);
        if (orderitem == null) {
            return c.text("order menu item not found", 404);
        }
        return c.json(orderitem, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create  order menu item
export const createOrderMenuItemController = async (c: Context) => {
    try {
        const orderitem = await c.req.json();
        const neworderitem= await createOrderMenuItemService(orderitem);

        if (!neworderitem) return c.text("order menu_item not created", 400);
        return c.json({ message: neworderitem }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update order menu item
export const updateOrderMenuItemController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const orderitem = await c.req.json();

        // search for  order menu item by id
        const updatedorderitem = await getOrderMenuItemByIdService(id);
        if (!updatedorderitem === undefined) return c.text("order menU_item not found", 404);

        // get data to order menu item
        const res = await updateOrderMenuItemService(id, orderitem);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete  order Menu item

export const deleteOrderMenuItemController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for menu item by id
        const orderitem = await getOrderMenuItemByIdService(id);
        if (!orderitem) return c.text("order menu item not found", 404);

        // delete order menu item
        const res = await deleteOrderMenuItemService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};