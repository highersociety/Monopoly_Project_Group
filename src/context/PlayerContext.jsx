import { createContext, useState, useContext, useEffect } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", money: 1500, isBankrupt: false },
    { id: 2, name: "Player 2", money: 1500, isBankrupt: false },
  ]);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // 🧠 Auto-check and mark bankrupt players
  useEffect(() => {
    const updated = players.map((player) =>
      player.money < 0 && !player.isBankrupt
        ? { ...player, isBankrupt: true }
        : player
    );
    setPlayers(updated);
  }, [players]);

  // 🛠 Update player fields
  const updatePlayer = (id, updates) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === id ? { ...player, ...updates } : player
      )
    );
  };

  // ⏭️ Advance turn, skip bankrupt players
  const nextTurn = () => {
    let nextIndex = (currentPlayerIndex + 1) % players.length;
    let tries = 0;

    while (players[nextIndex].isBankrupt && tries < players.length) {
      nextIndex = (nextIndex + 1) % players.length;
      tries++;
    }

    setCurrentPlayerIndex(nextIndex);
  };

  const currentPlayer = players[currentPlayerIndex];

  const value = {
    players,
    setPlayers,
    updatePlayer,
    currentPlayerIndex,
    currentPlayer,
    nextTurn,
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
