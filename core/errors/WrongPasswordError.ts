import { CoreError } from './CoreError';

export class WrongPasswordError extends CoreError {
  constructor() {
    super('Wrong password.');
    Object.setPrototypeOf(this, WrongPasswordError.prototype);

    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}
