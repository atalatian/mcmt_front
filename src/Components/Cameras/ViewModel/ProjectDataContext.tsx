import {createContext, PropsWithChildren} from "react";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {Require as CamerasTableRowRequire} from "../View/TableRows";
import {useParams} from "react-router-dom";


export interface Project {
    cameras: Camera[],
}
export interface Camera extends CamerasTableRowRequire{
}

export interface Provide {
    project: UseQueryResult<Project>,
}
export const ProjectDataContext = createContext<Provide | undefined>(undefined);


const ProjectDataContextProvider = (props: PropsWithChildren<{}>) => {

    const { id } = useParams();
    if (id === undefined) return <></>;

    const project = useQuery({
        queryKey: ["Project"],
        queryFn: () => fetch(`http://127.0.0.1:8001/projects/${id}`)
            .then((res) => res.json() as unknown as Project)
    })

    const value = {
        project,
    }

    return(
        <ProjectDataContext.Provider value={value}>
            {props.children}
        </ProjectDataContext.Provider>
    )
}

export default ProjectDataContextProvider;