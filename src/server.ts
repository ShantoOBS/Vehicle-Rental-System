import express,{ Request,Response } from 'express'
import initDB from './config/db'
import { userRoutes } from './modules/Users/user.routes';
import { vehiclesRoutes } from './modules/Vehicles/Vehicles.routes';




const app = express()
const port = 5000

app.use(express.json());
app.use(express.urlencoded());

initDB();

// user curd operation
app.use("/api/v1/users",userRoutes)

// vehical curd operation
app.use("/api/v1/vehicles",vehiclesRoutes)





app.get('/', (req:Request, res:Response) => {
  res.send('Vehicle Rental System')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
