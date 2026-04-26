import { pool } from "../../config/db";




const getUser=async()=>{
       
     return await pool.query(`SELECT * FROM users`);
}

const getSingleUser=async(id:string)=>{
       
     return await pool.query(`SELECT * FROM users WHERE id=$1`,[id]);
}

const updateUser=async(name:string,email:string,phone:string,role:string,userId:string)=>{
       
     return await pool.query(`UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`,[name,email,phone,role,userId]);
}


const deleteUser=async(id:string)=>{
       
     return await pool.query(`DELETE FROM users WHERE id=$1`,[id]);
}


export const userService={
   
     getUser,
     getSingleUser,
     updateUser,
     deleteUser

}