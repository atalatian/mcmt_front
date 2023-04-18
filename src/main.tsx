import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import AddProjectPage from "./Components/AddProject/View/AddProjectPage";
import ProjectsPage from "./Components/Projects/View/ProjectsPage";
import CamerasPage from "./Components/Cameras/View/CamerasPage";
import TrackingPage from "./Components/Tracking/View/TrackingPage";
import ActiveCamerasPage from "./Components/ActiveCameras/View/ActiveCamerasPage";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import ProjectsDataContextProvider from "./Components/Projects/ViewModel/ProjectsDataContext";
import CamerasDataContextProvider from "./Components/ActiveCameras/ViewModel/CamerasDataContext";
import AddProjectContextProvider from "./Components/AddProject/ViewModel/AddProjectContext";
import {CssBaseline} from "@mui/material";
import CamerasFilterContextProvider from "./Components/ActiveCameras/ViewModel/CamerasFilterContext";
import * as CamerasPageDataContext from "./Components/Cameras/ViewModel/CamerasDataContext";
import * as CamerasPageFilterContext from "./Components/Cameras/ViewModel/CamerasFilterContext";
import * as AddCameraProjectsDataContext from "./Components/AddCamera/ViewModel/ProjectsDataContext";
import ModelDataContextProvider from "./Components/AddCamera/ViewModel/ModelsDataContext";
import AddCameraPage from "./Components/AddCamera/View/AddCameraPage";
import AddCameraContextProvider from "./Components/AddCamera/ViewModel/AddCameraContext";

const router = createBrowserRouter([
    {
        path: "/addProject",
        element:
            <AddProjectContextProvider>
                <AddProjectPage/>
            </AddProjectContextProvider>,
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
            <CamerasPageDataContext.default>
                <CamerasPageFilterContext.default>
                    <CamerasPage/>
                </CamerasPageFilterContext.default>
            </CamerasPageDataContext.default>,
    },
    {
        path: "/tracking",
        element: <TrackingPage/>,
    },
    {
        path: "/project/:id/cameras/grid",
        element:
            <CamerasDataContextProvider>
                <CamerasFilterContextProvider>
                    <ActiveCamerasPage/>
                </CamerasFilterContextProvider>
            </CamerasDataContextProvider>
    },
    {
        path: "/addCamera",
        element:
            <AddCameraProjectsDataContext.default>
                <ModelDataContextProvider>
                    <AddCameraContextProvider>
                        <AddCameraPage/>
                    </AddCameraContextProvider>
                </ModelDataContextProvider>
            </AddCameraProjectsDataContext.default>
    },
    {
        path: "/",
        element:
            <ProjectsDataContextProvider>
                <ProjectsPage/>
            </ProjectsDataContextProvider>,
    }
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <CssBaseline/>
          <RouterProvider router={router} />
      </QueryClientProvider>
  </React.StrictMode>,
)
