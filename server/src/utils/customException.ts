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

const matches = {
  member: "계정",
  product: "상품",
  feedback: "피드백",
  feed: "피드 좋아요",
  like: "좋아요",
  comment: "댓글",
  kakao: "카카오",
};

type Type =
  | "member"
  | "product"
  | "feedback"
  | "feed"
  | "like"
  | "comment"
  | "kakao";

export const errorMessage = {
  "500": "서버에서 문제가 발생했습니다.",
  "404": (type: Type) => `${matches[type]} 정보가 없습니다.`,
  "403": (type: Type) => `[${matches[type]} 오류] 권한이 없습니다.`,
  "422": (type: Type) => `[${matches[type]} 오류] 파라미터가 없습니다.`,
  "400": (type: Type) => `[${matches[type]} 오류] 잘못된 요청입니다.`,
  "409": (type: Type) => `[${matches[type]} 오류] 중복되는 정보가 존재합니다.`,
  signin: {
    "404": `일치하는 회원 정보가 없습니다. 로그인을 다시 시도 해주세요.`,
    "500": `로그인 시도에서 문제가 발생했습니다. 새로고침 후 다시 시도해주세요.`,
    compare: `계정 정보가 일치하지 않습니다. 로그인을 다시 시도 해주세요.`,
    password: `패스워드가 일치하지 않습니다.`,
  },
  kakao: {
    signout: "카카오 계정이 정상 로그아웃 되었습니다.",
  },
};

export const throwException = (
  message: string,
  status: number = 200,
  ok: boolean = true
): never => {
  throw new CustomException({
    message: message,
    status: status,
    ok: ok,
  });
};
