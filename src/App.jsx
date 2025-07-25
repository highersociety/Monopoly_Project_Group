import React from "react";
import { useEffect, useState } from 'react';

function App() {
  const [position, setPosition] = useState(0);
  const [currentSpace, setCurrentSpace] = useState(null);
  const [totalSpaces, setTotalSpaces] = useState(0); // Optional: for wrap-around

  // Fetch the total number of spaces (once)
  useEffect(() => {
    fetch('http://localhost:3000/spaces')
      .then(res => res.json())
      .then(data => setTotalSpaces(data.length))
      .catch(err => console.error("Error fetching all spaces:", err));
  }, []);

  // Fetch the current space based on position
  useEffect(() => {
    fetch(`http://localhost:3000/spaces/${position}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch space");
        return res.json();
      })
      .then(data => setCurrentSpace(data))
      .catch(err => console.error("Error fetching space:", err));
  }, [position]);

  // Handle button clicks
  const handleNext = () => {
    setPosition((prev) => (prev + 1) % totalSpaces);
  };

  const handlePrevious = () => {
    setPosition((prev) => (prev - 1 + totalSpaces) % totalSpaces);
  };

  if (!currentSpace) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{currentSpace.name}</h1>
      <p>{currentSpace.description}</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePrevious} style={{ marginRight: '10px' }}>⬅️ Previous</button>
        <button onClick={handleNext}>Next ➡️</button>
      </div>
      <p style={{ marginTop: '10px' }}>Space #{position}</p>
    </div>
  );
}

export default App;
