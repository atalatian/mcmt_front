import {Line as KonvaLine} from "react-konva";
import {useContext} from "react";
import {CalibrationCanvasContext} from "../ViewModel/CalibrationCanvasContext";

export interface Require {
    isFinished: boolean,
    points: number[][],
}

const MyLine = (props: Require) => {

    const { isFinished, points } = props;
    const rectWidth = useContext(CalibrationCanvasContext)!.rectWidth;
    const curMousePos = useContext(CalibrationCanvasContext)!.curMousePos;

    return(
        <KonvaLine
            points={
                points.concat(isFinished ? [] : curMousePos)
                    .reduce((a, b) => a.concat(b), []).map((point)=> {
                    return  point + rectWidth/2
                })
            }
            stroke="red"
            opacity={0.7}
            fill={'#FFC8C8'}
            strokeWidth={2}
            closed={isFinished}
        />
    )
}

export default MyLine