import React, { useState, } from 'react';
import { Stage, Layer, Rect} from 'react-konva';
import CanvasButton from "../shapes/CanvasButton";
let initialRectangle = [
    {
        x: 2770,
        y: 2770,
        width: 100,
        height: 100,
        fill: 'red',
        id: 'rect1'
    },
    {
        x: 2640,
        y: 2550,
        width: 200,
        height: 200,
        fill: 'green',
        id: 'rect2'
    }
];
const Canvas = () => {

    const [canvasHeight, setCanvasHeight] = useState(800);
    const [canvasWidth, setCanvasWidth] = useState(1000);
    const [originX, setOriginX] = useState(2640+(canvasWidth/2));
    const [originY, setOriginY] = useState(2550+(canvasHeight/2));
    const [zoom, setZoom] = useState(1);

    const [selectedId, selectShape] = React.useState(null);
    const [rectangles, setRectangles] = React.useState(initialRectangle);



    return (

        <Stage
            className="stage"
            width={5000}
            height={5000}
            scaleX={zoom}
            scaleY={zoom}
            onMouseDown={e => {
                // deselect when clicked on empty area
                const clickedOnEmpty = e.target === e.target.getStage();
                if (clickedOnEmpty) {
                    selectShape(null);
                }
            }}>

            <Layer>
                <Rect
                    width={canvasWidth}
                    height={canvasHeight}
                    x={2640}
                    y={2550}
                    fill="white"
                />
                {rectangles.map((rect, i) => {
                    return (
                        <CanvasButton
                            key = {i}
                            shapeProps={rect}
                            isSelected={rect.id === selectedId}
                            onSelect={() => {
                                selectShape(rect.id);
                            }}

                        />
                    );
                })}


            </Layer>
        </Stage>
    );

};

export default Canvas;