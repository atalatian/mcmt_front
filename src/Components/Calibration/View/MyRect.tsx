import {Shape, CalibrationCanvasContext} from "../ViewModel/CalibrationCanvasContext";
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

    const changeIsMouseOverStartPoint = useContext(CalibrationCanvasContext)?.changeIsMouseOverStartPoint;
    const changePoints = useContext(CalibrationCanvasContext)?.changePoints;
    const rectWidth = useContext(CalibrationCanvasContext)?.rectWidth;

    if (changeIsMouseOverStartPoint === undefined) return <></>;
    if (changePoints === undefined) return <></>;
    if (rectWidth === undefined) return <></>;

    const handleDragMove = (event: KonvaEventObject<DragEvent>) => {
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

    const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
        event.cancelBubble = shape.isFinished;
        if (shape.isFinished){
            event.target.getStage()!.container().style.cursor = 'grabbing';
        }
    }

    const handleMouseEnter = (event: KonvaEventObject<MouseEvent>) => {
        event.cancelBubble = shape.isFinished;
        if (shape.isFinished){
            event.target.scale({ x: 1.5, y: 1.5 });
            event.target.getStage()!.container().style.cursor = 'grab';
        }
    }

    const handleMouseOver = (event: KonvaEventObject<MouseEvent>) => {
        event.cancelBubble = shape.isFinished;
        if (shape.isFinished){
            event.target.scale({ x: 1.5, y: 1.5 });
            event.target.getStage()!.container().style.cursor = 'grab';
        }

        if (index === 0 && !shape.isFinished && shape.points.length >= 2) {
            event.target.scale({ x: 1.5, y: 1.5 });
            event.target.getStage()!.container().style.cursor = 'pointer';
            changeIsMouseOverStartPoint(shape.id, true);
        }
    }

    const handeMouseOut = (event: KonvaEventObject<MouseEvent>) => {
        event.cancelBubble = shape.isFinished;
        if (shape.isFinished){
            event.target.scale({ x: 1, y: 1 });
            event.target.getStage()!.container().style.cursor = 'default';
        }

        if (index === 0 && !shape.isFinished && shape.points.length >= 2) {
            event.target.scale({ x: 1, y: 1 });
            event.target.getStage()!.container().style.cursor = 'default';
            changeIsMouseOverStartPoint(shape.id, false);
        }
    }

    const handleMouseLeave = (event: KonvaEventObject<MouseEvent>) => {
        event.cancelBubble = shape.isFinished;
        if (shape.isFinished){
            event.target.scale({ x: 1, y: 1 });
            event.target.getStage()!.container().style.cursor = 'default';
        }
    }

    const handleDragEnd = (event: KonvaEventObject<DragEvent>) => {
        event.cancelBubble = shape.isFinished;
        if (shape.isFinished){
            event.target.getStage()!.container().style.cursor = 'grab'
        }
    }

    const startPointAttr = index === 0 && {stroke: `#1565c0`,}
    const afterFinishedAttr = shape.isFinished && {stroke: `red`,}

    return(
        <Rect
            key={index}
            x={point[0]}
            y={point[1]}
            perfectDrawEnabled={false}
            width={rectWidth}
            height={rectWidth}
            fill="white"
            stroke={`red`}
            strokeWidth={3}
            draggable={shape.isFinished}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            onMouseEnter={handleMouseEnter}
            onMouseOver={handleMouseOver}
            onMouseOut={handeMouseOut}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            hitStrokeWidth={12}
            {...startPointAttr}
            {...afterFinishedAttr}
        />
    );

}

export default MyRect;