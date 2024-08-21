import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const getPatients = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newId: string = uuid();
  const newPatient = {
    id: newId,
    ...entry,
  };
  patientData.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensitivePatients, addPatient };
