import React from 'react';
import PropTypes from 'prop-types';

class MessageInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
    }
    onSubmit(e) {
        e.preventDefault();
    }
    render() {
        const { input } = this.state;
        return (
            <form className="chat-send-wrapper" onSubmit={this.onSubmit}>
                <input 
                    className="chat-send-text"
                    id="message-input"
                    type="text" 
                    onInput={ (e) => this.setState({input: e.target.value}) }
                />
                <input 
                    className="btn"
                    id="message-send"
                    type="submit" 
                    value="Send"
                    onClick={ () => this.props.onSend(input) }
                />
            </form>
        );
    }
};

MessageInput.propTypes = {
    onSend: PropTypes.func.isRequired
};

export default MessageInput;