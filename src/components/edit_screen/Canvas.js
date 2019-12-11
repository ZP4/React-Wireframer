import React, {useState} from 'react';
import { Stage, Layer, Text, Star, Rect} from 'react-konva';
import CanvasButton from "../shapes/CanvasButton";

function Canvas() {
    let initialRectangles =
        {
            x: 10,
            y: 10,
            width: 100,
            height: 100,
            fill: "red",
            id: "rect1"
        };
    const [canvasHeight] = useState(60);
    const [canvasWidth] = useState(120);
    const [selectedId, selectShape] = React.useState(null);
    const [rectangles, setRectangles] = React.useState(initialRectangles);

    return (

        <Stage
            width={500}
            height={900}
            onMouseDown={e => {
                // deselect when clicked on empty area
                const clickedOnEmpty = e.target === e.target.getStage();
                if (clickedOnEmpty) {
                    selectShape(null);
                }
            }}
        >

            <Layer className="test2"   >
                <Star
                    key={1}
                    x={200}
                    y={400}
                    numPoints={5}
                    innerRadius={20}
                    outerRadius={40}
                    fill="#89b717"
                    opacity={0.8}
                    draggable
                    rotation={Math.random() * 180}
                    shadowColor="black"
                    shadowBlur={10}
                    shadowOpacity={0.6}
                />
                <Text text="Try to drag a star" />
                <CanvasButton
                    key={1}
                    shapeProps={initialRectangles}
                    isSelected={initialRectangles.id === selectedId}
                    onSelect={() => {
                        selectShape(initialRectangles.id);
                    }}
                    onChange={newAttrs => {

                        initialRectangles = newAttrs;
                        setRectangles(initialRectangles);
                    }}/>

            </Layer>
        </Stage>
    );

}

export default Canvas;