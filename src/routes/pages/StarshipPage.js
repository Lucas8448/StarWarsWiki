import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Starship() {
  const [starship, setStarship] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://swapi.dev/api/starships/${id}`)
      .then(response => response.json())
      .then(data => setStarship(data));
  }, [id]);

  if (!starship) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-black text-yellow-500">
      <h1 className="text-2xl font-bold mb-4">{starship.name}</h1>
    </div>
  );
}

export default Starship;
