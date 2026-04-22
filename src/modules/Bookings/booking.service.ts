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

 
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  const timeDiff = end.getTime() - start.getTime();
  const number_of_days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  
  const total_price = vehicle.daily_rent_price * number_of_days;

 
  const result = await pool.query(
    `INSERT INTO bookings 
     (user_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
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



export const bookingService={ 
    createBooking
};