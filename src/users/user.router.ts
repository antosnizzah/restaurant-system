import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";
import { adminRoleAuth,adminRoleAuthenticate,userRoleAuth,adminuserAuth } from "../middleware/bearAuth";
import { getUsersController,handleGetUserComments, getUsersByIdController, createUsersController, deleteUsersController, updateUsersController } from "./user.controller";

export const userRouter = new Hono();

userRouter.get('/user/:userId/comments', handleGetUserComments);

userRouter.get("user", adminuserAuth,getUsersController);

userRouter.get("/user/:id", getUsersByIdController);

userRouter.post("/user",zValidator("json",userSchema, (result,c) =>{
    if (!result.success) {
        return c.json(  result.error , 400);
    }
}), createUsersController)

userRouter.delete("/user/:id", deleteUsersController);

userRouter.put("/user/:id", updateUsersController);



