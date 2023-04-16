import {createContext, PropsWithChildren} from "react";
import {Require as ProjectsTableRowRequire} from "../View/TableRows";
import {useQuery, UseQueryResult} from '@tanstack/react-query'


export interface Project extends ProjectsTableRowRequire{
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
        projects,
    }

    return(
        <ProjectsDataContext.Provider value={value}>
            {props.children}
        </ProjectsDataContext.Provider>
    )
}

export default ProjectsDataContextProvider;