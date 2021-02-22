import { CoreError } from './CoreError';

export class ValidationError extends CoreError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);

    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}
