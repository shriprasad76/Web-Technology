import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    type: 'two-wheeler',
    make: '',
    model: '',
    arrival_date: '',
    notes: '',
    is_for_sale: false,
  });
  const [filterType, setFilterType] = useState('all');
  const [selectedProblem, setSelectedProblem] = useState({ id: null, text: '' });

  useEffect(() => {
    fetchVehicles();
  }, [filterType]);

  const fetchVehicles = async () => {
    const query = filterType === 'all' ? '' : `?type=${filterType}`;
    const res = await fetch(`${API_BASE}/vehicles${query}`);
    const data = await res.json();
    setVehicles(data);
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const addVehicle = async (event) => {
    event.preventDefault();
    await fetch(`${API_BASE}/vehicles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ type: 'two-wheeler', make: '', model: '', arrival_date: '', notes: '', is_for_sale: false });
    fetchVehicles();
  };

  const removeVehicle = async (id) => {
    await fetch(`${API_BASE}/vehicles/${id}`, { method: 'DELETE' });
    fetchVehicles();
  };

  const addProblemNote = async (vehicleId) => {
    if (!selectedProblem.text.trim() || selectedProblem.id !== vehicleId) return;
    await fetch(`${API_BASE}/vehicles/${vehicleId}/problems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problem_description: selectedProblem.text }),
    });
    setSelectedProblem({ id: null, text: '' });
    fetchVehicles();
  };

  return (
    <div className="app-shell">
      <header>
        <h1>Garage Car Monitoring</h1>
      </header>

      <section className="main-grid">
        <div className="panel">
          <h2>Add Vehicle</h2>
          <form onSubmit={addVehicle}>
            <label>
              Type
              <select name="type" value={form.type} onChange={handleFormChange}>
                <option value="two-wheeler">Two Wheeler</option>
                <option value="four-wheeler">Four Wheeler</option>
              </select>
            </label>
            <label>
              Make
              <input name="make" value={form.make} onChange={handleFormChange} required />
            </label>
            <label>
              Model
              <input name="model" value={form.model} onChange={handleFormChange} required />
            </label>
            <label>
              Arrival Date
              <input type="date" name="arrival_date" value={form.arrival_date} onChange={handleFormChange} required />
            </label>
            <label>
              For Sale
              <input type="checkbox" name="is_for_sale" checked={form.is_for_sale} onChange={handleFormChange} />
            </label>
            <label>
              Notes
              <textarea name="notes" value={form.notes} onChange={handleFormChange}></textarea>
            </label>
            <button type="submit">Add Vehicle</button>
          </form>
        </div>

        <div className="panel">
          <h2>Filter Vehicles</h2>
          <div className="filter-buttons">
            <button type="button" onClick={() => setFilterType('all')}>All</button>
            <button type="button" onClick={() => setFilterType('two-wheeler')}>Two Wheeler</button>
            <button type="button" onClick={() => setFilterType('four-wheeler')}>Four Wheeler</button>
          </div>

          <h2>Vehicle List</h2>
          {vehicles.length === 0 ? (
            <p>No vehicles found.</p>
          ) : (
            vehicles.map((vehicle) => (
              <div key={vehicle.id} className="vehicle-card">
                <div className="vehicle-summary">
                  <strong>{vehicle.make} {vehicle.model}</strong>
                  <span>{vehicle.type}</span>
                </div>
                <div className="vehicle-details">
                  <div>Status: {vehicle.status}</div>
                  <div>Arrival: {vehicle.arrival_date}</div>
                  <div>Delivery: {vehicle.delivery_date || 'Not set'}</div>
                </div>
                <div className="vehicle-notes">Notes: {vehicle.notes || 'No notes'}</div>
                <div className="vehicle-actions">
                  <button type="button" onClick={() => removeVehicle(vehicle.id)}>Remove</button>
                </div>
                <label className="problem-input">
                  Problem note
                  <input
                    value={selectedProblem.id === vehicle.id ? selectedProblem.text : ''}
                    onChange={(e) => setSelectedProblem({ id: vehicle.id, text: e.target.value })}
                    placeholder="Describe problem"
                  />
                </label>
                <button type="button" onClick={() => addProblemNote(vehicle.id)}>
                  Add Problem
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
