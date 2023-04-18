import {Project} from "../ViewModel/ProjectsDataContext";
import {Model} from "../ViewModel/ModelsDataContext";

export function ProjectsSelectItems(this: { id: number, name: string, value: number }, object: Project) {
    this.id = object.id;
    this.name = object.name;
    this.value = object.id;

    return this;
}

export function ModelsSelectItems(this: { id: number, name: string, value: number }, object: Model) {
    this.id = object.id;
    this.name = object.name;
    this.value = object.id;

    return this;
}