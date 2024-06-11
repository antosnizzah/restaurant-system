
import { Context } from "hono";
import {getStateByIdService,getStateService,deleteStateService,createStateService,updateStateService,} from "./state.service";

// get all State
export const getStateController = async (c: Context) => {
    try {
        const State = await getStateService();
        if (State == null || State.length == 0) {
            return c.text("No State  found", 404);
        }
        return c.json(State, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get State  by id
export const getStateByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const State = await getStateByIdService(id);
        if (State == null) {
            return c.text("State   not found", 404);
        }
        return c.json(State, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create  State 
export const createStateController = async (c: Context) => {
    try {
        const State = await c.req.json();
        const newState= await createStateService(State);

        if (!newState) return c.text("State not created", 400);
        return c.json({ message: newState}, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update State 
export const updateStateController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const State = await c.req.json();

        // search for  State  by id
        const updatedState = await getStateByIdService(id);
        if (!updatedState === undefined) return c.text("State  not found", 404);

        // get data to State 
        const res = await updateStateService(id, State);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete  State

export const deleteStateController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for State by id
        const State = await getStateByIdService(id);
        if (!State) return c.text("State not found", 404);

        // delete order 
        const res = await deleteStateService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};