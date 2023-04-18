import TextInput from "./TextInput";
import ProjectSelect from "./ProjectSelect";
import ModelSelect from "./ModelSelect";
import FileInput from "./FileInput";
import MyCheckBox from "./MyCheckBox";
import {PropsWithChildren, useContext, useEffect} from "react";
import { Provide as TextInputProvide } from "./TextInput";
import { Provide as FileInputProvide } from "./FileInput";
import { Provide as CheckboxProvide } from "./MyCheckBox";
import {Box, Button, Stack, Typography} from "@mui/material";
import {AddCameraContext} from "../ViewModel/AddCameraContext";
import {useNavigate} from "react-router-dom";
import MyAppBar from "../../ApplicationSpecific/MyAppBar";

const AddCameraPage = () => {

    const changeChannel = useContext(AddCameraContext)?.changeChannel;
    const changeFile = useContext(AddCameraContext)?.changeFile;
    const changeIsCalibrated = useContext(AddCameraContext)?.changeIsCalibrated;
    const submitTrigger = useContext(AddCameraContext)?.submitTrigger;
    const navigate = useNavigate();

    if (changeChannel === undefined) return <></>;
    if (changeFile === undefined) return <></>;
    if (changeIsCalibrated === undefined) return <></>;
    if (submitTrigger === undefined) return <></>;
    const TextInputController = (props: TextInputProvide) => {
        const { channel } = props;

        useEffect(() => {
            changeChannel({channel});
        }, [channel])

        return <></>
    }

    const FileInputController = (props: FileInputProvide) => {
        const { file } = props;

        useEffect(() => {
            changeFile({file});
        }, [file])

        return <></>
    }

    const ClickListener = (props: PropsWithChildren<CheckboxProvide>) => {
        const { checked } = props;

        useEffect(() => {
            changeIsCalibrated({checked})
        }, [checked])

        return (
            <>
                {props.children}
            </>
        )
    }

    const handleClick = async () => {
        await submitTrigger();
        navigate("/projects");
    }

    return(
        <>
            <MyAppBar></MyAppBar>
            <Stack spacing={2} maxWidth={`sm`} margin={`auto`} sx={{ mt: 2 }}>
                <Typography component={`h1`} width={`fit-content`} borderBottom={1} mb={1}>
                    Add Camera
                </Typography>
                <Box>
                    <TextInput Controller={TextInputController}/>
                </Box>
                <Box>
                    <ProjectSelect/>
                </Box>
                <Box>
                    <ModelSelect/>
                </Box>
                <Box>
                    <FileInput Controller={FileInputController}/>
                </Box>
                <Box>
                    <MyCheckBox ClickListener={ClickListener}/>
                </Box>
                <Box>
                    <Button variant={`contained`} onClick={handleClick}>
                        Submit
                    </Button>
                </Box>
            </Stack>
        </>
    )
}

export default AddCameraPage;