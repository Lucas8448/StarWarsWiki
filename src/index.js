import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from './routes/Home';
import Character from './routes/pages/CharacterPage';
import Planet from "./routes/pages/PlanetPage";
import Species from "./routes/pages/SpeciesPage";
import Starship from "./routes/pages/StarshipPage";
import Vehicle from "./routes/pages/VehiclePage";
import Film from "./routes/pages/FilmPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/character/:id",
    element: <Character />,
  },
  {
    path: "/planet/:id",
    element: <Planet />,
  },
  {
    path: "/species/:id",
    element: <Species />,
  },
  {
    path: "/starship/:id",
    element: <Starship />,
  },
  {
    path: "/vehicle/:id",
    element: <Vehicle />,
  },
  {
    path: "/film/:id",
    element: <Film />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
