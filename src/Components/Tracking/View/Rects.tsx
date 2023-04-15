import MyRect from "./MyRect";
import {Shape} from "../ViewModel/TrackingCanvasContext";

export interface Require {
    shape: Shape,
}


const Rects = (props: Require) => {

    const { shape } = props;

    return(
        <>
            {
                shape.points.map((point, index) => <MyRect key={index} shape={shape} point={point} index={index}/>)
            }
        </>
    )
}

export default Rects;