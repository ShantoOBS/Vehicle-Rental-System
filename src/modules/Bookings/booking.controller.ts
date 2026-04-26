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

const updateBooking = async (req: Request, res: Response) => {
   
     const{status}=req.body;
 

    try {
        const result = await bookingService.updateBooking( status,req.params.bookingId as string);

        if(status=="returned"){
              res.status(200).json({
            success: true,
            message: `Booking marked as returned. Vehicle is now available`,
            data: {
                ...result.rows[0],
                 "vehicle": {
                 "availability_status": "available"
               }
            },
         })
        }else{
            res.status(200).json({
            success: true,
            message: `Booking ${status} successfully`,
            data: result.rows[0],
        })
        }      

    } catch (err: any) {

        res.status(500).json({
            success: false,
            message: err.message
        })
      }

    }

const getBooking= async(req:Request,res:Response)   =>{
          

     try {
        const result = await bookingService.getBooking("c");

    
            res.status(200).json({
            success: true,
            message: `Bookings retrieved successfully`,
            data: result.rows,
         
        }  )    

    } catch (err: any) {

        res.status(500).json({
            success: false,
            message: err.message
        })
      }


     
}

export const bookingController={
     createBooking,
     updateBooking,
     getBooking
}