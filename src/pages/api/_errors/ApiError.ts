export class ApiError extends Error {
  constructor(public code: number, message?: string) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);

    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}
