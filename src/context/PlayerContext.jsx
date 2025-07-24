import { createContext, useState, useContext, useEffect } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", money: 1500, isBankrupt: false },
    { id: 2, name: "Player 2", money: 1500, isBankrupt: false },
  ]);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  //  Auto-mark bankrupt players when money < 0
  useEffect(() => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.money < 0 && !player.isBankrupt
          ? { ...player, isBankrupt: true }
          : player
      )
    );
  }, [players]);

  const updatePlayer = (id, updates) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === id ? { ...player, ...updates } : player
      )
    );
  };

  const nextTurn = () => {
    let nextIndex = (currentPlayerIndex + 1) % players.length;
    let attempts = 0;

    while (players[nextIndex].isBankrupt && attempts < players.length) {
      nextIndex = (nextIndex + 1) % players.length;
      attempts++;
    }

    setCurrentPlayerIndex(nextIndex);
  };

  const handlePayment = (id, amount) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === id
          ? { ...player, money: player.money - amount }
          : player
      )
    );
  };

  const handleBankruptcy = (id) => {
    updatePlayer(id, { isBankrupt: true });
  };

  const value = {
    players,
    setPlayers,
    updatePlayer,
    currentPlayerIndex,
    currentPlayer: players[currentPlayerIndex],
    nextTurn,
    handlePayment,
    handleBankruptcy,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  return useContext(PlayerContext);
}
