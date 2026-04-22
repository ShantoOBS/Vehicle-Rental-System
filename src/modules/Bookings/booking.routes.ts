import express from "express"
import { bookingController } from "./booking.controller";


const routes=express.Router();


routes.post("/",bookingController.createBooking);


export const bookingRoutes=routes;



