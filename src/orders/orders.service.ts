import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import {OrdersTable,TIOrder,TSOrder} from "../drizzle/schema";

// GET ALL  ORDER 
export const getOrdersService = async (): Promise<TSOrder[] | null> => {
    const ordersitem = await db.query.OrdersTable.findMany();
    return ordersitem;
};

// GET ORDER  BY ID
export const getOrdersByIdService = async (id: number): Promise<TSOrder | undefined> => {
    const ordersitem = await db.query.OrdersTable.findFirst({
        where: eq(OrdersTable.id, id)
    });
    return ordersitem;
}

// CREATE ORDER MENU
export const createOrdersService = async (item: TIOrder) => {
    await db.insert(OrdersTable).values(item)
    return "order  created successfully";
}

//  UPDATE order
export const updateOrdersService = async (id: number, item: TIOrder) => {
    await db.update(OrdersTable).set(item).where(eq(OrdersTable.id, id));
    return "order  updated successfully";
}

// DELETE order
export const deleteOrdersService = async (id: number) => {
    await db.delete(OrdersTable).where(eq(OrdersTable.id, id));
    return "Order  deleted successfully";
}