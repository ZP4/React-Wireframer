import React, {Component, useState} from 'react';
import Canvas from "./Canvas";
import { Layout, Icon, Modal, Button, Form, Input, Row, Col, Collapse, Tooltip, InputNumber   } from "antd";
import {Stage, Layer} from "react-konva";
import {Link} from "react-router-dom";
import CanvasContainer from "../shapes/CanvasContainer";
import CanvasLabel from "../shapes/CanvasLabel";
import CanvasButton from "../shapes/CanvasButton";
import CanvasTextField from "../shapes/CanvasTextField";
import ShapeVisualProperties from "./ShapeVisualProperties";
import ShapeControlProperties from "./ShapeControlProperties";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {SketchPicker} from "react-color";


class EditScreen extends Component {
    state = {
        modalVisible: false,
        wireframeName: this.props.wireframe.name,
        wireframeHeight: this.props.wireframe.height,
        wireframeWidth: this.props.wireframe.width,
        controlList: this.props.wireframe.controls,
        selectedControl: null,
        zoom: 1,
        selectID: null
    };

    componentDidMount() {
        // const node = window.document.getElementById("special");
        // node.scrollTop = (node.scrollHeight/2)-25;
        // node.scrollLeft = (node.scrollWidth/2)-50;
        console.log(this.props.wireframe);
        console.log(this.state.controlList);
    }

    showModal = () => {
        this.setState({modalVisible: true})
    };

    handleCancel = () => {
        this.setState({
            modalVisible: false
        });
    };

    handleSettingsSubmit = e => {
        console.log(e.target);

        this.setState({
            modalVisible: false,
            wireframeHeight: window.document.getElementById("canvasheight").value,
            wireframeWidth: window.document.getElementById("canvaswidth").value,
            wireframeName: window.document.getElementById("wireframename").value
        });
    };

    handleZoomIn = e => {
        if(this.state.zoom < 2) {
            this.setState({
                zoom: this.state.zoom+.25
            })
        }
    };

    handleZoomOut = e => {
        if(this.state.zoom > .25) {
            this.setState({
                zoom: this.state.zoom-.25
            })
        }
    };

    selectShape = (shapeID) => {
        console.log("shapeID: "+ shapeID);
        let control = null;
        let index = this.state.controlList.findIndex(x => x.id === shapeID);
        console.log("index: "+index);
        control = this.state.controlList[index];
        console.log("control: " + control);
        console.log(control);
        this.setState({
            selectID: shapeID,
            selectedControl: control
        });
        this.forceUpdate();
    };

    addComponent = (type) =>{
        let list = this.state.controlList;
        if(type === "button") {
            list.push({
                type: "button",
                x: 20,
                y: 20,
                width: 200,
                height: 50,
                fill: 'darkgrey',
                id: Math.random().toString(36).substr(2, 9),
                strokeWidth: 1,
                text: "Button",
                fontSize:22,
                strokeColor: "black",
                cornerRadius: 5
            });
        }
        else if(type === "text") {
            list.push({
                type: "text",
                x: 20,
                y: 20,
                width: 200,
                height: 40,
                fill: 'white',
                id: Math.random().toString(36).substr(2, 9),
                strokeWidth: 1,
                text: "Input",
                fontSize:22,
                strokeColor: "black",
                cornerRadius: 3
            });
        }
        else if(type === "container") {
            list.push({
                type: "container",
                x: 20,
                y: 20,
                width: 220,
                height: 100,
                fill: 'darkgrey',
                id: Math.random().toString(36).substr(2, 9),
                stroke: 1,
                cornerRadius: 5
            });
        }
        else if(type === "label") {
            list.push({
                type: "label",
                x: 20,
                y: 20,
                width: 200,
                height: 50,
                id: Math.random().toString(36).substr(2, 9),
                text: "Label input:",
                fontSize: 28
            });
        }
        this.setState({
            controlList: list
        })

    };

    onChangeShape = (value) => {
        let index = this.state.controlList.findIndex(x => x.id === this.state.selectID);
        console.log("index: "+index);
        console.log(this.state.controlList[index]);
        this.state.controlList[index].text = value;
        console.log("after");
        console.log(this.state.controlList[index]);
        //control.text = value;
        //console.log(control);/

        //console.log("onchangehsape^^");
        this.setState({
            ...this.state
        });
        this.forceUpdate();
    };

