import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Character() {
  const [character, setCharacter] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}`)
      .then(response => response.json())
      .then(data => setCharacter(data));
  }, [id]);

  if (!character) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-black text-yellow-500">
      <h1 className="text-2xl font-bold mb-4">{character.name}</h1>
    </div>
  );
}

export default Character;
