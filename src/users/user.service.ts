import db from "../drizzle/db";
import { UsersTable ,TIUser ,TSUser} from "../drizzle/schema";
import { CommentTable } from "../drizzle/schema";

import { eq } from "drizzle-orm"; 



// GET ALL Users with a limit
export const getUsersService = async (limit: number): Promise<TSUser[] | null> => {
    const Users = await db.query.UsersTable.findMany({
        limit: limit
    });
    return Users;
};


// GET Users BY ID
export const getUsersByIdService = async (id: number) => {
    const Users = await db.query.UsersTable.findFirst({
        where: eq(UsersTable.id, id),
        columns:{
            name: true,
            contact_phone: true,
            email: true
        }
    });
}

// CREATE Users
export const createUsersService = async (item: TIUser) => {
    await db.insert(UsersTable).values(item)
    return "User created successfully";
}

//  UPDATE Users
export const updateUsersService = async (id: number, item: TIUser) => {
    await db.update(UsersTable).set(item).where(eq(UsersTable.id, id));
    return "User  updated successfully";
}

// DELETE Users
export const deleteUsersService = async (id: number) => {
    await db.delete(UsersTable).where(eq(UsersTable.id, id));
    return "User  deleted successfully";
}

// user getting his/her comment
export const getUserComments = async (userId: number) => {
    const userComments = await db
        .select()
        .from(CommentTable)
        .where(eq(CommentTable.user_id, userId))
        .execute();
    
    return userComments;
};