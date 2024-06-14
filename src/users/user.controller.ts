import { Context } from "hono";

import {getUsersByIdService,getUserComments,getUsersService,createUsersService,deleteUsersService,updateUsersService  } from "./user.service";



// get all Users
export const getUsersController = async (c: Context) => {
    try {
        const limit = parseInt(c.req.query("limit") || "5");
        if (isNaN(limit) || limit <= 0) {
            return c.text("Invalid limit", 400);
        }
        const Users = await getUsersService(limit);
        if (Users == null || Users.length == 0) {
            return c.text("No Users found", 404);
        }
        return c.json(Users, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get Users  by id
export const getUsersByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const Users = await getUsersByIdService(id);
        if (Users == null) {
            return c.text("User  not found", 404);
        }
        return c.json(Users, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create  Users
export const createUsersController = async (c: Context) => {
    try {
        const Users = await c.req.json();
        const newUsers= await createUsersService(Users);

        if (!newUsers) return c.text("User not created", 400);
        return c.json({ message: newUsers}, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update Users 
export const updateUsersController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const Users = await c.req.json();

        // search for  Users  by id
        const updatedUsers = await getUsersByIdService(id);
        // if (!updatedUsers=== undefined) return c.text("User  not found", 404);

        // get data to Users
        const res = await updateUsersService(id, Users);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete  Users

export const deleteUsersController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for Users by id
        const Users = await getUsersByIdService(id);
        // if (!Users) return c.text("Users not found", 404);

        // delete order 
        const res = await deleteUsersService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};
export const handleGetUserComments = async (c: Context) => {
    try {
        const userId = parseInt(c.req.param('userId'));
        const comments = await getUserComments(userId);
        return c.json(comments, 200);
    } catch (error) {
        
    }
};