import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  Entry,
} from '../types';

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

const addPatient = (patientEntry: NewPatient): Patient => {
  const newId: string = uuid();
  const newPatient = {
    id: newId,
    entries: [],
    ...patientEntry,
  };
  patientData.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patientData.find((p) => p.id === id);
  return patient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry | undefined => {
  const patient = findById(patientId);
  if (!patient) {
    return undefined;
  }
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntry,
};
