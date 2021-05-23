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
                props.onAdmissionDelete(params.row);
                break;
            default:
                props.onAdmissionEdit(params.row);
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
  { field: 'AdmissionDate', headerName: 'Admission Date', width: 160 },
  { field: 'RoomNo', headerName: 'Room No', width: 120 },
  { field: 'BedNo', headerName: 'Bed No', width: 120 },
  { field: 'DischargeDate', headerName: 'Discharge Date', width: 160 },
  { field: 'Remark', headerName: 'Remark', width: 200, renderCell:(params)=><textarea  readOnly style={{wrap:'hard', overflowY:'scroll', height:60}} value={params.getValue('Remark')}></textarea>  },
]};

export default function AdmissionDetail(props) {
  return (
    <div style={{ height: 400 }}>
        <DataGrid rows={props.admission??[]} columns={getConfiguredColumns(props)} pageSize={5}/>
    </div>
  );
}