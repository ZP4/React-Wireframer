import React, {useState} from 'react';
import { Stage, Layer, Text, Star, Rect} from 'react-konva';
import CanvasButton from "../shapes/CanvasButton";
let initialRectangle = [
    {
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        fill: 'red',
        id: 'rect1'
    },
    {
        x: 150,
        y: 150,
        width: 200,
        height: 200,
        fill: 'green',
        id: 'rect2'
    }
];
const Canvas = () => {

    const [canvasHeight] = useState(60);
    const [canvasWidth] = useState(120);

    const [selectedId, selectShape] = React.useState(null);
    const [rectangles, setRectangles] = React.useState(initialRectangle);

    return (

        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={e => {
                // deselect when clicked on empty area
                const clickedOnEmpty = e.target === e.target.getStage();
                if (clickedOnEmpty) {
                    selectShape(null);
                }
            }}>

            <Layer className="test2">
                {rectangles.map((rect, i) => {
                    return (
                        <CanvasButton
                            key = {i}
                            shapeProps={rect}
                            isSelected={rect.id === selectedId}
                            onSelect={() => {
                                selectShape(rect.id);
                            }}
                            onChange={newAttrs => {
                                const rects = rectangles.slice();
                                rects[i] = newAttrs;
                                setRectangles(rects);
                                console.log(rectangles)
                            }}
                        />
                    );
                })}


            </Layer>
        </Stage>
    );

};

export default Canvas;