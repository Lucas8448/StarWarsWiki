import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from "../../components/Item";

function Starship() {
  const [starship, setStarship] = useState(null);
  const [films, setFilms] = useState([]);
  const { id } = useParams();

  const getIdFromUrl = (url) => url.match(/(\d+)\/$/)[1];

  useEffect(() => {
    fetch(`https://swapi.dev/api/starships/${id}`)
      .then(response => response.json())
      .then(data => {
        setStarship(data);

        // Fetch related resources
        Promise.all(data.films.map(url => fetch(url).then(res => res.json())
            .then(film => ({ ...film, id: getIdFromUrl(film.url) }))))
          .then(setFilms);
      });
  }, [id]);

  if (!starship) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-black text-yellow-500">
      <h1 className="text-2xl font-bold mb-4">{starship.name}</h1>
      <p className="text-lg">Model: {starship.model}</p>
      <p className="text-lg">Manufacturer: {starship.manufacturer}</p>
      <p className="text-lg">Cost in Credits: {starship.cost_in_credits}</p>
      <p className="text-lg">Length: {starship.length}</p>
      <p className="text-lg">Max Atmosphering Speed: {starship.max_atmosphering_speed}</p>
      <p className="text-lg">Crew: {starship.crew}</p>
      <p className="text-lg">Passengers: {starship.passengers}</p>
      <p className="text-lg">Cargo Capacity: {starship.cargo_capacity}</p>
      <p className="text-lg">Consumables: {starship.consumables}</p>
      <p className="text-lg">Hyperdrive Rating: {starship.hyperdrive_rating}</p>
      <p className="text-lg">MGLT: {starship.MGLT}</p>
      <p className="text-lg">Starship Class: {starship.starship_class}</p>

      <h2 className="text-xl font-bold mb-2">Films</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {films.length > 0 ? films.map((film) => (
            <Item key={film.id} item={film} type={{ id: "film", name:"Film" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
        )) : <p>No Films Available</p>}
      </div>
    </div>
  );
}

export default Starship;