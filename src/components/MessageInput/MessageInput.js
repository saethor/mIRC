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
        const { input } = this.state;

        this.setState({
            input: ''
        });

        this.props.onSend(input);
    }
    render() {
        const { input } = this.state;
        return (
            <form className="chat-send-wrapper" onSubmit={(e) => this.onSubmit(e)}>
                <input 
                    className="chat-send-text"
                    id="message-input"
                    type="text"
                    value={input}
                    onInput={ (e) => this.setState({input: e.target.value}) }
                />
                <input 
                    className="btn"
                    id="message-send"
                    type="submit" 
                    value="Send"
                />
            </form>
        );
    }
};

MessageInput.propTypes = {
    onSend: PropTypes.func.isRequired
};

export default MessageInput;