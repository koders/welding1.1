import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authentication";
import classnames from "classnames";
import "./Login.scss";
import Logo from "./gjerde-logo.png";

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
        };
        props.loginUser(user);
    };

    const generalError = typeof errors === "string" && (
        <div className="alert alert-danger" role="alert">
            { errors }
        </div>
    );

    return(
        <div className="login-container">
            <img className="logo" src={Logo} alt="Login" />
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <input
                        type="username"
                        placeholder="Username"
                        className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.username,
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
                        className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.password,
                        })}
                        name="password"
                        onChange={ handlePasswordChange }
                        value={ password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                { generalError }
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
