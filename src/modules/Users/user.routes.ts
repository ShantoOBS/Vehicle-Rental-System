import express from 'express'
import { userController } from './user.controller';
import auth from '../../middleware/auth';
const routes=express.Router();



routes.get("/",auth('admin'),userController.getUser);

routes.get("/:userId",userController.getSingleUser);

routes.put("/:userId",auth('admin','customer'),userController.updateUser);

routes.delete("/:userId",auth('admin'),userController.deleteUser);



export const userRoutes=routes;