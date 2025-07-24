import { usePlayerContext } from "./PlayerContext";

const GameBoard = () => {
  const { players, currentPlayerIndex, nextTurn, handlePayment, handleBankruptcy } = usePlayerContext();
  const currentPlayer = players[currentPlayerIndex];

  const simulateRentPayment = () => {
    const rent = 1700; // large enough to cause bankruptcy
    handlePayment(currentPlayer.id, rent);

    if (currentPlayer.balance - rent < 0) {
      handleBankruptcy(currentPlayer.id);
    }
    nextTurn();
  };

  return (
    <div>
      <h2>Current Turn: {currentPlayer.name}</h2>
      <button onClick={simulateRentPayment} disabled={currentPlayer.isBankrupt}>
        Pay Rent
      </button>
    </div>
  );
};

export default GameBoard;
