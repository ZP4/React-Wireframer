import React, {Component} from 'react';
import moment from 'moment';
import {Card} from 'antd';

class WireframeCard extends Component {

    render() {
        const { wireframe } = this.props;
        return (
            <div>
                <div className="card z-depth-0 todo-list-link rounded_corner">
                    <Card
                        className="z-depth-1 hoverable rounded_corner"
                        title={wireframe.name}
                        bordered={false}
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

export default WireframeCard;