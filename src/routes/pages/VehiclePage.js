import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Vehicle() {
  const [vehicles, setVehicles] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://swapi.dev/api/vehicles/`)
      .then(response => response.json())
      .then(data => {
        setVehicles(data.results);
      });
  }, []);

  const vehicle = vehicles[id - 1];

  if (!vehicle) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-black text-yellow-500">
      <h1 className="text-2xl font-bold mb-4">{vehicle.name}</h1>
    </div>
  );
}

export default Vehicle;