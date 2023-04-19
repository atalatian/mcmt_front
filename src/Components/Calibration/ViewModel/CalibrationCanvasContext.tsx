import {createContext, useContext, useEffect, useMemo, useState} from "react";
import React from "react";
import produce from "immer";
import { Provide as FOVProvide } from "./FOVCalibrationDataContext";
import { Provide as TopProvide } from "./TopCalibrationDataContext";

export interface Shape {
    id: number,
    x: number,
    y: number,
    points: number[][],
    type: `polygon` | 'line',
    isFinished: boolean,
    isMouseOverStartPoint: boolean,
}

export const shapeDefault: Shape = {
    id: -1,
    x: 0,
    y: 0,
    points: [],
    type: 'polygon',
    isFinished: false,
    isMouseOverStartPoint: false
}

export interface Provide {
    shapes: Shape[],
    selectedId: number,
    curMousePos: number[],
    rectWidth: number,
    changeIsFinished: (id: number, value: boolean) => void,
    changePoints: (id: number, value: number[][]) => void,
    changeIsMouseOverStartPoint: (id: number, value: boolean) => void,
    addPoint: (id: number, value: number[]) => void,
    addShape: (value: Shape) => void,
    changeSelectedId: (value: number) => void,
    changeXY: (id: number, value: number[]) => void,
    changeMousePos: (value: number[]) => void,
}

export const CalibrationCanvasContext = createContext<Provide | undefined>(undefined);


const CalibrationCanvasContextProvider = (props: React.PropsWithChildren<{ Context: React.Context<FOVProvide | TopProvide | undefined> }>) => {

    const { Context } = props;

    const shape = useContext(Context)!.shape
    const handleChange = useContext(Context)!.handleChange;

    const [shapes, setShapes] = useState<Shape[]>([{...shape}]);
    const [selectedId, setSelectedId] = useState<number>(-1);
    const [curMousePos, setCurMousePos] = useState<number[]>([0, 0]);
    const firstShape = useMemo(() => shapes[0], [shapes[0].points, shapes[0].x, shapes[0].y]);

    useEffect(() => {
        setShapes([{...shape}])
    }, [shape])

    useEffect(() => {
        handleChange(firstShape);
    }, [firstShape])

    const changeIsFinished = (id: number, value: boolean) => {
        setShapes((prev) =>
            produce(prev, draft => {
                for (const shape of draft) {
                    if (shape.id === id){
                        shape.isFinished = value;
                    }
                }
            })
        )
    }

    const changePoints = (id: number, value: number[][]) => {
        setShapes((prev) =>
            produce(prev, draft => {
                for (const shape of draft) {
                    if (shape.id === id){
                        shape.points = value;
                    }
                }
            })
        )
    }

    const changeIsMouseOverStartPoint = (id: number, value: boolean) => {
        setShapes((prev) =>
            produce(prev, draft => {
                for (const shape of draft) {
                    if (shape.id === id){
                        shape.isMouseOverStartPoint = value;
                    }
                }
            })
        )
    }

    const addPoint = (id: number, value: number[]) => {
        setShapes((prev) =>
            produce(prev, draft => {
                for (const shape of draft) {
                    if (shape.id === id){
                        shape.points.push(value);
                    }
                }
            })
        )
    }

    const addShape = (value: Shape) => {
        setShapes((prev) =>
            produce(prev, draft => {
                let highestId = 0;
                for (const shape of draft) {
                    if (shape.id >= highestId){
                        highestId = shape.id + 1
                    }
                }
                draft.push({...value, id: highestId});
            })
        )
    }

    const changeSelectedId = (value: number) => {
        setSelectedId(value);
    }

    const changeXY = (id: number, value: number[]) => {
        setShapes((prev) =>
            produce(prev, draft => {
                for (const shape of draft) {
                    if (shape.id === id){
                        shape.x = value[0];
                        shape.y = value[1];
                    }
                }
            })
        )
    }

    const changeMousePos = (value: number[]) => {
        setCurMousePos(value);
    }

    const value: Provide = {
        shapes,
        selectedId,
        curMousePos,
        rectWidth: 6,
        changeIsFinished,
        changeIsMouseOverStartPoint,
        changePoints,
        addPoint,
        addShape,
        changeSelectedId,
        changeXY,
        changeMousePos,
    }

    return(
        <CalibrationCanvasContext.Provider value={value}>
            {props.children}
        </CalibrationCanvasContext.Provider>
    )
}

export default CalibrationCanvasContextProvider;