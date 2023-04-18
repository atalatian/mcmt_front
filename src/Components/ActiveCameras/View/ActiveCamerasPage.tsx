import ActiveCameras from "./ActiveCameras";
import {AppBar, Box, Button, IconButton, Toolbar} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import MyAppBar from "../../ApplicationSpecific/MyAppBar";

const ActiveCamerasPage = () => {

    const handleArrowBackClick = () => {
        history.back()
    }



    return(
        <>
            <Box>
                <MyAppBar>
                    <IconButton sx={{ color: `white`, mr: 5 }} onClick={handleArrowBackClick}>
                        <ArrowBackIcon/>
                    </IconButton>
                </MyAppBar>
                <Box m={1}>
                    <ActiveCameras/>
                </Box>
            </Box>
        </>
    );
}

export default ActiveCamerasPage;