import Camera from "./Camera";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import { Provide as CameraProvide } from "./Camera";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Box, Button} from "@mui/material";
import {CamerasFilterContext} from "../ViewModel/CamerasFilterContext";

export interface Require {
    id: number,
    uri: string,
    is_top: boolean,
}
const ActiveCameras = () => {

    const cameras = useContext(CamerasFilterContext)?.cameras;
    const [currentTime, setCurrentTime] = useState(0);
    const [play, setPlay] = useState(true);
    const [sync, setSync] = useState(false);

    if (cameras === undefined) return <></>;
    if (cameras.data === undefined) return <></>;
    if (cameras.data?.length === 0) return <></>;


    const primary = cameras.data.find((camera) => camera.is_top);

    const PrimaryCameraController = (props: CameraProvide) => {
        const { player, playerSpecified } = props;
        const setCurrentTimeCopy = useCallback((state: number) => setCurrentTime(state) , []);
        const setPlayCopy = useCallback((state: boolean) => setPlay(state), []);
        const copySync = useMemo(() => sync, [sync]);

        useEffect(() => {
            if (!playerSpecified || player === undefined) return;

            const progressBar = player.contentEl().getElementsByClassName("vjs-progress-control").item(0)! as HTMLElement;
            const playControl = player.contentEl().getElementsByClassName("vjs-play-control").item(0)! as HTMLElement;

            progressBar.onclick = () => {
                setCurrentTimeCopy(Number(player.currentTime().toFixed(2)))
            }

            playControl.onclick = () => {
                setPlay((prev)=> !prev);
            }


        }, [playerSpecified])


        useEffect(() => {
            if (!playerSpecified || player === undefined) return;
            setCurrentTimeCopy(Number(player.currentTime().toFixed(2)))
            setPlayCopy(!player.paused())
        }, [playerSpecified, copySync])


        return (
            <></>
        )

    }

    const CameraController = (props: CameraProvide) => {
        const { player, playerSpecified } = props
        const currentTimeCopy = useMemo(() => currentTime, [currentTime])
        const copyPlay = useMemo(() => play, [play]);

        useEffect(() => {
            if (!playerSpecified || player === undefined) return;
            player.currentTime(currentTimeCopy);
        }, [playerSpecified, currentTimeCopy])

        useEffect(() => {
            if (!playerSpecified || player === undefined) return;
            if (copyPlay){
                player.play();
            } else {
                player.pause();
            }
        }, [playerSpecified, copyPlay])

        return(
            <></>
        )
    }

    const handleClick = () => {
        setSync((prev) => !prev);
    }



    return(
        <>
            <Box overflow={`hidden`}>
                <Box position={`fixed`} width={`${100/3}vw`} zIndex={2} bottom={10} right={10}>
                    <Camera url={primary ? primary.uri : ""} Controller={PrimaryCameraController}/>
                    <Box mt={1}>
                        <Button fullWidth onClick={handleClick} variant={`contained`}>
                            Sync
                        </Button>
                    </Box>
                </Box>
                <Grid2 container spacing={3}>
                    {
                        cameras.data?.map((camera, index) =>
                            <Grid2 key={index} xs={4}>
                                <Camera url={camera.uri} currentTime={currentTime} Controller={CameraController}/>
                            </Grid2>
                        )
                    }
                </Grid2>
                <Box height={`${((100/3) * 9)/16}vw`}></Box>
            </Box>
        </>
    )
}

export default ActiveCameras;