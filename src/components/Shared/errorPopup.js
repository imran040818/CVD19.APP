import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { ERROR_MODAL_CLOSE} from '../../actions/actionConstants';

const useStyles = makeStyles((theme) => ({
  errorContainer:{
    zIndex:99,position:'absolute',
    justifyContent: 'center',
    backgroundColor: '#FFBABA',
    width:'100%',
    margin:0,
    padding:0,
    left: 0, 
    right: 0,
    bottom: 0,
    height:150,
    overflowY:'scroll',
    top:0
  },
  message:{
    color:'#D8000C'
  }
}));

export default function ErrorPopup(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const errorPopup = useSelector(state => state.errorPopup);
  const onErrorPopupClose = () =>{
    dispatch({type: ERROR_MODAL_CLOSE})
  }

  return (
    <div className={classes.errorContainer} style={{display: errorPopup.isErrorModalOpen ? 'block' : 'none'}} >
         <div style={{paddingLeft:20}}>
        <Grid container spacing={0}>
            <Grid item xs={11}>
                <h3 id="transition-modal-title" className={classes.message}>Error</h3>
            </Grid>
            <Grid item xs={1}>
                <Button className={classes.message} onClick={()=>onErrorPopupClose()}>X</Button>
            </Grid>
            <Grid item xs={12}>
                { errorPopup.errorMessage.validationError && 
                    errorPopup.errorMessage.validationError.map((v,vi)=>{
                    return (<div id={`div${vi}`}>{
                        v.Errors.map((e,i)=>{
                          return(<><span id={`span${i}${vi}`} className={classes.message}>{ e }</span><br/></>)
                        })
                      }</div>
                    )})
                  }
                  <h3>{errorPopup.errorMessage.message}</h3>
            </Grid>
        </Grid>
        </div>
    </div>
  );
}