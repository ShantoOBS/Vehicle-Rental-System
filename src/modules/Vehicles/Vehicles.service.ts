import { pool } from "../../config/db"
import bcrypt from "bcryptjs";

const createVehical=async(name:string,email:string,password:string,phone:string,role:string )=>{

           const hasPass=await bcrypt.hash(password, 10);
       
            const result= await pool.query(`
                  INSERT INTO users(name,email,password,phone,role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
                  [name,email,hasPass,phone,role]);
            
           return result;
}

export const vehicalService={
     createVehical,
}