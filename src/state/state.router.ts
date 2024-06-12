import { Hono } from "hono";
import { adminRoleAuth } from "../middleware/bearAuth";

import {getStateByIdController,getStateController,deleteStateController,updateStateController,createStateController, } from "./state.controller";

export const stateRouter = new Hono();

stateRouter.get("/state", getStateController);

stateRouter.get("/state/:id", getStateByIdController);

stateRouter.delete("/state/:id",adminRoleAuth, deleteStateController);

stateRouter.put("/state/:id",adminRoleAuth, updateStateController);

stateRouter.post("/state", adminRoleAuth,createStateController);

