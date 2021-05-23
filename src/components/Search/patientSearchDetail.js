import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import ViewModule from '@material-ui/icons/ViewModule';

const getSex = (gender)=>{
    switch (gender) {
        case 1:
            return 'Male';
        case 2:
            return 'Female';
        default:
            return 'Others';
    }
}
const getConfiguredColumns =(props) =>{ 
    return  [
    { field: 'Action', headerName: 'Action', width:210, renderCell: (params) => {
            const onClick = (operation) => {
                switch (operation) {
                    case "EDIT":
                        props.onEdit(params.row);
                        break;
                    case "DELETE":
                        props.onDelete(params.row);
                        break;
                    default:
                        props.onView(params.row);
                        break;
                }
              //return alert(JSON.stringify(params.row, null, 4));
            };
            return (
                <div>
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>onClick("VIEW")}>
                        <ViewModule />
                    </IconButton>
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>onClick("EDIT")}>
                        <Edit />
                    </IconButton>
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>onClick("DELETE")}>
                        <Delete />
                    </IconButton>
                    {/* // <Button onClick={()=>onClick("VIEW")}>View</Button>
                    // <Button onClick={()=>onClick("EDIT")} color="primary">Edit</Button>
                    // <Button onClick={()=>onClick("DELETE")} color="secondary">Delete</Button> */}
                </div>
            );
          }
    },
  { field: 'Name', headerName: 'Name', sortable:false , width:150},
  { field: 'Age', headerName: 'Age', width:80},
  { 
    field: 'Sex', headerName: 'Sex', width:80, hide: true
  },
  { 
    field: '', headerName: 'Gender', width:100, hide: false,
    valueGetter: (params) => getSex(params.getValue('Sex'))
  },
  { field: 'RelationOf', headerName: 'S/O D/O H/O', width:150},
  { field: 'Village', headerName: 'Village' , width:130},
  { field: 'District', headerName: 'District', width:130 },
  { field: 'MobileNo', headerName: 'Mobile', width:130 },
  { field: 'AltMobileNo', headerName: 'Alt Mobile No', width:130 }
 
];
}

export default function PatientSearchDetail(props) {

    const columns = getConfiguredColumns(props);
  return (
        <div style={{ height: 250 }}>
            <DataGrid rows={props.searchedPatients??[]} columns={columns} />
        </div>
  );
}