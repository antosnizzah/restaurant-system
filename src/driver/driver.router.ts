import { Hono } from "hono";
import { getDriverByIdController,getDriverController,updateDriverController,deleteDriverController,createDriverController } from "./driver.controller";
 export const DriverRouter = new Hono();
    DriverRouter.get("/driver", getDriverController);
    DriverRouter.get("/driver/:id", getDriverByIdController);
    DriverRouter.put("/driver/:id", updateDriverController);
    DriverRouter.delete("/driver/:id", deleteDriverController);
    DriverRouter.post("/driver", createDriverController);



 











