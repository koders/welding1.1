import React, { PureComponent } from 'react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import './themify/themify-icons.css';
import Login from './components/Login';
import store from './store';
import { logoutUser, setCurrentUser } from './actions/authentication';
import 'bootstrap/dist/css/bootstrap.min.css';

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login'
    }
}

class App extends PureComponent {
    render = () => {
        return (
            <Provider store = { store }>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route path="/" component={ContainerConnected} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

class Container extends PureComponent {

    componentWillMount = () => {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }


    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    onLogout = (e) => {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render = () => {
        return (
            <div>
                <div className="sidebar">
                    <div className="logo">
                        <img src="/gjerde-logo.png" alt="logo" />
                    </div>
                    <div className="menu">
                        <div className="item"><Link to="/">Dashboard</Link></div>
                        <div className="item"><Link to="/orders">Orders</Link></div>
                        <div className="item" onClick={this.onLogout}>Logout</div>
                    </div>
                </div>

                <div className="page-container">
                    <Route exact path="/" component={Home} />
                    <Route path="/orders" component={Orders} />
                </div>
            </div>
        );
    };
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

export default App;
