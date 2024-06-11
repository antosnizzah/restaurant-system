import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { CityTable, TICity,TSCity } from "../drizzle/schema";

// GET ALL city
export const getCityService = async (): Promise<TSCity[] | null> => {
    const city = await db.query.CityTable.findMany();
    return city;
};

// GET CITY BY ID
export const getCityByIdService = async (id: number): Promise<TSCity| undefined> => {
    const city = await db.query.CityTable.findFirst({
        where: eq(CityTable.id, id)
    });
    return city;
}

// CREATE city
export const createCityService = async (city: TICity) => {
    await db.insert(CityTable).values(city)
    return "city created successfully";
}

//  UPDATE city
export const updateCityService = async (id: number, city: TICity) => {
    await db.update(CityTable).set(city).where(eq(CityTable.id, id));
    return "city updated successfully";
}

// DELETE ADDRESS
export const deleteCityService = async (id: number) => {
    await db.delete(CityTable).where(eq(CityTable.id, id));
    return "city deleted successfully";
}