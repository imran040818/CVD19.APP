import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { MODAL_CLOSE} from '../../actions/actionConstants';
import Patient from '../Search/Popups/InsertUpdate/patient';
import InitialDiagnosis from '../Search/Popups/InsertUpdate/initialDiagnosis';
import DailyDiagnosis from '../Search/Popups/InsertUpdate/dailyDiagnosis';
import Admission  from '../Search/Popups/InsertUpdate/admission';

import PatientDelete from '../Search/Popups/Delete/patientDelete';
import InitialDiagnosisDelete from '../Search/Popups/Delete/initialDiagnosisDelete';
import DailyDiagnosisDelete from '../Search/Popups/Delete/dailyDiagnosisDelete';
import AdmissionDelete  from '../Search/Popups/Delete/admissionDelete';

const getResource = (resourceName, data) =>{
    switch (resourceName) {
        case 'patient':
            return <Patient data={data}/>
        case 'initialDiagnosis':
            return <InitialDiagnosis data={data}/>
        case 'dailyDiagnosis':
            return <DailyDiagnosis data={data}/>
        case 'admission':
            return <Admission data={data}/>
        case 'patient-delete':
            return <PatientDelete data={data}/>
        case 'initialDiagnosis-delete':
            return <InitialDiagnosisDelete data={data}/>
        case 'dailyDiagnosis-delete':
            return <DailyDiagnosisDelete data={data}/>
        case 'admission-delete':
            return <AdmissionDelete data={data}/>
        default:
            break;
    }
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2, 2),
  },
}));

export default function ModelPopup(props) {
  const classes = useStyles();
  const modalPopup = useSelector(state => state.modalPopup);

  const dispatch = useDispatch();
  const onPopupClose = () =>{
    dispatch({type: MODAL_CLOSE})
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalPopup.isOpenModal}
      //  onClose={()=>props.onPopupClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalPopup.isOpenModal}>
            <div className={classes.paper} style={{ width:modalPopup.width, height:modalPopup.height}}>
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <h2 id="transition-modal-title">{ modalPopup.operationName }</h2>
                    </Grid>
                    <Grid item xs={3}>
                        <Button color='primary' onClick={()=>onPopupClose()}>X</Button>
                    </Grid>
                </Grid>
                { getResource(modalPopup.resourceName,modalPopup.data )}
                
            </div>
        </Fade>
      </Modal>
    </div>
  );
}