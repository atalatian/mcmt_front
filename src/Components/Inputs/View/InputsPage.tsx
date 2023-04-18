import FileInput from "./FileInput";
import NameInput from "./NameInput";
import {useContext, useEffect} from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import { Provide as FileInputProvide } from "./FileInput";
import { Provide as NameInputProvide } from "./NameInput";
import {InputsContext} from "../ViewModel/InputsContext";
import {useNavigate} from "react-router-dom";
import MyAppBar from "../../ApplicationSpecific/MyAppBar";

const InputsPage = () => {

    const changeFile = useContext(InputsContext)?.changeFile;
    const changeName = useContext(InputsContext)?.changeName;
    const submitTrigger = useContext(InputsContext)?.submitTrigger;

    if (changeName === undefined) return <></>;
    if (changeFile === undefined) return <></>;
    if (submitTrigger === undefined) return <></>;

    const navigate = useNavigate();

    const NameInputController = (props: NameInputProvide) => {
        const { name } = props;

        useEffect(() => {
            changeName({name});
        }, [name])

        return(
            <></>
        )
    }

    const FileInputController = (props: FileInputProvide) => {
        const { file } = props;

        useEffect(() => {
            changeFile({file})
        }, [file])

        return(
            <></>
        )
    }

    const service = async () => {
        await submitTrigger();
        navigate("/projects");
    }

    return(
        <>
            <Box>
                <MyAppBar></MyAppBar>
                <Stack spacing={2} sx={{ mt: 1 }} margin={`auto`} maxWidth={`fit-content`}>
                    <Typography component={"h1"} borderBottom={1} maxWidth={`fit-content`}>
                        Inputs
                    </Typography>
                    <Box>
                        <NameInput Controller={NameInputController}/>
                    </Box>
                    <Box>
                        <FileInput Controller={FileInputController}/>
                    </Box>
                    <Box>
                        <Button onClick={service} type={`submit`} variant={`contained`}>
                            Submit
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}

export default InputsPage;