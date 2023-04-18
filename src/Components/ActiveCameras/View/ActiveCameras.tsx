import Camera from "./Camera";
import video from "../../../assets/video4.mp4";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import { Provide as CameraProvide } from "./Camera";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Box, Button} from "@mui/material";
import {CamerasFilterContext} from "../ViewModel/CamerasFilterContext";

export interface Require {
    id: number,
    uri: string,
}
const ActiveCameras = () => {

    const cameras = useContext(CamerasFilterContext)?.cameras;
    const [currentTime, setCurrentTime] = useState(0);
    const [play, setPlay] = useState(false);
    const [sync, setSync] = useState(false);

    if (cameras === undefined) return <></>;
    if (cameras.data === undefined) return <></>;
    if (cameras.data?.length === 0) return <></>;


    const PrimaryCameraController = (props: CameraProvide) => {
        const { player, playerSpecified } = props;
        const setCurrentTimeCopy = useCallback((state: number) => setCurrentTime(state) , []);
        const copyPlay = useMemo(() => play, [play]);
        const setPlayCopy = useCallback((state: boolean) => setPlay(state), []);

        useEffect(() => {
            if (!playerSpecified || player === undefined) return;

            if (copyPlay){
                player.play();
            } else {
                player.pause();
            }

            //@ts-ignore
            player.on("pause", () => {
                setPlayCopy(false);
            })
            //@ts-ignore
            player.on("play", () => {
                setPlayCopy(true);
            })
            //@ts-ignore
            player.on("timeupdate", () => {
                setCurrentTimeCopy(player.currentTime())
            })
        }, [playerSpecified, play])

        return (
            <></>
        )

    }

    const CameraController = (props: CameraProvide) => {
        const { player, playerSpecified } = props
        const currentTimeCopy = useMemo(() => currentTime, [currentTime])
        const copyPlay = useMemo(() => play, [play]);
        const copySync = useMemo(() => sync, [sync]);

        useEffect(() => {
            if (!playerSpecified || player === undefined) return;
            player.currentTime(currentTimeCopy);

            if (copyPlay){
                player.play();
            } else {
                player.pause();
            }

        }, [playerSpecified, currentTimeCopy, copyPlay, copySync])

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
                <Box position={`fixed`} width={640} height={360} zIndex={2} bottom={50} right={10}>
                    <Camera url={cameras.data[0].uri} Controller={PrimaryCameraController}/>
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
                <Box height={500}></Box>
            </Box>
        </>
    )
}

export default ActiveCameras;