import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import InputsPage from "./Components/Inputs/View/InputsPage";
import ProjectsPage from "./Components/Projects/View/ProjectsPage";
import CamerasPage from "./Components/Cameras/View/CamerasPage";
import TrackingPage from "./Components/Tracking/View/TrackingPage";
import ActiveCamerasPage from "./Components/ActiveCameras/View/ActiveCamerasPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <InputsPage/>,
    },
    {
        path: "/projects",
        element: <ProjectsPage/>,
    },
    {
        path: "/project/cameras",
        element: <CamerasPage/>,
    },
    {
        path: "/tracking",
        element: <TrackingPage/>,
    },
    {
        path: "/grid",
        element: <ActiveCamerasPage/>
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
