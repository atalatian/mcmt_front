import {useState} from "react";
import React from "react";

export interface Provide {
    file: File | undefined,
}

export interface Require {
    Controller: (props: Provide) => JSX.Element;
}

const FileInput = (props: Require) => {

    const { Controller } = props;

    const [file, setFile] = useState<File>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null) return;
        setFile(event.target.files[0])
    }

    return(
        <>
            <Controller file={file}/>
            <input type="file" onChange={handleChange}/>
        </>
    )
}

export default FileInput;