import React, {useState} from 'react';
import { Rect, Text, Group, Transformer} from 'react-konva'

const CanvasButton = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    const [shape, setShape] = useState(shapeProps);

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
                    draggable
                    onClick={onSelect}
                    ref={shapeRef}
                    {...shape}
                    onDragMove={e => {
                        console.log("lol");
                        onSelect();
                        let s = {
                            ...shape,
                            x: e.target.x(),
                            y: e.target.y()
                        };
                        setShape(s);
                    }}

                    onTransform = {e => {
                        console.log("ha");
                        const node = shapeRef.current;
                        const scaleX = node.scaleX();
                        const scaleY = node.scaleY();
                        console.log(scaleX);

                        node.scaleX(1);
                        node.scaleY(1);
                        // onChange({
                        //     ...shapeProps,
                        //     x: node.x(),
                        //     y: node.y(),
                        //     // set minimal value
                        //     width: Math.max(5, node.width() * scaleX),
                        //     height: Math.max(node.height() * scaleY)
                        // });
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
        </React.Fragment>

    );
};
export default CanvasButton;