import { usePlayers } from "./PlayerContext";

const PlayerPanel = () => {
  const { players } = usePlayers();

  return (
    <div className="player-panel">
      {players.map((player) => (
        <div
          key={player.id}
          className={`player-card ${player.isBankrupt ? "bankrupt" : ""}`}
        >
          <h3>{player.name}</h3>
          <p>Balance: ${player.money}</p>
          {player.isBankrupt && (
            <span className="bankrupt-label">💥 Bankrupt</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlayerPanel;
