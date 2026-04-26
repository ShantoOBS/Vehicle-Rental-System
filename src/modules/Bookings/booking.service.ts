import { pool } from "../../config/db";

const createBooking = async (
  customer_id: number,
  vehicle_id: number,
  rent_start_date: string,
  rent_end_date: string
) => {


  const vehicleRes = await pool.query(
    `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  const vehicle = vehicleRes.rows[0];


  if (!vehicle) {
    throw new Error("Vehicle not found");
  }


  await pool.query(
    `UPDATE vehicles SET availability_status=$1 WHERE id=$2`,
    ["booked", vehicle_id]
  );

  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  const timeDiff = end.getTime() - start.getTime();
  const number_of_days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const total_price = vehicle.daily_rent_price * number_of_days;

  const result = await pool.query(
    `INSERT INTO bookings 
     (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, "active"]
  );

  const booking = result.rows[0];


  return {
    booking,
    vehicle
  };
};

const updateBooking = async (status: string, bookingId: string) => {

  const vehicle = await pool.query(`SELECT vehicle_id FROM bookings WHERE id=$1 `, [bookingId]);

  const vehicle_id = vehicle.rows[0].vehicle_id;

  await pool.query(
    `UPDATE vehicles SET availability_status=$1 WHERE id=$2`,
    ["available", vehicle_id]
  );

  return await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`, [status, bookingId]);

}

const getBooking = async (isAdmin:string) => {

   


   if(isAdmin=="admin"){
     return await pool.query(`
SELECT 
    b.id,
    b.customer_id,
    b.vehicle_id,
    b.rent_start_date,
    b.rent_end_date,
    b.total_price,
    b.status,

    json_build_object(
        'name', u.name,
        'email', u.email
    ) AS customer,

    json_build_object(
        'vehicle_name', v.vehicle_name,
        'registration_number', v.registration_number
    ) AS vehicle

FROM bookings b
JOIN users u ON b.customer_id = u.id
JOIN vehicles v ON b.vehicle_id = v.id;
`);
   }else{

        return await pool.query(`
SELECT 
    b.id,
    b.customer_id,
    b.vehicle_id,
    b.rent_start_date,
    b.rent_end_date,
    b.total_price,
    b.status,

  
    json_build_object(
        'vehicle_name', v.vehicle_name,
        'registration_number', v.registration_number,
        'type' , v.type
    ) AS vehicle

FROM bookings b

JOIN vehicles v ON b.vehicle_id = v.id;
`);

   }


 

}



export const bookingService = {
  createBooking,
  updateBooking,
  getBooking
};