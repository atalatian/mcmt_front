import {createContext, PropsWithChildren, useRef} from "react";
import {Provide as FileInputProvide} from "../View/FileInput";
import {Provide as NameInputProvide} from "../View/NameInput";
import {useMutation} from "@tanstack/react-query";


export interface Provide {
    changeFile: ({file}: FileInputProvide) => void,
    changeName: ({name}: NameInputProvide) => void,
    submitTrigger: () => void,
}

export const AddProjectContext = createContext<Provide | undefined>(undefined);

const AddProjectContextProvider = (props: PropsWithChildren<{}>) => {

    const form = useRef<FormData>(new FormData());

    const mutation = useMutation({
        mutationFn: () => {
            return fetch("http://127.0.0.1:8001/projects/",
                {
                    method: "POST",
                    body: form.current,
                })
        },
    })

    const changeFile = ({file}: FileInputProvide) => {
        if (file === undefined) return;
        form.current.append("plan", file, file.name);
    }

    const changeName = ({name}: NameInputProvide) => {
        if (name === "") return;
        form.current.append("name", name);
    }

    const submitTrigger = () => {
        mutation.mutate();
    }

    const value = {
        changeFile,
        changeName,
        submitTrigger,
    }

    return(
        <AddProjectContext.Provider value={value}>
            {props.children}
        </AddProjectContext.Provider>
    )
}

export default AddProjectContextProvider;