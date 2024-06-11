import db from "../drizzle/db";
import { UsersTable ,TIUser ,TSUser} from "../drizzle/schema";

import { eq } from "drizzle-orm"; 



// GET ALL Users 
export const getUsersService = async (): Promise<TSUser[] | null> => {
    const Users = await db.query.UsersTable.findMany();
    return Users;
};

// GET Users BY ID
export const getUsersByIdService = async (id: number): Promise<TSUser| undefined> => {
    const Users = await db.query.UsersTable.findFirst({
        where: eq(UsersTable.id, id)
    });
    return Users;
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

