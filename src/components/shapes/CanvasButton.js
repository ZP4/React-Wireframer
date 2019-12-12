import React, {useState} from 'react';
import { Rect, Text, Group, Transformer, Label, Tag} from 'react-konva'

const CanvasButton = ({ shapeProps, isSelected, onSelect}) => {
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
            <Group>
                <Group
                    draggable
                    onClick={onSelect}
                    ref={shapeRef}
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
                            width: Math.max(5, node.width() * scaleX),
                            height: Math.max(node.height() * scaleY)
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
                    />
                    <Text
                        height={shape.height}
                        width={shape.width}
                        align="center"
                        verticalAlign="middle"
                        text="BOIasd"
                        fontSize={13}
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

            </Group>
        </React.Fragment>

    );
};
export default CanvasButton;