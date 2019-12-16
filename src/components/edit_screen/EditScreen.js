import React, {Component, useState} from 'react';
import Canvas from "./Canvas";
import { Layout, Icon, Modal, Button, Form, Input, Row, Col, Collapse, Tooltip, InputNumber, message   } from "antd";
import {Stage, Layer} from "react-konva";
import {Link, Redirect, useHistory } from "react-router-dom";
import CanvasContainer from "../shapes/CanvasContainer";
import CanvasLabel from "../shapes/CanvasLabel";
import CanvasButton from "../shapes/CanvasButton";
import CanvasTextField from "../shapes/CanvasTextField";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {SketchPicker} from "react-color";
import {getFirestore} from "redux-firestore";
import firebase from "firebase";

const { confirm } = Modal;



class EditScreen extends Component {
    state = {
        modalVisible: false,
        wireframe: null,
        wireframeName: this.props.wireframe.name,
        wireframeHeight: this.props.wireframe.height,
        wireframeWidth: this.props.wireframe.width,
        controlList: this.props.wireframe.controls,
        selectedControl: null,
        zoom: 1,
        selectID: null,
        saved: true,
        textColor: "#fff",
        bgColor: "#fff",
        borderColor: "#fff",
        settings: false
    };


    componentDidMount() {
        // const node = window.document.getElementById("special");
        // node.scrollTop = (node.scrollHeight/2)-25;
        // node.scrollLeft = (node.scrollWidth/2)-50;
        // console.log(this.props.wireframe);
        // console.log(this.state.controlList);
        let date = new Date();
        const firestore = getFirestore();
        let wireframe = {
            name: this.state.wireframeName,
            height: this.state.wireframeHeight,
            width: this.state.wireframeWidth,
            controls: this.state.controlList,
            key: this.props.wireframe.key,
            time: date.toString()
        };
        firestore.collection("wireframes").doc(this.props.auth.uid).update({
            wireframes: firebase.firestore.FieldValue.arrayRemove(this.props.wireframe)
        });
        firestore.collection("wireframes").doc(this.props.auth.uid).update({
            wireframes: firebase.firestore.FieldValue.arrayUnion(wireframe)
        });
        document.addEventListener('keydown',this.handleKeyDown);
    }

    componentWillUnmount(){
        document.removeEventListener('keydown',this.handleKeyDown);
    }

    showModal = () => {
        this.setState({modalVisible: true});

    };

    handleSave = () => {
        let date = new Date();
        console.log('saved');
        const firestore = getFirestore();
        let wireframe = {
            name: this.state.wireframeName,
            height: this.state.wireframeHeight,
            width: this.state.wireframeWidth,
            controls: this.state.controlList,
            key: this.props.wireframe.key,
            time: date.toString()
        };
        console.log(this.props.wireframes);
        console.log(this.props.wireframe.key);
        firestore.collection("wireframes").doc(this.props.auth.uid).update({
            wireframes: firebase.firestore.FieldValue.arrayRemove(this.props.wireframe)
        });
        firestore.collection("wireframes").doc(this.props.auth.uid).update({
            wireframes: firebase.firestore.FieldValue.arrayUnion(wireframe)
        });
        message.success("Work has been saved");
        this.setState({
            saved: true,
        })
    };

    onExit = () => {
        this.props.history.push("/home");
    };

    handleExit = () => {
        if(!this.state.saved) {
            confirm({
                title: 'Do you want to save before exiting?',
                content: 'Clicking yes will save progress',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: ()=> {this.handleSave(); this.onExit()},
                onCancel: () => {this.onExit()}
            });
        }
        else {
            this.onExit();
        }
    };

    handleTextColorChange = (color, event) => {
        this.onChangeShape(color.hex, "textColor");
        this.setState({
            textColor: color.hex
        })
    };

    handleBGCoolorChange = (color, event) => {
        this.onChangeShape(color.hex, "fill");
        this.setState({
            bgColor: color.hex
        })
    };

