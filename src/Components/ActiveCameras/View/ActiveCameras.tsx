import Camera from "./Camera";

const ActiveCameras = () => {
    return(
        <>
            {
                [].map((camera) => <Camera url={""}/>)
            }
        </>
    )
}

export default ActiveCameras;