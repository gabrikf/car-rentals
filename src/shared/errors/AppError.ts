export class AppError {
  public readonly message: string;
  public readonly errorCode: number;

  constructor(messsage: string, errorCode = 400) {
    this.message = messsage;
    this.errorCode = errorCode;
  }
}