    handleBorderColor = (color, event) => {
        this.onChangeShape(color.hex, "strokeColor");
        this.setState({
            borderColor: color.hex
        })
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
            wireframeName: window.document.getElementById("wireframename").value,
            saved: false
        });
        message.success("Settings Updated")
    };

    handleZoomIn = e => {
        if(this.state.zoom < 2) {
            message.info("Zoom In Successful", .5);
            this.setState({
                zoom: this.state.zoom+.25
            })
        }
        else {
            message.warning("Max Zoom Reached", .5);
        }
    };

    handleZoomOut = e => {
        if(this.state.zoom > .25) {
            message.info("Zoom Out Successful", .5);
            this.setState({
                zoom: this.state.zoom-.25
            })
        }
        else {
            message.warning("Min Zoom Reached", .5);
        }
    };

    selectShape = (shapeID) => {
        console.log("shapeID: "+ shapeID);
        let control = null;
        let index = this.state.controlList.findIndex(x => x.id === shapeID);
        console.log("index: "+index);
        control = this.state.controlList[index];
        console.log(control);
        this.setState({
            selectID: shapeID,
            selectedControl: control,
            saved: false
        });
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
                strokeColor: "black",
                strokeWidth: 1,
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
            controlList: list,
            saved: false
        })

    };

    onChangeShape = (value, type) => {
        let index = this.state.controlList.findIndex(x => x.id === this.state.selectID);
        console.log("index: "+index);
        console.log(this.state.controlList[index]);
        let control = this.state.controlList[index];
        control[type] = value;
        console.log("after");
        console.log(this.state.controlList[index]);
        //control.text = value;
        //console.log(control);/

        //console.log("onchangehsape^^");
        this.setState({
            ...this.state,
            saved: false
        });
        this.forceUpdate();
    };

    handleDuplicate = () => {
        let list = this.state.controlList;
        let dupe = this.state.selectedControl;
        dupe = {
            ...dupe,
            x: dupe.x+20,
            y: dupe.y+20,
            id: Math.random().toString(36).substr(2, 9),
        };
        list.push(
            dupe
        );
        this.selectShape(dupe.id);
        this.setState({
            controlList: list,
            saved: false
        })
    };

    handleDelete = () => {
        let list = this.state.controlList;
        let index = list.findIndex(x => x.id === this.state.selectID);
        list.splice(index, 1);
        this.selectShape(null);
        this.setState({
            controlList: list,
            saved: false
        })
    };

    handleKeyDown = (event) => {
        //WINDOWS
        console.log("triggered");
        let charCode = String.fromCharCode(event.which).toLowerCase();
        if(event.ctrlKey && charCode === 'd') {
            event.preventDefault();
            this.handleDuplicate();
        }
        if(event.which === 46) {
            event.preventDefault();
            this.handleDelete();
        }

        //MAC
        if(event.metaKey && charCode === 'd') {
            this.handleDuplicate();
        }
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
                            <Tooltip placement="bottom" title="Save Work" onClick={this.handleSave}>
                                <Button size="large" style={{background:"transparent"}}>
                                    <Icon type="save" theme="filled" />
                                </Button>
                            </Tooltip>
                            <Tooltip placement="bottom" title="Close/Exit" onClick={this.handleExit}>
                                <Button size="large" style={{background:"transparent"}}>
                                    <Icon type="close-circle" theme="filled" />
                                </Button>
                            </Tooltip>

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
                                            strokeColor: "black",
                                            strokeWidth: 1,
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
                        changeItem = {this.onChangeShape}
                    />
                </Layout.Content>
                <Layout.Sider width={320} theme="light" className='sidebar-right'>
                    <Layout>
                        <Layout.Content style={{backgroundColor:"white", padding:"5px"}}>
                            <Collapse bordered={false} defaultActiveKey={["Control", "Visual"]}>
                                <Collapse.Panel key="Control" header="Control">
                                    {this.state.selectID &&
                                    <div>
                                        <Button style={{margin: "3px"}} onClick={this.handleDuplicate}>
                                            <Icon type="copy" theme="filled" />
                                            Duplicate
                                        </Button>
                                        <Button type="danger" style={{margin: "3px"}} onClick={this.handleDelete}>
                                            <Icon type="delete" theme="filled" />
                                            Delete
                                        </Button>
                                    </div>
                                    }
                                </Collapse.Panel>
                                <Collapse.Panel key="Visual" header="Visual">
                                    {this.state.selectID && <div>
                                        <Row>
                                            <Col span={12}>Text</Col>
                                            <Col span={12}>
                                                <Input placeholder="Text"
                                                       value={this.state.selectID===null? null: this.state.selectedControl.text}
                                                       onChange={(e) => {
                                                           console.log("textrun");
                                                           this.onChangeShape(e.target.value, "text")
                                                       }}
                                                       onChangeCapture={(e) => {
                                                           this.onChangeShape(e.target.value, "text")
                                                       }}
                                                       type="textarea" size="small"/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>Font Size</Col>
                                            <Col span={12}>
                                                <InputNumber size="small"  type="textarea" min={0} max={100}
                                                             value={this.state.selectID===null? null: this.state.selectedControl.fontSize}
                                                             onChange={
                                                                 (e) => {
                                                                     this.onChangeShape(e, "fontSize")
                                                                 }
                                                             }
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>Stroke Thickness</Col>
                                            <Col span={12}>
                                                <InputNumber size="small"  type="textarea" min={0} max={100}
                                                             value={this.state.selectID===null? null: this.state.selectedControl.strokeWidth}
                                                             onChange={
                                                                 (e) => {
                                                                     this.onChangeShape(e, "strokeWidth")
                                                                 }
                                                             }
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>Border Radius</Col>
                                            <Col span={12}>
                                                <InputNumber size="small"  type="textarea" min={0} max={100}
                                                             value={this.state.selectID===null? null: this.state.selectedControl.cornerRadius}
                                                             onChange={
                                                                 (e) => {
                                                                     this.onChangeShape(e, "cornerRadius")
                                                                 }
                                                             }
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>Text Color</Col>
                                            <SketchPicker
                                                color={this.state.textColor}
                                                onChangeComplete={(c, e) => {
                                                    this.handleTextColorChange(c, e);
                                                }}
                                            />
                                        </Row>
                                        <Row>
                                            <Col span={12}>Background Color</Col>
                                                <SketchPicker
                                                    color={this.state.bgColor}
                                                    onChangeComplete={(color, event) => {
                                                        this.handleBGCoolorChange(color, event)
                                                    }}
                                                />

                                        </Row>
                                        <Row>
                                            <Col span={12}>Border Color</Col>

                                                <SketchPicker
                                                    color={this.state.borderColor}
                                                    onChangeComplete={(color, event) => {
                                                        this.handleBorderColor(color, event)
                                                    }}
                                                />
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
    //console.log(ownProps);
    console.log("ID: " + id);
    // let wireframe1;
    // const firestore = getFirestore();
    // let doc = firestore.collection("wireframes").doc(state.firebase.auth.uid);
    // wireframe1 = doc.get('wireframes').ordered;
    // console.log('asd');
    // console.log(wireframe1);
    //
    return {
        id: id,
        auth: state.firebase.auth,
        wireframe: state.firestore.ordered.wireframes && state.firestore.ordered.wireframes[0].wireframes.find(x => x.key === id),
        wireframes: state.firestore.ordered.wireframes && state.firestore.ordered.wireframes[0].wireframes
    };
};


export default compose(
    connect(mapStateToProps),
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