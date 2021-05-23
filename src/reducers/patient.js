import {
    ADD_PATIENT,
    DELETE_PATIENT,
    UPDATE_PATIENT,
    SEARCH_PATIENT,
    VIEW_PATIENT,
    POPULATE_PATIENTS,
    CLEAR_SEARCH_PATIENT,

    ADD_INITIAL_DIAGNOSIS,
    DELETE_INITIAL_DIAGNOSIS,
    UPDATE_INITIAL_DIAGNOSIS,

    ADD_DAILY_DIAGNOSIS,
    DELETE_DAILY_DIAGNOSIS,
    UPDATE_DAILY_DIAGNOSIS,

    ADD_ADMISSION,
    DELETE_ADMISSION,
    UPDATE_ADMISSION,

    ERROR_MODAL_CLOSE

} from '../actions/actionConstants';


export const patient = (state = { 
        selectedPatientId : null,
        //searchText:{Title:'', Id:''},
        dailyDiagnoses:[],
        initialDiagnoses:[],
        admissions:[],
        searchedPatients:[],
        searchList: [],
        displayPatientInfo:false,
        displaySearchResult :false,
        isOpenErrorModal: false,
        errorMessage: ''
     }, action) => {

    switch (action.type) {
        case CLEAR_SEARCH_PATIENT:
            return{
                ...state,
                displaySearchResult:false,
                displayPatientInfo:false,
               // searchText:{Title:'', Id:''},
               searchText:''
            };  
        case POPULATE_PATIENTS:
            const newList = new Array();
                action.payload?.data?.map((value, _)=>{
                    newList.push({Title: value.Title, Id:value.Id })
                })
                return{
                    ...state,
                    searchList: newList??[]
                }; 
            case SEARCH_PATIENT:
                // const searchData = action.payload.data!==null && action.payload.data !== undefined
                // && action.payload.data.length > 0  ? {Title:action.payload.data[0]?.Name} : '';// {Title:action.payload.data[0]?.Name, Id:action.payload.data[0]?.Id} : {Title:'', Id:''};
                    return{
                        ...state,
                        searchedPatients : action.payload.data ?? [],
                        displayPatientInfo:false,
                        displaySearchResult:true,
                       // searchText: searchData, 
                    };    
        case VIEW_PATIENT:
            return{
                ...state,
                selectedPatientId:action.payload.data.PatientId,
                initialDiagnoses: action.payload.data.InitialDiagnosisModel,
                dailyDiagnoses: action.payload.data.DiagnosisReport,
                admissions:action.payload.data.AdmissionDetailModel,
                displayPatientInfo:true
        };
        case ADD_PATIENT:
            {
            const updatedsearchedPatients =[... state.searchedPatients]
                updatedsearchedPatients.push(action.payload.data);

                const updatedsearchList =[... state.searchList]
                updatedsearchList.push({Title: action.payload.data.Name, Id: action.payload.data.Id});

                return{
                    ...state,
                    searchList: updatedsearchList,
                    searchedPatients: updatedsearchedPatients,
                    selectedPatientId:action.payload.data.Id,
                    searchText: action.payload.data.Name//{Title:action.payload.data.Name, Id:action.payload.data.Id},
                };
            }
        case UPDATE_PATIENT:
            {
            const updatedsearchedPatients =[... state.searchedPatients]
                let data = updatedsearchedPatients.filter(f=>f.Id==action.payload.data.Id)?.[0];
                let index = updatedsearchedPatients.indexOf(data);
                if(index>=0){
                    updatedsearchedPatients.splice(index,1);
                    updatedsearchedPatients.push(action.payload.data);
                }

                const updatedsearchList =[... state.searchList]
                data = updatedsearchList.filter(f=>f.Id==action.payload.data.Id)?.[0];
                index = updatedsearchList.indexOf(data);
                if(index>=0){
                    updatedsearchList.splice(index,1);
                    updatedsearchList.push({Title: action.payload.data.Name, Id: action.payload.data.Id});
                }
                
            return{
                ...state,
                searchedPatients:updatedsearchedPatients,
                searchText:{Title:action.payload.data.Name, Id:action.payload.data.Id},
                searchList:updatedsearchList,
                selectedPatientId:action.payload.data.Id
            }; 
        }
        case DELETE_PATIENT:
            {
            const updatedsearchedPatients =[... state.searchedPatients]
                let data = updatedsearchedPatients.filter(f=>f.Id==state.selectedPatientId)?.[0];
                let index = updatedsearchedPatients.indexOf(data);
                if(index>=0){
                    updatedsearchedPatients.splice(index,1);
                }
                const updatedsearchList =[... state.searchList]
                data = updatedsearchList.filter(f=>f.Id==action.payload.data.Id)?.[0];
                index = updatedsearchList.indexOf(data)
               if(index>=0){
                   updatedsearchList.splice(index,1);
               }
            return{
                ...state,
                searchedPatients:updatedsearchedPatients,
                searchText:{Title:'', Id:''},
                searchList:updatedsearchList,
                selectedPatientId:undefined
            }; 
            }
        case ADD_INITIAL_DIAGNOSIS:
            {
            const updatedinitialDiagnoses =[... state.initialDiagnoses]
            updatedinitialDiagnoses.push(action.payload.data);
            return{
                ...state,
                initialDiagnoses: updatedinitialDiagnoses
            };
        }
        case UPDATE_INITIAL_DIAGNOSIS:
            {
            const updatedinitialDiagnoses =[... state.initialDiagnoses]
                const data = updatedinitialDiagnoses.filter(f=>f.Id==action.payload.data.Id)?.[0];
                const index = updatedinitialDiagnoses.indexOf(data);
                if(index>=0){
                    updatedinitialDiagnoses.splice(index,1);
                    updatedinitialDiagnoses.push(action.payload.data);
                }
                return{
                    ...state,
                    initialDiagnoses: updatedinitialDiagnoses
                };
            }
        case DELETE_INITIAL_DIAGNOSIS:
            {
            const updatedinitialDiagnoses =[... state.initialDiagnoses]
                const data = updatedinitialDiagnoses.filter(f=>f.Id==action.payload.data.Id)?.[0];
                const index = updatedinitialDiagnoses.indexOf(data);
                if(index>=0){
                    updatedinitialDiagnoses.splice(index,1);
                }
                return{
                    ...state,
                    initialDiagnoses: updatedinitialDiagnoses
                };
            }
        case ADD_DAILY_DIAGNOSIS:
            {
            const updateddailyDiagnoses =[... state.dailyDiagnoses]
                updateddailyDiagnoses.push(action.payload.data);
                return{
                    ...state,
                    dailyDiagnoses: updateddailyDiagnoses
                };
            }
        case UPDATE_DAILY_DIAGNOSIS:
            {
            const updateddailyDiagnoses =[... state.dailyDiagnoses]
            const data = updateddailyDiagnoses.filter(f=>f.Id==action.payload.data.Id)?.[0];
            const index = updateddailyDiagnoses.indexOf(data);
            if(index>=0){
                updateddailyDiagnoses.splice(index,1);
                updateddailyDiagnoses.push(action.payload.data);
            }
            return{
                ...state,
                dailyDiagnoses: updateddailyDiagnoses
            };
        }
        case DELETE_DAILY_DIAGNOSIS:
            {
            const updateddailyDiagnoses =[... state.dailyDiagnoses]
                const data = updateddailyDiagnoses.filter(f=>f.Id==action.payload.data.Id)?.[0];
                const index = updateddailyDiagnoses.indexOf(data);
                if(index>=0){
                    updateddailyDiagnoses.splice(index,1);
                }
                return{
                    ...state,
                    dailyDiagnoses: updateddailyDiagnoses
                };
            }
        case ADD_ADMISSION:
            {
            const updatedAdmission =[... state.admissions]
                updatedAdmission.push(action.payload.data);
                return{
                    ...state,
                    admissions:updatedAdmission
                };
            }
        case UPDATE_ADMISSION:
            {
            const updatedadmissions =[... state.admissions]
                const data = updatedadmissions.filter(f=>f.Id==action.payload.data.Id)?.[0];
                const index = updatedadmissions.indexOf(data);
                if(index>=0){
                    updatedadmissions.splice(index,1);
                    updatedadmissions.push(action.payload.data);
                }
                return{
                    ...state,
                    admissions: updatedadmissions
                };
            }
        case DELETE_ADMISSION:
            {
            const updatedadmissions =[... state.admissions]
                const data = updatedadmissions.filter(f=> f.Id == action.payload.data.Id)?.[0];
                const index = updatedadmissions.indexOf(data);
                if(index>=0){
                    updatedadmissions.splice(index,1);
                }
                return{
                    ...state,
                    admissions: updatedadmissions
                }; 
            }
        default:
           return state;
    }
}