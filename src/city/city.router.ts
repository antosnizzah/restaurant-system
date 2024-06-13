import { Hono } from "hono";
import { getCityByIdController,getCityController,updateCityController,deleteCityController,createCityController } from "./city.controller";
export const CityRouter = new Hono();
import { adminRoleAuth } from "../middleware/bearAuth";

CityRouter.get("/city/:id", getCityByIdController);

CityRouter.get("/city", getCityController);

CityRouter.delete("/city/:id", adminRoleAuth, deleteCityController);

CityRouter.post("/city", adminRoleAuth,createCityController);

CityRouter.put("/city/:id",adminRoleAuth, updateCityController);




