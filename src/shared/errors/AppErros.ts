export class AppError {
  public readonly message: string

  public readonly statusCode: number | undefined

  constructor(message: string, statusCode = 400) {
    this.message = message

    this.statusCode = statusCode
  }
}
