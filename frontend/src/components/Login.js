import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import classnames from 'classnames';

const Login = (props) => {

    React.useEffect(() => {
        if(props.isAuthenticated) {
            props.history.push("/");
        }
    }, [ props.isAuthenticated ]);

    const { errors } = props;

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username,
            password,
        }
        props.loginUser(user);
    }

    return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Login</h2>
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <input
                        type="username"
                        placeholder="Username"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.username,
                        })}
                        name="username"
                        onChange={ handleUsernameChange }
                        value={ username }
                    />
                    {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password,
                        })}
                        name="password"
                        onChange={ handlePasswordChange }
                        value={ password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Login User
                    </button>
                </div>
            </form>
        </div>
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    isAuthenticated: state.auth.isAuthenticated,
})

export  default connect(mapStateToProps, { loginUser })(Login);
