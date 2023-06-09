import {useCallback, useContext, useEffect, useRef, useState} from "react";
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import Player from "video.js/dist/types/player";
import {ContentCanvasBridgeContext} from "./ViewController/ContentCanvasBridgeContext";
import {CameraDataContext} from "../ViewModel/CameraDataContext";
import Video from "../../../assets/video4.mp4";

export interface Require {
    uri: string,
}

const Camera = () => {

    const camera = useContext(CameraDataContext)?.camera;
    const videoRef = useRef<HTMLDivElement>();
    const [videoRefSpecified, setVideoRefSpecified] = useState(false);
    const playerRef = useRef<Player>();
    const [playerRefSpecified, setPlayerRefSpecified] = useState(false);
    const changeWidth = useContext(ContentCanvasBridgeContext)?.changeWidth;
    const changeHeight = useContext(ContentCanvasBridgeContext)?.changeHeight;

    if (changeWidth === undefined) return <></>;
    if (changeHeight === undefined) return <></>;

    useEffect(() => {
        if (!videoRefSpecified || videoRef.current === undefined) return;
        if (playerRef.current !== undefined) return;

        const videoElement = document.createElement("video-js");
        videoElement.classList.add('vjs-big-play-centered');
        videoRef.current.appendChild(videoElement);

        const options = {
            autoplay: true,
            controls: false,
            responsive: true,
            fluid: true,
        };

        playerRef.current = videojs(videoElement, options, () => {
            //@ts-ignore
            playerRef.current.on('resize', () => {
                changeHeight(playerRef.current!.el_.getBoundingClientRect().height)
                changeWidth(playerRef.current!.el_.getBoundingClientRect().width)
            });
        });
        setPlayerRefSpecified(true);

    }, [videoRefSpecified])

    useEffect(() => {
        if (!playerRefSpecified || playerRef.current === undefined) return;
        playerRef.current?.src([{
            src: camera?.data?.uri,
            type: 'video/mp4'
        }])
    }, [playerRefSpecified, camera?.data?.uri])

    const handleRef = useCallback((el: HTMLDivElement | null)=>{
        if (el === null) return;
        videoRef.current = el;
        setVideoRefSpecified(true);
    }, [])

    return (
        <div data-vjs-player>
            <div ref={handleRef}/>
        </div>
    );
}

export default Camera;