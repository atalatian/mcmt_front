import Camera from "./Camera";
import video from "../../../assets/video4.mp4";
import {useCallback, useEffect, useMemo, useState} from "react";
import { Provide as CameraProvide } from "./Camera";

const ActiveCameras = () => {

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

    return(
        <>
            <Camera url={video} Controller={PrimaryCameraController}/>
            {
                [0,0].map((camera, index) => <Camera key={index} url={video} currentTime={currentTime} Controller={CameraController}/>)
            }
        </>
    )
}

export default ActiveCameras;