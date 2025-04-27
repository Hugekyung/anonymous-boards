# Anonymous-Board

- 댓글 기능이 있는 익명 게시판 및 키워드 알림 기능을 구현합니다.

### 프로젝트 시작하기

- 프로젝트 git clone

```
> git clone https://github.com/Hugekyung/anonymous-boards.git
```

- MySQL DB 세팅을 위한 Docker Container 생성

```
> docker compose up -d
```

- 의존성 설치 & 서버 실행

```
> yarn && yarn start:dev
```

### API 구성

```
GET /boards - 게시글 목록 API
POST /boards - 게시글 작성 API
PATCH /boards/:boardId - 게시글 수정 API
DELTE /boards/:boardId - 게시글 삭제 API
GET /comments - 댓글 목록 API
POST /comments - 댓글 작성 API
```
