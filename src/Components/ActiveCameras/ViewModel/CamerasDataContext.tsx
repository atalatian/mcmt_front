import {createContext, PropsWithChildren} from "react";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import { Require as ActiveCamerasRequire } from "../View/ActiveCameras";
import {CamerasDataProxy} from "../Model/ObjectProxies";


export interface Camera extends ActiveCamerasRequire{
    project: number,
}

export interface Provide {
    cameras: UseQueryResult<Camera[]>,
}
export const CamerasDataContext = createContext<Provide | undefined>(undefined);


const CamerasDataContextProvider = (props: PropsWithChildren<{}>) => {

    const cameras = useQuery({
        queryKey: ["Cameras"],
        queryFn: () => fetch(`http://127.0.0.1:8001/cameras/`)
            .then((res) => res.json() as unknown as Camera[])
    })

    const value = {
        cameras: CamerasDataProxy(cameras),
    }

    return(
        <CamerasDataContext.Provider value={value}>
            {props.children}
        </CamerasDataContext.Provider>
    )
}

export default CamerasDataContextProvider;