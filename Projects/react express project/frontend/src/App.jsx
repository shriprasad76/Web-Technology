import { useEffect, useState } from 'react';

function App() {
  const [cars, setCars] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [carForm, setCarForm] = useState({ car_name: '', brand: '', owner_name: '', mobile_number: '', email: '', delivery_date: '' });
  const [expenseForm, setExpenseForm] = useState({ car_id: '', material_name: '', price: '', labor_cost: '', note: '' });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [carsRes, expensesRes, deliveriesRes] = await Promise.all([
      fetch('/api/cars'),
      fetch('/api/expenses'),
      fetch('/api/deliveries?days=3'),
    ]);
    setCars(await carsRes.json());
    setExpenses(await expensesRes.json());
    setDeliveries(await deliveriesRes.json());
  }

  async function handleCarSubmit(event) {
    event.preventDefault();
    await fetch('/api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carForm),
    });
    setCarForm({ car_name: '', brand: '', owner_name: '', mobile_number: '', email: '', delivery_date: '' });
    await loadData();
  }

  async function handleExpenseSubmit(event) {
    event.preventDefault();
    await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseForm),
    });
    setExpenseForm({ car_id: '', material_name: '', price: '', labor_cost: '', note: '' });
    await loadData();
  }

  return (
    <div className="container">
      <h1>Garage Management System</h1>

      <section>
        <h2>Add Car</h2>
        <form onSubmit={handleCarSubmit}>
          <label>
            Car Name
            <input value={carForm.car_name} onChange={e => setCarForm({ ...carForm, car_name: e.target.value })} required />
          </label>
          <label>
            Brand
            <input value={carForm.brand} onChange={e => setCarForm({ ...carForm, brand: e.target.value })} required />
          </label>
          <label>
            Owner Name
            <input value={carForm.owner_name} onChange={e => setCarForm({ ...carForm, owner_name: e.target.value })} required />
          </label>
          <label>
            Mobile Number
            <input value={carForm.mobile_number} onChange={e => setCarForm({ ...carForm, mobile_number: e.target.value })} required />
          </label>
          <label>
            Email
            <input type="email" value={carForm.email} onChange={e => setCarForm({ ...carForm, email: e.target.value })} required />
          </label>
          <label>
            Delivery Date
            <input type="date" value={carForm.delivery_date} onChange={e => setCarForm({ ...carForm, delivery_date: e.target.value })} required />
          </label>
          <button type="submit">Save Car</button>
        </form>
      </section>

      <section>
        <h2>Add Expense</h2>
        <form onSubmit={handleExpenseSubmit}>
          <label>
            Car
            <select value={expenseForm.car_id} onChange={e => setExpenseForm({ ...expenseForm, car_id: e.target.value })} required>
              <option value="">Select car</option>
              {cars.map(car => (
                <option key={car.id} value={car.id}>{car.car_name} - {car.owner_name}</option>
              ))}
            </select>
          </label>
          <label>
            Material Name
            <input value={expenseForm.material_name} onChange={e => setExpenseForm({ ...expenseForm, material_name: e.target.value })} required />
          </label>
          <label>
            Material Price
            <input type="number" min="0" value={expenseForm.price} onChange={e => setExpenseForm({ ...expenseForm, price: e.target.value })} required />
          </label>
          <label>
            Labor Cost
            <input type="number" min="0" value={expenseForm.labor_cost} onChange={e => setExpenseForm({ ...expenseForm, labor_cost: e.target.value })} required />
          </label>
          <label>
            Note
            <input value={expenseForm.note} onChange={e => setExpenseForm({ ...expenseForm, note: e.target.value })} />
          </label>
          <button type="submit">Save Expense</button>
        </form>
      </section>

      <section>
        <h2>Upcoming Deliveries</h2>
        {deliveries.length ? deliveries.map(car => (
          <div className="card" key={car.id}>
            <p><strong>{car.car_name}</strong> ({car.brand})</p>
            <p>Owner: {car.owner_name}</p>
            <p>Delivery: {car.delivery_date}</p>
          </div>
        )) : <p>No deliveries in the next 3 days.</p>}
      </section>

      <section>
        <h2>Cars</h2>
        {cars.length ? cars.map(car => (
          <div className="card" key={car.id}>
            <p><strong>{car.car_name}</strong> ({car.brand})</p>
            <p>Owner: {car.owner_name}</p>
            <p>Mobile: {car.mobile_number}</p>
            <p>Email: {car.email}</p>
            <p>Delivery: {car.delivery_date}</p>
          </div>
        )) : <p>No cars added.</p>}
      </section>

      <section>
        <h2>Expenses</h2>
        {expenses.length ? expenses.map(exp => (
          <div className="card" key={exp.id}>
            <p><strong>{exp.material_name}</strong> for {exp.car_name || 'Unknown'}</p>
            <p>Price: ₹{exp.price} | Labor: ₹{exp.labor_cost} | Total: ₹{exp.total_price}</p>
            <p>Note: {exp.note || '-'}</p>
          </div>
        )) : <p>No expenses added.</p>}
      </section>
    </div>
  );
}

export default App;
