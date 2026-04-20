import express, { Router } from 'express'
import { vehicleController } from './Vehicles.controller';
const routes=express.Router();


routes.post("/",vehicleController.createVehicle);

routes.get("/",vehicleController.getVehical);

routes.get("/:vehicleId",vehicleController.getSingleVehical);

routes.put("/:vehicleId",vehicleController.updateVehicle);

routes.delete("/:vehicleId",vehicleController.deleteVehicle);





export const vehiclesRoutes=routes;