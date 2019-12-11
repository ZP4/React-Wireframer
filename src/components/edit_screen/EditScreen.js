import React, {Component} from 'react';
import Canvas from "./Canvas";
import { Layout } from "antd";

class EditScreen extends Component {
    render() {
        return (
            <Layout className="edit_view" >
                <Layout.Sider width={320} theme="light" className='sidebar-left'>
                    <span>sdsd</span>
                    <br/>
                    <span>sdsd</span>
                    <br/><span>sdsd</span>
                    <br/><span>sdsd</span>
                    <br/>
                </Layout.Sider>
                <Layout.Content >
                    <Canvas />
                </Layout.Content>
                <Layout.Sider width={320} theme="light" className='sidebar-right'>

                </Layout.Sider>
            </Layout>
        );
    }
}

export default EditScreen;