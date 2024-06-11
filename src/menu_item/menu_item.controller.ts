
import { Context } from "hono";
import { getMenuItemByIdService,getMenuItemService,updateMenuItemService,deleteMenuItemService,createMenuItemService} from "./menu_item.service";

// get all menu item
export const getMenuItemController = async (c: Context) => {
    try {
        const item = await getMenuItemService();
        if (item == null || item.length == 0) {
            return c.text("No menu item found", 404);
        }
        return c.json(item, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get menu item by id
export const getMenuItemByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const item = await getMenuItemByIdService(id);
        if (item == null) {
            return c.text("menu item not found", 404);
        }
        return c.json(item, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create menu item
export const createMenuItemController = async (c: Context) => {
    try {
        const item = await c.req.json();
        const newitem= await createMenuItemService(item);

        if (!newitem) return c.text("menu_item not created", 400);
        return c.json({ message: newitem }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update menu item
export const updateMenuItemController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const item = await c.req.json();

        // search for menu item by id
        const updateditem = await getMenuItemByIdService(id);
        if (!updateditem === undefined) return c.text("menU_item not found", 404);

        // get data to menu item
        const res = await updateMenuItemService(id, item);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete Menu item

export const deleteMenuItemController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for menu item by id
        const item = await getMenuItemByIdService(id);
        if (!item) return c.text("menu item not found", 404);

        // delete mennu item
        const res = await deleteMenuItemService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};