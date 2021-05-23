import {get, post, del} from '../utilities/api';
import {DD_SAVE,DD_DELETE,DD_UPDATE} from '../utilities/apiUrl';

export const addDailyDiagnosisData = async (dailyDiagnosis,token) => {
    return await post(DD_SAVE, dailyDiagnosis,token);
}

export const updateDailyDiagnosisData = async (dailyDiagnosis,token) => {
    return await post(DD_UPDATE, dailyDiagnosis,token);
}

export const deleteDailyDiagnosisData = async (id,token) => {
    return await del(DD_DELETE, [id],token);
}