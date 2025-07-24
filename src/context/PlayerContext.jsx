import { createContext, useState, useContext } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", money: 1500, isBankrupt: false },
    { id: 2, name: "Player 2", money: 1500, isBankrupt: false },
  ]);

  const updatePlayer = (id, updates) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === id ? { ...player, ...updates } : player
      )
    );
  };

  const value = {
    players,
    setPlayers,
    updatePlayer,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayers() {
  return useContext(PlayerContext);
}
