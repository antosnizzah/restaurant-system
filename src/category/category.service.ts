import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { CategoryTable ,TICategory,TSCategory} from "../drizzle/schema";

// GET ALL category
export const getCategoryService = async (): Promise<TSCategory[] | null> => {
    const category = await db.query.CategoryTable.findMany();
    return category;
};

// GET category BY ID
export const getCategoryByIdService = async (id: number): Promise<TSCategory | undefined> => {
    const category = await db.query.CategoryTable.findFirst({
        where: eq(CategoryTable.id, id)
    });
    return category;
}

// CREATE category
export const createCategoryService = async (category: TICategory) => {
    await db.insert(CategoryTable).values(category)
    return "category created successfully";
}

//  UPDATE category
export const updateCategoryService = async (id: number, address: TICategory) => {
    await db.update(CategoryTable).set(address).where(eq(CategoryTable.id, id));
    return "category updated successfully";
}

// DELETE category
export const deleteCategoryService = async (id: number) => {
    await db.delete(CategoryTable).where(eq(CategoryTable.id, id));
    return "category deleted successfully";
}