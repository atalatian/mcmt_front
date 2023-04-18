import {PropsWithChildren} from "react";
import {AppBar, Button, IconButton, Toolbar} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";

const MyAppBar = (props: PropsWithChildren<{}>) => {

    const navigate = useNavigate();
    const handleProjectsClick = () => {
        navigate("/projects")
    }

    const handleAddProjectClick = () => {
        navigate("/addProject");
    }

    const handleAddCameraClick = () => {
        navigate("/addCamera")
    }

    return(
        <AppBar position="sticky">
            <Toolbar>
                {props.children}
                <Button sx={{ color: `white` }} onClick={handleProjectsClick}>
                    Projects
                </Button>
                <Button sx={{ color: `white` }} onClick={handleAddProjectClick}>
                    Add Project
                </Button>
                <Button sx={{ color: `white` }} onClick={handleAddCameraClick}>
                    Add Camera
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default MyAppBar;