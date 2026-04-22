import express from "express"
import { bookingController } from "./booking.controller";


const routes=express.Router();


routes.post("/",bookingController.createBooking);

routes.put("/:bookingId",bookingController.updateBooking);


export const bookingRoutes=routes;



