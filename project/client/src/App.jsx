import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => setStatusMessage(data.message))
      .catch((err) => {
        console.error('Error fetching backend:', err);
        setStatusMessage('Could not connect to backend');
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Fleet Management Dashboard</h1>
      <p>Backend says: <strong>{statusMessage}</strong></p>
    </div>
  );
}

export default App;
