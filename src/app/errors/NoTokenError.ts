export class NoTokenError extends Error {
  constructor() {
    super('No token found.');
    Object.setPrototypeOf(this, NoTokenError.prototype);

    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}
