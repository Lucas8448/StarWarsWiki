import { useState, useEffect } from "react";
import Item from "../components/Item";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [films, setFilms] = useState([]);
  const [expandedSections, setExpandedSections] = useState([]);

  useEffect(() => {
    Promise.all([
    fetch('/data/people.json'),
  ]).then((responses) =>
      Promise.all(responses.map((response) => response.json()))
  ).then((data) => {
      let characters = [];
      data.forEach((pageData, pageIndex) => {
          const pageCharacters = pageData.map((character) => {
              const url = new URL(character.url);
              const pathSegments = url.pathname.split('/');
              const id = pathSegments[pathSegments.length - 2]; // the id is the second last segment of the path
              return { ...character, id };
          });
          characters = characters.concat(pageCharacters);
      });
      setCharacters(characters);
    });


    fetch('/data/planets.json')
      .then(response => response.json())
      .then(data => setPlanets(data.map((planet, index) => ({ ...planet, id: index + 1 }))));


    fetch('/data/species.json')
      .then(response => response.json())
      .then(data => setSpecies(data.map((specie, index) => ({ ...specie, id: index + 1 }))));

    fetch('/data/starships.json')
      .then(response => response.json())
      .then(data => setStarships(data.map((starship, index) => ({ ...starship, id: index + 1 }))));

    fetch('/data/vehicles.json')
      .then(response => response.json())
      .then(data => setVehicles(data.map((vehicle, index) => ({ ...vehicle, id: index + 1 }))));

    fetch('/data/films.json')
      .then(response => response.json())
      .then(data =>setFilms(data.map((film, index) => ({...film, id: index + 1 }))));
  }, []);
  
  const handleExpandToggle = (section) => {
    setExpandedSections(prevState => {
      if (prevState.includes(section)) {
        return prevState.filter(item => item !== section);
      } else {
        return [...prevState, section];
      }
    });
  };

  const renderItems = (items, section) => {
    const isExpanded = expandedSections.includes(section);
    const visibleItems = isExpanded ? items : items.slice(0, 10);

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              type={{ id: section, name: section.charAt(0).toUpperCase() + section.slice(1) }}
              className="bg-gray-900 rounded-lg shadow-md p-4"
            />
          ))}
        </div>
        {items.length > 10 && (
          <button onClick={() => handleExpandToggle(section)}>
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        )}
      </>
    );
  };

  return (
    <div className="p-4 min-h-screen flex flex-col justify-center items-center bg-black text-yellow-500">
      <h1 className="text-6xl font-bold mb-6 text-center text-yellow-500 title">The Star Wars Wiki</h1>
      <div className="max-w-screen-xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center title">Characters</h1>
        {renderItems(characters, "character")}

        <h1 className="text-2xl font-bold mb-4 text-center title">Planets</h1>
        {renderItems(planets, "planet")}

        <h1 className="text-2xl font-bold mb-4 text-center title">Species</h1>
        {renderItems(species, "species")}

        <h1 className="text-2xl font-bold mb-4 text-center title">Starships</h1>
        {renderItems(starships, "starship")}

        <h1 className="text-2xl font-bold mb-4 text-center title">&#x60;ehicles</h1>
        {renderItems(vehicles, "vehicle")}

        <h1 className="text-2xl font-bold mb-4 text-center title">Films</h1>
        {renderItems(films, "film")}
      </div>
    </div>
  );
}

export default Home;
