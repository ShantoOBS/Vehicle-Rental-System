import express from "express"
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";


const routes=express.Router();


routes.post("/",auth('admin','customer'),bookingController.createBooking);

routes.put("/:bookingId",auth('admin','customer'), bookingController.updateBooking);

routes.get("/",auth('admin','customer'),bookingController.getBooking);


export const bookingRoutes=routes;



