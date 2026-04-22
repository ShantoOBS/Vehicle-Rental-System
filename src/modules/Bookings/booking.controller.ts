import { Request,Response} from "express";
import { bookingService } from "./booking.service";

const createBooking=async(req:Request,res:Response)=>{
      const {customer_id, vehicle_id, rent_start_date, rent_end_date}=req.body;

      try{
      const result=await bookingService.createBooking(customer_id, vehicle_id, rent_start_date, rent_end_date);

     res.status(201).json({   
         success: true,
        message: "Booking created successfully",
        data: {
      ...result.booking,
        vehicle: {
        vehicle_name: result.vehicle.vehicle_name,
        daily_rent_price: result.vehicle.daily_rent_price
        }
       }
      })

      }catch (err: any) {

        res.status(500).json({
            success: false,
            message: err.message
        })
      }
      
}

export const bookingController={
     createBooking,
}