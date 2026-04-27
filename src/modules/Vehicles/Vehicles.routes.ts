import express, { Router } from 'express'
import { vehicleController } from './Vehicles.controller';
const routes=express.Router();
import auth from '../../middleware/auth';

routes.post("/",auth("admin"),vehicleController.createVehicle);

routes.get("/",vehicleController.getVehical);

routes.get("/:vehicleId",vehicleController.getSingleVehical);

routes.put("/:vehicleId",auth("admin"),vehicleController.updateVehicle);

routes.delete("/:vehicleId",auth("admin"),vehicleController.deleteVehicle);





export const vehiclesRoutes=routes;