import { Hono } from "hono";
import { getCityByIdController,getCityController,updateCityController,deleteCityController,createCityController } from "./city.controller";
export const CityRouter = new Hono();

CityRouter.get("/city/:id", getCityByIdController);

CityRouter.get("/city", getCityController);

CityRouter.delete("/city/:id", deleteCityController);

CityRouter.post("/city", createCityController);

CityRouter.put("/city/:id", updateCityController);




