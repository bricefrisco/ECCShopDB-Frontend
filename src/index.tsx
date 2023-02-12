import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Regions from "./pages/Regions";
import Region from "./pages/Region";
import Players from "./pages/Players";
import Player from "./pages/Player";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import Docs from "./pages/Docs";

import "./index.css";
import "react-tooltip/dist/react-tooltip.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/shops",
    element: <Shops />,
    errorElement: <Error />,
  },
  {
    path: "/regions",
    element: <Regions />,
    errorElement: <Error />,
  },
  {
    path: "/regions/:name",
    element: <Region />,
    errorElement: <Error />,
  },
  {
    path: "/players",
    element: <Players />,
    errorElement: <Error />,
  },
  {
    path: "/players/:name",
    element: <Player />,
    errorElement: <Error />,
  },
  {
    path: "/docs",
    element: <Docs />,
    errorElement: <Error />,
  },
  {
    path: "/*",
    element: <NotFound />,
    errorElement: <Error />,
  },
  {
    path: "/home",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/search/chest-shops/*",
    element: <Navigate to="/shops" replace />,
  },
  {
    path: "/search/regions/*",
    element: <Navigate to="/regions" replace />,
  },
  {
    path: "/search/players/*",
    element: <Navigate to="/players" replace />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
