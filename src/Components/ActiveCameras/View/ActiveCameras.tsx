import Camera from "./Camera";
import video from "../../../assets/video4.mp4";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import { Provide as CameraProvide } from "./Camera";
import {CamerasDataContext} from "../ViewModel/CamerasDataContext";

export interface Require {
    id: number,
    uri: string,
}
const ActiveCameras = () => {

    const cameras = useContext(CamerasDataContext)?.cameras;
    if (cameras === undefined) return <></>;
    if (cameras.data === undefined) return <></>;
    if (cameras.data.length === 0) return <></>;

    const [currentTime, setCurrentTime] = useState(0);

    const PrimaryCameraController = (props: CameraProvide) => {
        const { player, playerSpecified } = props;
        const setCurrentTimeCopy = useCallback((state: number) => setCurrentTime(state) , [])

        useEffect(() => {
            if (!playerSpecified || player === undefined) return;
            //@ts-ignore
            player.on("timeupdate", () => {
                setCurrentTimeCopy(player.currentTime())
            })
        }, [playerSpecified])

        return (
            <></>
        )

    }

    const CameraController = (props: CameraProvide) => {
        const { player, playerSpecified } = props
        const currentTimeCopy = useMemo(() => currentTime, [currentTime])

        useEffect(() => {
            if (!playerSpecified || player === undefined) return;
            player.currentTime(currentTimeCopy);
        }, [playerSpecified, currentTimeCopy])

        return(
            <></>
        )
    }


    const value: {
        controller: Require,
        supporters: Require[],
    } = {
        controller: cameras.data[0],
        supporters: cameras.data,
    };

    return(
        <>
            <Camera url={value.controller.uri} Controller={PrimaryCameraController}/>
            {
                value.supporters.map((camera) => <Camera key={camera.id} url={camera.uri} currentTime={currentTime} Controller={CameraController}/>)
            }
        </>
    )
}

export default ActiveCameras;