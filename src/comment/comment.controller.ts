
import { Context } from "hono";
import { getCommentService,getCommentByIdService,updateCommentService,createCommentService,deleteCommentService} from "./comment.service";

// get all comment
export const getCommentController = async (c: Context) => {
    try {
        const comment = await getCommentService();
        if (comment == null || comment.length == 0) {
            return c.text("No comment found", 404);
        }
        return c.json(comment, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get comment by id
export const getCommentByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const comment = await getCommentByIdService(id);
        if (comment == null) {
            return c.text("comment not found", 404);
        }
        return c.json(comment, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create comment
export const createCommentController = async (c: Context) => {
    try {
        const comment = await c.req.json();
        const newComment = await createCommentService(comment);

        if (!newComment) return c.text("comment not created", 400);
        return c.json({ message: newComment }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update comment
export const updateCommentController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const comment = await c.req.json();

        // search for comment by id
        const updatedcomment = await getCommentByIdService(id);
        if (!updatedcomment === undefined) return c.text("comment not found", 404);

        // get data to update
        const res = await updateCommentService(id, comment);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete comment

export const deleteCommentController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for comment by id
        const comment = await getCommentByIdService(id);
        if (!comment) return c.text("comment not found", 404);

        // delete comment
        const res = await deleteCommentService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};