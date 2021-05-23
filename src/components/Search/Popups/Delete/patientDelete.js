import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { deletePatientData } from '../../../../actions/patient';
import { useSelector } from "react-redux";
import { MODAL_CLOSE } from '../../../../actions/actionConstants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    }
  },
}));

export default function PatientDelete(props) {
    const classes = useStyles();
    const {modalPopup,auth} = useSelector(state => state);
    const dispatch = useDispatch();
    const onSubmit = (e) =>{
      dispatch(deletePatientData(modalPopup.data.Id,auth.tokenId));
    }
    const onCancel = (e) =>{
      dispatch({type: MODAL_CLOSE});
    }
    return (
      <form className={classes.root} noValidate autoComplete="off" >
          <h3>You want to delete patient and its associated record. Are you sure?</h3>
          <Button variant="contained" color="secondary" onClick={onSubmit}>Yes</Button>
          <Button variant="contained" color="primary" onClick={onCancel}>Cancel</Button>
      </form>
    );
}