import { CoreError } from './errors/CoreError';

export const isCoreError = (smth: any): smth is CoreError =>
  smth instanceof CoreError;
