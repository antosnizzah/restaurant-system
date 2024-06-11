import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { MenuItemTable ,TIMenuItem,TSMenuItem } from "../drizzle/schema";

// GET ALL menu item
export const getMenuItemService = async (): Promise<TSMenuItem[] | null> => {
    const item = await db.query.MenuItemTable.findMany();
    return item;
};

// GET menu item BY ID
export const getMenuItemByIdService = async (id: number): Promise<TSMenuItem | undefined> => {
    const item = await db.query.MenuItemTable.findFirst({
        where: eq(MenuItemTable.id, id)
    });
    return item;
}

// CREATE menu item
export const createMenuItemService = async (item: TIMenuItem) => {
    await db.insert(MenuItemTable).values(item)
    return "menu_item created successfully";
}

//  UPDATE menu item
export const updateMenuItemService = async (id: number, item: TIMenuItem) => {
    await db.update(MenuItemTable).set(item).where(eq(MenuItemTable.id, id));
    return "menu_item updated successfully";
}

// DELETE menu item
export const deleteMenuItemService = async (id: number) => {
    await db.delete(MenuItemTable).where(eq(MenuItemTable.id, id));
    return "menu_item deleted successfully";
}