    render() {
        return (
            <Layout className="edit_view" >
                <Layout.Sider
                    width={320}
                    theme="light"
                    className='sidebar-left'
                >
                    <Layout style={{height:"100%", backgroundColor:"white", overflow:"hidden"}}>
                        <Layout.Header style={{backgroundColor: "#d9dfe5",  padding:"2px", display:"inline-block"}} >
                            <Tooltip placement="bottom" title="Zoom In" onClick={this.handleZoomIn} >
                                <Button  size="large" style={{background:"transparent"}} >
                                    <Icon type="zoom-in" />
                                </Button>
                            </Tooltip>
                            <Tooltip placement="bottom" title="Zoom">
                                <span style={{padding:"2px"}}>{this.state.zoom*100}</span>
                            </Tooltip>
                            <Tooltip placement="bottom" title="Zoom Out" onClick={this.handleZoomOut}>
                                <Button size="large" style={{background:"transparent"}}>
                                    <Icon type="zoom-out" />
                                </Button>
                            </Tooltip>
                            <span className="menu-separator"/>
                            <Tooltip placement="bottom" title="Save Work">
                                <Button size="large" style={{background:"transparent"}}>
                                    <Icon type="save" theme="filled" />
                                </Button>
                            </Tooltip>
                            <Link to="/home">
                                <Tooltip placement="bottom" title="Close/Exit">
                                    <Button size="large" style={{background:"transparent"}}>
                                        <Icon type="close-circle" theme="filled" />
                                    </Button>
                                </Tooltip>
                            </Link>

                            <span style={{float:"right"}}>
                                <Tooltip placement="bottom" title="Wireframe Settings" >
                                    <Button size="large" onClick={this.showModal} style={{background:"transparent"}}>
                                        <Icon type="setting"  theme="filled" />
                                    </Button>
                                </Tooltip>
                            </span>
                            <Modal
                                title="Wireframe Settings"
                                visible={this.state.modalVisible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                        Return
                                    </Button>,
                                    <Button key="submit" type="primary" onClick={this.handleSettingsSubmit}>
                                        Submit
                                    </Button>,
                                ]}
                            ><div>
                                <Form layout="horizontal" >
                                    <Form.Item label="Name">
                                        <Input placeholder="Name" defaultValue={this.state.wireframeName} id="wireframename"/>
                                    </Form.Item>
                                    <Form.Item label="Width">
                                        <InputNumber type="textarea"  id="canvaswidth"
                                                     max={5000} min={1} defaultValue={this.state.wireframeWidth}/>
                                    </Form.Item>
                                    <Form.Item label="Height">
                                        <InputNumber type="textarea" id="canvasheight"
                                                     max={5000} min={1} defaultValue={this.state.wireframeHeight}/>
                                    </Form.Item>
                                </Form>
                            </div>

                            </Modal>
                        </Layout.Header>
                        <Layout.Content style={{height:"100%"}} id="side-left">
                            <Stage
                                width={320}
                                height={window.innerHeight}
                            >
                                <Layer
                                >
                                    <CanvasContainer
                                        shapeProps={{
                                            x: 160,
                                            y: 100,
                                            width: 220,
                                            height: 100,
                                            fill: 'darkgrey',
                                            id: 'dummyContainer',
                                            stroke: 1,
                                            cornerRadius: 5
                                        }}
                                        dummy={true}
                                        onClick={this.addComponent}
                                    />
                                    <CanvasLabel
                                        shapeProps={{
                                            x: 160,
                                            y: 300,
                                            width: 200,
                                            height: 50,
                                            fill: 'white',
                                            id: 'dummyLabel',
                                            text: "Label input:",
                                            fontSize: 28
                                        }}
                                        dummy={true}
                                        onClick={this.addComponent}
                                    />
                                    <CanvasButton
                                        shapeProps={{
                                            x: 160,
                                            y: 500,
                                            width: 200,
                                            height: 50,
                                            fill: 'darkgrey',
                                            id: 'dummyButton',
                                            strokeWidth: 1,
                                            text: "Button",
                                            fontSize:"22",
                                            strokeColor: "black",
                                            cornerRadius: 5
                                        }}
                                        dummy={true}
                                        onClick={this.addComponent}
                                    />
                                    <CanvasTextField
                                        shapeProps={{
                                            x: 160,
                                            y: 670,
                                            width: 200,
                                            height: 40,
                                            fill: 'white',
                                            id: 'dummyTextField',
                                            strokeWidth: 1,
                                            text: "Input",
                                            fontSize:"22",
                                            strokeColor: "black",
                                            cornerRadius: 3
                                        }}
                                        dummy={true}
                                        onClick={this.addComponent}
                                    />
                                </Layer>
                            </Stage>

                        </Layout.Content>
                    </Layout>
                </Layout.Sider>
                <Layout.Content className="layoutcontent_container" id="special" >
                    <Canvas
                        list = {this.state.controlList}
                        zoomInput={this.state.zoom}
                        canvasHeight={this.state.wireframeHeight}
                        canvasWidth={this.state.wireframeWidth}
                        select={this.selectShape}
                        ID = {this.state.selectID}
                    />
                </Layout.Content>
                <Layout.Sider width={320} theme="light" className='sidebar-right'>
                    <Layout>
                        <Layout.Content style={{backgroundColor:"white", padding:"5px"}}>
                            <Collapse bordered={false} defaultActiveKey={["Control", "Visual"]}>
                                <Collapse.Panel key="Control" header="Control">
                                    <ShapeControlProperties/>
                                </Collapse.Panel>
                                <Collapse.Panel key="Visual" header="Visual">
                                    {this.state.selectID && <div>
                                        <Row>
                                            <Col span={12}>Text</Col>
                                            <Col span={12}>
                                                <Input placeholder="Text" value={this.state.selectID===null? null: this.state.selectedControl.text}
                                                       onChange={
                                                           (e) => {
                                                               this.onChangeShape(e.target.value)
                                                           }
                                                       }
                                                       type="textarea" size="small"/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>Font Size</Col>
                                            <Col span={12}>
                                                <InputNumber size="small"  type="textarea" min={0} max={100}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>Stroke Thickness</Col>
                                            <Col span={12}>
                                                <InputNumber size="small"  type="textarea" min={0} max={100}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>Border Radius</Col>
                                            <Col span={12}>
                                                <InputNumber size="small"  type="textarea" min={0} max={100}/>
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

                                    </div>}
                                </Collapse.Panel>

                            </Collapse>
                        </Layout.Content>
                    </Layout>
                </Layout.Sider>
            </Layout>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps.match.params;
    return {
        auth: state.firebase.auth,
        wireframe: state.firestore.ordered.wireframes && state.firestore.ordered.wireframes[0].wireframes[id]
    };
};

const mapDispatchToProps = dispatch => ({
});


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
        if(props.auth.uid) {
            return [{
                collection: 'wireframes', where: ['id', '==', props.auth.uid]
            }]
        }
        else {
            return null;
        }

    }),
)(EditScreen);