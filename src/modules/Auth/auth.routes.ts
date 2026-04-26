import express from 'express'

import { authController } from './auth.controller';

const routes=express.Router();


 routes.post("/signup",authController.createUser);

 

export const  authRoutes=routes   
