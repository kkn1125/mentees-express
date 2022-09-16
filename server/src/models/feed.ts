class Feed {
  static findAll: (req: any, res: any) => void;
  static findByFnum: (req: any, res: any) => void;
  static findByMnum: (req: any, res: any) => void;
  static create: (req: any, res: any) => void;
  static delete: (req: any, res: any) => void;

  public pnum: number | null = null;
  public mnum: number | null = null;

  constructor(info: object) {
    Object.keys(info).forEach((key) => {
      this[key] = info[key];
    });
  }
}

export default Feed;
