import {
  Gender,
  NewPatient,
  NewEntry,
  HealthCheckRating,
  Diagnosis,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// Functions for parsing and validating new patient data

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDob = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDob(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newPatient;
  }
  throw new Error('Incorrect data: a field is missing');
};

// Functions for parsing and validating new entry data

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (
    rating === undefined ||
    !Object.values(HealthCheckRating).includes(rating as HealthCheckRating)
  ) {
    throw new Error('Incorrect or missing healthCheckRating');
  }
  return rating as HealthCheckRating;
};

const parseDischargeDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing discharge date');
  }
  return date;
};

const parseDischargeCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing discharge criteria');
  }
  return criteria;
};

const parseEmployerName = (employer: unknown): string => {
  if (!employer || !isString(employer)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employer;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const baseEntry = {
    description: parseDescription((object as any).description),
    date: parseDate((object as any).date),
    specialist: parseSpecialist((object as any).specialist),
    diagnosisCodes: parseDiagnosisCodes((object as any).diagnosisCodes),
  };

  if ((object as any).type === 'HealthCheck') {
    return {
      ...baseEntry,
      type: 'HealthCheck',
      healthCheckRating: parseHealthCheckRating(
        (object as any).healthCheckRating
      ),
    };
  }

  if ((object as any).type === 'Hospital') {
    return {
      ...baseEntry,
      type: 'Hospital',
      discharge: {
        date: parseDischargeDate((object as any).discharge.date),
        criteria: parseDischargeCriteria((object as any).discharge.criteria),
      },
    };
  }

  if ((object as any).type === 'OccupationalHealthcare') {
    return {
      ...baseEntry,
      type: 'OccupationalHealthcare',
      employerName: parseEmployerName((object as any).employerName),
    };
  }

  throw new Error('Invalid entry type');
};
