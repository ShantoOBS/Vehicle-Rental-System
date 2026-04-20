import { Request, Response } from "express";
import { vehicalService } from "./Vehicles.service";

const createVehicle = async (req: Request, res: Response) => {

    const { vehicle_name,type,registration_number,daily_rent_price,availability_status} = req.body;

    try {
        const result = await vehicalService.createVehical(vehicle_name,type,registration_number,daily_rent_price,availability_status);

        res.status(200).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0],
        })

    } catch (err: any) {

        res.status(500).json({
            success: false,
            message: err.message
        })
      }

    }


const getVehical = async (req: Request, res: Response) => {

    

    try {
        const result = await vehicalService.getVehical();
        
        if(result.rows.length){
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows,
        })
    }else{

         res.status(200).json({
            success: true,
            message: "No vehicles found",
            data: result.rows,
        })
         
    }

    } catch (err: any) {

        res.status(500).json({
            success: false,
            message: err.message
        })
      }

    }


const getSingleVehical = async (req: Request, res: Response) => {

    

    try {
        const result = await vehicalService.getSingleVehical(req.params.vehicleId as string);
        
       
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows[0],
        })
   
         
    } catch (err: any) {

        res.status(500).json({
            success: false,
            message: err.message
        })
      }

    }


    const updateVehicle = async (req: Request, res: Response) => {

    const { vehicle_name,type,registration_number,daily_rent_price,availability_status} = req.body;

    try {
        const result = await vehicalService.updateVehical(vehicle_name,type,registration_number,daily_rent_price,availability_status,req.params.vehicleId as string);

        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: result.rows[0],
        })

    } catch (err: any) {

        res.status(500).json({
            success: false,
            message: err.message
        })
      }

    }



const deleteVehicle= async (req: Request, res: Response) => {
   

    try {
        const result = await vehicalService.deleteVehical(req.params.vehicleId as string);

        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully",
            
        })

    } catch (err: any) {

        res.status(500).json({
            success: false,
            message: err.message
        })
      }

    }

    export const vehicleController={
          createVehicle,
          getVehical,
          getSingleVehical,
          updateVehicle,
          deleteVehicle
    }