import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {createContext, PropsWithChildren} from "react";
import {ProjectsDataProxy} from "../Model/ObjectProxies";

export interface Project {
    id: number,
    name: string,
}

export interface Provide {
    projects: UseQueryResult<Project[]>,
}

export const ProjectsDataContext = createContext<Provide | undefined>(undefined);


const ProjectsDataContextProvider = (props: PropsWithChildren<{}>) => {

    const projects = useQuery({
        queryKey: ["Projects"],
        queryFn: () => fetch("http://127.0.0.1:8001/projects")
            .then((res) => res.json() as unknown as Project[])
    })

    const value = {
        projects: ProjectsDataProxy(projects),
    }

    return(
        <ProjectsDataContext.Provider value={value}>
            {props.children}
        </ProjectsDataContext.Provider>
    )
}

export default ProjectsDataContextProvider;