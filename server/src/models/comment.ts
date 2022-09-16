class Comment {
  static getLastOrderNumber: (req: any, res: any) => void;
  static findAll: (req: any, res: any) => void;
  static findOne: (req: any, res: any) => void;
  static findByPnum: (req: any, res: any) => void;
  static findByFnum: (req: any, res: any) => void;
  static create: (req: any, res: any) => void;
  static update: (req: any, res: any) => void;
  static delete: (req: any, res: any) => void;

  public num: number | null = null;
  public pnum: number | null = null;
  public cnum: number | null = null;
  public order: number | null = null;
  public layer: number | null = null;
  public author: string | null = null;
  public type: string | null = null;
  public content: string | null = null;
  public visible: boolean | null = null;
  public regdate: Date | null = null;
  public update: Date | null = null;

  constructor(info: object) {
    Object.keys(info).forEach((key) => {
      this[key] = info[key];
    });
  }
}

export default Comment;
