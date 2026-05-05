# Node.js SQL CRUD Example

## Objective
Connect a Node.js application with a SQL database and perform CRUD operations.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Update `index.js` with your MySQL credentials:
   - `host`
   - `user`
   - `password`
   - `database`

3. Create the database and table in MySQL:

```sql
CREATE DATABASE IF NOT EXISTS node_crud;
USE node_crud;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Run the app
```bash
npm start
```

## API Endpoints
- `POST /users` - create a new user
- `GET /users` - get all users
- `GET /users/:id` - get user by id
- `PUT /users/:id` - update user by id
- `DELETE /users/:id` - delete user by id

## Postman JSON examples

Insert user:
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "age": 22
}
```

Update user:
```json
{
  "name": "Alice Updated",
  "email": "alice.updated@example.com",
  "age": 23
}
```

## Notes
- No frontend is included.
- Use Postman to send JSON body requests.
