import { CoreError } from './CoreError';

export class NoSuchUserError extends CoreError {
  constructor(email: string, namespace?: string) {
    const namespaceMentioning = namespace ? ` in namespace ${namespace}` : '';

    const message = ['No such user', namespaceMentioning, `. (${email})`]
      .filter((s) => !!s)
      .join('');

    super(message);
    Object.setPrototypeOf(this, NoSuchUserError.prototype);

    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}
