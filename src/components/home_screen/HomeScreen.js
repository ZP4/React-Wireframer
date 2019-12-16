import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect, Link } from 'react-router-dom';
import {Row, Col, Icon, Button, message} from "antd";
import {Card} from 'react-materialize';
import {firebaseConnect, firestoreConnect} from 'react-redux-firebase';
import {getFirestore} from "redux-firestore";
import WireframesLinks from "./WireframesLinks";
import firebase from "firebase";


class HomeScreen extends Component {

    state = {
        admin: null,
        newWireframe: false,
        key: null
    };

    componentDidMount() {
        const firestore = getFirestore();
        this.setState({
            newWireframe: false
        });
        firestore.collection("users").doc(this.props.auth.uid).get()
            .then((e) => {
                let admin = e.get('admin');
                this.setState({
                    admin: admin
                });
                if(this.state.admin === 1) {
                    message.success("You are an ADMIN, you have access to DatabaseTester", 2)
                }
                else {
                    message.info("You are not an ADMIN, you have NO access to DatabaseTester", 2)
                }
            });

    }

    handleDeleteWireframe = (e) => {
        const firestore = getFirestore();
        firestore.collection("wireframes").doc(this.props.auth.uid).update({
            wireframes: firebase.firestore.FieldValue.arrayRemove(e)
        });
    };

    handleNewWireframe = (e) => {
        let date = new Date();
        let randomKey = Math.random().toString(36).substr(2, 9)
        let newWireframe = {
            name: "unknown",
            height: 400,
            width: 400,
            key: randomKey,
            controls: [],
            time: date.toString()
        };

        const firestore = getFirestore();
        firestore.collection("wireframes").doc(this.props.auth.uid).update({
            wireframes: firebase.firestore.FieldValue.arrayUnion(newWireframe)
        });
        // this.setState({
        //     newWireframe: true,
        //     key: randomKey
        // })
        // const firestore = getFirestore();
        // firestore.collection('todoLists').add({
        //     ...todoList,
        // }).then(() => {
        //     dispatch({
        //         type: 'CREATE_TODO_LIST',
        //         todoList
        //     })
        // }).catch((error) => {
        //     this.createTodoListError(error);
        // })

    };

    handleNewList = (e) => {
        //console.log(this.props.wireframes);
        // let date = new Date();
        // let le = 0;
        // if(this.props.todoLists === null) {
        //     le = 0;
        // }
        // else {
        //     le = Object.keys(this.props.todoLists).length;
        // }
        // this.props.createTodoList({
        //     owner: "unknown",
        //     name: "unknown",
        //     items: [],
        //     key: le,
        //     time: date.toString()
        // })
        // <Row>
        //     <Col span={12} >
        //         <div >
        //                         <span style={{ font:"400 36px/1.5 'Pacifico', Helvetica, sans-serif", color:"black", textShadow:"text-shadow: 3px 3px 0px rgba(0,0,0,0.1), 7px 7px 0px rgba(0,0,0,0.05)"}}>
        //                             Wireframes:
        //                         </span>
        //         </div>
        //     </Col>
        // </Row>
    };

    render() {
        if(this.state.newWireframe) {
            return <Redirect to={"/wireframe/"+this.state.key} key={this.state.key}/>
        }
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="dashboard container">

                <div style={{paddingTop:"3rem", paddingBottom:"1.5rem"}}>

                </div>
                <div>
                    <Row>
                        <Col>
                            <Button onClick={this.handleNewWireframe} style={{margin:"5px"}}>
                                <Icon type="file-add" theme="filled" />
                                New Wireframe
                            </Button>
                            {this.state.admin === 1 &&
                                <Link to="/databaseTester">
                                    <Button type="danger" style={{margin:"5px"}}>
                                        <Icon type="file-add" theme="filled" />
                                        Go to Database Tester
                                    </Button>
                                </Link>
                            }
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col span={12}>
                            <WireframesLinks wireframe={this.props.wireframes} deleteWireframe={this.handleDeleteWireframe}/>
                        </Col>
                        <Col span={8} offset={4}>
                            <h3>Wireframe maker</h3>
                        </Col>
                    </Row>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.firebase.auth,
        wireframes: state.firestore.ordered.wireframes && state.firestore.ordered.wireframes[0].wireframes
    };
};

const mapDispatchToProps = dispatch => ({
    //createTodoList: (todolist) => dispatch(createTodoList(todolist)),
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
)(HomeScreen);