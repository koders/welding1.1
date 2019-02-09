import React, {Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import './themify/themify-icons.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div className="sidebar">
                        <div className="logo">
                            <img src="/gjerde-logo.png" alt="logo" />
                        </div>
                        <div className="menu">
                            <div className="item"><Link to="/">Dashboard</Link></div>
                            <div className="item"><Link to="/orders">Orders</Link></div>
                        </div>
                    </div>

                    <div className="page-container">
                        <Route exact path="/" component={Home} />
                        <Route path="/orders" component={Orders} />
                    </div>
                </div>
            </Router>
        );
    }
}

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
