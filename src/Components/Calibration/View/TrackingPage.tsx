import CameraCanvas from "./CameraCanvas";
import TopShotCanvas from "./TopShotCanvas";
import {Box, Button, Divider, IconButton, Stack} from "@mui/material";
import MyAppBar from "../../ApplicationSpecific/MyAppBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useContext} from "react";
import {CameraDataContext} from "../ViewModel/CameraDataContext";

const TrackingPage = () => {


    const changeIsCalibrated = useContext(CameraDataContext)!.changeIsCalibrated;
    const submitTrigger = useContext(CameraDataContext)!.submitTrigger;
    const handleArrowBackClick = () => {
        history.back();
    }

    const handleSubmit = async () => {
        changeIsCalibrated(true);
        await submitTrigger();
        history.back();
    }

    return(
        <>
            <MyAppBar>
                <IconButton sx={{ color: `white`, mr: 5 }} onClick={handleArrowBackClick}>
                    <ArrowBackIcon/>
                </IconButton>
            </MyAppBar>
            <Stack direction={`row`} justifyContent={`space-evenly`} alignItems={`center`} mt={5}>
                <TopShotCanvas/>
                <CameraCanvas/>
            </Stack>
            <Box mt={5} textAlign={`center`}>
                <Button variant={`contained`} onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </>
    )
}

export default TrackingPage;