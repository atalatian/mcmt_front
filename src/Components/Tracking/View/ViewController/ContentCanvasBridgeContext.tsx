import {createContext, PropsWithChildren, useState} from "react";

export interface Provide {
    width: number,
    height: number,
    changeWidth: (value: number) => void,
    changeHeight: (value: number) => void,
}

export const ContentCanvasBridgeContext = createContext<Provide | undefined>(undefined)

const ContentCanvasBridgeContextProvider = (props: PropsWithChildren<{}>) => {

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const changeWidth = (value: number) => {
        setWidth(value);
    }

     const changeHeight = (value: number) => {
        setHeight(value);
     }

    const value = {
        width,
        height,
        changeWidth,
        changeHeight,
    }

    return(
        <ContentCanvasBridgeContext.Provider value={value}>
            {props.children}
        </ContentCanvasBridgeContext.Provider>
    )
}


export default ContentCanvasBridgeContextProvider;
