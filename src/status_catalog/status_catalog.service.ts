import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { StatusCatalogTable ,TIStatusCatalog,TSStatusCatalog} from "../drizzle/schema";

// GET ALL StatusCatalog  
export const getStatusCatalogService = async (): Promise<TSStatusCatalog[] | null> => {
    const StatusCatalog = await db.query.StatusCatalogTable.findMany();
    return StatusCatalog;
};

// GET StatusCatalog   BY ID
export const getStatusCatalogByIdService = async (id: number): Promise<TSStatusCatalog | undefined> => {
    const StatusCatalog = await db.query.StatusCatalogTable.findFirst({
        where: eq(StatusCatalogTable.id, id)
    });
    return StatusCatalog;
}

// CREATE ORDER MENU
export const createStatusCatalogService = async (item: TIStatusCatalog) => {
    await db.insert(StatusCatalogTable).values(item)
    return "StatusCatalog created successfully";
}

//  UPDATE order
export const updateStatusCatalogService = async (id: number, item: TIStatusCatalog) => {
    await db.update(StatusCatalogTable).set(item).where(eq(StatusCatalogTable.id, id));
    return "StatusCatalog  updated successfully";
}

// DELETE order
export const deleteStatusCatalogService = async (id: number) => {
    await db.delete(StatusCatalogTable).where(eq(StatusCatalogTable.id, id));
    return "StatusCatalog  deleted successfully";
}