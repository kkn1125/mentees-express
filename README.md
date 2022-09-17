# Mentees Project

이 저장소는 기존 Mentees Project를 node.js express + react (typescript)로 마이그레이션 하기 위해 생성되었습니다.

## 실행방법

> 서버와 클라이언트, root 디렉토리 모두 node module을 사용하므로 세 가지 디렉토리 모두 설치해주어야 합니다.

저장소를 포크하거나 다운로드 합니다. 그리고 필요한 의존을 설치합니다.

```bash
npm install
# or
yarn install
```

server와 client 폴더가 있는 `root` 디렉토리에서 서버를 실행합니다.

```bash
yarn start
yarn build # build
yarn mock # build된 프로젝트 실행
```

## 개발환경

### 이전 개발 환경

- eclipse : 2021-12 (4.22.0)
- Java : 1.8
- tiles-jsp : 3.0.8
- spring-boot-devtools : 2.5.4
- spring-boot-starter-\* : 2.5.4
- lombok : 1.18.20
- mysql-connector-java : 8.10.26

### 현재 개발 환경

1. 프론트앤드
   - react - 18.2.0
   - typescript - 4.8.3
   - formik - 2.2.9
   - yup - 0.32.11
   - mui - 5.10.5
   - suneditor - 2.43.14
   - aos - 2.3.4
   - axios - 0.27.2
2. 백앤드
   - express.js - 4.18.1
   - babel - 7.18.10
   - tslint - 6.1.3
   - tslib - 2.4.0
   - bcrypt - 5.0.1
   - better-sse - 0.8.0
   - jsonwebtoken - 8.5.1
   - body-parser - 1.20.0
   - cors - 2.8.5
   - mysql - 2.18.1
   - axios 0.27.2

## 변경 된 내용

1. 변경사항
   - 메인페이지 >> 프로필 사이드 -> 상단 고정
   - 프론트 >> jsp -> react-typescript
   - 백앤드 >> spring boot -> node express
   - 전체적인 UI 일부 변경

## 개요

기존 스프링 서버와 jsp 페이지를 분리하여 node express와 react typescript 환경으로 이식하는 작업 진행.

## 주요 서비스

> 멘티들의 정보 공유 커뮤니티

![image](https://user-images.githubusercontent.com/71887242/165509642-709896b5-4a08-4873-98d6-a102fb0f8389.png)

## ERD

![image](https://user-images.githubusercontent.com/71887242/190382870-14252368-8e5e-42ca-9112-d9690374ca24.png)

## APIs

작성 중...

## 참여자

| kkn1125                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="https://github.com/kkn1125" title="kkn1125's Github"><img src="https://avatars.githubusercontent.com/u/71887242?v=4" alt="kkn1125" width="150" height="150"></a> |
