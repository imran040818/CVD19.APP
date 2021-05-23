import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteDailyDiagnosis } from '../../../../actions/dailyDiagnosis';
import { MODAL_CLOSE } from '../../../../actions/actionConstants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    }
  },
}));

export default function DailyDisgnosisDelete(props) {
    const classes = useStyles();
    const {modalPopup,auth} = useSelector(state => state);
    const dispatch = useDispatch();
    const onSubmit = (e) =>{
      dispatch(deleteDailyDiagnosis(modalPopup.data.Id,auth.tokenId));
    }
    const onCancel = (e) =>{
      dispatch({type: MODAL_CLOSE});
    }
    return (
      <form className={classes.root} noValidate autoComplete="off" >
          <h3>You want to delete daily diagnosis record. Are you sure?</h3>
          <Button variant="contained" color="secondary" onClick={onSubmit}>Yes</Button>
          <Button variant="contained" color="primary" onClick={onCancel}>Cancel</Button>
      </form>
    );
}