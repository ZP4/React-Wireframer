import React, {useState} from 'react';
import { Rect, Text, Group, Transformer, Label, Tag} from 'react-konva'

const CanvasLabel = ({ shapeProps, isSelected, onSelect, dummy}) => {
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
                <Label
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
                            width: Math.max(60, node.width() * scaleX),
                            height: Math.max(20, node.height() * scaleY)
                        };
                        setShape(s);
                    }}
                    offsetX={shape.width/2}
                    offsetY={shape.height/2}
                    >
                    <Tag
                        strokeScaleEnabled={false}
                        height={shape.height}
                        width={shape.width}
                        stroke={shape.stroke}
                        fill={shapeProps.fill}
                        strokeWidth={shape.strokeWidth}
                        cornerRadius={shape.cornerRadius}

                    />
                    <Text
                        offsetX={-3}
                        offsetY={-3}
                        height={shape.height-6}
                        width={shape.width-6}
                        align={shape.align}
                        verticalAlign={shape.verticalAlign}
                        text={shape.text}
                        fontSize={shape.fontSize}
                        padding={4}
                    />
                </Label>
                {isSelected && <Transformer
                    ref={trRef}
                    rotateAnchorOffset={25}
                    rotationSnaps={[0, 90, 180,270]}
                    anchorSize={12}
                    padding={2}
                    rotateEnabled={false}
                />}
                {isSelected && <Group
                    x={shape.x}
                    y={shape.y}
                    offsetX={(shape.width+15)*-1}
                    offsetY={(shape.height+15)*-1}
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
                    x={shape.x-25}
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
                            text="Label"
                            fill="black"
                            padding={5}
                        />
                    </Label>
                </Group>}
            </Group>
        </React.Fragment>

    );
};
export default CanvasLabel;