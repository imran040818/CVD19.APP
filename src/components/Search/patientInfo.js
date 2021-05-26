
import InitialDiagnosisDetail from './initialDiagnosisDetail';
import DailyDiagnosisDetail from './dailyDiagnosisDetail';
import AdmissionDetail from './admissionDetail';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { MODAL_OPEN} from '../../actions/actionConstants'
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function PatientInfo(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const addDailyDiagnosis =(props)=>{
        dispatch(
            {
                type: MODAL_OPEN,
                payload: 
                {
                resourceName : 'dailyDiagnosis',
                operationName: 'New Daily Diagnosis',
                popupWidth:300,
                popupHeight:500,
                data: { 
                    Id:undefined,
                    DiagnosisDate:undefined,
                    Spo2: '',
                    Temp:'',
                    Weight:'',
                    Medicine:'',
                    Remark: '',
                    Advice:'',
                    Other:'',
                    Cpr:'',
                    Ddimer:'',
                    PatientId:props.selectedPatientId,
                    UserCreated: props.userCreated
                }
                },
            });
        }
    const addInitialDiagnosis =(props)=>{
        dispatch(
            {
                type: MODAL_OPEN,
                payload: 
                {
                    resourceName : 'initialDiagnosis',
                    operationName: 'New Initial Diagnosis',
                    popupWidth:300,
                    popupHeight:500,
                    data: { 
                    Id:undefined,
                    SymptomDate:undefined,
                    SampleDate:undefined,
                    Result: '3',
                    Remark: '',
                    PatientId:props.selectedPatientId,
                    UserCreated: props.userCreated
                    }
                },
            });
        }
    const addAdmission =(props)=>{
        dispatch(
            {
                type: MODAL_OPEN,
                payload: 
                {
                    resourceName : 'admission',
                    operationName: 'New Admission',
                    popupWidth:300,
                    popupHeight:500,
                    data: { 
                    Id:undefined,
                    AdmissionDate:undefined,
                    DischargeDate:undefined,
                    RoomNo: '',
                    BedNo: '',
                    Remark:'',
                    IsReferred:false,
                    PatientId:props.selectedPatientId,
                    UserCreated: props.userCreated
                    }
                },
            });
        }
  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Daily Diagnosis" value="1" />
            <Tab label="Initial Diagnosis" value="2" />
            <Tab label="Admission" value="3" />
          </TabList>
        </AppBar>
        <TabPanel value="1">
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <div style={{textAlign:'left'}}>
                        {/* <Button variant="contained" color="primary" onClick={()=>addDailyDiagnosis(props)}>+</Button> */}
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>addDailyDiagnosis(props)}>
                            <Add />
                            </IconButton>
                        </label>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <DailyDiagnosisDetail {...props}/>
                </Grid>               
            </Grid>
        </TabPanel>
        <TabPanel value="2">
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <div style={{textAlign:'left'}}>
                        {/* <Button variant="contained" color="primary" onClick={()=>addInitialDiagnosis(props)}>+</Button> */}
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>addInitialDiagnosis(props)}>
                            <Add />
                            </IconButton>
                        </label>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <InitialDiagnosisDetail  {...props} />
                </Grid>
            </Grid>
        </TabPanel>
        <TabPanel value="3"> 
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <div style={{textAlign:'left'}}>
                        {/* <Button variant="contained" color="primary" onClick={()=>addAdmission(props)}>+</Button> */}
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>addAdmission(props)}>
                            <Add />
                            </IconButton>
                        </label>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <AdmissionDetail {...props}/>
                </Grid>
            </Grid>
        </TabPanel>
      </TabContext>
    </div>
  );
}