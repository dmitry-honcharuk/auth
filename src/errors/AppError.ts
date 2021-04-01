export class AppError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);

    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}
