import InputsPage from "./Components/Inputs/View/InputsPage";
import CamerasPage from "./Components/Cameras/View/CamerasPage";
import ProjectsPage from "./Components/Projects/View/ProjectsPage";
import ActiveCameras from "./Components/ActiveCameras/View/ActiveCameras";
import TrackingPage from "./Components/Tacking/View/TrackingPage";

function App() {
    return(
        <>
            <InputsPage/>
            <CamerasPage/>
            <ProjectsPage/>
            <ActiveCameras/>
            <TrackingPage/>
        </>
    )
}

export default App
