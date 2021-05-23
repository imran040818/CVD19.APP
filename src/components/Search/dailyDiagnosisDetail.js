import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

const getConfiguredColumns = (props)=>{ return [
  { field: 'Action', headerName: 'Action', width:210, renderCell: (params) => {
    const onClick = (operation) => {
        switch (operation) {
            case "DELETE":
                props.onDailyDiagnosisDelete(params.row);
                break;
            default:
                props.onDailyDiagnosisEdit(params.row);
                break;
        }
    };
    return (
        <div>
           <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>onClick("EDIT")}>
                        <Edit />
                    </IconButton>
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>onClick("DELETE")}>
                        <Delete />
                    </IconButton>
            {/* <Button onClick={()=>onClick("EDIT")} color="primary">Edit</Button>
            <Button onClick={()=>onClick("DELETE")} color="secondary">Delete</Button> */}
        </div>
    );
  }
  },
  { field: 'DiagnosisDate', headerName: 'Diagnosis Date', width: 180 },
  { field: 'Spo2', headerName: 'Spo2', width: 90 },
  { field: 'Temp', headerName: 'Temp', width: 90 },
  { field: 'Weight', headerName: 'Weight', width: 100 },
  { field: 'Medicine', headerName: 'Medicine', width: 300,renderCell:(params)=><textarea  readOnly style={{wrap:'hard', overflowY:'scroll', height:60}} value={params.getValue('Medicine')}></textarea> },
  { field: 'Cpr', headerName: 'CRP', width: 130 },
  { field: 'Ddimer', headerName: 'D-Dimer', width: 130 },
{ field: 'Remark', headerName: 'Remark', width: 200, renderCell:(params)=><textarea  readOnly style={{wrap:'hard', overflowY:'scroll', height:60}} value={params.getValue('Remark')}></textarea> },
]};

export default function DailyDiagnosisDetail(props) {
  return (
    <div style={{ height: 400}}>
        <DataGrid rows={props.dailyDiagnosis ?? []} columns={getConfiguredColumns(props)} />
    </div>
  );
}