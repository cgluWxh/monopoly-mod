import React from 'react';
import {gameService} from "./services/GameService";

export default class Video extends React.Component {

    state = {
        chatInput: '',
    }

    componentDidMount() {
        // rtcService.pageReady();
    }

    sendChat = () => {
        if (this.state.chatInput.length > 0) {
            gameService.sendToWs('chat', {message: this.state.chatInput});
            this.setState({chatInput: ''});
        }
    }

    chatKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.sendChat();
        }
    }

    componentDidUpdate(prevProps) {
        const messageBody = document.getElementById('chat-box');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }

    render() {
        return (<div className="video-chat">
            <div id="chat-box" className="chat">
                {this.props.chat.map((l, index) => <p key={index}>{l}</p>)}
            </div>
            <div><small><a href="./chat.txt" target="_blank">View full chat</a></small></div>
            <div className="chat-input">
                <input type="text" value={this.state.chatInput}
                       placeholder="Text chat here"
                       onKeyUp={this.chatKeyUp}
                       onChange={e => this.setState({chatInput: e.target.value})}/>
                <button onClick={this.sendChat}>Send</button>
            </div>
        </div>)
    }
}