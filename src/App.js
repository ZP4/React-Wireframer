import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import LoggedInLinks from './components/navbar/LoggedInLinks';
import LoggedOutLinks from "./components/navbar/LoggedOutLinks";
import { Layout, Icon } from "antd";


import RegisterScreen from './components/register_screen/RegisterScreen.js';
import LoginScreen from './components/login_screen/LoginScreen.js';
import HomeScreen from './components/home_screen/HomeScreen.js';
import DatabaseTester from './test/DatabaseTester'
import EditScreen from "./components/edit_screen/EditScreen";

class App extends Component {
  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;

    if (auth.isLoaded) {
      return (
        <BrowserRouter>
          <Layout className="baseLayout">
            <Layout.Header className="header">
                <Link to="/home">
                  <span style={{position:"fixed", top:3, left: 20, font:"400 36px/1.5 'Pacifico', Helvetica, sans-serif", color:"white", textShadow:"text-shadow: 3px 3px 0px rgba(0,0,0,0.1), 7px 7px 0px rgba(0,0,0,0.05)"}}>
                    <Icon type="sketch" style={{marginRight:5}}/>
                    Wireframe
                  </span>
                </Link>

                <span style={{ float: 'right', marginTop:-2, color:"white", fontSize:"18px" }}>
                  {links}
                </span>
            </Layout.Header>
            <Layout.Content style={{height:"100%"}}>
              <Switch>
                <Route exact path="/" component={LoginScreen} />
                <Route path="/home" component={HomeScreen}/>
                <Route path="/databaseTester" component={DatabaseTester} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/login" component={LoginScreen} />
                <Route path="/wireframe/:id" component={EditScreen} />
                <Route path="/:any" component={HomeScreen} />
              </Switch>
            </Layout.Content>
          </Layout>

        </BrowserRouter>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(App);