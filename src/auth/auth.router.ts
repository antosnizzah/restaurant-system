import { Hono } from "hono";
import { authorizeUsersSchema,updateauthorizeUsersSchema } from "../validators";
import { createAuthorizeUsersController } from "./auth.controller";
import { updateAuthorizeUsersController } from "./auth.controller";
import { zValidator } from "@hono/zod-validator";

export const authRouter = new Hono();
export const authupdateRouter = new Hono();

authRouter.post("/auth", zValidator('json',authorizeUsersSchema,(result,c)=>{
    if(!result.success){
        return c.json(result.error, 400)
    }

}), createAuthorizeUsersController)



authRouter.put("/update/auth/:id", zValidator('json', updateauthorizeUsersSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), updateAuthorizeUsersController);




