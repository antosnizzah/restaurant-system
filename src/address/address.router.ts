import { Hono } from 'hono'
import { getAddressesController, getAddressByIdController, createAddressController, updateAddressController, deleteAddressController } from "./address.controller";
export const AddressRouter = new Hono();
import { driverRoleAuthenticate } from '../middleware/bearAuth';
import  {adminRoleAuth} from '../middleware/bearAuth';
import { rerstaurantRoleAuthenticate } from '../middleware/bearAuth';

AddressRouter.get("/address", getAddressesController);

AddressRouter.get("/address/:id", getAddressByIdController);

AddressRouter.post("/address", createAddressController);

AddressRouter.put("/address/:id", updateAddressController);

AddressRouter.delete("/address/:id", deleteAddressController);

