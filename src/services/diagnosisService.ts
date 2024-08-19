import diagnosisData from '../../data/diagnoses';

import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosisData;

const getEntries = () => {
  return diagnoses;
};

export default { getEntries };
