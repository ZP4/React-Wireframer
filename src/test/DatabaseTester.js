import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import todoJson from './TestTodoListData.json'
import wireframeJson from './wireframeTest'
import { getFirestore } from 'redux-firestore';
import firebase, {auth} from "firebase";
import { Row, Col, Button, message} from "antd";
import {Redirect} from "react-router-dom";
import {firebaseConnect, firestoreConnect} from 'react-redux-firebase';

class DatabaseTester extends React.Component {
    _isMounted= true;
    state = {
        seconds: 5,
        admin: 0
    };

    componentDidMount() {
        if(this._isMounted){
            this.myInterval = setInterval(() => {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }, 1000);
        }
        const firestore = getFirestore();
        firestore.collection("users").doc(this.props.auth.uid).get()
            .then((e) => {
                let admin = e.get('admin');
                this.setState({
                    admin: admin
                });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }



    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframes').doc(this.props.auth.uid).update({
            wireframes: []
        }).then(()=> {
            message.success("Database Cleared", 1)
        }).catch((err)=> {
            message.error("Database Cleared Failed",1)
            console.log(err);
        });

    };

    handleReset = () => {
        const fireStore = getFirestore();
        let date = new Date();

        fireStore.collection('wireframes').doc(this.props.auth.uid).set({
            id: this.props.auth.uid,
            wireframes: []
        });
        wireframeJson.wireframes.forEach(wireframesJson => {
            wireframesJson["time"] = date.toString();
            fireStore.collection('wireframes').doc(this.props.auth.uid).update({
                wireframes: firebase.firestore.FieldValue.arrayUnion(wireframesJson)
            }).then(()=> {
                message.success("Database Reloaded", 1);
            }).catch((err)=> {
                message.error("Database Reload Failed",1);
                console.log(err);
            })
        })

        // todoJson.todoLists.forEach(todoListJson => {
        //     fireStore.collection('todoLists').add({
        //             name: todoListJson.name,
        //             owner: todoListJson.owner,
        //             items: todoListJson.items,
        //             time: date.toString()
        //         }).then(() => {
        //             console.log("DATABASE RESET");
        //         }).catch((err) => {
        //             console.log(err);
        //         });
        // });
        //this.props.user && this.props.user[0].admin? this.props.user[0].admin === 0 : false
    };

    render() {
        const { auth } = this.props;
        if(!auth.uid) {
            return (
                <Redirect to="/"/>
            );
        }
        else if(this.state.admin === 0) {
            if(this.state.seconds <= 0) {
                return (
                    <Redirect to="/home"/>
                );
            }
            else {
                return (
                    <div>
                        <h3>You have no permission, redirecting back to home page in <span style={{color:"red"}}>{this.state.seconds}</span></h3>
                    </div>
                )
            }

        }
        return (
            <div className="container" style={{marginTop:"3rem"}}>
                <Row>
                    <Col span={12}>
                        <Button onClick={this.handleClear}>Clear User Wireframes</Button>
                        <Button onClick={this.handleReset}>Reload Test Wireframes</Button>
                    </Col>

                </Row>

            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(),
)(DatabaseTester);