import React, { createContext, useState } from "react";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const bankruptPlayer = (id) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, bankrupt: true } : p))
    );
  };

  return (
    <PlayerContext.Provider value={{ players, setPlayers, currentPlayer, setCurrentPlayer, bankruptPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}
