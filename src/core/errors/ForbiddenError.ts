import { CoreError } from './CoreError';

export class ForbiddenError extends CoreError {
  constructor() {
    super('Access denied.');
    Object.setPrototypeOf(this, ForbiddenError.prototype);

    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}
