import React from 'react';
import { PropTypes } from 'prop-types';

class LoginPrompt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
    }
    render() {
        const { input } = this.state;

        return (
            <div className="input-container">
                <label id="input-label" for="input-prompt">{ this.props.label }</label>
                <div>
                    <input 
                        id="input-prompt" 
                        type="text" 
                        onInput={ (e) => this.setState({input: e.target.value}) }/>
                    <input 
                        id="input-prompt-btn" 
                        type="button" 
                        value="Submit" 
                        onClick={ () => this.props.onSubmit(input) } />
                </div>
            </div>
        );
    }
};

export default LoginPrompt;