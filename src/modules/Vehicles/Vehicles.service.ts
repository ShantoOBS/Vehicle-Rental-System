import { pool } from "../../config/db"


const createVehical=async(vehicle_name:string,type:string,registration_number:string,daily_rent_price:string,availability_status:string )=>{

          
       
            return await pool.query(`
                  INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
                  [vehicle_name,type,registration_number,daily_rent_price,availability_status]);
            
        
}

const getVehical=async()=>{
      
      return await pool.query(`
           SELECT * FROM vehicles 
          `);
}

const getSingleVehical=async(id:string)=>{
      
      return await pool.query(`
           SELECT * FROM vehicles WHERE id=$1 
          `,[id]);
}

const updateVehical=async(vehicle_name:string,type:string,registration_number:string,daily_rent_price:string,availability_status:string,vehicleId:string )=>{

          
       
            return await pool.query(`
                  UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5  WHERE id=$6 RETURNING *`,
                  [vehicle_name,type,registration_number,daily_rent_price,availability_status,vehicleId]);
            
        
}

const deleteVehical=async(id:string)=>{
       
     return await pool.query(`DELETE FROM vehicles WHERE id=$1`,[id]);
}




export const vehicalService={
     createVehical,
     getVehical,
     getSingleVehical,
     updateVehical,
     deleteVehical

}