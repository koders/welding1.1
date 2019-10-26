import React from 'react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import './App.scss';
import './themify/themify-icons.css';
import Login from './components/Login/Login';
import store from './store';
import { logoutUser, setCurrentUser } from './actions/authentication';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./components/Login/gjerde-logo.png";

const App = () => {
    return (
        <Provider store = { store }>
            <Router>
                <AppInnerWithRouter />
            </Router>
        </Provider>
    );
}

const AppInner = (props) => {

    React.useEffect(() => {
        if(localStorage.jwtToken) {
            setAuthToken(localStorage.jwtToken);
            const decoded = jwt_decode(localStorage.jwtToken);
            store.dispatch(setCurrentUser(decoded));

            const currentTime = Date.now() / 1000;
            if(decoded.exp < currentTime) {
                store.dispatch(logoutUser(this.props.history));
                window.location.href = '/login';
            }
        }
    }, [])

    return (
        <div>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route path="/" component={ContainerConnected} />
            </Switch>
        </div>
    );
}

const AppInnerWithRouter = withRouter(AppInner);

const Container = (props) => {

    React.useEffect(() => {
        if (!props.auth.isAuthenticated && !localStorage.jwtToken) {
            props.history.push('/login');
        }
    }, [props.auth.isAuthenticated])

    if (!props.auth.isAuthenticated) {
        return null;
    }

    const selfProps = props;

    return (
        <div>
            <div className="sidebar">
                <div className="logo">
                    <img src={Logo} alt="logo" />
                </div>
                <div className="menu">
                    <div className="item">
                        <Link to="/" className="link">
                            <span className="icon"><i className="c-blue-500 ti-home" /></span>
                            <span className="title">Dashboard</span>
                        </Link>
                    </div>
                    <div className="item">
                        <Link to="/orders" className="link">
                            <span className="icon"><i className="c-blue-500 ti-receipt" /></span>
                            <span className="title">Orders</span>
                        </Link>
                    </div>
                    <div className="item">
                        <Link to="/admin" className="link">
                            <span className="icon"><i className="c-blue-500 ti-settings" /></span>
                            <span className="title">Administration</span>
                        </Link>
                    </div>
                    <div className="item">
                        <Link to="/invoices" className="link">
                            <span className="icon"><i className="c-blue-500 ti-archive" /></span>
                            <span className="title">Invoices</span>
                        </Link>
                    </div>
                    <div className="item">
                        <Link to="/statistics" className="link">
                            <span className="icon"><i className="c-blue-500 ti-stats-up" /></span>
                            <span className="title">Statistics</span>
                        </Link>
                    </div>
                    <div className="item">
                        <Link to="/logout" className="link">
                            <span className="icon"><i className="c-blue-500 ti-power-off" /></span>
                            <span className="title">Logout</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="page-container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/logout" render={(props) => <Logout {...props} logoutUser={selfProps.logoutUser} />} />
                </Switch>
            </div>
        </div>
    );
}

Container.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

const ContainerConnected = connect(mapStateToProps, { logoutUser })(Container)

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const Orders = () => (
    <div>
        <h2>Orders</h2>
    </div>
);

const Logout = (props) => {
    props.logoutUser(props.history);
    return (
        <div>

        </div>
    );
}

export default App;
