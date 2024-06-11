import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { RestaurantTable,TIRestaurant,TSRestaurant, } from "../drizzle/schema";


// GET ALL Restaurant
export const getRestaurantService = async (): Promise<TSRestaurant[] | null> => {
    const restaurant = await db.query. RestaurantTable.findMany();
    return restaurant;
};

// GET Restaurant  BY ID
export const getRestaurantByIdService = async (id: number): Promise<TSRestaurant | undefined> => {
    const restaurant = await db.query. RestaurantTable.findFirst({
        where: eq( RestaurantTable.id, id)
    });
    return restaurant;
}

// CREATE Restaurant
export const createRestaurantService = async (item: TIRestaurant) => {
    await db.insert( RestaurantTable).values(item)
    return "Restaurant created successfully";
}

//  UPDATE Restaurant
export const updateRestaurantService = async (id: number, item: TIRestaurant) => {
    await db.update( RestaurantTable).set(item).where(eq( RestaurantTable.id, id));
    return "Restaurant updated successfully";
}

// DELETE Restaurant
export const deleteRestaurantService = async (id: number) => {
    await db.delete( RestaurantTable).where(eq( RestaurantTable.id, id));
    return "Restaurant  deleted successfully";
}