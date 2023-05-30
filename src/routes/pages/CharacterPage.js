import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from "../../components/Item";

function Character() {
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  
  const { id } = useParams();

  const getIdFromUrl = (url) => url.match(/(\d+)\/$/)[1];

  useEffect(() => {
    fetch(`/data/people/${id}.json`)
      .then(response => response.json())
      .then(data => {
        setCharacter(data);

        Promise.all(data.films.map(url => fetch(url).then(res => res.json())
            .then(film => ({ ...film, id: getIdFromUrl(film.url) }))))
          .then(setFilms);
        fetch(data.homeworld)
          .then(response => response.json())
          .then(planet => setPlanets([{ ...planet, id: getIdFromUrl(planet.url) }])); // Homeworld is a single planet
        Promise.all(data.species.map(url => fetch(url).then(res => res.json())
            .then(specie => ({ ...specie, id: getIdFromUrl(specie.url) }))))
          .then(setSpecies);
        Promise.all(data.starships.map(url => fetch(url).then(res => res.json())
            .then(starship => ({ ...starship, id: getIdFromUrl(starship.url) }))))
          .then(setStarships);
        Promise.all(data.vehicles.map(url => fetch(url).then(res => res.json())
            .then(vehicle => ({ ...vehicle, id: getIdFromUrl(vehicle.url) }))))
          .then(setVehicles);
      });
  }, [id]);

  if (!character) return <div className="flex justify-center items-center h-screen text-yellow-500 text-2xl">Loading...</div>;

  return (
    <div className="p-4 min-h-screen bg-black text-yellow-500">
      <h1 className="text-6xl font-bold mb-4 text-center">{character.name}</h1>
      <div className="mb-8 text-lg flex flex-col items-center">
        <p>Born: {character.birth_year}</p>
        <p>Hair Colour: {character.hair_color}</p>
        <p>Height: {character.height}cm</p>
        <p>Weight: {character.mass} Kg</p>
        <p>Skin Colour: {character.skin_color}</p>
      </div>
  
      <div>
        <h2 className="text-3xl font-bold mb-2 text-center">Films</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {films.length > 0 ? films.map((film) => (
              <Item key={film.id} item={film} type={{ id: "film", name:"Film" }} className="bg-gray-900 rounded-lg shadow-md p-4 transform transition-transform duration-500 ease-in-out hover:scale-105" />
          )) : <p className="text-center text-xl">No Films Available</p>}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-2 text-center">Planets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {planets.length > 0 ? planets.map((planet) => (
              <Item key={planet.id} item={planet} type={{ id: "planet", name:"Planet" }} className="bg-gray-900 rounded-lg shadow-md p-4 transform transition-transform duration-500 ease-in-out hover:scale-105" />
          )) : <p className="text-center text-xl">No Planets Available</p>}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-2 text-center">Species</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {species.length > 0 ? species.map((specie) => (
              <Item key={specie.id} item={specie} type={{ id: "species", name:"Species" }} className="bg-gray-900 rounded-lg shadow-md p-4 transform transition-transform duration-500 ease-in-out hover:scale-105" />
          )) : <p className="text-center text-xl">No Species Available</p>}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-2 text-center">Starships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {starships.length > 0 ? starships.map((starship) => (
              <Item key={starship.id} item={starship} type={{ id: "starship", name:"Starship" }} className="bg-gray-900 rounded-lg shadow-md p-4 transform transition-transform duration-500 ease-in-out hover:scale-105" />
          )) : <p className="text-center text-xl">No Starships Available</p>}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-2 text-center">Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vehicles.length > 0 ? vehicles.map((vehicle) => (
              <Item key={vehicle.id} item={vehicle} type={{ id: "vehicle", name:"Vehicle" }} className="bg-gray-900 rounded-lg shadow-md p-4 transform transition-transform duration-500 ease-in-out hover:scale-105" />
          )) : <p className="text-center text-xl">No Vehicles Available</p>}
        </div>
      </div>
    </div>
  );
}

export default Character;