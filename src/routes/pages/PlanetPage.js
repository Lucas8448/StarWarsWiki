import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from "../../components/Item";

function Planet() {
  const [planet, setPlanet] = useState(null);
  const [residents, setResidents] = useState([]);
  const [films, setFilms] = useState([]);
  const { id } = useParams();

  const getIdFromUrl = (url) => url.match(/(\d+)\/$/)[1];

  useEffect(() => {
    fetch(`/data/planets/${id}.json`)
      .then(response => response.json())
      .then(data => {
        setPlanet(data);

        // Fetch related resources
        Promise.all(data.residents.map(url => fetch(url).then(res => res.json())
            .then(resident => ({ ...resident, id: getIdFromUrl(resident.url) }))))
          .then(setResidents);
        Promise.all(data.films.map(url => fetch(url).then(res => res.json())
            .then(film => ({ ...film, id: getIdFromUrl(film.url) }))))
          .then(setFilms);
      });
  }, [id]);

  if (!planet) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-black text-yellow-500">
      <h1 className="text-2xl font-bold mb-4">{planet.name}</h1>
      <p className="text-lg">Climate: {planet.climate}</p>
      <p className="text-lg">Terrain: {planet.terrain}</p>
      <p className="text-lg">Population: {planet.population}</p>
      <p className="text-lg">Gravity: {planet.gravity}</p>
      
      <h2 className="text-xl font-bold mb-2">Residents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {residents.length > 0 ? residents.map((resident) => (
            <Item key={resident.id} item={resident} type={{ id: "character", name:"Resident" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
        )) : <p>No Residents Available</p>}
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

export default Planet;