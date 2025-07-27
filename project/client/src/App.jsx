import './App.css';
import MapView from './components/MapView';
import { useState, useEffect } from 'react';

function App() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
  const ws = new WebSocket('ws://localhost:5000');

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received from backend:', data);//log
    setVehicles(data.vehicles);
  };

  return () => ws.close();
}, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Fleet Management Dashboard</h1>
      <MapView vehicles={vehicles} />
    </div>
  );
}

export default App;
