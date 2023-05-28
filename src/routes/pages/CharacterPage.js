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
    fetch(`https://swapi.dev/api/people/${id}`)
      .then(response => response.json())
      .then(data => {
        setCharacter(data);

        // Fetch related resources
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

  if (!character) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-black text-yellow-500">
      <h1 className="text-2xl font-bold mb-4">{character.name}</h1>
      <p className="text-lg">Born: {character.birth_year}</p>
      <p className="text-lg">Hair Colour: {character.hair_color}</p>
      <p className="text-lg">Height: {character.height}cm</p>
      <p className="text-lg">Weight: {character.mass} Kg</p>
      <p className="text-lg">Skin Colour: {character.skin_color}</p>
    
      <h2 className="text-xl font-bold mb-2">Films</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {films.length > 0 ? films.map((film) => (
            <Item key={film.id} item={film} type={{ id: "film", name:"Film" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
        )) : <p>No Films Available</p>}
      </div>
      
      <h2 className="text-xl font-bold mb-2">Planets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {planets.length > 0 ? planets.map((planet) => (
            <Item key={planet.id} item={planet} type={{ id: "planet", name:"Planet" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
        )) : <p>No Planets Available</p>}
      </div>
      
      <h2 className="text-xl font-bold mb-2">Species</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {species.length > 0 ? species.map((specie) => (
            <Item key={specie.id} item={specie} type={{ id: "species", name:"Species" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
        )) : <p>No Species Available</p>}
      </div>
      
      <h2 className="text-xl font-bold mb-2">Starships</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {starships.length > 0 ? starships.map((starship) => (
            <Item key={starship.id} item={starship} type={{ id: "starship", name:"Starship" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
        )) : <p>No Starships Available</p>}
      </div>
      
      <h2 className="text-xl font-bold mb-2">Vehicles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vehicles.length > 0 ? vehicles.map((vehicle) => (
            <Item key={vehicle.id} item={vehicle} type={{ id: "vehicle", name:"Vehicle" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
        )) : <p>No Vehicles Available</p>}
      </div>
    </div>
  );
}

export default Character;
