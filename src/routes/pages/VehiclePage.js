import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from "../../components/Item";

function Vehicle() {
  const [vehicle, setVehicle] = useState(null);
  const [films, setFilms] = useState([]);
  const [pilots, setPilots] = useState([]);
  const { id } = useParams();

  const getIdFromUrl = (url) => url.match(/(\d+)\/$/)[1];

  useEffect(() => {
    fetch(`https://swapi.dev/api/vehicles/${id}`)
      .then(response => response.json())
      .then(data => {
        setVehicle(data);

        // Fetch related resources
        Promise.all(data.films.map(url => fetch(url).then(res => res.json())
            .then(film => ({ ...film, id: getIdFromUrl(film.url) }))))
          .then(setFilms);

        Promise.all(data.pilots.map(url => fetch(url).then(res => res.json())
            .then(pilot => ({ ...pilot, id: getIdFromUrl(pilot.url) }))))
          .then(setPilots);
      });
  }, [id]);

  if (!vehicle) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-black text-yellow-500">
      <h1 className="text-2xl font-bold mb-4">{vehicle.name}</h1>
      <p className="text-lg">Model: {vehicle.model}</p>
      <p className="text-lg">Manufacturer: {vehicle.manufacturer}</p>
      <p className="text-lg">Cost in Credits: {vehicle.cost_in_credits}</p>
      <p className="text-lg">Max Speed: {vehicle.max_atmosphering_speed}</p>
      <p className="text-lg">Crew Size: {vehicle.crew}</p>
      <p className="text-lg">Passenger Capacity: {vehicle.passengers}</p>
      <p className="text-lg">Cargo Capacity: {vehicle.cargo_capacity}</p>
      <p className="text-lg">Consumables: {vehicle.consumables}</p>
      <p className="text-lg">Vehicle Class: {vehicle.vehicle_class}</p>

      <h2 className="text-xl font-bold mb-2">Films</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {films.length > 0 ? films.map((film) => (
            <Item key={film.id} item={film} type={{ id: "film", name:"Film" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
        )) : <p>No Films Available</p>}
      </div>
      
      <h2 className="text-xl font-bold mb-2">Pilots</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pilots.length > 0 ? pilots.map((pilot) => (
            <Item key={pilot.id} item={pilot} type={{ id: "character", name:"Pilot" }} className="bg-gray-900 rounded-lg shadow-md p-4" />
        )) : <p>No Pilots Available</p>}
      </div>
    </div>
  );
}

export default Vehicle