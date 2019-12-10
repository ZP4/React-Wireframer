import React from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import { Layout } from "antd";
import HomeScreen from "./Home/HomeScreen";

function App() {
    return (
        <BrowserRouter>

            <Layout>
                <Layout.Header>
                </Layout.Header>
            </Layout>
            <Switch>
                <Route exact path="/" component={HomeScreen} />

            </Switch>
        </BrowserRouter>
    )
}

export default App;