import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

class UserItem extends React.Component {
    constructor(props) {
        super(props);
    }

    op() {
        const { socket } = this.context;
        const { room, name } = this.props;
        socket.emit('op', { room, user: name}, function() { return; });
    }

    deop() {
        const { socket } = this.context;
        const { room, name } = this.props;
        socket.emit('deop', { room, user: name}, function() { return; });
    }

    kick() {
        const { socket } = this.context;
        const { room, name } = this.props;
        socket.emit('kick', { room, user: name}, function() { return; });
    }

    ban() {
        const { socket } = this.context;
        const { room, name } = this.props;
        socket.emit('ban', { room, user: name}, function() { return; });
    }

    render() {
        const {name, admin} = this.props;
        let display = admin ? `@${name}` : name;
        return (
            <li className="user-item">
                <span>
                    {display} 
                </span>
                <div>
                    {admin ? <button onClick={this.deop.bind(this)}>DEOP</button> : <button onClick={this.op.bind(this)}>OP</button>}
                    <button onClick={this.kick.bind(this)}>Kick</button>
                    <button onClick={this.ban.bind(this)}>Ban</button>
                    <Link to={`/users/${name}`}>PM</Link>
                </div>
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