import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import {RestaurantOwnerTable, TIRestaurantOwner,TSRestaurantOwner} from "../drizzle/schema";


// GET ALL Restaurant Owner
export const getRestaurantOwnerService = async (): Promise<TSRestaurantOwner[] | null> => {
    const restaurantOwner = await db.query. RestaurantOwnerTable.findMany();
    return restaurantOwner;
};

// GET Restaurant Owner  BY ID
export const getRestaurantOwnerByIdService = async (id: number): Promise<TSRestaurantOwner | undefined> => {
    const restaurantOwner = await db.query. RestaurantOwnerTable.findFirst({
        where: eq( RestaurantOwnerTable.id, id)
    });
    return restaurantOwner;
}

// CREATE Restaurant Owner
export const createRestaurantOwnerService = async (item: TIRestaurantOwner) => {
    await db.insert( RestaurantOwnerTable).values(item)
    return "Restaurant Owner created successfully";
}

//  UPDATE Restaurant Owner
export const updateRestaurantOwnerService = async (id: number, item: TIRestaurantOwner) => {
    await db.update( RestaurantOwnerTable).set(item).where(eq( RestaurantOwnerTable.id, id));
    return "Restaurant Owner updated successfully";
}

// DELETE Restaurant Owner
export const deleteRestaurantOwnerService = async (id: number) => {
    await db.delete( RestaurantOwnerTable).where(eq( RestaurantOwnerTable.id, id));
    return "Restaurant Owner deleted successfully";
}