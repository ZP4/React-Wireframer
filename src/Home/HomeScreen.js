import React, {Component} from 'react';
import {connect} from 'react-redux';

function HomeScreen() {
    return(
        <div>
            hello
        </div>
    )
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(HomeScreen);
