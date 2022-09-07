export class CustomException {
  public message: string;
  public status: number;
  public ok: boolean;
  constructor(e: CustomError) {
    this.message = e.message;
    this.status = e.status !== undefined ? e.status : 200;
    this.ok = e.ok !== undefined ? e.ok : true;
  }
}
