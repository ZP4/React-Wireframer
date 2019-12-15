import React, { useState, } from 'react';
import { Stage, Layer, Rect} from 'react-konva';
import CanvasButton from "../shapes/CanvasButton";
import CanvasTextField from "../shapes/CanvasTextField";
import CanvasLabel from "../shapes/CanvasLabel";
import CanvasContainer from "../shapes/CanvasContainer";
let initialRectangle = [
    {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        fill: 'red',
        id: 'rect1'
    },
    {
        x: 11,
        y: 11,
        width: 200,
        height: 200,
        fill: 'green',
        id: 'rect2'
    }
];

const Canvas = ({zoomInput, canvasHeight, canvasWidth, list, select, ID }) => {
    const [originX, setOriginX] = useState(2640+(canvasWidth/2));
    const [originY, setOriginY] = useState(2550+(canvasHeight/2));

    const [rectangles, setRectangles] = React.useState(list);



    return (

        <Stage
            className="stage"
            offsetY={-90}
            offsetX={-90}
            width={5000}
            height={5000}
            scaleY={zoomInput}
            scaleX={zoomInput}
            onMouseDown={e => {
                // deselect when clicked on empty area
                const clickedOnEmpty = e.target === e.target.getStage();
                if (clickedOnEmpty) {
                    select(null);
                }
            }}
        >
            <Layer
                onMouseDown={e => {
                    const clickedOnEmpty = e.target === e.target.getLayer();
                    if (clickedOnEmpty) {
                        select(null);
                    }

                }}
            >
                <Rect
                    width={canvasWidth}
                    height={canvasHeight}
                    x={0}
                    y={0}
                    fill="white"
                    onMouseDown={e => {
                        select(null);
                    }}

                />
                {rectangles.map((rect, i) => {
                    if(rect.type === "text") {
                        return(
                            <CanvasTextField
                                key = {i}
                                shapeProps={rect}
                                isSelected={rect.id === ID}
                                onSelect={() => {
                                    select(rect.id);
                                }}
                            />
                        );
                    }
                    else if(rect.type === "button") {
                        return (
                            <CanvasButton
                                key = {i}
                                shapeProps={rect}
                                isSelected={rect.id === ID}
                                onSelect={() => {
                                    select(rect.id);
                                }}

                            />
                        );
                    }
                    else if(rect.type === "container") {
                        return (
                            <CanvasContainer
                                key = {i}
                                shapeProps={rect}
                                isSelected={rect.id === ID}
                                onSelect={() => {
                                    select(rect.id);
                                }}

                            />
                        );
                    }
                    else if(rect.type === "label") {
                        return (
                            <CanvasLabel
                                key = {i}
                                shapeProps={rect}
                                isSelected={rect.id === ID}
                                onSelect={() => {
                                    select(rect.id);
                                }}

                            />
                        );
                    }

                })}


            </Layer>
        </Stage>
    );

};

export default Canvas;