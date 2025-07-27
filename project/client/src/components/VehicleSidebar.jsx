// src/components/VehicleSidebar.jsx
import React from 'react';

const VehicleSidebar = ({ vehicles }) => {
  return (
    <div style={{
       width: '250px',
       backgroundColor: '#f5f5f5',
       padding: '1rem',
       overflowY: 'auto',
       height: '100vh',
       boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    }}>
      <h2> style={{ color: '#222' }}Vehicles</h2>
      {vehicles.map(vehicle => (
        <div key={vehicle.id} style={{ 
            marginBottom: '1rem', 
            padding: '1rem', 
            background: '#fff', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            color: '#222' // ← Force dark text 
        }}>
          <strong>ID:</strong> {vehicle.id} <br />
          <strong>Speed:</strong> {vehicle.speed} km/h <br />
          <strong>Fuel:</strong> {vehicle.fuel}%
        </div>
      ))}
    </div>
  );
};

export default VehicleSidebar;
