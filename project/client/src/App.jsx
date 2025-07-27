import './App.css';
import MapView from './components/MapView';
import VehicleSidebar from './components/VehicleSidebar';
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
  <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
    <header style={{ padding: '1rem', color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
      Fleet Management Dashboard
    </header>

    <div style={{ flex: 1, display: 'flex' }}>
      <VehicleSidebar vehicles={vehicles} />
      <div style={{ flex: 1 }}>
        <MapView vehicles={vehicles} />
      </div>
    </div>
  </div>
  );
}

export default App;
