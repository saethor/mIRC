import React from 'react';
import { PropTypes } from 'prop-types';

class LoginForm extends React.Component {
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
                <label>Choose a username: </label>
                <div>
                    <input type="text" onInput={ (e) => this.setState({input: e.target.value})} />
                    <input type="button" value="Submit" onClick={ () => this.props.onSubmit(input) } />
                </div>
            </div>
        )
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default LoginForm;