const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const { type, is_for_sale } = req.query;
  const conditions = [];
  const values = [];

  if (type) {
    conditions.push('type = ?');
    values.push(type);
  }

  if (is_for_sale !== undefined) {
    conditions.push('is_for_sale = ?');
    values.push(is_for_sale === '1' ? 1 : 0);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  try {
    const [rows] = await pool.query(`SELECT * FROM vehicles ${whereClause} ORDER BY arrival_date DESC`, values);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch vehicles' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch vehicle' });
  }
});

router.post('/', async (req, res) => {
  const { type, make, model, status, arrival_date, delivery_date, notes, is_for_sale } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO vehicles (type, make, model, status, arrival_date, delivery_date, notes, is_for_sale)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [type, make, model, status || 'in_garage', arrival_date, delivery_date || null, notes || '', is_for_sale ? 1 : 0]
    );
    const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to add vehicle' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { type, make, model, status, arrival_date, delivery_date, notes, is_for_sale } = req.body;

  try {
    await pool.query(
      `UPDATE vehicles SET type = ?, make = ?, model = ?, status = ?, arrival_date = ?, delivery_date = ?, notes = ?, is_for_sale = ? WHERE id = ?`,
      [type, make, model, status, arrival_date, delivery_date || null, notes || '', is_for_sale ? 1 : 0, id]
    );
    const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update vehicle' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM vehicles WHERE id = ?', [id]);
    res.json({ message: 'Vehicle removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to remove vehicle' });
  }
});

router.post('/:id/problems', async (req, res) => {
  const { id } = req.params;
  const { problem_description } = req.body;

  try {
    await pool.query(
      `INSERT INTO vehicle_problems (vehicle_id, problem_description)
       VALUES (?, ?)`,
      [id, problem_description]
    );
    const [rows] = await pool.query('SELECT * FROM vehicle_problems WHERE vehicle_id = ? ORDER BY reported_at DESC', [id]);
    res.status(201).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to add problem note' });
  }
});

router.get('/:id/problems', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM vehicle_problems WHERE vehicle_id = ? ORDER BY reported_at DESC', [id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch problems' });
  }
});

module.exports = router;
