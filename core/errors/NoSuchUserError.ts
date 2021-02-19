import { CoreError } from './CoreError';

export class NoSuchUserError extends CoreError {
  constructor(email: string) {
    super(`No such user. (${email})`);
    Object.setPrototypeOf(this, NoSuchUserError.prototype);

    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}
