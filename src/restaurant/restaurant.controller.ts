
import { Context } from "hono";
import {getRestaurantByIdService,getRestaurantService,updateRestaurantService,createRestaurantService,deleteRestaurantService,} from "./restaurant.service";

// get all  Restaurant
export const getRestaurantController = async (c: Context) => {
    try {
        const restaurant = await getRestaurantService();
        if (restaurant == null || restaurant.length == 0) {
            return c.text("No Restaurant  found", 404);
        }
        return c.json(restaurant, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get Restaurant  by id
export const getRestaurantByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const restaurant = await getRestaurantByIdService(id);
        if (restaurant== null) {
            return c.text("Restaurant  not found", 404);
        }
        return c.json(restaurant, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create Restaurant
export const createRestaurantController = async (c: Context) => {
    try {
        const restaurant= await c.req.json();
        const newrestaurant= await createRestaurantService(restaurant);

        if (!newrestaurant) return c.text("Restaurant not created", 400);
        return c.json({ message: newrestaurant }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update Restaurant
export const updateRestaurantController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const restaurant = await c.req.json();

        // search for Restaurant  by id
        const updatedrestaurant = await getRestaurantByIdService(id);
        if (!updatedrestaurant === undefined) return c.text("Restaurant  not found", 404);

        // get data to Restaurant 
        const res = await updateRestaurantService(id, restaurant);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete  Restaurant 

export const deleteRestaurantController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for  by id
        const restaurant = await getRestaurantByIdService(id);
        if (!restaurant) return c.text("Restaurant not found", 404);

        // delete Restaurant 
        const res = await deleteRestaurantService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};