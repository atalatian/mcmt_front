import FileInput from "./FileInput";
import NameInput from "./NameInput";
import {useEffect, useRef} from "react";
import {Button} from "@mui/material";
import { Provide as FileInputProvide } from "./FileInput";
import { Provide as NameInputProvide } from "./NameInput";

const InputsPage = () => {

    const submitValue = useRef<FileInputProvide & NameInputProvide>(
        {
            name: "",
            file: undefined
        }
    )

    const NameInputController = (props: NameInputProvide) => {
        const { name } = props;

        useEffect(() => {
            submitValue.current.name = name;
        }, [name])

        return(
            <></>
        )
    }

    const FileInputController = (props: FileInputProvide) => {
        const { file } = props;

        useEffect(() => {
            submitValue.current.file = file;
        }, [file])

        return(
            <></>
        )
    }

    const service = () => {

    }

    return(
        <>
            <NameInput Controller={NameInputController}/>
            <FileInput Controller={FileInputController}/>
            <Button onClick={service}>
                Submit
            </Button>
        </>
    )
}

export default InputsPage;