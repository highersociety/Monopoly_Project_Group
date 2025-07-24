import React, { useContext, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import useFetchSpace from '../hooks/useFetchSpace';

const SpaceInfo = () => {
  const { playerPosition, setCurrentSpace } = useContext(GameContext);
  const space = useFetchSpace(playerPosition);

 
  useEffect(() => {
    if (space) {
      setCurrentSpace(space);
    } 
     }, [space, setCurrentSpace]);

  if (!space) return <p>Loading space info...</p>;

   return (
    <div>
      <h3>You landed on: {space.name}</h3>
      <p>Type: {space.type}</p>
      <p>Description: {space.description || "No extra action yet."}</p>
    </div>
  );
};

export default SpaceInfo;