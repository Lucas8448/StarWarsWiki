import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Species() {
  const [species, setSpecies] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://swapi.dev/api/species/${id}`)
      .then(response => response.json())
      .then(data => setSpecies(data));
  }, [id]);

  if (!species) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-black text-yellow-500">
      <h1 className="text-2xl font-bold mb-4">{species.name}</h1>
    </div>
  );
}

export default Species;
