import React from 'react';
import PropTypes from 'prop-types';

class UserItem extends React.Component {
    constructor(props) {
        super(props);
    }

    op() {
        const { socket } = this.context;
        const { room, name } = this.props;
        socket.emit('op', { room, user: name}, (bool) => console.log('response', bool));
    }

    deop() {
        const { socket } = this.context;
        const { room, name } = this.props;
        socket.emit('deop', { room, user: name}, (bool) => console.log('response', bool));
    }

    kick() {
        const { socket } = this.context;
        const { room, name } = this.props;
        socket.emit('kick', { room, user: name}, (bool) => console.log('response', bool));
    }

    ban() {
        const { socket } = this.context;
        const { room, name } = this.props;
        socket.emit('ban', { room, user: name}, (bool) => console.log('response', bool));
    }

    render() {
        const {name, admin} = this.props;
        let display = admin ? `@${name}` : name;
        return (
            <li>
                {display} 
                {admin ? <button onClick={this.deop.bind(this)}>DEOP</button> : <button onClick={this.op.bind(this)}>OP</button>}
                <button onClick={this.kick.bind(this)}>Kick</button>
                <button onClick={this.ban.bind(this)}>Ban</button>
                <button>PM</button>
            </li>
        );
    }
}

UserItem.propTypes = {
    name: PropTypes.string.isRequired,
    admin: PropTypes.bool
};

UserItem.contextTypes = {
    socket: PropTypes.object.isRequired
}

UserItem.defaultProps = {
    admin: false
};

export default UserItem;