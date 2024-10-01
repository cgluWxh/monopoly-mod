import React from 'react';
import Settings from "./Settings";

export default class Logs extends React.Component {

    componentDidUpdate(prevProps) {
        const messageBody = document.getElementById('log-box');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }
    render() {
        return (<div className="logs">
            <h3>Logs <small><a href="./logs.txt" target="_blank">View full log</a></small> <Settings game={this.props.game} logs={this.props.logs} chat={[]}/></h3>
            <div id="log-box" className="text">
                {this.props.logs && this.props.logs.map((l, index) => <p key={index}>{l}</p> )}
            </div>
        </div>)
    }
}
