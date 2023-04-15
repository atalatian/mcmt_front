import {useCallback, useContext, useEffect, useState} from "react";
import {Line, Stage} from "react-konva";
import {Layer} from "react-konva/es/ReactKonvaCore";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;
import {shapeDefault, TrackingCanvasContext} from "../ViewModel/TrackingCanvasContext";
import Layers from "./Layers";
import {ContentCanvasBridgeContext} from "./ViewController/ContentCanvasBridgeContext";

const Canvas = () => {

    const width = useContext(ContentCanvasBridgeContext)!.width;
    const height = useContext(ContentCanvasBridgeContext)!.height;
    const shape = useContext(TrackingCanvasContext)!.shapes.find((shape) => !shape.isFinished);
    const addShape = useContext(TrackingCanvasContext)!.addShape;
    const addPoint = useContext(TrackingCanvasContext)!.addPoint;
    const changeSelectedId = useContext(TrackingCanvasContext)!.changeSelectedId;
    const changeIsFinished = useContext(TrackingCanvasContext)!.changeIsFinished;
    const changeMousePos = useContext(TrackingCanvasContext)!.changeMousePos;


    useEffect(() => {
        if (shape !== undefined) return;
        addShape({...shapeDefault})
    }, [shape?.id])


    const handleClick = (event: KonvaEventObject<MouseEvent>) => {
        if (shape === undefined) return;
        const id = shape.id;
        const isFinished = shape.isFinished;
        const points = shape.points;
        const isMouseOverStartPoint = shape.isMouseOverStartPoint
        const type = shape.type;


        if (isFinished) return;
        const stage = event.target.getStage();
        if (stage === null) return;
        const mousePos = [stage.getPointerPosition()!.x - 3.5, stage.getPointerPosition()!.y - 3.5];
        if (isMouseOverStartPoint && points.length >= 3 && type === 'polygon') {
            changeIsFinished(id, true);
            changeSelectedId(id);
        } else {
            addPoint(id, mousePos);
        }
    };

    const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
        const stage = event.target.getStage();
        if (stage === null) return;
        stage.setPointersPositions(event);
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