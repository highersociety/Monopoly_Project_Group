import React from "react";
import { createContext, useState, useContext, useEffect } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", money: 1500, isBankrupt: false },
    { id: 2, name: "Player 2", money: 1500, isBankrupt: false },
  ]);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  //  Auto-mark bankrupt players when money < 0
 const handlePayment = (id, amount) => {
  setPlayers((prev) =>
    prev.map((player) => {
      if (player.id === id) {
        const newMoney = player.money - amount;
        return {
          ...player,
          money: newMoney,
          isBankrupt: newMoney < 0, // 👈 Auto-mark bankrupt
        };
      }
      return player;
    })
  );
};

