// src/App.js

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon paths in React:
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Dummy recycling centers (replace coords with real data if you have it)
const recyclingCenters = [
  {
    name: "City Recycling Center",
    position: [40.7128, -74.0060], // New York City
    description: "Accepts all plastic bottle types."
  },
  {
    name: "Community Drop-Off",
    position: [34.0522, -118.2437], // Los Angeles
    description: "Open 9am-5pm, Monday - Friday."
  }
];

function App() {
  const [bottlesUsed, setBottlesUsed] = useState(0);

  // Load from local storage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem('plasticwise_bottles');
    if (savedCount) {
      setBottlesUsed(Number(savedCount));
    }
  }, []);

  // Save to local storage whenever count changes
  useEffect(() => {
    localStorage.setItem('plasticwise_bottles', bottlesUsed.toString());
  }, [bottlesUsed]);

  const handleAddBottle = () => {
    setBottlesUsed(prev => prev + 1);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your bottle count?")) {
      setBottlesUsed(0);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>PlasticWise</h1>
        <p>Track and reduce your plastic bottle usage.</p>
      </header>

      <section style={styles.section}>
        <h2>Log Your Plastic Bottles</h2>
        <p>Bottles used: <strong>{bottlesUsed}</strong></p>
        <button onClick={handleAddBottle} style={styles.button}>+1 Bottle</button>
        <button
          onClick={handleReset}
          style={{ ...styles.button, backgroundColor: '#f44336' }}
        >
          Reset
        </button>
      </section>

      <section style={styles.section}>
        <h2>Recycling Centers Near You</h2>
        <div style={{ width: '100%', height: '400px' }}>
          <MapContainer
            center={[37.0902, -95.7129]} // Rough center of the US
            zoom={4}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {recyclingCenters.map((center, index) => (
              <Marker key={index} position={center.position}>
                <Popup>
                  <strong>{center.name}</strong><br />
                  {center.description}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>

      <section style={styles.section}>
        <h2>Recycling & Reduction Tips</h2>
        <ul>
          <li>Use a reusable bottle instead of disposable plastic ones.</li>
          <li>Rinse and separate your plastics before recycling.</li>
          <li>Crush bottles to save space in bins.</li>
          <li>Check for local deposit return schemes or bottle redemption points.</li>
        </ul>
      </section>

      <footer style={styles.footer}>
        <p>PlasticWise © 2025 — Together, we can reduce plastic pollution!</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '1rem'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  section: {
    marginBottom: '2rem'
  },
  button: {
    marginRight: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  footer: {
    textAlign: 'center',
    marginTop: '3rem',
    color: '#666'
  }
};

export default App;
