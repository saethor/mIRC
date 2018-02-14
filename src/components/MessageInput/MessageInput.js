import React from 'react';
import PropTypes from 'prop-types';

class MessageInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
    }
    render() {
        const { input } = this.state;
        return (
            <div>
                <input 
                    id="message-input"
                    type="text" 
                    onInput={ (e) => this.setState({input: e.target.value}) }
                />
                <input 
                    id="message-send"
                    type="button" 
                    value="Send"
                    onClick={ () => this.props.onSend(input) }
                />
            </div>
        );
    }
};

MessageInput.propTypes = {
    onSend: PropTypes.func.isRequired
};

export default MessageInput;