import { CoreError } from './CoreError';

export class ClientIdNotUniqueError extends CoreError {
  constructor(clientId: string) {
    super(`Client id is taken. ${clientId}`);
    Object.setPrototypeOf(this, ClientIdNotUniqueError.prototype);

    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}
