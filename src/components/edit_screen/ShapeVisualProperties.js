import { Button, Col, Row, Select, InputNumber, Input } from 'antd';
import { ButtonType } from 'antd/lib/button';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { SketchPicker } from 'react-color';
import {useState} from "react";

const DEFINED_STROKE_THICKNESSES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const DEFINED_FONT_SIZES = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 60];



const ShapeVisualProperties = ({control, onchange, selectedID, grabControl }) => {


    console.log(control);
    console.log("^ up");
    console.log(selectedID);
    // let control;
    // if (selectedID && control) {
    //     control = list.find(x => x.id === selectedID);
    //     console.log(control);
    //     console.log("LALALLA");
    // }

    return (
        <div>

        </div>
    );
};

export default ShapeVisualProperties;