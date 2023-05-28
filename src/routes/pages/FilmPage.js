import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Film() {
  const [films, setfilms] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://swapi.dev/api/films/`)
      .then(response => response.json())
      .then(data => {
        setfilms(data.results);
      });
  }, []);

  const film = films[id - 1];

  if (!film) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-black text-yellow-500">
      <h1 className="text-2xl font-bold mb-4">{film.title}</h1>
    </div>
  );
}

export default Film;