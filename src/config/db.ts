import { Pool } from 'pg'
import { config } from '.';

export const pool = new Pool({
    connectionString: `${config.connection_str}`,
    ssl: {
        rejectUnauthorized: false,
    }
});

const initDB = async () => {

    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            role VARCHAR(20) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT chk_password_length CHECK (CHAR_LENGTH(password) >= 6),
            CONSTRAINT chk_role CHECK (role IN ('ADMIN', 'CUSTOMER'))
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            vehicle_name VARCHAR(150) NOT NULL,
            type VARCHAR(10) NOT NULL,
            registration_number VARCHAR(100) NOT NULL UNIQUE,
            daily_rent_price DECIMAL(10,2) NOT NULL,
            availability_status VARCHAR(10) DEFAULT 'AVAILABLE',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT chk_vehicle_type CHECK (type IN ('CAR', 'BIKE', 'VAN', 'SUV')),
            CONSTRAINT chk_availability CHECK (availability_status IN ('AVAILABLE', 'BOOKED')),
            CONSTRAINT chk_price_positive CHECK (daily_rent_price > 0)
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
            rent_start_date DATE NOT NULL,
            rent_end_date DATE NOT NULL,
            total_price DECIMAL(10,2) NOT NULL,
            status VARCHAR(20) DEFAULT 'ACTIVE',

            CONSTRAINT chk_date CHECK (rent_end_date > rent_start_date),
            CONSTRAINT chk_total_price CHECK (total_price > 0),
            CONSTRAINT chk_status CHECK (status IN ('ACTIVE', 'CANCELLED', 'RETURNED'))
        );
    `);

};

export default initDB;