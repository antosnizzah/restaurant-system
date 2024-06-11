import "dotenv/config";
import { Context } from "hono";
import { createAuthorizeUsersService } from "./auth.service";
import { updateAuthorizeUsersService } from "./auth.service";
import bycrpt from "bcrypt";


export const createAuthorizeUsersController = async (c: Context) => {
    try{
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword=await bycrpt.hash(pass, 10);
        user.password=hashedPassword;
        const createdUser = await createAuthorizeUsersService(user);

        if (!createdUser) return c.text("User not created", 404);
        return c.json({ message: createdUser }, 201);

    }catch (err:any) {
        return c.json({ error: err?.message }, 400);
    }
}

export const updateAuthorizeUsersController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        
        const user = await c.req.json();
        if (!user.password) {
            return c.text("Password is required", 400);
        }
        
        const hashedPassword = await bycrpt.hash(user.password, 10);
        user.password = hashedPassword;

        const updatedUser = await updateAuthorizeUsersService(id, user);
        if (!updatedUser) {
            return c.text("User not updated", 404);
        }
        return c.json({ message: updatedUser }, 200);
    } catch (error: any) {
        console.error('Controller error:', error);
        return c.json({ error: error?.message }, 500);
    }
}