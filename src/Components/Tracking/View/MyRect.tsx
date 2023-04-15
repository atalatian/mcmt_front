import {Shape, TrackingCanvasContext} from "../ViewModel/TrackingCanvasContext";
import {Rect} from "react-konva";
import {useContext} from "react";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;

export interface Require {
    shape: Shape,
    point: number[],
    index: number,
}

const MyRect = (props: Require) => {

    const { shape, point, index } = props;

    const changeIsMouseOverStartPoint = useContext(TrackingCanvasContext)!.changeIsMouseOverStartPoint;
    const changePoints = useContext(TrackingCanvasContext)!.changePoints;
    const rectWidth = useContext(TrackingCanvasContext)!.rectWidth;


    const handleMouseOverStartPoint = (event: KonvaEventObject<MouseEvent>) => {
        if (shape.isFinished || shape.points.length < 3) return;
        event.target.scale({ x: 1.5, y: 1.5 });

        changeIsMouseOverStartPoint(shape.id, true);
    };

    const handleMouseOverPoint = (event: KonvaEventObject<MouseEvent>) => {
        event.target.scale({ x: 1.5, y: 1.5 });
    }

    const handleMouseOutStartPoint = (event: KonvaEventObject<MouseEvent>) => {
        event.target.scale({ x: 1, y: 1 });
        changeIsMouseOverStartPoint(shape.id, false);
    };

    const handleMouseOutPoint = (event: KonvaEventObject<MouseEvent>) => {
        event.target.scale({ x: 1, y: 1 });
    }

    const handleDragMovePoint = (event: KonvaEventObject<DragEvent>) => {
        event.cancelBubble = shape.isFinished;
        const index = event.target.index - 1;
        const stageWidth = event.target.getStage()!.attrs.width;
        const stageHeight = event.target.getStage()!.attrs.height;
        let x = event.target.attrs.x;
        let y = event.target.attrs.y;

        if (x + shape.x <= 0){
            event.target.attrs.x = -shape.x;
        }

        if (y + shape.y <= 0){
            event.target.attrs.y = -shape.y;
        }

        if (x >= stageWidth - shape.x){
            event.target.attrs.x = stageWidth - shape.x;
        }

        if (y >= stageHeight - shape.y){
            event.target.attrs.y = stageHeight - shape.y;
        }

        x = event.target.attrs.x;
        y = event.target.attrs.y;

        const pos = [x, y];

        changePoints(shape.id, [...shape.points.slice(0, index), pos, ...shape.points.slice(index + 1)])
    }

    const startPointAttr =
        index === 0 ?
            {
                hitStrokeWidth: 12,
                stroke: shape.type === 'line' ? `red` : `#1565c0`,
                onMouseOver: handleMouseOverStartPoint,
                onMouseOut: handleMouseOutStartPoint

            }
            :
            null;

    const afterFinishedAttr =
        shape.isFinished ?
            {
                hitStrokeWidth: 12,
                stroke: `red`,
                onMouseOver: handleMouseOverPoint,
                onMouseOut: handleMouseOutPoint
            }
            :
            null;

    return(
        <Rect
            key={index}
            x={point[0]}
            y={point[1]}
            perfectDrawEnabled={false}
            width={rectWidth}
            height={rectWidth}
            fill="white"
            stroke="red"
            strokeWidth={3}
            draggable={shape.isFinished}
            onDragMove={handleDragMovePoint}
            {...startPointAttr}
            {...afterFinishedAttr}
        />
    );

}

export default MyRect;