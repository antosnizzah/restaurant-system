
import { Context } from "hono";
import { getCategoryByIdService , getCategoryService, createCategoryService, updateCategoryService, deleteCategoryService } from "./category.service";

// get all category
export const getCategoryController = async (c: Context) => {
    try {
        const category = await getCategoryService();
        if (category == null || category.length == 0) {
            return c.text("No category found", 404);
        }
        return c.json(category, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get category by id
export const getCategoryByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const category = await getCategoryByIdService(id);
        if (category == null) {
            return c.text("category not found", 404);
        }
        return c.json(category, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create category
export const createCategoryController = async (c: Context) => {
    try {
        const category = await c.req.json();
        const newcategory= await createCategoryService(category);

        if (!newcategory) return c.text("category not created", 400);
        return c.json({ message: newcategory }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update category
export const updateCategoryController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const category = await c.req.json();

        // search for category by id
        const updatedAddress = await getCategoryByIdService(id);
        if (!updatedAddress === undefined) return c.text("category not found", 404);

        // get data to update
        const res = await updateCategoryService(id, category);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete category

export const deleteCategoryController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for category by id
        const category = await getCategoryByIdService(id);
        if (!category) return c.text("Address not found", 404);

        // delete category
        const res = await deleteCategoryService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};