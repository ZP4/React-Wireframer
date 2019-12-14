import { Button, Col, Row, Select, Icon } from 'antd';
import { ButtonType } from 'antd/lib/button';
import * as React from 'react';
import { useDispatch } from 'react-redux';


const ShapeControlProperties = () => {

    return (
            <div>
                <Button style={{margin: "3px"}}>
                    <Icon type="copy" theme="filled" />
                    Duplicate
                </Button>
                <Button type="danger" style={{margin: "3px"}}>
                    <Icon type="delete" theme="filled" />
                    Delete
                </Button>
            </div>
    );
};

export default ShapeControlProperties;