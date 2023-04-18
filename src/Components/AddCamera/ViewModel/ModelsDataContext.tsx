import {createContext, PropsWithChildren} from "react";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {ModelsDataProxy} from "../Model/ObjectProxies";

export interface Model {
    id: number,
    name: string,
}

export interface Provide {
    models: UseQueryResult<Model[]>,
}

export const ModelsDataContext = createContext<Provide | undefined>(undefined);


const ModelDataContextProvider = (props: PropsWithChildren<{}>) => {

    const models = useQuery({
        queryKey: ["Models"],
        queryFn: () => fetch("http://127.0.0.1:8001/models")
            .then((res) => res.json() as unknown as Model[])
    })

    const value = {
        models: ModelsDataProxy(models),
    }

    return(
        <ModelsDataContext.Provider value={value}>
            {props.children}
        </ModelsDataContext.Provider>
    )
}

export default ModelDataContextProvider;