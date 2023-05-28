import { useState, useEffect } from "react";
import Item from "../components/Item";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/people/')
      .then(response => response.json())
      .then(data => setCharacters(data.results.map((character, index) => ({ ...character, id: index + 1 }))));

    fetch('https://swapi.dev/api/planets/')
      .then(response => response.json())
      .then(data => setPlanets(data.results.map((planet, index) => ({ ...planet, id: index + 1 }))));


    fetch('https://swapi.dev/api/species/')
      .then(response => response.json())
      .then(data => setSpecies(data.results.map((specie, index) => ({ ...specie, id: index + 1 }))));

    fetch('https://swapi.dev/api/starships/')
      .then(response => response.json())
      .then(data => setStarships(data.results.map((starship, index) => ({ ...starship, id: index + 1 }))));

    fetch('https://swapi.dev/api/vehicles/')
      .then(response => response.json())
      .then(data => setVehicles(data.results.map((vehicle, index) => ({ ...vehicle, id: index + 1 }))));

    fetch('https://swapi.dev/api/films/')
  .then(response => response.json())
  .then(data =>setFilms(data.results.map((film, index) => ({...film, id: index + 1 }))));
  }, []);

  return (
    <div className="p-4 min-h-screen flex flex-col justify-center items-center bg-black text-yellow-500">
      <div className="max-w-screen-xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center title">Characters</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {characters.map((character) => (
            <Item key={character.id} item={character} type={{ id: "character", name:"Character" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
          ))}
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center title">Planets</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {planets.map((planet) => (
            <Item key={planet.id} item={planet} type={{ id: "planet", name:"Planet" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
          ))}
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center title">Species</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {species.map((specie) => (
            <Item key={specie.id} item={specie} type={{ id: "species", name:"Species" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
          ))}
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center title">Starships</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {starships.map((starship) => (
            <Item key={starship.id} item={starship} type={{ id: "starship", name:"Starship" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
          ))}
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center title">&#x60;ehicles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vehicles.map((vehicle) => (
            <Item key={vehicle.id} item={vehicle} type={{ id: "vehicle", name:"Vehicle" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
          ))}
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center title">Films</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {films.map((film) => (
            <Item key={film.id} item={film} type={{ id: "film", name:"Film" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;