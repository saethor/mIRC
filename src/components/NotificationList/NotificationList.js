import React from 'react';
import PropTypes from 'prop-types';

import NotificationItem from '../NotificationItem/NotificationItem';

class NotificationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            notifications: [
                
            ]
        }
    }

    componentDidMount() {
        const { socket } = this.context;
        socket.on('recv_privatemsg', (username, message) => {
            let notifications = Object.assign([], this.state.notifications);
            notifications.unshift({title: `${username}: ${message}`, link: `/users/${username}`, unread: true})
            this.setState({notifications})
        });
    }

    toggleRead(notification) {
        let notifications = Object.assign([], this.state.notifications);
        notifications = notifications.map(n => {
            if (n !== notification) {
                return n
            }
            n.unread = !n.unread;
            return n;
        })
        this.setState({notifications});
    }

    toggleNotifications() {
        this.setState({open: !this.state.open})
    }

    render() {
        const { notifications, open} = this.state;
        const length = notifications.filter(n => n.unread).length
        return (
            <div className="notifications-container">
                <div className="notifications-header" onClick={this.toggleNotifications.bind(this)}>
                    <h3>
                        {length ? `(${length}) ` :  null}Notifications
                        <span className="close">X</span>
                    </h3>
                </div>
                <ul className={`notifications ${open ? 'open' : 'closed'}`}>
                    {notifications.map((notification, index) => (
                        <NotificationItem key={index} title={notification.title} unread={notification.unread} link={notification.link} onClick={() => this.toggleRead(notification)} />
                    ))}
                </ul>
            </div>
        )
    }
}

NotificationList.propTypes = {
}

NotificationList.contextTypes = {
    socket: PropTypes.object.isRequired
}

export default NotificationList;