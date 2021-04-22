import { CoreError } from './CoreError';

export class EntityAlredyExistsError extends CoreError {
  constructor() {
    super('Entity already exists.');
    Object.setPrototypeOf(this, EntityAlredyExistsError.prototype);

    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}
