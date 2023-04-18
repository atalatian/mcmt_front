import MySelect, {Provide as MySelectProvide} from "./Abstract/MySelect";
import {useContext, useEffect} from "react";
import {ModelsDataContext} from "../ViewModel/ModelsDataContext";
import {AddCameraContext} from "../ViewModel/AddCameraContext";

export interface Provide {
    model: number,
}
const ModelSelect = () => {

    const changeModel = useContext(AddCameraContext)?.changeModel;
    const models = useContext(ModelsDataContext)?.models;
    const menuItems = models?.data! as { id: number, value: number, name: string }[];

    if (changeModel === undefined) return <></>;
    const Controller = (props: MySelectProvide) => {
        const { value } = props;
        const model = value as number;

        useEffect(() => {
            changeModel({model});
        }, [model])

        return <></>
    }

    return(
        <MySelect MenuItems={menuItems} name={`Model`} Controller={Controller}/>
    )
}

export default ModelSelect;