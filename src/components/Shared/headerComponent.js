import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useGoogleLogin } from 'react-google-login';
import { useGoogleLogout } from 'react-google-login';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import {IS_LOGGED_IN, IS_LOGGED_OUT} from '../../actions/actionConstants';

const clientId='898314977990-b6htv2pk7f4vhmlie2kkis6v7q15q974.apps.googleusercontent.com';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  
export default function HeaderComponent(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);
        
    const onLoginSuccess = (e)=>{
      var decodedHeader = jwt_decode(e.tokenId);
      dispatch({
          type:IS_LOGGED_IN,
          payload:{ loggedInUser:decodedHeader.email, tokenId:e.tokenId }
      });
      props.router.push('/search');
    }
    const onLoginFailue = (e)=>{
      dispatch({
          type:IS_LOGGED_OUT,
      });
      props.router.push('/');
    }
    const onLogoutFailue = (e) =>{
      dispatch({
          type:IS_LOGGED_OUT,
      });
      props.router.push('/');
    }
    const onLogoutSuccess = (e)=>{
      dispatch({
          type:IS_LOGGED_OUT,
      });
      props.router.push('/');
    }
    const { signIn } = useGoogleLogin({
      onSuccess: onLoginSuccess,
      onFailure : onLoginFailue,
      clientId: clientId,
      isSignedIn:true,
      accessType:'offline',
    });
    const { signOut } = useGoogleLogout({
        onFailure: onLogoutFailue,
        clientId: clientId,
        onLogoutSuccess: onLogoutSuccess
      });  
    
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              CVD19 Tracker
            </Typography>
            <Button color="inherit" onClick={signIn} style={{display: isLoggedIn ? 'none' : 'block'}}>Login</Button>
            <Button color="inherit" onClick={signOut} style={{display: isLoggedIn ? 'block' : 'none'}}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
