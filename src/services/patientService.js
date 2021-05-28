import {get, post, del} from '../utilities/api';
import {PATIENT_SAVE,PATIENT_UPDATE,PATIENT_DELETE,PATIENT_UPLOAD_PHOTO, PATIENT_GET_BY_NAME, PATIENT_GET_BY_ID, PATIENTS_ALL} from '../utilities/apiUrl';


export const getAllPatients = async (regNo,filterType,startIndex,count,token) => {
    return await get(PATIENTS_ALL,[regNo,filterType,startIndex,count],token);
}

export const searchPatients = async (name,regNo,token) => {
    return await get(PATIENT_GET_BY_NAME,[name,regNo],token);
}

export const viewPatients = async (id,regNo,token) => {
    return await get(PATIENT_GET_BY_ID, [id,regNo],token);
}

export const addPatient = async (patient,token) => {
    return await post(PATIENT_SAVE, patient,token,null, 'multipart/form-data; boundary=l3iPy71otz');
}

export const updatePatient = async (patient,token) => {
    return await post(PATIENT_UPDATE, patient,token);
}

export const deletePatient = async (id,token) => {
    return await del(PATIENT_DELETE, [id],token);
}
export const uploadPhoto = async (files,token) =>{
    return await post(PATIENT_UPLOAD_PHOTO,files,token,null, 'multipart/form-data; boundary=l3iPy71otz');
}