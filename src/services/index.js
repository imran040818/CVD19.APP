import { searchPatients, viewPatients, addPatient, updatePatient, deletePatient } from './patientService';
import { addInitialDiagnosisData, updateInitialDiagnosisData, deleteInitialDiagnosisData } from './initialDiagnosisService';
import { addDailyDiagnosisData, updateDailyDiagnosisData, deleteDailyDiagnosisData } from './dailyDiagnosisService';
import { addAdmissionData, updateAdmissionData, deleteAdmissionData } from './admissionService';

export {
    searchPatients, viewPatients, addPatient, updatePatient, deletePatient,
    addInitialDiagnosisData, updateInitialDiagnosisData, deleteInitialDiagnosisData,
    addDailyDiagnosisData, updateDailyDiagnosisData, deleteDailyDiagnosisData,
    addAdmissionData, updateAdmissionData, deleteAdmissionData
}