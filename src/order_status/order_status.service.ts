import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { OrderStatusTable ,TIOrderStatus,TSOrderStatus} from "../drizzle/schema";

// GET ALL  ORDER STATUS
export const getOrderStatusService = async (): Promise<TSOrderStatus[] | null> => {
    const orderstatusitem = await db.query. OrderStatusTable.findMany();
    return orderstatusitem;
};

// GET ORDER STATUS BY ID
export const getOrderStatusByIdService = async (id: number): Promise<TSOrderStatus | undefined> => {
    const orderstatusitem = await db.query. OrderStatusTable.findFirst({
        where: eq( OrderStatusTable.id, id)
    });
    return orderstatusitem;
}

// CREATE ORDER STATUS
export const createOrderStatusService = async (item: TIOrderStatus) => {
    await db.insert( OrderStatusTable).values(item)
    return "order status  created successfully";
}

//  UPDATE order status
export const updateOrderStatusService = async (id: number, item: TIOrderStatus) => {
    await db.update( OrderStatusTable).set(item).where(eq(OrderStatusTable.id, id));
    return "order status updated successfully";
}

// DELETE order
export const deleteOrderStatusService = async (id: number) => {
    await db.delete( OrderStatusTable).where(eq( OrderStatusTable.id, id));
    return "Order status deleted successfully";
}