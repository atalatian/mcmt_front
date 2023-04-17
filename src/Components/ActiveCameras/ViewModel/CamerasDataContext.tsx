import {createContext, PropsWithChildren} from "react";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import { Require as ActiveCamerasRequire } from "../View/ActiveCameras";


export interface Camera extends ActiveCamerasRequire{
}

export interface Provide {
    cameras: UseQueryResult<Camera[]>,
}
export const CamerasDataContext = createContext<Provide | undefined>(undefined);


const CamerasDataContextProvider = (props: PropsWithChildren<{}>) => {

    const { id } = useParams();
    if (id === undefined) return <></>;

    const cameras = useQuery({
        queryKey: ["Cameras"],
        queryFn: () => fetch(`http://127.0.0.1:8001/cameras/`)
            .then((res) => res.json() as unknown as Camera[])
    })

    const value = {
        cameras,
    }

    return(
        <CamerasDataContext.Provider value={value}>
            {props.children}
        </CamerasDataContext.Provider>
    )
}

export default CamerasDataContextProvider;