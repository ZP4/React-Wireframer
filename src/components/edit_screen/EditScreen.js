import React, {Component} from 'react';
import Canvas from "./Canvas";
import { Layout } from "antd";

class EditScreen extends Component {
    componentDidMount() {
        const node = window.document.getElementById("special");
        node.scrollTop = node.scrollHeight/2;
        node.scrollLeft = node.scrollWidth/2;
    }

    render() {
        return (
            <Layout className="edit_view" >
                <Layout.Sider
                    width={320}
                    theme="light"
                    className='sidebar-left'
                >

                </Layout.Sider>
                <Layout.Content className="layoutcontent_container" id="special" >
                    <Canvas />
                </Layout.Content>
                <Layout.Sider width={320} theme="light" className='sidebar-right'>

                </Layout.Sider>
            </Layout>
        );
    }
}

export default EditScreen;