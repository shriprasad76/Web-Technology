# College Lab Evaluation System

This repository contains a full-stack college lab evaluation system with a React frontend and Node.js/Express backend using MySQL and Sequelize.

## Project Structure

- `backend/` - Express API, MVC structure, Sequelize models, JWT auth
- `frontend/` - React + Vite app with role-based navigation

## Backend Setup

1. Create MySQL database `student_lab`.
2. Copy `backend/.env.example` to `backend/.env`.
3. Update `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `JWT_SECRET`.
4. Install dependencies:
   - `cd backend && npm install`
5. Start backend server:
   - `npm run dev`

Default admin user is seeded automatically:
- Email: `admin@college.com`
- Password: `admin123`

## Frontend Setup

1. Install dependencies:
   - `cd frontend && npm install`
2. Start frontend:
   - `npm run dev`
3. Open the displayed URL (usually `http://localhost:3000`).

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and receive JWT

### Admin
- `POST /api/admin/departments`
- `GET /api/admin/departments`
- `POST /api/admin/years`
- `POST /api/admin/divisions`
- `POST /api/admin/batches`
- `POST /api/admin/students`
- `POST /api/admin/subjects`
- `GET /api/admin/subjects`
- `POST /api/admin/users`
- `GET /api/admin/users`

### Faculty
- `POST /api/faculty/practicals`
- `POST /api/faculty/evaluations`
- `GET /api/faculty/students`
- `GET /api/faculty/practicals`

### Student
- `GET /api/student/results`

## SQL Schema

Use these queries to create the database and tables manually, or let Sequelize sync them automatically.

```sql
CREATE DATABASE IF NOT EXISTS student_lab;
USE student_lab;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','faculty','student') NOT NULL DEFAULT 'student',
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

CREATE TABLE years (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  departmentId INT,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (departmentId) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE divisions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  yearId INT,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (yearId) REFERENCES years(id) ON DELETE SET NULL
);

CREATE TABLE batches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  divisionId INT,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (divisionId) REFERENCES divisions(id) ON DELETE SET NULL
);

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rollNumber VARCHAR(255) NOT NULL UNIQUE,
  userId INT UNIQUE,
  batchId INT,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (batchId) REFERENCES batches(id) ON DELETE SET NULL
);

CREATE TABLE subjects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  totalPracticals INT NOT NULL DEFAULT 12,
  departmentId INT,
  facultyId INT,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (departmentId) REFERENCES departments(id) ON DELETE SET NULL,
  FOREIGN KEY (facultyId) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE practicals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  practicalNumber INT NOT NULL,
  description TEXT,
  subjectId INT,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (subjectId) REFERENCES subjects(id) ON DELETE SET NULL
);

CREATE TABLE evaluations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  attendance INT NOT NULL DEFAULT 0,
  journal INT NOT NULL DEFAULT 0,
  performance INT NOT NULL DEFAULT 0,
  viva1 INT NOT NULL DEFAULT 0,
  viva2 INT NOT NULL DEFAULT 0,
  viva3 INT NOT NULL DEFAULT 0,
  finalScore FLOAT NOT NULL DEFAULT 0,
  studentId INT,
  facultyId INT,
  subjectId INT,
  practicalId INT,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (facultyId) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (subjectId) REFERENCES subjects(id) ON DELETE SET NULL,
  FOREIGN KEY (practicalId) REFERENCES practicals(id) ON DELETE SET NULL
);
```

## Notes

- The admin user is seeded automatically on backend startup.
- Use `admin@college.com` / `admin123` to log in as admin.
- Frontend assumes backend runs at `http://localhost:5000`.
- Add students and link them with `userId` to allow student results viewing.
