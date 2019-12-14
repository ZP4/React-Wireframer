import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import {Row, Col, Icon, Button} from "antd";
import {Card} from 'react-materialize';
import {firebaseConnect, firestoreConnect} from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import {createTodoList} from "../../store/actions/actionCreators";
import WireframesLinks from "./WireframesLinks";

class HomeScreen extends Component {


    componentDidMount() {

    }

    handleNewWireframe = (e) => {
        let date = new Date();
    }

    handleNewList = (e) => {
        console.log(this.props.wireframes);
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
                            <Button onClick={this.handleNewWireframe}>
                                <Icon type="file-add" theme="filled" />
                                New Wireframe
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col span={12}>
                            <WireframesLinks wireframe={this.props.wireframes}/>
                        </Col>
                        <Col span={8} offset={4}>
                            Wireframe maker
                        </Col>
                    </Row>
                </div>

                <div className="row">

                    <div className="col s8">
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button"  onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
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