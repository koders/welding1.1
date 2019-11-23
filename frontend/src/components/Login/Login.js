import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authentication";
import "./Login.scss";
import Logo from "./gjerde-logo.png";
import { Button, Form, Message, Segment } from "semantic-ui-react";

const Login = (props) => {

    React.useEffect(() => {
        if(props.isAuthenticated) {
            props.history.push("/");
        }
    }, [ props.isAuthenticated, props.history ]);

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

    return(
        <div className="login-container">
            <Segment padded="very" className="login-segment">
                <img className="logo" src={Logo} alt="Login" />
                <Form onSubmit={ handleSubmit } error={typeof errors === "string"}>
                    <Form.Input
                        placeholder="Username"
                        // label="Username"
                        icon="user"
                        iconPosition='left'
                        error={errors.username}
                        onChange={ handleUsernameChange }
                        value={ username }
                    />
                    <Form.Input
                        type="password"
                        placeholder="Password"
                        // label="Password"
                        icon="lock"
                        iconPosition='left'
                        error={errors.password}
                        onChange={ handlePasswordChange }
                        value={ password }
                    />
                    <Form.Field>
                        <Message
                            error
                            header="Error"
                            content={errors}
                        />
                    </Form.Field>
                    <Button type="submit" color="green">Login</Button>
                </Form>
            </Segment>
        </div>
    );
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
