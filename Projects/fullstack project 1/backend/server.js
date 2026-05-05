const express = require('express');
const cors = require('cors');
const vehicleRoutes = require('./routes/vehicles');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/vehicles', vehicleRoutes);

app.get('/', (req, res) => {
  res.send({ message: 'Garage monitoring backend is running' });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
