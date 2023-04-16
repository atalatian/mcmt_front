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
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import ProjectsDataContextProvider from "./Components/Projects/ViewModel/ProjectsDataContext";
import ProjectDataContextProvider from "./Components/Cameras/ViewModel/ProjectDataContext";
import CamerasDataContextProvider from "./Components/ActiveCameras/ViewModel/CamerasDataContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <InputsPage/>,
    },
    {
        path: "/projects",
        element:
            <ProjectsDataContextProvider>
                <ProjectsPage/>
            </ProjectsDataContextProvider>,
    },
    {
        path: "/project/:id/cameras",
        element:
            <ProjectDataContextProvider>
                <CamerasPage/>
            </ProjectDataContextProvider>,
    },
    {
        path: "/tracking",
        element: <TrackingPage/>,
    },
    {
        path: "/grid",
        element:
            <CamerasDataContextProvider>
                <ActiveCamerasPage/>
            </CamerasDataContextProvider>
    }
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <ProjectsDataContextProvider>
              <RouterProvider router={router} />
          </ProjectsDataContextProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
