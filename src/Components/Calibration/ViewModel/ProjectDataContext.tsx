import {createContext, PropsWithChildren, useRef} from "react";
import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import { Require as TopShotRequire } from "../View/TopShot";
import {useParams} from "react-router-dom";

export interface Project extends TopShotRequire {
}

export interface Provide {
    project: UseQueryResult<Project>,
}

export const ProjectDataContext = createContext<Provide | undefined>(undefined);

const ProjectDataContextProvider = (props: PropsWithChildren<{}>) => {

    const { id } = useParams();
    const form = useRef<FormData>(new FormData());
    if (id === undefined) return <></>;

    const project = useQuery({
        queryKey: ["Project"],
        queryFn: () => fetch(`http://127.0.0.1:8001/projects/${id}`)
            .then((res) => res.json() as unknown as Project)
    })

    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`http://127.0.0.1:8001/projects/${id}`,
                {
                    method: "PUT",
                    body: form.current,
                })
        },
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