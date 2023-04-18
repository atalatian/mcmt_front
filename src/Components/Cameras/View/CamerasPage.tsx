import Table from "./Table";
import {Box, Button, IconButton, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MyAppBar from "../../ApplicationSpecific/MyAppBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CamerasPage = () => {

    const navigate = useNavigate();

    const handleArrowBackClick = () => {
        history.back()
    }
    const handleClick = () => {
        navigate("grid");
    }

    return(
        <Box>
            <MyAppBar>
                <IconButton sx={{ color: `white`, mr: 5 }} onClick={handleArrowBackClick}>
                    <ArrowBackIcon/>
                </IconButton>
            </MyAppBar>
            <Stack spacing={2} sx={{ mt: 1 }} maxWidth={`md`} margin={`auto`}>
                <Typography component={`h1`} borderBottom={1} maxWidth={`fit-content`}>
                    Cameras
                </Typography>
                <Button variant={`contained`} onClick={handleClick}>Cameras Grid</Button>
                <Table/>
            </Stack>
        </Box>
    )
}

export default CamerasPage;