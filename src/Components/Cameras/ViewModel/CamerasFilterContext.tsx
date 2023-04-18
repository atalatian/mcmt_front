import {createContext, PropsWithChildren, useContext} from "react";
import {UseQueryResult} from "@tanstack/react-query";
import {Camera, CamerasDataContext} from "./CamerasDataContext";
import {CamerasFilterProxy} from "../Model/ObjectProxies";
import {useParams} from "react-router-dom";

export interface Provide {
    cameras: UseQueryResult<Camera[]>,
}
export const CamerasFilterContext = createContext<Provide | undefined>(undefined);
const CamerasFilterContextProvider = (props: PropsWithChildren<{}>) => {

    const { id } = useParams();
    const cameras = useContext(CamerasDataContext)?.cameras;

    if (id === undefined) return <></>;
    if (cameras === undefined) return <></>;

    const filterByProjectId = (cameras: Camera[]) => {
        return cameras.filter((camera) => camera.project.toString() === id);
    }

    const value = {
        cameras: CamerasFilterProxy(cameras, [filterByProjectId])
    }

    return(
        <CamerasFilterContext.Provider value={value}>
            {props.children}
        </CamerasFilterContext.Provider>
    )
}

export default CamerasFilterContextProvider;