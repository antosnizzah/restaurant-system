import { Hono } from "hono";
import { getCommentController,getCommentByIdController,updateCommentController,deleteCommentController,createCommentController } from "./comment.controller";
import { adminRoleAuth } from "../middleware/bearAuth";

export const CommentRouter = new Hono();

CommentRouter.get("/comment", getCommentController);

CommentRouter.get("/comment/:id", getCommentByIdController);

CommentRouter.put("/comment/:id",updateCommentController);

CommentRouter.delete("/comment/:id",adminRoleAuth, deleteCommentController);

CommentRouter.post("/comment", createCommentController);
