import Table from "./Table";
import {Box, Grid, Stack, Typography} from "@mui/material";
import MyAppBar from "../../ApplicationSpecific/MyAppBar";

const ProjectsPage = () => {
    return(
        <Box>
            <MyAppBar>
            </MyAppBar>
            <Stack spacing={2} sx={{ mt: 1 }} maxWidth={`md`} margin={`auto`}>
                <Typography component={`h1`} borderBottom={1} maxWidth={`fit-content`}>
                    Projects
                </Typography>
                <Table/>
            </Stack>
        </Box>
    )
}

export default ProjectsPage;