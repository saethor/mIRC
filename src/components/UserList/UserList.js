import React from 'react';
import PropTypes from 'prop-types';

class UserList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: this.props.users
        };
    }
    render() {
        let { users } = this.state;

        return (
            <ul>
                {users.map((user, index) => {
                    const display = user.admin ? `@${user.name}` : user.name;

                    return (
                        <li key={index}>{display}</li>
                    );
                })}
            </ul>
        );
    }
};

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        admin: PropTypes.bool.isRequired
    })).isRequired
};

UserList.defaultProps = {
    users: []
};

export default UserList;