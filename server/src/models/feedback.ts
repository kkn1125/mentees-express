class Product {
  static findAll: (req: any, res: any) => void;
  static findOne: (req: any, res: any) => void;
  static create: (req: any, res: any) => void;
  static update: (req: any, res: any) => void;
  static delete: (req: any, res: any) => void;

  public num: number | null = null;
  public tags: string | null = null;
  public view: string | null = null;
  public author: string | null = null;
  public title: string | null = null;
  public content: string | null = null;
  public regdate: Date | null = null;
  public updates: Date | null = null;

  constructor(info: object) {
    Object.keys(info).forEach((key) => {
      this[key] = info[key];
    });
  }
}

export default Product;
