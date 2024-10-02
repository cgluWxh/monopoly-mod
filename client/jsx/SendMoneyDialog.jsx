import React from 'react';
import Dialog from "./components/Dialog";
import {gameService} from "./services/GameService";
import Token from "./Token";

export default class SendMoneyDialog extends React.Component {
    state = {
        toSend: 0
    };

    selectPlayer = (player) => {
        this.setState({dest: player.id})
    }

    sendMoney = () => {
        if(this.state.dest && !isNaN(this.state.toSend)) {
            if(this.state.toSend > this.props.player.notes) {
                alert("You don't have enough notes to send that amount.");
                return;
            }
            gameService.sendMoney(this.props.player.id, this.state.dest, this.state.toSend);
            this.props.dismiss();
        }
    }

    render() {
        const player = this.props.player;
        if (player) {
            const availablePlayers = this.props.game.players.filter(p => p.id !== player.id);
            const sum = this.state.toSend;

            const actions = [
                {
                    name: 'Close',
                    click: () => this.props.dismiss(),
                },
                {
                    name: 'Send $' + sum,
                    click: () => this.sendMoney(),
                },
            ];

            return (<Dialog actions={actions}>
                <div className="send-money-dialog">
                    <h1>Send Money</h1>
                    <div className="select-player">
                        <h3>Select Player</h3>
                        {availablePlayers.map(p => <div key={p.id} onClick={() => this.selectPlayer(p)}
                                                        className="player">
                            <Token token={p.token} selected={this.state.dest === p.id}/>
                            {p.name}
                        </div>)}

                    </div>
                    <div className="select-notes">
                        <h3>Input amount</h3>
                        <div className="notes">
                            <input type="text" onKeyDown={e => e.key === 'Enter' && this.sendMoney()} onChange={e => this.setState({toSend: parseInt(e.target.value)})} />
                        </div>
                    </div>
                </div>
            </Dialog>)
        } else {
            return (<div></div>);
        }
    }
}