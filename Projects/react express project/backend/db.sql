-- Create database and tables for Garage Management System
CREATE DATABASE IF NOT EXISTS garage_db;
USE garage_db;

CREATE TABLE IF NOT EXISTS garage_cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  car_name VARCHAR(100) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  owner_name VARCHAR(100) NOT NULL,
  mobile_number VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  delivery_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS garage_expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  car_id INT NOT NULL,
  material_name VARCHAR(150) NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  labor_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  note VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (car_id) REFERENCES garage_cars(id) ON DELETE CASCADE
);

-- Sample queries
-- Insert new car
-- INSERT INTO garage_cars (car_name, brand, owner_name, mobile_number, email, delivery_date)
-- VALUES ('Swift', 'Maruti', 'Rahul Sharma', '9876543210', 'rahul@example.com', '2026-05-07');

-- Insert new expense
-- INSERT INTO garage_expenses (car_id, material_name, price, labor_cost, total_price, note)
-- VALUES (1, 'Brake pads', 1200.00, 500.00, 1700.00, 'Replaced front pads');

-- Upcoming deliveries in next 3 days
-- SELECT * FROM garage_cars WHERE delivery_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 3 DAY);
