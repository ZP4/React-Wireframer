import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import todoJson from './TestTodoListData.json'
import { getFirestore } from 'redux-firestore';
import {Redirect} from "react-router-dom";
import {firebaseConnect, firestoreConnect} from 'react-redux-firebase';

class DatabaseTester extends React.Component {
    _isMounted= true;
    state = {
        seconds: 5,

    };

    componentDidMount() {
        if(this._isMounted){
            this.myInterval = setInterval(() => {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }, 1000);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        // const fireStore = getFirestore();
        // fireStore.collection('todoLists').get().then(function(querySnapshot){
        //     querySnapshot.forEach(function(doc) {
        //         console.log("deleting " + doc.id);
        //         fireStore.collection('todoLists').doc(doc.id).delete();
        //     })
        // });
    };

    handleReset = () => {
        // const fireStore = getFirestore();
        // let date = new Date();
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
    };

    render() {
        const { auth } = this.props;
        console.log(this.props.user);
        if(!auth.uid) {
            return (
                <Redirect to="/login"/>
            );
        }
        else if(this.props.user === 0) {
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
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase,
        user: state.firestore.ordered.users && state.firestore.ordered.users[0].admin
    };
};

export default compose(
    connect(({ firebase: { auth } }) => ({ auth })),
    firestoreConnect(props => {
        return [{
            collection: 'users', doc: props.auth.uid
        }]
    }),
    connect(mapStateToProps),
)(DatabaseTester);