declare interface CustomError {
  message: string;
  status?: number;
  ok?: boolean;
}

// ts-node를 사용하면 *.d.ts파일이 무시된다.

// 설정은 아래의 설정을 참고해야한다.
// https://stackoverflow.com/questions/51610583/ts-node-ignores-d-ts-files-while-tsc-successfully-compiles-the-project
