import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import NewsFeed from './NewsFeed';
import './App.css';

// Fix for default Leaflet icon paths in React:
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Dummy recycling centers (replace with real data as needed)
const recyclingCenters = [
  {
    name: "City Recycling Center",
    position: [40.7128, -74.0060],
    description: "Accepts all plastic bottle types."
  },
  {
    name: "Community Drop-Off",
    position: [34.0522, -118.2437],
    description: "Open 9am-5pm, Monday - Friday."
  }
];

// Conversion factors for environmental impact
const WATER_SAVED_PER_BOTTLE = 5;      // liters saved per bottle recycled
const ENERGY_SAVED_PER_BOTTLE = 0.1;     // kWh saved per bottle
const CO2_SAVED_PER_BOTTLE = 0.05;       // kg CO₂ saved per bottle

function App() {
  const [bottlesUsed, setBottlesUsed] = useState(0);

  // Load bottle count from local storage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem('plasticwise_bottles');
    if (savedCount) {
      setBottlesUsed(Number(savedCount));
    }
  }, []);

  // Save bottle count to local storage whenever it changes
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
    <div className="container">
      <header className="header">
        <h1>PlasticWise</h1>
        <p>Track and reduce your plastic bottle usage.</p>
      </header>

      <section className="section">
        <h2>Log Your Plastic Bottles</h2>
        <p>Bottles used: <strong>{bottlesUsed}</strong></p>
        <button onClick={handleAddBottle} className="button">+1 Bottle</button>
        <button onClick={handleReset} className="button reset">Reset</button>
      </section>

      <section className="section">
        <h2>Environmental Impact</h2>
        <p>By recycling your plastic bottles, you've saved:</p>
        <ul>
          <li>{bottlesUsed * WATER_SAVED_PER_BOTTLE} liters of water</li>
          <li>{bottlesUsed * ENERGY_SAVED_PER_BOTTLE} kWh of energy</li>
          <li>{bottlesUsed * CO2_SAVED_PER_BOTTLE} kg of CO₂ emissions</li>
        </ul>
      </section>

      <section className="section">
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
                  <strong>{center.name}</strong>
                  <br />
                  {center.description}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>

      <section className="section">
        <h2>Recycling & Reduction Tips</h2>
        <ul>
          <li>Use a reusable bottle instead of disposable plastic ones.</li>
          <li>Rinse and separate your plastics before recycling.</li>
          <li>Crush bottles to save space in bins.</li>
          <li>Check for local deposit return schemes or bottle redemption points.</li>
        </ul>
      </section>

      <section className="section">
        <NewsFeed />
      </section>

      <footer className="footer">
        <p>PlasticWise © 2025 — Together, we can reduce plastic pollution!</p>
      </footer>
    </div>
  );
}

export default App;
