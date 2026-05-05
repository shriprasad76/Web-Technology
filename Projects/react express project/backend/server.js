const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'manager',
  database: 'garage_db',
};

async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

app.get('/api/cars', async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM garage_cars ORDER BY id DESC');
    await conn.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load cars' });
  }
});

app.post('/api/cars', async (req, res) => {
  try {
    const { car_name, brand, owner_name, mobile_number, email, delivery_date } = req.body;
    const conn = await getConnection();
    await conn.execute(
      'INSERT INTO garage_cars (car_name, brand, owner_name, mobile_number, email, delivery_date) VALUES (?, ?, ?, ?, ?, ?)',
      [car_name, brand, owner_name, mobile_number, email, delivery_date]
    );
    await conn.end();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save car' });
  }
});

app.get('/api/expenses', async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute(
      `SELECT e.id, c.car_name, e.material_name, e.price, e.labor_cost, e.total_price, e.note, e.created_at
       FROM garage_expenses e
       LEFT JOIN garage_cars c ON e.car_id = c.id
       ORDER BY e.id DESC`
    );
    await conn.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load expenses' });
  }
});

app.post('/api/expenses', async (req, res) => {
  try {
    const { car_id, material_name, price, labor_cost, note } = req.body;
    const total_price = Number(price || 0) + Number(labor_cost || 0);
    const conn = await getConnection();
    await conn.execute(
      'INSERT INTO garage_expenses (car_id, material_name, price, labor_cost, total_price, note) VALUES (?, ?, ?, ?, ?, ?)',
      [car_id, material_name, price, labor_cost, total_price, note]
    );
    await conn.end();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save expense' });
  }
});

app.get('/api/deliveries', async (req, res) => {
  try {
    const days = Number(req.query.days || 3);
    const conn = await getConnection();
    const [rows] = await conn.execute(
      'SELECT * FROM garage_cars WHERE delivery_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL ? DAY) ORDER BY delivery_date',
      [days]
    );
    await conn.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load deliveries' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
