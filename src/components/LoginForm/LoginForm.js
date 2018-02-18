import React from 'react';
import { PropTypes } from 'prop-types';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    render() {
        const { input } = this.state;

        return (
            <form className="box" onSubmit={this.handleSubmit}>
                <div className="flex-field">
                    <label className="flex-label" htmlFor="username">Choose a username</label>
                    <div className="flex-input">
                        <input id="username" type="text" onInput={ (e) => this.setState({input: e.target.value})} />
                        <input className="btn" type="submit" value="Submit" onClick={ () => this.props.onSubmit(input) } />
                    </div>
                </div>
            </form>
        )
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default LoginForm;