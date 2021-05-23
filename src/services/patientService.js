import {get, post, del} from '../utilities/api';
import {PATIENT_NAMES,PATIENT_SAVE,PATIENT_UPDATE,PATIENT_DELETE, PATIENT_GET_BY_NAME, PATIENT_GET_BY_ID, PATIENTS_ALL} from '../utilities/apiUrl';

export const populatePatientNames = async (token) => {
    return await get(PATIENT_NAMES,null,token);
}

export const getAllPatients = async (token) => {
    return await get(PATIENTS_ALL,null,token);
}

export const searchPatients = async (name,token) => {
    return await get(PATIENT_GET_BY_NAME,[name],token);
}

export const viewPatients = async (id,token) => {
    return await get(PATIENT_GET_BY_ID, [id],token);
}

export const addPatient = async (patient,token) => {
    return await post(PATIENT_SAVE, patient,token);
}

export const updatePatient = async (patient,token) => {
    return await post(PATIENT_UPDATE, patient,token);
}

export const deletePatient = async (id,token) => {
    return await del(PATIENT_DELETE, [id],token);
}