import {useContext, useEffect} from "react";
import MySelect, {Provide as MySelectProvide} from "./Abstract/MySelect";
import {ProjectsDataContext} from "../ViewModel/ProjectsDataContext";
import {AddCameraContext} from "../ViewModel/AddCameraContext";


export interface Provide {
    project: number
}
const ProjectSelect = () => {

    const changeProject = useContext(AddCameraContext)?.changeProject;
    const projects = useContext(ProjectsDataContext)?.projects;
    const menuItems = projects?.data! as { id: number, value: number, name: string }[];

    if (changeProject === undefined) return <></>;

    const Controller = (props: MySelectProvide) => {
        const { value } = props;
        const project = value as number;

        useEffect(() => {
            changeProject({project})
        }, [project])

        return <></>
    }

    return(
        <MySelect MenuItems={menuItems} name={`Project`} Controller={Controller}/>
    )
}

export default ProjectSelect;