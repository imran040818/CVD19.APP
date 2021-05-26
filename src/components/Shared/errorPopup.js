import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { ERROR_MODAL_CLOSE} from '../../actions/actionConstants';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    //backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2, 2),
    width:300,
    height:500,
    backgroundColor: '#FFBABA',
    color:'#D8000C'
  },
}));

export default function ErrorPopup(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const errorPopup = useSelector(state => state.errorPopup);
  const onErrorPopupClose = () =>{
    dispatch({type: ERROR_MODAL_CLOSE})
  }

  return (

    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={errorPopup.isErrorModalOpen}
      //  onClose={()=>props.onPopupClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={errorPopup.isErrorModalOpen}>
            <div className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <h2 id="transition-modal-title">Error</h2>
                    </Grid>
                    <Grid item xs={3}>
                        <Button style={{ color:'#D8000C'}} onClick={()=>onErrorPopupClose()}>X</Button>
                    </Grid>
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
                  <h3 style={{color:'#D8000C'}}>{errorPopup.errorMessage.message}</h3>
            </Grid>
                
            </div>
        </Fade>
      </Modal>
    </div>
  );
}