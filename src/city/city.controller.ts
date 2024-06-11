
import { Context } from "hono";
import {getCityService,getCityByIdService,updateCityService,deleteCityService,createCityService } from "./city.service";

// get all city
export const getCityController = async (c: Context) => {
    try {
        const city = await getCityService();
        if (city == null || city.length == 0) {
            return c.text("No city found", 404);
        }
        return c.json(city, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get city by id
export const getCityByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const city = await getCityByIdService(id);
        if (city == null) {
            return c.text("city not found", 404);
        }
        return c.json(city, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create city
export const createCityController = async (c: Context) => {
    try {
        const city = await c.req.json();
        const newcity = await createCityService(city);

        if (!newcity) return c.text("city not created", 400);
        return c.json({ message: newcity }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update city
export const updateCityController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const city = await c.req.json();

        // search for user by id
        const updatedcity = await getCityByIdService(id);
        if (!updatedcity === undefined) return c.text("city not found", 404);

        // get data to update
        const res = await updateCityService(id, city);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete city

export const deleteCityController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for address by id
        const city = await getCityByIdService(id);
        if (!city) return c.text("city not found", 404);

        // delete address
        const res = await deleteCityService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};