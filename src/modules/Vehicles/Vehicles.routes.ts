import express, { Router } from 'express'
import { vehicleController } from './Vehicles.controller';
const routes=express.Router();


routes.post("/",vehicleController.createVehicle);




export const vehiclesRoutes=routes;