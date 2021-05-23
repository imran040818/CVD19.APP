import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    height:80,
    backgroundColor:'#3f51b5',
    paddingTop:50,
    color:'#fff',
    position:'absolute',
    bottom:0,
    left:0,
    top:'100%',
    width:'100%'
  }
}));

export default function FooterComponent() {
    const classes = useStyles();
    return (
        <footer className={classes.root}>
            CVD19Tracker&#169;2021
        </footer>
    )
}
