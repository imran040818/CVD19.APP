import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';
import Search from './components/Search';
import Login from './components/Login';
import Patient from './components/Patient';
 import ProtectedRoute from './utilities/ProtectedRoute';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
<Provider store={store}>
    <Router history={browserHistory}>
        <ProtectedRoute path="/search" component={Search} />    
        <ProtectedRoute path="/patient" component={Patient} />                        
        <Route path="*" component={Login} />    
    </Router>
</Provider>
, document.getElementById("root"));

