import {
  MONGO_DB_NAME,
  MONGO_DB_PASSWORD,
  MONGO_DB_USER,
} from '../../../config/env';

const isDev = process.env.NODE_ENV === 'development';

export const CONNECTION_URL = isDev
  ? 'mongodb://localhost:27017?retryWrites=true&w=majority'
  : `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@main.mp8ja.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
