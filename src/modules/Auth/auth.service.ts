import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { config } from "../../config";

const createUser=async(name:string,email:string,password:string,phone:string,role:string )=>{

           const hasPass=await bcrypt.hash(password, 10);
       
            const result= await pool.query(`
                  INSERT INTO users(name,email,password,phone,role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
                  [name,email,hasPass,phone,role]);
            
           return result;
}


const userLogin=async(email:string,password:string)=>{
         const data=await pool.query(`SELECT * FROM users WHERE email=$1`,[email]);

         if(data.rows.length==0)return null;
         
         const user=data.rows[0];

         const match=bcrypt.compare(password,user.password);

         if(!match)return false;

         const token=jwt.sign(user,config.token_secret as string,{ expiresIn: '7d' });


         console.log(token);

         return {"token":token,"user":{...data.rows[0]}};




      
}

export const authService={

      createUser,
      userLogin
      
}
