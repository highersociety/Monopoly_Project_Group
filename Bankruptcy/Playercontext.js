import { createContext, useState, useContext, useEffect } from "react";

const PlayerContext = createContext();

export const usePlayerContext = () => useContext(PlayerContext);


const initialPlayers = [
  { id: 0, name: "Player 1", balance: 1500, isBankrupt: false, properties: [] },
  { id: 1, name: "Player 2", balance: 1500, isBankrupt: false, properties: [] },
];

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState(initialPlayers);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // Detect and flag bankrupt players
  useEffect(() => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player => ({
        ...player,
        isBankrupt: player.balance < 0 ? true : player.isBankrupt
      }))
    );
  }, [players]);

  const nextTurn = () => {
    let nextIndex = currentPlayerIndex;
    do {
      nextIndex = (nextIndex + 1) % players.length;
    } while (players[nextIndex].isBankrupt);

    setCurrentPlayerIndex(nextIndex);
  };


  const handlePayment = (playerId, amount) => {
    setPlayers(prev =>
      prev.map(p =>
        p.id === playerId ? { ...p, balance: p.balance - amount } : p
      )
    );
  };

  const handleBankruptcy = (playerId) => {
    setPlayers(prev =>
      prev.map(p =>
        p.id === playerId
          ? { ...p, isBankrupt: true, properties: [] } // clear owned properties
          : p
      )
    );
    // TODO: Also reset property ownership on the board
  };


  return (
    <PlayerContext.Provider value={{ players, currentPlayerIndex, nextTurn, handlePayment, handleBankruptcy }}>
      {children}
    </PlayerContext.Provider>
  );
};
