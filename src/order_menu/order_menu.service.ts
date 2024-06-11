import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { OrderMenuItemTable, TIOrderMenuItem,TSMenuItem,TSOrderMenuItem } from "../drizzle/schema";

// GET ALL  ORDER MENU
export const getOrderMenuItemService = async (): Promise<TSOrderMenuItem[] | null> => {
    const orderitem = await db.query.OrderMenuItemTable.findMany();
    return orderitem;
};

// GET ORDER MENU BY ID
export const getOrderMenuItemByIdService = async (id: number): Promise<TSOrderMenuItem | undefined> => {
    const orderitem = await db.query.OrderMenuItemTable.findFirst({
        where: eq(OrderMenuItemTable.id, id)
    });
    return orderitem;
}

// CREATE ORDER MENU
export const createOrderMenuItemService = async (item: TIOrderMenuItem) => {
    await db.insert(OrderMenuItemTable).values(item)
    return "order menu_item created successfully";
}

//  UPDATE menu item
export const updateOrderMenuItemService = async (id: number, item: TIOrderMenuItem) => {
    await db.update(OrderMenuItemTable).set(item).where(eq(OrderMenuItemTable.id, id));
    return "order menu_item updated successfully";
}

// DELETE menu item
export const deleteOrderMenuItemService = async (id: number) => {
    await db.delete(OrderMenuItemTable).where(eq(OrderMenuItemTable.id, id));
    return "Order menu_item deleted successfully";
}