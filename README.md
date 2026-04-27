# Vehicle Rental System API

A modular backend API for managing users, vehicles, and rentals with role-based access control.

This project is built with `Node.js`, `TypeScript`, `Express`, and `PostgreSQL`, and it follows a feature-based module structure (`auth`, `users`, `vehicles`, `bookings`).

## Live Project

- Live API: `https://assignment-2-navy-eta.vercel.app/`
-

> Replace the links above with your real deployment and repository URLs.

## Key Features

- JWT-based authentication with signup and signin endpoints
- Role-based authorization for `admin` and `customer`
- User management (list, update, delete)
- Vehicle management (create, list, view, update, delete)
- Booking flow with automatic price calculation
- Vehicle availability auto-update on booking and return/cancellation
- PostgreSQL schema initialization on server startup

## Tech Stack

- Runtime: `Node.js`
- Language: `TypeScript`
- Framework: `Express.js`
- Database: `PostgreSQL` (`pg`)
- Auth: `jsonwebtoken`
- Password Hashing: `bcryptjs`
- Environment Config: `dotenv`

## Project Structure

```text
src/
  config/
    db.ts
    index.ts
  middleware/
    auth.ts
  modules/
    Auth/
    Users/
    Vehicles/
    Bookings/
  types/
    express/
  server.ts
```

## Getting Started

### Prerequisites

- `Node.js` 18+ (recommended)
- `PostgreSQL` database

### 1) Clone and install

```bash
git clone <your-repo-url>
cd Assignment-2
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```env
CONNECTION_STR=postgresql://<user>:<password>@<host>:<port>/<database>?sslmode=require
TOKEN_SECRET=your_super_secret_jwt_key
```

## Run the Project

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

By default, the API runs on:

- `http://localhost:5000`

## API Base URL

`/api/v1`

## Main Endpoints

### Auth

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/signin`

### Users

- `GET /api/v1/users` (admin only)
- `GET /api/v1/users/:userId`
- `PUT /api/v1/users/:userId` (admin or owner)
- `DELETE /api/v1/users/:userId` (admin only)

### Vehicles

- `POST /api/v1/vehicles` (admin only)
- `GET /api/v1/vehicles`
- `GET /api/v1/vehicles/:vehicleId`
- `PUT /api/v1/vehicles/:vehicleId` (admin only)
- `DELETE /api/v1/vehicles/:vehicleId` (admin only)

### Bookings

- `POST /api/v1/bookings` (admin/customer)
- `GET /api/v1/bookings` (admin/customer)
- `PUT /api/v1/bookings/:bookingId` (admin/customer)

## Documentation

- Detailed API reference: [`API_REFERENCE.md`](API_REFERENCE.md)
- Assignment requirements: [`Requirement.md`](Requirement.md)
- Submission instructions: [`SUBMISSION_GUIDE.md`](SUBMISSION_GUIDE.md)

## Response Pattern

Successful responses follow this structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error responses follow this structure:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Author

- Name: `Shanta Shil`
- Email: `roys22127@gamil.com`

---

If you are reviewing this project for assignment evaluation, use the API reference and submission guide linked above for exact endpoint behavior and submission format.
