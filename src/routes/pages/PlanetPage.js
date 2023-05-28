import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Planet() {
  const [planet, setPlanet] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/${id}`)
      .then(response => response.json())
      .then(data => setPlanet(data));
  }, [id]);

  if (!planet) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-black text-yellow-500">
      <h1 className="text-2xl font-bold mb-4">{planet.name}</h1>
      <p className="text-lg">Climate: {planet.climate}</p>
      <p className="text-lg">Terrain: {planet.terrain}</p>
      <p className="text-lg">Population: {planet.population}</p>
      <p className="text-lg">Gravity: {planet.gravity}</p>
    </div>
  );
}

export default Planet;
