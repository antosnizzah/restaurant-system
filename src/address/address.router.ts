import { Hono } from 'hono'
import { getAddressesController, getAddressByIdController, createAddressController, updateAddressController, deleteAddressController } from "./address.controller";
export const AddressRouter = new Hono();

AddressRouter.get("/address", getAddressesController);

AddressRouter.get("/address/:id", getAddressByIdController);

AddressRouter.post("/address", createAddressController);

AddressRouter.put("/address/:id", updateAddressController);

AddressRouter.delete("/address/:id", deleteAddressController);

