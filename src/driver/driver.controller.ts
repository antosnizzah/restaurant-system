
import { Context } from "hono";
import { getDriverService,getDriverByIdService,updateDriverService,createDriverService,deleteDriverService} from "./driver.service";

// get all driver
export const getDriverController = async (c: Context) => {
    try {
        const driver = await getDriverService();
        if (driver == null || driver.length == 0) {
            return c.text("No driver found", 404);
        }
        return c.json(driver, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get driver by id
export const getDriverByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const driver = await getDriverByIdService(id);
        if (driver == null) {
            return c.text("driver not found", 404);
        }
        return c.json(driver, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create driver
export const createDriverController = async (c: Context) => {
    try {
        const driver = await c.req.json();
        const newdriver = await createDriverService(driver);

        if (!newdriver) return c.text("driver not created", 400);
        return c.json({ message: newdriver }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update comment
export const updateDriverController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const driver = await c.req.json();

        // search for driver by id
        const updateddriver = await getDriverByIdService(id);
        if (!updateddriver === undefined) return c.text("driver not found", 404);

        // get data to update
        const res = await updateDriverService(id, driver);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete driver

export const deleteDriverController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for driver by id
        const driver = await getDriverByIdService(id);
        if (!driver) return c.text("driver not found", 404);

        // delete driver
        const res = await deleteDriverService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};