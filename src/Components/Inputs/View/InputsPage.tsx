import FileInput from "./FileInput";
import NameInput from "./NameInput";
import {useContext, useEffect} from "react";
import {Button} from "@mui/material";
import { Provide as FileInputProvide } from "./FileInput";
import { Provide as NameInputProvide } from "./NameInput";
import {InputsContext} from "../ViewModel/InputsContext";
import {Form} from "react-router-dom";
import {allowedGetters} from "video.js/dist/types/tech/middleware";

const InputsPage = () => {

    const changeFile = useContext(InputsContext)?.changeFile;
    const changeName = useContext(InputsContext)?.changeName;
    const submitTrigger = useContext(InputsContext)?.submitTrigger;

    if (changeName === undefined) return <></>;
    if (changeFile === undefined) return <></>;
    if (submitTrigger === undefined) return <></>;

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

    const service = () => {
        submitTrigger();
    }

    return(
        <>
            <NameInput Controller={NameInputController}/>
            <FileInput Controller={FileInputController}/>
            <Button onClick={service} type={`submit`}>
                Submit
            </Button>
        </>
    )
}

export default InputsPage;