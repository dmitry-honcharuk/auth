export class CoreError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CoreError.prototype);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
