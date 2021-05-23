import React from 'react'
import { Router, Route, browserHistory } from 'react-router';
import Search from './components/Search';
import Login from './components/Login';
import ProtectedRoute from './utilities/ProtectedRoute';
import { useSelector } from "react-redux";


export default function App(props) {
    // console.log(props);
    // console.log(window.location.pathname);
    const {auth} = useSelector(state=>state);
    return (
        <Router history={browserHistory}>
            <ProtectedRoute path="/search" component={Search} />
            <Route path="/" component={Login} /> 
        </Router>
        );
    
}
