import {Layer} from "react-konva";
import {useContext} from "react";
import {TrackingCanvasContext} from "../ViewModel/TrackingCanvasContext";
import MyGroup from "./MyGroup";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;

const Layers = () => {

    const shapes = useContext(TrackingCanvasContext)?.shapes;
    const selectedId = useContext(TrackingCanvasContext)?.selectedId;

    if (shapes === undefined) return <></>;
    if (selectedId === undefined) return <></>;


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