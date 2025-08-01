const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//app.use('/api', router)

// Just for backend test
app.get('/api/status', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Setup WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let vehicles = [
  {
    id: 'V001',
    latitude: -26.2041,
    longitude: 28.0473,
    speed: 50, // km/h
    fuel: 100  // %
  },
  {
    id: 'V002',
    latitude: -26.2100,
    longitude: 28.0500,
    speed: 45,
    fuel: 100
  },
  {
    id: 'V003',
    latitude: -26.2150,
    longitude: 28.0400,
    speed: 60,
    fuel: 100
  }
];

// Function to randomly update vehicle positions
function updateVehiclePositions() {
  vehicles = vehicles.map(vehicle => {
    const randomSpeed = Math.max(20, Math.min(100, vehicle.speed + (Math.random() - 0.5) * 10)); // km/h
    const delta = (randomSpeed / 3600) * 15; // simulate exaggerated movement
    const angle = Math.random() * 2 * Math.PI;

    const deltaLat = delta * Math.cos(angle) * 0.009;
    const deltaLon = delta * Math.sin(angle) * 0.009;

    const newFuelLevel = Math.max(0, vehicle.fuel - 0.05); //define newFuelLevel first

    return {
      ...vehicle,
      latitude: vehicle.latitude + deltaLat,
      longitude: vehicle.longitude + deltaLon,
      speed: Math.round(randomSpeed),
      fuel: Math.round(newFuelLevel * 100) / 100 
    };
  });
}

// Broadcast to all connected clients
function broadcastVehicleData() {
  const payload = JSON.stringify({ vehicles });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

// Start simulation loop
setInterval(() => {
  updateVehiclePositions();
  broadcastVehicleData();
}, 1000);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

