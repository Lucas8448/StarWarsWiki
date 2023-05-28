import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from "../../components/Item";

function Species() {
  const [species, setSpecies] = useState(null);
  const [people, setPeople] = useState([]);
  const [films, setFilms] = useState([]);
  const [homeworld, setHomeworld] = useState(null);
  const { id } = useParams();

  const getIdFromUrl = (url) => url.match(/(\d+)\/$/)[1];

  useEffect(() => {
    fetch(`https://swapi.dev/api/species/${id}`)
      .then(response => response.json())
      .then(data => {
        setSpecies(data);

        // Fetch related resources
        fetch(data.homeworld).then(res => res.json())
            .then(planet => ({ ...planet, id: getIdFromUrl(planet.url) }))
            .then(setHomeworld);
        Promise.all(data.people.map(url => fetch(url).then(res => res.json())
            .then(person => ({ ...person, id: getIdFromUrl(person.url) }))))
          .then(setPeople);
        Promise.all(data.films.map(url => fetch(url).then(res => res.json())
            .then(film => ({ ...film, id: getIdFromUrl(film.url) }))))
          .then(setFilms);
      });
  }, [id]);

  if (!species) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-black text-yellow-500">
      <h1 className="text-2xl font-bold mb-4">{species.name}</h1>

      {homeworld && (
        <>
          <h2 className="text-xl font-bold mb-2">Homeworld</h2>
          <Item item={homeworld} type={{ id: "planet", name:"Planet" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
        </>
      )}

      <h2 className="text-xl font-bold mb-2">People</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {people.length > 0 ? people.map((person) => (
            <Item key={person.id} item={person} type={{ id: "person", name:"Person" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
        )) : <p>No People Available</p>}
      </div>

      <h2 className="text-xl font-bold mb-2">Films</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {films.length > 0 ? films.map((film) => (
            <Item key={film.id} item={film} type={{ id: "film", name:"Film" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
        )) : <p>No Films Available</p>}
      </div>
    </div>
  );
}

export default Species;