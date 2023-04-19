import {Shape, CalibrationCanvasContext} from "../ViewModel/CalibrationCanvasContext";
import { Group as KonvaGroup, Transformer as KonvaTransformer } from "react-konva";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import Konva from "konva";
import Group = Konva.Group;
import Transformer = Konva.Transformer;
import KonvaEventObject = Konva.KonvaEventObject;
import MyLine from "./MyLine";
import Rects from "./Rects";
import {is} from "immer/dist/utils/common";

export interface Require {
    shape: Shape,
    isSelected: boolean,
}

const MyGroup = (props: Require) => {

    const { isSelected, shape } = props;

    const changeXY = useContext(CalibrationCanvasContext)?.changeXY;
    const changeSelectedId = useContext(CalibrationCanvasContext)?.changeSelectedId;

    if (changeXY === undefined) return <></>;
    if (changeSelectedId === undefined) return <></>;

    const groupRef = useRef<Group>();
    const [groupRefSpecified, setGroupRefSpecified] = useState(false);
    const trRef = useRef<Transformer>();
    const [trRefSpecified, setTrRefSpecified] = useState(false);

    useEffect(() => {
        if (!isSelected) return;
        if (!groupRefSpecified) return;
        if (!trRefSpecified) return;
        if (trRef.current === undefined) return;
        if (groupRef.current === undefined) return;
        trRef.current.nodes([groupRef.current]);
        trRef.current.getLayer()!.batchDraw();
    }, [isSelected, trRefSpecified, groupRefSpecified]);

    useEffect(()=> {
        if (!trRefSpecified) return;
        if (trRef.current === undefined) return;
        trRef.current.forceUpdate();
    }, [shape.points, trRefSpecified])

    const handleDragEnd = (el: KonvaEventObject<DragEvent>) => {
        el.cancelBubble = shape.isFinished;
        changeXY(shape.id, [el.target.attrs.x, el.target.attrs.y])
    }

    const handleDragStart = (event: KonvaEventObject<DragEvent>) => {
        event.cancelBubble = shape.isFinished;
        event.target.getStage()!.container().style.cursor = 'grabbing';
    }

    const handleDragMove = useCallback((el: KonvaEventObject<DragEvent>) => {
        el.cancelBubble = shape.isFinished;
        el.target.getStage()!.container().style.cursor = 'grabbing';
        const stageWidth = Math.floor(el.target.getStage()!.attrs.width);
        const stageHeight = Math.floor(el.target.getStage()!.attrs.height);

        let lowestX = stageWidth;
        let lowestY = stageHeight;
        shape.points.reduce((prev, cur)=>{
            if (cur[0] < prev[0] && cur[0] < lowestX){
                lowestX = cur[0];
            }

            if (cur[1] < prev[1] && cur[1] < lowestY){
                lowestY = cur[1];
            }

            return cur
        }, [stageWidth, stageHeight])

        let highestX = 0;
        let highestY = 0;
        shape.points.reduce((prev, cur)=>{
            if (cur[0] > prev[0] && cur[0] > highestX){
                highestX = cur[0];
            }

            if (cur[1] > prev[1] && cur[1] > highestY){
                highestY = cur[1];
            }
            return cur
        }, [0, 0])

        if (lowestX + el.target.attrs.x <= 0){
            el.target.x(-lowestX);
        }

        if (lowestY + el.target.attrs.y <= 0){
            el.target.y(-lowestY)
        }

        if (highestX + el.target.attrs.x >= stageWidth){
            el.target.x(stageWidth - highestX)
        }

        if (highestY + el.target.attrs.y >= stageHeight){
            el.target.y(stageHeight - highestY)
        }
    }, [shape.points])

    const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
        event.cancelBubble = shape.isFinished;
        if (shape.isFinished){
            changeSelectedId(shape.id);
        }
    }

    const handleMouseOver = (event: KonvaEventObject<MouseEvent>) => {
        event.cancelBubble = shape.isFinished;
        if (shape.isFinished && !isSelected){
            event.target.getStage()!.container().style.cursor = 'pointer';
        }
        if (shape.isFinished && isSelected){
            event.target.getStage()!.container().style.cursor = 'grab';
        }
    }

    const handleMouseEnter = (event: KonvaEventObject<MouseEvent>) => {
        event.cancelBubble = shape.isFinished
        if (shape.isFinished && !isSelected){
            event.target.getStage()!.container().style.cursor = 'pointer';
        }
        if (shape.isFinished && isSelected){
            event.target.getStage()!.container().style.cursor = 'grab';
        }
    }

    const handleMouseLeave = (event: KonvaEventObject<MouseEvent>) => {
        event.cancelBubble = shape.isFinished;
        if (shape.isFinished){
            event.target.getStage()!.container().style.cursor = 'default';
        }
    }

    const handleMouseOut = (event: KonvaEventObject<MouseEvent>) => {
        event.cancelBubble = shape.isFinished;
        if (shape.isFinished){
            event.target.getStage()!.container().style.cursor = 'default';
        }
    }

    const handleGroupRef = useCallback((el: Group | null) => {
        if (el === null) return;
        groupRef.current = el;
        setGroupRefSpecified(true);
    }, [])

    const handleTransformerRef = useCallback((el: Transformer | null) => {
        if (el === null) return;
        trRef.current = el;
        setTrRefSpecified(true);
    }, [])

    return(
        <>
            <KonvaGroup x={shape.x} y={shape.y} onDragStart={handleDragStart} onDragMove={handleDragMove} onDragEnd={handleDragEnd}
                        onMouseEnter={handleMouseEnter}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        draggable={shape.isFinished}
                        ref={handleGroupRef}>
                <MyLine isFinished={shape.isFinished} points={shape.points}/>
                <Rects shape={shape}/>
            </KonvaGroup>
            {
                isSelected &&
                <KonvaTransformer padding={10} borderStroke={`#1565c0`} borderStrokeWidth={4} ref={handleTransformerRef} resizeEnabled={false}
                                  rotateEnabled={false}/>
            }
        </>
    )
}

export default MyGroup;