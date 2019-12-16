import React, {Component, useState,} from 'react';
import { Stage, Layer, Rect} from 'react-konva';
import CanvasButton from "../shapes/CanvasButton";
import CanvasTextField from "../shapes/CanvasTextField";
import CanvasLabel from "../shapes/CanvasLabel";
import CanvasContainer from "../shapes/CanvasContainer";

class Canvas extends Component {
    // const [originX, setOriginX] = useState(2640+(canvasWidth/2));
    // const [originY, setOriginY] = useState(2550+(canvasHeight/2));
    //
    // const [rectangles, setRectangles] = React.useState(list);

// ({zoomInput, canvasHeight, canvasWidth, list, select, ID }) =>

    state = {
        rectangles: this.props.list
    };

    render() {


        return (

            <Stage
                className="stage"
                offsetY={-90}
                offsetX={-90}
                width={5000}
                height={5000}
                scaleY={this.props.zoomInput}
                scaleX={this.props.zoomInput}
                onMouseDown={e => {
                    // deselect when clicked on empty area
                    const clickedOnEmpty = e.target === e.target.getStage();
                    if (clickedOnEmpty) {
                        this.props.select(null);
                    }
                }}
            >
                <Layer
                    onMouseDown={e => {
                        const clickedOnEmpty = e.target === e.target.getLayer();
                        if (clickedOnEmpty) {
                            this.props.select(null);
                        }

                    }}
                >
                    <Rect
                        width={this.props.canvasWidth}
                        height={this.props.canvasHeight}
                        x={0}
                        y={0}
                        fill="white"
                        onMouseDown={e => {
                            this.props.select(null);
                        }}

                    />
                    {this.state.rectangles.map((rect, i) => {
                        if(rect.type === "text") {
                            return(
                                <CanvasTextField
                                    key = {i}
                                    shapeProps={rect}
                                    isSelected={rect.id === this.props.ID}
                                    onSelect={() => {
                                        this.props.select(rect.id);
                                    }}
                                    onChangeDim= {this.props.changeItem}
                                />
                            );
                        }
                        else if(rect.type === "button") {
                            return (
                                <CanvasButton
                                    key = {i}
                                    shapeProps={rect}
                                    isSelected={rect.id === this.props.ID}
                                    onSelect={() => {
                                        this.props.select(rect.id);
                                    }}
                                    onChangeDim= {this.props.changeItem}
                                />
                            );
                        }
                        else if(rect.type === "container") {
                            return (
                                <CanvasContainer
                                    key = {i}
                                    shapeProps={rect}
                                    isSelected={rect.id === this.props.ID}
                                    onSelect={() => {
                                        this.props.select(rect.id);
                                    }}
                                    onChangeDim= {this.props.changeItem}
                                />
                            );
                        }
                        else if(rect.type === "label") {
                            return (
                                <CanvasLabel
                                    key = {i}
                                    shapeProps={rect}
                                    isSelected={rect.id === this.props.ID}
                                    onSelect={() => {
                                        this.props.select(rect.id);
                                    }}
                                    onChangeDim= {this.props.changeItem}

                                />
                            );
                        }

                    })}


                </Layer>
            </Stage>
        );
    }

}

export default Canvas;