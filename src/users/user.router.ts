import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";
import { getUsersController, getUsersByIdController, createUsersController, deleteUsersController, updateUsersController } from "./user.controller";

export const userRouter = new Hono();

userRouter.get("/user", getUsersController);

userRouter.get("/user/:id", getUsersByIdController);

userRouter.post("/user",zValidator("json",userSchema, (result,c) =>{
    if (!result.success) {
        return c.json(  result.error , 400);
    }
}), createUsersController)

userRouter.delete("/user/:id", deleteUsersController);

userRouter.put("/user/:id", updateUsersController);



