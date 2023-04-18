import {UseQueryResult} from "@tanstack/react-query";
import {Project} from "../ViewModel/ProjectsDataContext";
import {ProjectsSelectItems, ModelsSelectItems} from "./Model";
import {Model} from "../ViewModel/ModelsDataContext";

export const ProjectsDataProxy = (projects: UseQueryResult<Project[]>) => {
    const handler = {
        get(target: UseQueryResult<Project[]>, property: any){
            switch (property) {
                case "data":
                    if (Reflect.get(target, "data") === undefined){
                        return [];
                    } else {
                        return Reflect.get(target, "data")?.map((item) => new (ProjectsSelectItems as any)(item))
                    }
                default:
                    return Reflect.get(target, property);
            }
        }
    }

    return new Proxy(projects, handler)
}

export const ModelsDataProxy = (models: UseQueryResult<Model[]>) => {
    const handler = {
        get(target: UseQueryResult<Model[]>, property: any){
            switch (property) {
                case "data":
                    if (Reflect.get(target, "data") === undefined){
                        return [];
                    } else {
                        return Reflect.get(target, "data")?.map((item) => new (ModelsSelectItems as any)(item))
                    }
            }
        }
    }

    return new Proxy(models, handler)
}