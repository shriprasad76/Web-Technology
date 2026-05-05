# Garage Monitoring System

A simple full stack garage monitoring project with React frontend and Express backend.

## Setup

### 1. Create the MySQL database and tables

Use MySQL and run the SQL script from `database.sql` or execute these queries manually.

```sql
CREATE DATABASE IF NOT EXISTS garage_monitor;
USE garage_monitor;

CREATE TABLE vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(20) NOT NULL,
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'in_garage',
  arrival_date DATE NOT NULL,
  delivery_date DATE NULL,
  notes TEXT,
  is_for_sale TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE vehicle_problems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_id INT NOT NULL,
  problem_description TEXT NOT NULL,
  reported_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  resolved TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
);
```

### 2. Backend setup

Open a terminal in `backend`:

```bash
cd backend
npm install
```

Edit `backend/db.js` and update MySQL credentials if needed.

Run backend:

```bash
npm run dev
```

The backend will run at `http://localhost:5000`.

### 3. Frontend setup

Open a terminal in `frontend`:

```bash
cd frontend
npm install
npm run dev
```

Then open the displayed Vite URL in the browser.

## What is included

- Add and remove vehicles
- Two-wheeler and four-wheeler support
- Delivery date and status tracking
- Notes and problem reporting
- Simple React UI with filters
- Express API connecting to MySQL

## Notes

- `backend/db.js` uses `root` / `password` by default; change this before running.
- The frontend fetches from `http://localhost:5000/api/vehicles`.
