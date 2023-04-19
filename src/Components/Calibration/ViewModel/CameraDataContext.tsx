import {createContext, PropsWithChildren, useRef} from "react";
import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import { Require as CameraRequire } from "../View/Camera";
import {useParams} from "react-router-dom";
import {CameraDataProxy} from "../Model/ObjectProxies";

export interface Camera extends CameraRequire {
    config: configRequire,
    channel: number,
    project: number,
    model: number,
    uri: string,
}

export interface configRequire {
    top: number[][],
    fov: number[][],
}
export interface Require  extends configRequire{
    is_calibrated: boolean,
}

export interface Provide {
    camera: UseQueryResult<Camera>,
    changeTop: (top: number[][]) => void,
    changeFov: (fov: number[][]) => void,
    changeIsCalibrated: (is_calibrated: boolean) => void,
    submitTrigger: () => void,
}
export const CameraDataContext = createContext<Provide | undefined>(undefined);

const CameraDataContextProvider = (props: PropsWithChildren<{}>) => {

    const { cameraId } = useParams();
    const data = useRef<configRequire>({top: [], fov: []});
    const form = useRef(new FormData());
    if (cameraId === undefined) return <></>;

    const camera = useQuery({
        queryKey: ["Camera"],
        queryFn: () => fetch(`http://127.0.0.1:8001/cameras/${cameraId}`)
            .then((res) => res.json() as unknown as Camera)
    })

    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`http://127.0.0.1:8001/cameras/${cameraId}/`,
                {
                    method: "PUT",
                    body: form.current,
                })
        },
    })

    const changeTop = (top: number[][]) => {
        data.current.top = top;
    }

    const changeFov = (fov: number[][]) => {
        data.current.fov = fov;
    }

    const changeIsCalibrated = (is_calibrated: boolean) => {
        form.current.append("is_calibrated", is_calibrated.toString());
    }

    const submitTrigger = async () => {
        if (data.current.fov!.length === 0) return;
        if (data.current.top!.length === 0) return;
        form.current.append("id", cameraId);
        form.current.append("channel", camera.data!.channel.toString());
        form.current.append("project", camera.data!.project.toString());
        form.current.append("model", camera.data!.model.toString());
        form.current.append("uri", camera.data!.uri);
        form.current.append("config", JSON.stringify(data.current));
        await mutation.mutate()
    }

    const value = {
        camera: CameraDataProxy(camera),
        changeFov,
        changeTop,
        changeIsCalibrated,
        submitTrigger,
    }

    return(
        <CameraDataContext.Provider value={value}>
            {props.children}
        </CameraDataContext.Provider>
    )
}

export default CameraDataContextProvider;