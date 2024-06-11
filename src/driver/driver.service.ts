import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { DriverTable,TIDriver,TSDriver } from "../drizzle/schema";

// GET ALL driver
export const getDriverService = async (): Promise<TSDriver[] | null> => {
    const driver = await db.query.DriverTable.findMany();
    return driver;
};

// GET DRIVER BY ID
export const getDriverByIdService = async (id: number): Promise<TSDriver | undefined> => {
    const driver = await db.query.DriverTable.findFirst({
        where: eq(DriverTable.id, id)
    });
    return driver;
}

// CREATE DRIVER
export const createDriverService = async (driver: TIDriver) => {
    await db.insert(DriverTable).values(driver)
    return "driver created successfully";
}

//  UPDATE driver
export const updateDriverService = async (id: number, driver: TIDriver) => {
    await db.update(DriverTable).set(driver).where(eq(DriverTable.id, id));
    return "driver updated successfully";
}

// DELETE driver
export const deleteDriverService = async (id: number) => {
    await db.delete(DriverTable).where(eq(DriverTable.id, id));
    return "driver deleted successfully";
}