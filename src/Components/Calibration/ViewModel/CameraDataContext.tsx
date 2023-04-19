import {createContext, PropsWithChildren, useRef} from "react";
import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import { Require as CameraRequire } from "../View/Camera";
import {useParams} from "react-router-dom";
import {CameraDataProxy} from "../Model/ObjectProxies";

export interface Camera extends CameraRequire {
    is_calibrated: boolean,
    config: {
        top: number[][],
        fov: number[][],
    },
}

export interface Provide {
    camera: UseQueryResult<Camera>,
    changeTop: (top: number[][]) => void,
    changeFov: (fov: number[][]) => void,
    submitTrigger: () => void,
}
export const CameraDataContext = createContext<Provide | undefined>(undefined);

const CameraDataContextProvider = (props: PropsWithChildren<{}>) => {

    const { cameraId } = useParams();
    const queryClient = useQueryClient()
    const fovRef = useRef<number[][]>([]);
    const topRef = useRef<number[][]>([]);
    const isCalibratedRef = useRef<boolean>(false);
    const form = useRef(new FormData());
    if (cameraId === undefined) return <></>;

    const camera = useQuery({
        queryKey: ["Camera"],
        queryFn: () => fetch(`http://127.0.0.1:8001/cameras/${cameraId}`)
            .then((res) => res.json() as unknown as Camera).then((camera) => {
                isCalibratedRef.current = camera.is_calibrated;
                return camera;
            })
    })

    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`http://127.0.0.1:8001/cameras/${cameraId}/`,
                {
                    method: "PATCH",
                    body: form.current,
                })
        },
    })

    const changeTop = (top: number[][]) => {
        topRef.current = top;
    }

    const changeFov = (fov: number[][]) => {
        fovRef.current = fov;
    }

    const submitTrigger = async () => {
        if (topRef.current.length === 0 && topRef.current.length < 3) return;
        if (fovRef.current.length === 0 && fovRef.current.length < 3) return;
        form.current.append("config", JSON.stringify({ top: topRef.current, fov: fovRef.current }));
        if (!isCalibratedRef.current){
            form.current.append("is_calibrated", "true");
        }
        await mutation.mutate();
        await queryClient.invalidateQueries({ queryKey: ['Camera'] })
    }

    const value = {
        camera: CameraDataProxy(camera),
        changeFov,
        changeTop,
        submitTrigger,
    }

    return(
        <CameraDataContext.Provider value={value}>
            {props.children}
        </CameraDataContext.Provider>
    )
}

export default CameraDataContextProvider;