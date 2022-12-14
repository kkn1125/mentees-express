class Member {
  static fileUpload: (req: any, res: any) => void;
  static findAll: (req: any, res: any) => void;
  static findOne: (req: any, res: any) => void;
  static findById: (req: any, res: any) => void;
  static create: (req: any, res: any) => void;
  static update: (req: any, res: any) => void;
  static delete: (req: any, res: any) => void;
  static signin: (req: any, res: any) => void;
  static signout: (req: any, res: any) => void;

  public num: number | null = null;
  public cover: string | null = null;
  public name: string | null = null;
  public jumin: string | null = null;
  public id: string | null = null;
  public pw: string | null = null;
  public msg: string | null = null;
  public email: string | null = null;
  public address: string | null = null;
  public zip: number | null = null;
  public gender: number | null = null;
  public interest: string | null = null;
  public regdate: Date | null = null;
  public updates: Date | null = null;

  constructor(info: object) {
    Object.keys(info).forEach((key) => {
      this[key] = info[key];
    });
  }
}

export default Member;
