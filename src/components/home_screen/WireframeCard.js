import React, {Component} from 'react';
import moment from 'moment';
import {Card, Button, Icon, Popconfirm, message} from 'antd';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {getFirestore} from "redux-firestore";
import firebase from "firebase";


class WireframeCard extends Component {



    handleDeleteWireframe = (e) => {
        const firestore = getFirestore();
        firestore.collection("wireframes").doc(this.props.auth.uid).update({
            wireframes: firebase.firestore.FieldValue.arrayRemove(e)
        });
    };



    render() {
        //console.log(this.props.deleteWireframe);
        //console.log(this.props.auth.uid);
        const { wireframe } = this.props;
        return (
            <div>
                <div className="card z-depth-0 todo-list-link rounded_corner">
                    <Card
                        size="small"
                        className="z-depth-1 hoverable rounded_corner"
                        title={wireframe.name}
                        bordered={false}
                        extra={
                            <Popconfirm title="Delete this Wireframe?"
                                        onConfirm={(e)=> {

                                            e.stopPropagation();
                                            this.handleDeleteWireframe(wireframe);
                                            message.success("Wireframe Deleted", 1);
                                        }}
                                        onCancel={(e) => {
                                            e.stopPropagation();
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                            >
                                <Button type="danger"
                                >
                                    <Icon type="delete" theme="filled" /></Button>
                            </Popconfirm>

                        }
                    >
                        <span className="grey-text text-lighten-1">Height: {wireframe.height}  Width: {wireframe.width}</span>
                        <br/><br/>
                        <span className="blue-grey-text text-lighten-4">{moment(wireframe.time).calendar()}</span>
                    </Card>
                </div>
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};


export default compose(
    connect(mapStateToProps),
    firestoreConnect(),
)(WireframeCard);