import React, {Component, useState} from 'react';
import Canvas from "./Canvas";
import { Layout, Icon, Modal, Button, Form, Input, Row, Col, Collapse, Tooltip  } from "antd";
import {Stage, Layer} from "react-konva";
import CanvasContainer from "../shapes/CanvasContainer";
import CanvasLabel from "../shapes/CanvasLabel";
import CanvasButton from "../shapes/CanvasButton";
import CanvasTextField from "../shapes/CanvasTextField";
import ShapeVisualProperties from "./ShapeVisualProperties";
import ShapeControlProperties from "./ShapeControlProperties";


class EditScreen extends Component {
    state = {
        modalVisible: false
    };

    componentDidMount() {
        const node = window.document.getElementById("special");
        node.scrollTop = (node.scrollHeight/2)-25;
        node.scrollLeft = (node.scrollWidth/2)-50;
    }

    showModal = () => {
        this.setState({modalVisible: true})
    };

    handleCancel = () => {
        this.setState({
            modalVisible: false
        });
    };

    handleSubmit = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
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
                            <Tooltip placement="bottom" title="Zoom In">
                                <Button  size="large" style={{background:"transparent"}} >
                                    <Icon type="zoom-in" onClick={console} />
                                </Button>
                            </Tooltip>
                            <Tooltip placement="bottom" title="Zoom">
                                <span style={{padding:"2px"}}>100</span>
                            </Tooltip>
                            <Tooltip placement="bottom" title="Zoom Out">
                                <Button size="large" style={{background:"transparent"}}>
                                    <Icon type="zoom-out" onClick={console}/>
                                </Button>
                            </Tooltip>
                            <span className="menu-separator"/>
                            <Tooltip placement="bottom" title="Save Work">
                                <Button size="large" style={{background:"transparent"}}>
                                    <Icon type="save" theme="filled" />
                                </Button>
                            </Tooltip>
                            <Tooltip placement="bottom" title="Close/Exit">
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
                                    <Button key="submit" type="primary" onClick={this.handleSubmit}>
                                        Submit
                                    </Button>,
                                ]}
                            ><div>
                                <Form layout="horizontal" >
                                    <Form.Item label="Name">
                                        <Input placeholder="Name"/>
                                    </Form.Item>
                                    <Form.Item label="Width">
                                        <Input placeholder="Width" defaultValue={500}/>
                                    </Form.Item>
                                    <Form.Item label="Height">
                                        <Input placeholder="Height" value={500}/>
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
                                    width={320}
                                    height={window.innerHeight}
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
                                            cornerRadius: 8
                                        }}
                                        dummy={true}
                                        isSelected={null}
                                        onSelect={null}
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
                                            align: "center",
                                            verticalAlign:"middle",
                                            fontSize: 28
                                        }}
                                        dummy={true}
                                        isSelected={null}
                                        onSelect={null}
                                    />
                                    <CanvasButton
                                        shapeProps={{
                                            x: 160,
                                            y: 500,
                                            width: 200,
                                            height: 50,
                                            fill: 'darkgrey',
                                            id: 'dummyButton',
                                            align: "center",
                                            verticalAlign:"middle",
                                            stroke: 1,
                                        }}
                                        dummy={true}
                                        isSelected={null}
                                        onSelect={null}
                                    />
                                    <CanvasTextField
                                        shapeProps={{
                                            x: 160,
                                            y: 670,
                                            width: 200,
                                            height: 40,
                                            fill: 'white',
                                            id: 'dummyTextField',
                                            align: "center",
                                            verticalAlign:"middle",
                                            stroke: 1
                                        }}
                                        dummy={true}
                                        isSelected={null}
                                        onSelect={null}
                                    />
                                </Layer>
                            </Stage>

                        </Layout.Content>
                    </Layout>
                </Layout.Sider>
                <Layout.Content className="layoutcontent_container" id="special" >
                    <Canvas />
                </Layout.Content>
                <Layout.Sider width={320} theme="light" className='sidebar-right'>
                    <Layout>
                        <Layout.Content style={{backgroundColor:"white", padding:"5px"}}>
                            <Collapse bordered={false} defaultActiveKey={["Control", "Visual"]}>
                                <Collapse.Panel key="Control" header="Control">
                                    <ShapeControlProperties/>
                                </Collapse.Panel>
                                <Collapse.Panel key="Visual" header="Visual">
                                    <ShapeVisualProperties/>
                                </Collapse.Panel>

                            </Collapse>
                        </Layout.Content>
                    </Layout>
                </Layout.Sider>
            </Layout>
        );
    }
}

export default EditScreen;