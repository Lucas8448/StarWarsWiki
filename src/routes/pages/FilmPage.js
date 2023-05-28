import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from "../../components/Item";

function Film() {
  const [film, setFilm] = useState(null);
  const [characters, setCharacters] = useState([]);
  const { id } = useParams();

  const getIdFromUrl = (url) => url.match(/(\d+)\/$/)[1];

  useEffect(() => {
    fetch(`https://swapi.dev/api/films/${id}`)
      .then(response => response.json())
      .then(data => {
        setFilm(data);

        // Fetch related resources
        Promise.all(data.characters.map(url => fetch(url).then(res => res.json())
            .then(character => ({ ...character, id: getIdFromUrl(character.url) }))))
          .then(setCharacters);
      });
  }, [id]);

  if (!film) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-black text-yellow-500">
      <h1 className="text-2xl font-bold mb-4">{film.title}</h1>
      <p className="text-lg">Episode: {film.episode_id}</p>
      <p className="text-lg">Opening Crawl: {film.opening_crawl}</p>
      <p className="text-lg">Director: {film.director}</p>
      <p className="text-lg">Producer(s): {film.producer}</p>
      <p className="text-lg">Release Date: {film.release_date}</p>

      <h2 className="text-xl font-bold mb-2">Characters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {characters.length > 0 ? characters.map((character) => (
            <Item key={character.id} item={character} type={{ id: "character", name:"Character" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
        )) : <p>No Characters Available</p>}
      </div>
    </div>
  );
}

export default Film;