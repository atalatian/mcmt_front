import {Layer} from "react-konva";
import {useContext} from "react";
import {TrackingCanvasContext} from "../ViewModel/TrackingCanvasContext";
import MyGroup from "./MyGroup";

const Layers = () => {

    const shapes = useContext(TrackingCanvasContext)!.shapes;
    const selectedId = useContext(TrackingCanvasContext)!.selectedId;

    return(
        <>
            {
                shapes.map((shape) =>
                    <Layer key={shape.id}>
                            <MyGroup shape={shape} isSelected={shape.id === selectedId}/>
                    </Layer>
                )
            }
        </>
    )
}

export default Layers;