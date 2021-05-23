import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

const getResult = (result)=>{
    switch (result) {
        case "0":
            return 'Negative';
        case "1":
            return 'Positive';
        default:
            return 'NA';
    }
  }

const getConfiguredColumns = (props)=>{ return [
  { field: 'Action', headerName: 'Action', width:210, renderCell: (params) => {
    const onClick = (operation) => {
        switch (operation) {
            case "DELETE":
                props.onInitialDiagnosisDelete(params.row);
                break;
            default:
                props.onInitialDiagnosisEdit(params.row);
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
  { field: 'SymptomDate', headerName: 'Symptom Date', width: 150 },
  { field: 'SampleDate', headerName: 'Sample Date', width: 150 },
  { field: 'Result', headerName: 'Result', width: 100, hide: true },
  { 
    field: '', headerName: 'Result', width:100, hide: false,
    valueGetter: (params) => getResult(params.getValue('Result'))
  },
  { field: 'Remark', headerName: 'Remark', width: 200, renderCell:(params)=><textarea  readOnly style={{wrap:'hard', overflowY:'scroll', height:60}} value={params.getValue('Remark')}></textarea>  },
]};

export default function InitialDiagnosisDetail(props) {
  return (
      <div style={{ height: 400 }}>
          <DataGrid rows={props.initialDiagnosis??[]} columns={getConfiguredColumns(props)} pageSize={10}/>
      </div>
  );
}