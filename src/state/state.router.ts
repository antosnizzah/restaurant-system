import { Hono } from "hono";

import {getStateByIdController,getStateController,deleteStateController,updateStateController,createStateController, } from "./state.controller";

export const stateRouter = new Hono();

stateRouter.get("/state", getStateController);

stateRouter.get("/state/:id", getStateByIdController);

stateRouter.delete("/state/:id", deleteStateController);

stateRouter.put("/state/:id", updateStateController);

stateRouter.post("/state", createStateController);

