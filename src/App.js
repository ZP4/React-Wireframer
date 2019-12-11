import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import LoggedInLinks from './components/navbar/LoggedInLinks';
import LoggedOutLinks from "./components/navbar/LoggedOutLinks";
import { Layout } from "antd";


import Navbar from './components/navbar/Navbar.js';
import RegisterScreen from './components/register_screen/RegisterScreen.js';
import LoginScreen from './components/login_screen/LoginScreen.js';
import HomeScreen from './components/home_screen/HomeScreen.js';
import DatabaseTester from './test/DatabaseTester'
import EditScreen from "./components/edit_screen/EditScreen";

class App extends Component {
  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;

    // if auth is loaded then we render App.
    // But if not then we doesn't render the one.
    // <div className="App">
    //   <Navbar />

    // </div>
    if (auth.isLoaded) {
      return (
        <BrowserRouter>
          <Layout className="baseLayout">
            <Layout.Header className="header">
                <Link to="/">
                  wireframe
                </Link>

                <span style={{ float: 'right' }}>
                  {links}
                </span>
            </Layout.Header>
            <Layout.Content style={{height:"100%"}}>
              <Switch>
                <Route exact path="/" component={HomeScreen} />
                <Route path="/databaseTester" component={DatabaseTester} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/login" component={LoginScreen} />
                <Route path="/wire" component={EditScreen}/>
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