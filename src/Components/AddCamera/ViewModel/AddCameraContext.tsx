import {createContext, PropsWithChildren, useRef} from "react";
import { Provide as TextInputProvide } from "../View/TextInput";
import { Provide as ProjectSelectProvide } from "../View/ProjectSelect";
import { Provide as ModelSelectProvide } from "../View/ModelSelect";
import { Provide as FileInputProvide } from "../View/FileInput";
import { Provide as CheckBoxProvide } from "../View/MyCheckBox";
import {useMutation} from "@tanstack/react-query";

export interface Provide {
    submitTrigger: () => void,
    changeChannel: ({channel}: TextInputProvide) => void,
    changeProject: ({project}: ProjectSelectProvide) => void,
    changeModel: ({model}: ModelSelectProvide) => void,
    changeFile: ({file}: FileInputProvide) => void,
    changeIsCalibrated: ({checked}: CheckBoxProvide) => void,
}

export const AddCameraContext = createContext<Provide | undefined>(undefined);

const AddCameraContextProvider = (props: PropsWithChildren<{}>) => {

    const form = useRef<FormData>(new FormData());

    const mutation = useMutation({
        mutationFn: () => {
            return fetch("http://127.0.0.1:8001/cameras/",
                {
                    method: "POST",
                    body: form.current,
                })
        },
    })
    const changeChannel = ({channel}: TextInputProvide) => {
        form.current.append("channel", channel.toString());
    }

    const changeProject = ({project}: ProjectSelectProvide) => {
        form.current.append("project", project.toString());
    }

    const changeModel = ({model}: ModelSelectProvide) => {
        form.current.append("model", model.toString());
    }

    const changeFile = ({file}: FileInputProvide) => {
        if (file === undefined) return;
        form.current.append("uri", file, file.name);
    }

    const changeIsCalibrated = ({checked}: CheckBoxProvide) => {
        form.current.append("is_calibrated", checked.toString());
    }

    const submitTrigger = () => {
        mutation.mutate();
    }

    const value = {
        submitTrigger,
        changeChannel,
        changeModel,
        changeProject,
        changeIsCalibrated,
        changeFile,
    }

    return(
        <AddCameraContext.Provider value={value}>
            {props.children}
        </AddCameraContext.Provider>
    )
}

export default AddCameraContextProvider;