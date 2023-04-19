import {useCallback, useContext, useEffect} from "react";
import {Line, Stage} from "react-konva";
import {Layer} from "react-konva/es/ReactKonvaCore";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;
import {shapeDefault, CalibrationCanvasContext} from "../ViewModel/CalibrationCanvasContext";
import Layers from "./Layers";
import {ContentCanvasBridgeContext} from "./ViewController/ContentCanvasBridgeContext";

const Canvas = () => {

    const width = useContext(ContentCanvasBridgeContext)?.width;
    const height = useContext(ContentCanvasBridgeContext)?.height;
    const shapes = useContext(CalibrationCanvasContext)?.shapes;
    const addShape = useContext(CalibrationCanvasContext)?.addShape;
    const addPoint = useContext(CalibrationCanvasContext)?.addPoint;
    const changeSelectedId = useContext(CalibrationCanvasContext)?.changeSelectedId;
    const changeIsFinished = useContext(CalibrationCanvasContext)?.changeIsFinished;
    const changeMousePos = useContext(CalibrationCanvasContext)?.changeMousePos;

    if (width === undefined) return <></>;
    if (height === undefined) return <></>;
    if (shapes === undefined) return <></>;
    if (addShape === undefined) return <></>;
    if (addPoint === undefined) return <></>;
    if (changeSelectedId === undefined) return <></>;
    if (changeIsFinished === undefined) return <></>;
    if (changeMousePos === undefined) return <></>;

    const shape = shapes.find((shape) => !shape.isFinished);

    useEffect(() => {
        if (shape !== undefined) return;
        if (shapes.length !== 0) return;
        addShape({...shapeDefault})
    }, [shape?.id])


    const handleClick = (event: KonvaEventObject<MouseEvent>) => {
        if (shape === undefined) return;
        if (shape.isFinished) return;
        const stage = event.target.getStage();
        if (stage === null) return;
        const mousePos = [stage.getPointerPosition()!.x - 3.5, stage.getPointerPosition()!.y - 3.5];
        if (shape.isMouseOverStartPoint && shape.points.length >= 3 && shape.type === 'polygon') {
            changeIsFinished(shape.id, true);
            changeSelectedId(shape.id);
        } else {
            addPoint(shape.id, mousePos);
        }
    };

    const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
        const stage = event.target.getStage();
        if (stage === null) return;
        const mousePos = [stage.getPointerPosition()!.x - 3.5, stage?.getPointerPosition()!.y - 3.5];

        changeMousePos(mousePos);
    }

    const xCoordination = useCallback(() => {

        if (width === 0 || height === 0) return [];
        const lines = [];
        const startY = 0;
        const endY = height;
        const divider = Math.floor(width / 20);
        for (let i=divider ; i<=width; i += divider){
            const newLine = {start: [i, startY], end: [i, endY]}
            lines.push(newLine);
        }
        return lines;

    }, [width, height])

    const yCoordination = useCallback(() => {

        if (width === 0 || height === 0) return [];
        const lines = [];
        const startX = 0;
        const endX = width;
        const divider = Math.floor(height / 20);
        for (let i=divider ; i<=height; i += divider){
            const newLine = {start: [startX, i], end: [endX, i]}
            lines.push(newLine);
        }
        return lines;

    }, [width, height])

    return(
        <Stage
            width={width}
            height={height}
            onMouseDown={handleClick}
            onMouseMove={handleMouseMove}
        >
            <Layer listening={false}>
                {
                    xCoordination().map((line, index) => {
                        return(
                            <Line key={index} points={[line.start[0], line.start[1],
                                line.end[0], line.end[1]]} stroke={`black`} opacity={0.2}/>
                        );
                    })
                }
                {
                    yCoordination().map((line, index) => {
                        return(
                            <Line key={index} points={[line.start[0], line.start[1],
                                line.end[0], line.end[1]]} stroke={`black`} opacity={0.2}/>
                        );
                    })
                }
            </Layer>
            {
                width > 0 && height > 0 &&
                <Layers/>
            }
        </Stage>
    )
}

export default Canvas;