import {useContext, useEffect, useRef, useState} from "react";
import {ContentCanvasBridgeContext} from "./ViewController/ContentCanvasBridgeContext";

export interface Require {
    src: string,
}

const TopShot = (props: Require) => {

    const { src } = props;
    const changeWidth = useContext(ContentCanvasBridgeContext)?.changeWidth;
    const changeHeight = useContext(ContentCanvasBridgeContext)?.changeHeight;

    if (changeWidth === undefined) return <></>
    if (changeHeight === undefined) return <></>


    const handleRef = (el: HTMLImageElement | null) => {
        if (el === null) return;
        changeWidth(el?.naturalWidth);
        changeHeight(el?.naturalHeight);
    }

    return(
        <img ref={handleRef} src={src} alt={'TopShot'}/>
    )
}

export default TopShot;