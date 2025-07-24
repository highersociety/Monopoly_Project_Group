import { useState, useEffect } from "react";

function App({ position }) {
  const [currentSpace, setCurrentSpace] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/spaces/${position}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setCurrentSpace(data))
      .catch((err) => console.error("Error fetching space:", err));
  }, [position]);

  if (!currentSpace) return <p>Loading space info...</p>;

  return (
    <div>
      <h1>{currentSpace.name}</h1>
      <p>{currentSpace.description}</p>
    </div>
  );
}

export default App;

