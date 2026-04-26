import { Request, Response } from "express";
import { userService } from "./user.service";



const getUser = async (req: Request, res: Response) => {

 

    try {
        const result = await userService.getUser();

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,
        })

    } catch (err: any) {

        res.status(500).json({
            success: false,
            message: err.message
        })
      }

    }


const getSingleUser = async (req: Request, res: Response) => {
   
     
 

    try {
        const result = await userService.getSingleUser(req.params.userId as string);

        res.status(200).json({
            success: true,
            message: "Single Users retrieved successfully",
            data: result.rows,
        })

    } catch (err: any) {

        res.status(500).json({
            success: false,
            message: err.message
        })
      }

    }


const updateUser = async (req: Request, res: Response) => {
   
     const{name,email,phone,role}=req.body;
 

    try {
        const result = await userService.updateUser( name,email,phone,role,req.params.userId as string);

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows,
        })

    } catch (err: any) {

        res.status(500).json({
            success: false,
            message: err.message
        })
      }

    }

const deleteUser = async (req: Request, res: Response) => {
   

    try {
        const result = await userService.deleteUser(req.params.userId as string);

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            
        })

    } catch (err: any) {

        res.status(500).json({
            success: false,
            message: err.message
        })
      }

    }




    export const userController={
          
          getUser,
          getSingleUser,
          updateUser,
          deleteUser
    }
