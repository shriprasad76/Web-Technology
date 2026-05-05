CREATE DATABASE IF NOT EXISTS garage_monitor;
USE garage_monitor;

CREATE TABLE IF NOT EXISTS vehicles (
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

CREATE TABLE IF NOT EXISTS vehicle_problems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_id INT NOT NULL,
  problem_description TEXT NOT NULL,
  reported_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  resolved TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
);
