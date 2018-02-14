import React from 'react';
import PropTypes from 'prop-types';
import InputPrompt from '../InputPrompt/InputPrompt'

class JoinRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            room: '',
            password: '',
            feedback: '',
        }
    }

    componentDidMount() {
        const { name } = this.props;
        this.setState({ room: name });
    }

    join(password) {
        const { socket } = this.context;
        const { name } = this.props;
        const roomObj = {
            room: name,
            pass: password
        }
        socket.emit('joinroom', roomObj, (success, reason) => {
            if (success) {
                this.setState( { feedback: undefined });            
            }
            else {
                this.setState( { feedback: reason });
            }
        });
    }

    render() {
        const { name } = this.props;
        return (
            <div className="room">
                <h3 className="room__name">{name}</h3>
                <InputPrompt label="Password..." onSubmit={value => console.log(value)} />
            </div>
        )
    }
}

JoinRoom.propTypes = {
    name: PropTypes.string.isRequired,
}

export default JoinRoom;