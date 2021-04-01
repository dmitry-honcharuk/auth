export class TokenVerificationError extends Error {
  constructor(message?: string) {
    super(message ?? 'No token found.');
    Object.setPrototypeOf(this, TokenVerificationError.prototype);

    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}
