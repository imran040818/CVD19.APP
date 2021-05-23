import React,{Component} from 'react';
import { Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function ProtectedRoute(props) {
    const {auth} = useSelector(state=>state);
    //console.log(auth)
     return (
      <Route
        render={props => {
          if (auth.loggedInUser === true) {
            return <Component {...props} />;
          } else {
           return (
               <Redirect to={{ pathname: "/", state: { from: props.location }}} />
           );
          }
        }}
      />
    )}

