import React, {useState, useEffect} from 'react';
import { Rect, Text, Group, Transformer, Label, Tag} from 'react-konva'

const CanvasButton = ({ shapeProps, isSelected, onSelect, dummy}) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    const [shape, setShape] = useState(shapeProps);
    const [drag, setDrag] = useState(false);
    const [transform, setTransform] = useState(false);


    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.setNode(shapeRef.current);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Group
                onClick={dummy? () => {
                    console.log("CLICKED")
                } : null}

            >
                <Group
                    draggable={!dummy}
                    onClick={dummy? null : onSelect}
                    ref={dummy? null:shapeRef}
                    {...shape}
                    onDragStart={() => {setDrag(true)}}
                    onDragEnd={() => {setDrag(false);}}
                    onDragMove={e => {
                        console.log("drag");
                        onSelect();

                        let s = {
                            ...shape,
                            x: e.target.x(),
                            y: e.target.y()
                        };
                        setShape(s);
                    }}

                    onTransformStart={() => {setTransform(true)}}
                    onTransformEnd={() => {setTransform(false)}}
                    onTransform = {e => {
                        console.log("trans");
                        const node = shapeRef.current;
                        const scaleX = node.scaleX();
                        const scaleY = node.scaleY();

                        node.scaleX(1);
                        node.scaleY(1);
                        let s = {
                            ...shape,
                            x: node.x(),
                            y: node.y(),
                            width: Math.max(20, node.width() * scaleX),
                            height: Math.max(20, node.height() * scaleY)
                        };
                        setShape(s);
                    }}
                >
                    <Rect
                        strokeScaleEnabled={false}
                        height={shape.height}
                        width={shape.width}
                        stroke="black"
                        fill={shapeProps.fill}
                        strokeWidth={1}
                        cornerRadius={5}
                        offsetX={shape.width/2}
                        offsetY={shape.height/2}
                    />
                    <Text
                        offsetX={(shape.width/2)-3}
                        offsetY={(shape.height/2)-3}
                        height={shape.height-6}
                        width={shape.width-6}
                        align="center"
                        verticalAlign="middle"
                        text="Submit"
                        fontSize={13}
                        padding={4}

                    />
                </Group>
                {isSelected && <Transformer
                    ref={trRef}
                    rotateAnchorOffset={25}
                    rotationSnaps={[0, 90, 180,270]}
                    anchorSize={12}
                    padding={2}

                />}
                {isSelected && <Group
                    x={shape.x+((shape.width/2)+15)}
                    y={shape.y+((shape.height/2)+15)}


                >
                    <Label
                        visible={drag}
                    >
                        <Tag
                            fill="black"
                        />
                        <Text
                            align="center"
                            verticalAlign="middle"
                            fontSize={16}
                            text={"X: "+shape.x.toFixed(0)+"   Y: "+shape.y.toFixed(0)}
                            fill="white"
                            padding={5}
                        />
                    </Label>
                    <Label
                        visible={transform}

                    >
                        <Tag
                            fill="black"

                        />
                        <Text
                            align="center"
                            verticalAlign="middle"
                            fontSize={16}
                            text={"H: "+shape.height.toFixed(0)+"   W: "+shape.width.toFixed(0)}
                            fill="white"
                            padding={5}
                        />
                    </Label>
                </Group>}
                {dummy && <Group
                    x={shape.x-30}
                    y={shape.y+50}
                >
                    <Label
                        visible={dummy}
                    >
                        <Tag
                            fill="lightgrey"
                        />
                        <Text
                            align="center"
                            verticalAlign="middle"
                            fontSize={16}
                            text="Button"
                            fill="black"
                            padding={5}
                        />
                    </Label>
                </Group>}
            </Group>
        </React.Fragment>

    );
};
export default CanvasButton;