import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import WireframeCard from "./WireframeCard";
import {firestoreConnect} from "react-redux-firebase";

class WireframesLinks extends  Component{


    render() {
        console.log("linkssd");
        console.log(this.props.wireframe);
        const userWireframes = this.props.wireframe;
        //userWireframes = userWireframes.sort((a, b) => (a.time > b.time) ? 1 : -1);

        return (
            <div>
                {userWireframes && userWireframes
                    .sort((a, b) => (a.time > b.time) ? -1 : 1)
                    .map((wireframe, i) => (
                    <Link to={'/wireframe/' + i} key={wireframe.id}>
                        <WireframeCard wireframe={wireframe}/>
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        firestore: state.firestore
}
};

export default compose(
    connect(({ firebase: { auth } }) => ({ auth })),
    firestoreConnect(props => {
        //console.log(props.auth);
        return [{
            collection: 'wireframes', where: ['id','==', props.auth.uid]
        }]
    }),
    connect(mapStateToProps)
)(WireframesLinks);