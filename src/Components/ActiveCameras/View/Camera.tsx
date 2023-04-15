import {useCallback, useEffect, useRef, useState} from "react";
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import Player from "video.js/dist/types/player";

export interface Provide {
    player: Player | undefined,
    playerSpecified: boolean,
}

export interface Require {
    url: string,
    currentTime?: number,
    Controller: (props: Provide) => JSX.Element,
}

const Camera = (props: Require) => {

    const { url, currentTime = 0 } = props;
    const { Controller } = props;
    const videoRef = useRef<HTMLDivElement>();
    const [videoRefSpecified, setVideoRefSpecified] = useState(false);
    const playerRef = useRef<Player>();
    const [playerRefSpecified, setPlayerRefSpecified] = useState(false);

    useEffect(() => {
        if (!videoRefSpecified || videoRef.current === undefined) return;
        if (playerRef.current !== undefined) return;

        const videoElement = document.createElement("video-js");
        videoElement.classList.add('vjs-big-play-centered');
        videoRef.current.appendChild(videoElement);

        const options = {
            autoplay: true,
            muted: true,
            controls: true,
            responsive: true,
            fluid: true,
        };

        playerRef.current = videojs(videoElement, options);
        setPlayerRefSpecified(true);

    }, [videoRefSpecified])

    useEffect(() => {
        if (!playerRefSpecified || playerRef.current === undefined) return;
        playerRef.current?.currentTime(currentTime);
    }, [playerRefSpecified, currentTime])

    useEffect(() => {
        if (!playerRefSpecified || playerRef.current === undefined) return;
        playerRef.current?.src([{
            src: url,
            type: 'video/mp4'
        }])
    }, [playerRefSpecified, url])


    const handleRef = useCallback((el: HTMLDivElement | null)=>{
        if (el === null) return;
        videoRef.current = el;
        setVideoRefSpecified(true);
    }, [])

    return (
        <>
            <Controller player={playerRef.current} playerSpecified={playerRefSpecified}/>
            <div data-vjs-player>
                <div ref={handleRef}/>
            </div>
        </>
    );
}

export default Camera;