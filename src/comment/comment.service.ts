import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { CommentTable,TSComment,TIComment} from "../drizzle/schema";

// GET ALL comment
export const getCommentService = async (): Promise<TSComment[] | null> => {
    const comment = await db.query.CommentTable.findMany();
    return comment;
};

// GET COMMENT BY ID
export const getCommentByIdService = async (id: number): Promise<TSComment | undefined> => {
    const comment = await db.query.CommentTable.findFirst({
        where: eq(CommentTable.id, id)
    });
    return comment;
}

// CREATE comment
export const createCommentService = async (comment: TIComment) => {
    await db.insert(CommentTable).values(comment)
    return "comment created successfully";
}

//  UPDATE comment
export const updateCommentService = async (id: number, comment: TIComment) => {
    await db.update(CommentTable).set(comment).where(eq(CommentTable.id, id));
    return "comment updated successfully";
}

// DELETE comment
export const deleteCommentService = async (id: number) => {
    await db.delete(CommentTable).where(eq(CommentTable.id, id));
    return "comment deleted successfully";
}