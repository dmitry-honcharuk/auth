import { randomBytes } from 'crypto';

export const generateSecret = () => randomBytes(264).toString('base64');
