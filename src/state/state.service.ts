import db from "../drizzle/db";
import { StateTable, TSState,TIState, } from "../drizzle/schema";
import { eq } from "drizzle-orm";




// GET ALL  State 
export const getStateService = async (): Promise<TSState[] | null> => {
    const State = await db.query.StateTable.findMany();
    return State;
};

// GET State BY ID
export const getStateByIdService = async (id: number): Promise<TSState | undefined> => {
    const State = await db.query.StateTable.findFirst({
        where: eq(StateTable.id, id)
    });
    return State;
}

// CREATE State
export const createStateService = async (item: TIState) => {
    await db.insert(StateTable).values(item)
    return "State created successfully";
}

//  UPDATE State
export const updateStateService = async (id: number, item: TIState) => {
    await db.update(StateTable).set(item).where(eq(StateTable.id, id));
    return "State  updated successfully";
}

// DELETE State
export const deleteStateService = async (id: number) => {
    await db.delete(StateTable).where(eq(StateTable.id, id));
    return "State  deleted successfully";
}

