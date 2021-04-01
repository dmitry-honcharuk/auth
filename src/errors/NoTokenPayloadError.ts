export class NoTokenPayloadError extends Error {
  constructor() {
    super('No token payload found.');
    Object.setPrototypeOf(this, NoTokenPayloadError.prototype);

    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}
