import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {ContentCanvasBridgeContext} from "./ViewController/ContentCanvasBridgeContext";
import {ProjectDataContext} from "../ViewModel/ProjectDataContext";

export interface Require {
    plan: string,
}

const TopShot = () => {

    const topShot = useContext(ProjectDataContext)?.project
    const changeWidth = useContext(ContentCanvasBridgeContext)?.changeWidth;
    const changeHeight = useContext(ContentCanvasBridgeContext)?.changeHeight;

    if (topShot === undefined) return <></>
    if (topShot.data === undefined) return <></>
    if (changeWidth === undefined) return <></>
    if (changeHeight === undefined) return <></>

    const handleRef = (el: HTMLImageElement | null) => {
        if (el === null) return;
        el.onload = () => {
            changeWidth(el?.clientWidth);
            changeHeight(el?.clientHeight);
        }
    }

    return(
        <img ref={handleRef} width={`100%`} src={topShot.data.plan} alt={'TopShot'}/>
    )
}

export default TopShot;