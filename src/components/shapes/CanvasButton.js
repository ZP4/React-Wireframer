import React from 'react';
import { Rect, Text, Group, Transformer} from 'react-konva'

const CanvasButton = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

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
            >
                <Rect
                    onClick={onSelect}
                    ref={shapeRef}
                    {...shapeProps}

                    onDragEnd={e => {
                        onChange({
                            ...shapeProps,
                            x: e.target.x(),
                            y: e.target.y()
                        });
                    }}
                    onTransformEnd={e => {
                        // transformer is changing scale of the node
                        // and NOT its width or height
                        // but in the store we have only width and height
                        // to match the data better we will reset scale on transform end
                        const node = shapeRef.current;
                        const scaleX = node.scaleX();
                        const scaleY = node.scaleY();

                        // we will reset it back
                        node.scaleX(1);
                        node.scaleY(1);
                        onChange({
                            ...shapeProps,
                            x: node.x(),
                            y: node.y(),
                            // set minimal value
                            width: Math.max(5, node.width() * scaleX),
                            height: Math.max(node.height() * scaleY)
                        });
                    }}
                    width={60}
                    height={20}
                    fill="#89b717"
                    stroke="black"
                    strokeWidth={1}
                    cornerRadius={5}
                />
                <Text
                    offsetX={-15}
                    offsetY={-5}
                    align="center"
                    text="Gasd"
                    fontSize={13}
                />
                {isSelected && <Transformer ref={trRef} />}
            </Group>

        </React.Fragment>

    );
}
export default CanvasButton;