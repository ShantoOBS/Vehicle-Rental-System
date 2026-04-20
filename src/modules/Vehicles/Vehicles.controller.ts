import { Request, Response } from "express";
import { vehicalService } from "./Vehicles.service";

const createVehicle = async (req: Request, res: Response) => {

    const { name, email, password, phone, role } = req.body;

    try {
        const result = await vehicalService.createVehical(name, email, password, phone, role);

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

    export const vehicleController={
          createVehicle,
    }