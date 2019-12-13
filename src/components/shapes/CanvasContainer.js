import React, {useState} from 'react';
import { Rect, Text, Group, Transformer, Label, Tag} from 'react-konva'

const CanvasContainer = ({ shapeProps, isSelected, onSelect, dummy}) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    const [shape, setShape] = useState(shapeProps);
    const [drag, setDrag] = useState(false);
    const [transform, setTransform] = useState(false);

    React.useEffect(() => {
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
                <Rect
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
                            width: Math.max(200, node.width() * scaleX),
                            height: Math.max(200, node.height() * scaleY)
                        };
                        setShape(s);
                    }}
                    offsetX={shape.width/2}
                    offsetY={shape.height/2}
                >
                </Rect>
                {isSelected && <Transformer
                    ref={trRef}
                    rotateAnchorOffset={25}
                    rotationSnaps={[0, 90, 180,270]}
                    anchorSize={12}
                    padding={2}
                    rotateEnabled={false}
                />}
                {isSelected && <Group
                    x={shape.x+((shape.width/2)+15)}
                    y={shape.y+((shape.height/2)+15)}
                >
                    <Label
                        visible={drag}
                        rotation={0}
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
                x={shape.x-40}
                y={shape.y+75}

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
                        text="Container"
                        fill="black"
                        padding={5}
                    />
                </Label>
            </Group>}

            </Group>
        </React.Fragment>

    );
};
export default CanvasContainer;