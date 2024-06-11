
import { Context } from "hono";
import {getRestaurantOwnerService,getRestaurantOwnerByIdService,updateRestaurantOwnerService,deleteRestaurantOwnerService,createRestaurantOwnerService,} from "./restaurant_owner.service";

// get all  Restaurant Owner
export const getRestaurantOwnerController = async (c: Context) => {
    try {
        const restaurantOwner = await getRestaurantOwnerService();
        if (restaurantOwner == null || restaurantOwner.length == 0) {
            return c.text("No Restaurant Owner found", 404);
        }
        return c.json(restaurantOwner, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get Restaurant Owner by id
export const getRestaurantOwnerByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const restaurantOwner = await getRestaurantOwnerByIdService(id);
        if (restaurantOwner== null) {
            return c.text("Restaurant Owner not found", 404);
        }
        return c.json(restaurantOwner, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create Restaurant Owner
export const createRestaurantOwnerController = async (c: Context) => {
    try {
        const restaurantOwner= await c.req.json();
        const newrestaurantOwner= await createRestaurantOwnerService(restaurantOwner);

        if (!newrestaurantOwner) return c.text("RestaurantOwner not created", 400);
        return c.json({ message: newrestaurantOwner }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update Restaurant Owner
export const updateRestaurantOwnerController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const restaurantOwner = await c.req.json();

        // search for Restaurant Owner  by id
        const updatedrestaurantOwner = await getRestaurantOwnerByIdService(id);
        if (!updatedrestaurantOwner === undefined) return c.text("RestaurantOwner  not found", 404);

        // get data to Restaurant Owner
        const res = await updateRestaurantOwnerService(id, restaurantOwner);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete  Restaurant 

export const deleteRestaurantOwnerController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for  by id
        const restaurantOwner = await getRestaurantOwnerByIdService(id);
        if (!restaurantOwner) return c.text("Restaurant  Owner not found", 404);

        // delete Restaurant 
        const res = await deleteRestaurantOwnerService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};