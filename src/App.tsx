import AddProjectPage from "./Components/AddProject/View/AddProjectPage";
import CamerasPage from "./Components/Cameras/View/CamerasPage";
import ProjectsPage from "./Components/Projects/View/ProjectsPage";
import ActiveCameras from "./Components/ActiveCameras/View/ActiveCameras";
import TrackingPage from "./Components/Tracking/View/TrackingPage";

function App() {
    return(
        <>
            <AddProjectPage/>
            <CamerasPage/>
            <ProjectsPage/>
            <ActiveCameras/>
            <TrackingPage/>
        </>
    )
}

export default App
