import express from 'express'
import { userController } from './user.controller';

const routes=express.Router();


routes.post("/",userController.createUser);

routes.get("/",userController.getUser);

routes.get("/:userId",userController.getSingleUser);

routes.put("/:userId",userController.updateUser);

routes.delete("/:userId",userController.deleteUser);



export const userRoutes=routes;