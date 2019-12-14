import { Button, Col, Row, Select, InputNumber, Input } from 'antd';
import { ButtonType } from 'antd/lib/button';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { SketchPicker } from 'react-color';

const DEFINED_STROKE_THICKNESSES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const DEFINED_FONT_SIZES = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 60];

const ShapeVisualProperties = () => {

    return (
        <div>
            <div>
                <Row>
                    <Col span={12}>Text</Col>
                    <Col span={12}>
                        <Input placeholder="Text" type="textarea" size="small"/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>Font Size</Col>
                    <Col span={12}>
                        <InputNumber size="small" type="textarea" min={0} max={100}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>Stroke Thickness</Col>
                    <Col span={12}>
                        <InputNumber size="small" type="textarea" min={0} max={100}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>Border Radius</Col>
                    <Col span={12}>
                        <InputNumber size="small" type="textarea" min={0} max={100}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>Text Color</Col>
                    <Col span={12}>
                        <SketchPicker/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>Background Color</Col>
                    <Col span={12}>
                        <SketchPicker/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>Border Color</Col>
                    <Col span={12}>
                        <SketchPicker/>
                    </Col>
                </Row>

            </div>

        </div>
    );
};

export default ShapeVisualProperties;