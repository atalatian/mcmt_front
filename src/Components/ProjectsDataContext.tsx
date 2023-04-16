import {createContext, PropsWithChildren} from "react";
import { Require as ProjectsTableRowRequire } from "./Projects/View/TableRows";
import { Require as CamerasTableRowRequire } from "./Cameras/View/TableRows";
import { Require as ActiveCamerasRequire } from "./ActiveCameras/View/ActiveCameras";
import { useQuery } from '@tanstack/react-query'


export interface Project extends ProjectsTableRowRequire{
    cameras: Camera[],
}
export interface Camera extends CamerasTableRowRequire, ActiveCamerasRequire{

}

const ProjectsDataContext = createContext<Project[] | undefined>(undefined);

const ProjectsDataContextProvider = (props: PropsWithChildren<{}>) => {

    const projects = useQuery({
        queryKey: ["Projects"],
        queryFn: () => fetch("http://127.0.0.1:8000/projects")
            .then((res) => res.json())
    })

    console.log(projects);


    const value = {

    }

    return(
        <ProjectsDataContext.Provider value={undefined}>
            {props.children}
        </ProjectsDataContext.Provider>
    )
}

export default ProjectsDataContextProvider;