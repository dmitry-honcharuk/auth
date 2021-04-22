import {
  MONGO_DB_NAME,
  MONGO_DB_PASSWORD,
  MONGO_DB_USER,
} from '../../../config/env';

export const CONNECTION_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@main.mp8ja.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
