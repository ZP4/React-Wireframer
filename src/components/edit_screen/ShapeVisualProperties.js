import { Button, Col, Row, Select } from 'antd';
import { ButtonType } from 'antd/lib/button';
import * as React from 'react';
import { useDispatch } from 'react-redux';

const DEFINED_STROKE_THICKNESSES = [1, 2, 4, 6, 8];
const DEFINED_FONT_SIZES = [4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 60];

const ShapeProperties = ({zoomInput }) => {

    return (
        <div>
            <div>
                <Row>
                    <Col span={12}>Text</Col>
                    <Col span={12}></Col>
                </Row>
                <Row>
                    <Col span={12}>Font Size</Col>
                    <Col span={12}></Col>
                </Row>
                <Row>
                    <Col span={12}>Background Color</Col>
                    <Col span={12}></Col>
                </Row>
                <Row>
                    <Col span={12}>Border Color</Col>
                    <Col span={12}></Col>
                </Row>
                <Row>
                    <Col span={12}>Text Color</Col>
                    <Col span={12}></Col>
                </Row>
            </div>

        </div>
    );
};

export default ShapeProperties;